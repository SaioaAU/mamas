from django.urls import path

from . import views

urlpatterns = [
    path('create', views.BabyCreate.as_view(), name='create-baby'),
    #path('<int:baby_id>', views.baby, name='baby-detail'),
    #path('index', views.baby_list_view, name='baby-list'),
]
