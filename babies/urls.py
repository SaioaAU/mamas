from django.urls import path

from . import views

urlpatterns = [
    path('baby/create', views.create_baby, name='create_baby'),
    path('baby/<int:baby_id>', views.baby, name='baby'),
    path('baby/index', views.index, name='babies'),
]
