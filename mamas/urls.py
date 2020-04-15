from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('babies/', include('babies.urls')),
    path('diaries/', include('diaries.urls')),
    path('admin/', admin.site.urls),
]
