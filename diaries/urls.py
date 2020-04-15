from django.urls import path
from babies.models import Baby
from .views import entry_delete

from . import views

urlpatterns = [
    path('<int:diary_id>/entry-create', views.entry_create, name='entry_create'),
    path('create', views.diary_create, name='create'),
    path('<int:diary_id>', views.diary_detail, name='diary'),
    path('entry/<int:entry_id>/delete', entry_delete ),
]
