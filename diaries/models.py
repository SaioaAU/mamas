import datetime

from django.db import models
from django.utils import timezone

# Create your models here.

class Baby(models.Model):
    date_of_birth = models.DateTimeField('date of birth')
    name = models.CharField(max_length=30)
    def __str__(self):
        return self.name

class Diary(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    baby = models.ForeignKey(Baby, on_delete=models.CASCADE)
    def __str__(self):
        return self.question_text

class Entry(models.Model):
    diary = models.ForeignKey(Diary, on_delete=models.CASCADE)
    description_text = models.CharField(max_length=200)
    poo = models.IntegerField(default=0)
    pee = models.IntegerField(default=0)
    def __str__(self):
        return self.description_text
