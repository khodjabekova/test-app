from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions, generics
from rest_framework.authtoken.models import Token
from accounts.serializers import UserSerializer, LoginSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class UserCreate(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token = Token.objects.create(user=user)
                return Response({'success': True,'token': token.key}, status=status.HTTP_201_CREATED)       
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LoginAPI(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    def post(self, request, format='json'):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            if user:
                token, created  = Token.objects.get_or_create(user=user)
                return Response({'success': True,'token': token.key}, status=status.HTTP_201_CREATED)   
        return Response({"bad"}, status=status.HTTP_400_BAD_REQUEST)
        

class UserAPI(generics.RetrieveAPIView):
  permission_classes = [permissions.IsAuthenticated]
  serializer_class = UserSerializer

  def get_object(self):
    return self.request.user
