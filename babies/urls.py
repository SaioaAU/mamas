from django.urls import path

from . import views

urlpatterns = [
    path('baby/create', views.create_baby, name='create-baby'),
    path('baby/<int:baby_id>', views.baby_detail_view, name='baby-detail'),
    path('baby/index', views.baby_list_view, name='baby-list'),
]
