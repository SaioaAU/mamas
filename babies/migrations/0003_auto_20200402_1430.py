# Generated by Django 3.0.4 on 2020-04-02 14:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('babies', '0002_auto_20200402_1418'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='baby',
            name='time_of_birth',
        ),
        migrations.AlterField(
            model_name='baby',
            name='date_of_birth',
            field=models.DateTimeField(),
        ),
    ]
