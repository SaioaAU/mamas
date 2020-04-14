from django.urls import path
from babies.models import Baby
from .views import delete_entry

from . import views

urlpatterns = [
    path('<int:diary_id>/create-entry', views.entry_create, name='create_entry'),
    path('create', views.diary_create, name='create'),
    path('<int:diary_id>', views.diary_detail, name='diary'),
    path('<int:entry_id>/delete', delete_entry ),
]
