# djsr/authentication/urls.py
from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from .views import TestView, UserCreate, UserView

urlpatterns = [
    path('user/create/', UserCreate.as_view(), name="create_user"),
    path('user/detail/', UserView.as_view(), name="user_detail"),
    path('test/', TestView.as_view(), name="test"),
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),  # override sjwt stock token
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
