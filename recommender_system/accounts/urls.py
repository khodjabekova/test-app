from django.urls import path
from accounts.views import UserCreate, LoginAPI, LogoutAPI, UserAPI


urlpatterns = [
    path('api/register/', UserCreate.as_view(), name='register'),
    path('api/login/', LoginAPI.as_view(), name='login'),
    path('api/logout/', LogoutAPI.as_view(), name='logout'),
    path('api/user/', UserAPI.as_view(), name='user'),
]