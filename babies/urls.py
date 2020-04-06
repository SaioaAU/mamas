from django.urls import path

from . import views

urlpatterns = [
    path('baby/create', views.baby, name='baby'),
]
