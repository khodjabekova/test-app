from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import Product, Review
from .serializers import ProductSerializer, ReviewSerializer
from rest_framework import status
from django.http import Http404, request


class ProductListView(ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductDetailView(RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductReviewsView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ReviewSerializer
    
    def get(self, request, pk, format=None):
        product_pk = pk
        reviews = Review.objects.filter(product__pk=product_pk)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    def get_product(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            raise Http404

    def post(self, request, pk, format=None):
        product = self.get_product(pk=pk)
        serializer = ReviewSerializer(data=request.data)

        if serializer.is_valid():
            review = serializer.save(author=self.request.user, product=product)
            return Response({'id': review.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
