from django.urls import path

from . import views

urlpatterns = [
    path('create', views.BabyCreate.as_view(), name='create-baby'),
    path('<int:baby_id>', views.BabyView.as_view(), name='baby'),
    #path('index', views.baby_list_view, name='baby-list'),
    path('babies', views.BabiesView.as_view(), name='babies'),
]
