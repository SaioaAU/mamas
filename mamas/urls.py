from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import include, path

from .views import frontend_redirect

urlpatterns = [
    path('babies/', include('babies.urls')),
    path('diaries/', include('diaries.urls')),
    path('api/', include('authentication.urls')),
    path('admin/', admin.site.urls),
    path('', frontend_redirect, name='home'),
]
