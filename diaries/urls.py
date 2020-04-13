from django.urls import path
from babies.models import Baby

from . import views

urlpatterns = [
    path('<int:diary_id>/create-entry', views.create_entry, name='create_entry'),
    path('create', views.create, name='create'),
    path('<int:diary_id>', views.diary, name='diary'),
]
