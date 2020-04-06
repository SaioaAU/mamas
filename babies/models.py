from django.db import models

# Create your models here.
class Baby(models.Model):
    date_of_birth = models.DateTimeField()
    # time_of_birth = models.TimeField()
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # if the baby doesn't have a diary, create one!
        super().save(*args, **kwargs)

        if not getattr(self, 'diary', None):
            Diary.objects.create(baby=self, start_date = timezone.now())
        # # handy things:
        # # baby.getattr('diary', None)
