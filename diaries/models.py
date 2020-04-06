import datetime

from django.db import models
from django.utils import timezone
from babies.models import Baby

# Create your models here.

class Diary(models.Model):
    start_date = models.DateTimeField(auto_now_add=True)
    baby = models.OneToOneField(Baby, on_delete=models.CASCADE, related_name='diary')
    def __str__(self):
        return f'Diary for {self.baby.name}, {self.start_date}'

class Entry(models.Model):
    diary = models.ForeignKey(Diary, on_delete=models.CASCADE)
    description_text = models.CharField(max_length=200)
    poo = models.IntegerField(default=0)
    pee = models.IntegerField(default=0)
    def __str__(self):
        return self.description_text
