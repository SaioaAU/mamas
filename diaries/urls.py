from django.urls import path
from babies.models import Baby

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('create', views.create, name='create'),
    path('<int:diary_id>', views.diary, name='diary'),
]
