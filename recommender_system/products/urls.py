from django.urls import path
from products.views import ProductListView, ProductDetailView, ProductReviewsView

urlpatterns = [
    path('api/products/', ProductListView.as_view()),
    path('api/products/<pk>', ProductDetailView.as_view()),
    path('api/reviews/<pk>', ProductReviewsView.as_view()),
]