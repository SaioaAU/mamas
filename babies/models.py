from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

from diaries.models import Diary

# Create your models here.
class Baby(models.Model):
    date_of_birth = models.DateField()
    # time_of_birth = models.TimeField()
    name = models.CharField(max_length=30)
    created_by = models.ForeignKey(User, related_name='babies', on_delete=models.CASCADE)
    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # if the baby doesn't have a diary, create one!
        super().save(*args, **kwargs)
        if not getattr(self, 'diary', None):
            Diary.objects.create(baby=self, start_date = timezone.now())
        # # handy things:
        # # baby.getattr('diary', None)

    def get_absolute_url(self):
        return f'/baby/{self.id}'
