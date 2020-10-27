from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.ProductListView.as_view()),
    path('products/<pk>', views.ProductDetailView.as_view()),
    path('reviews/<pk>', views.ProductReviewsView.as_view()),
]