from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import include, path

urlpatterns = [
    path('babies/', include('babies.urls')),
    path('diaries/', include('diaries.urls')),
    path('', include('accounts.urls')),
]
