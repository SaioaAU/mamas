from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from diaries.models import Diary
from rest_framework.fields import CurrentUserDefault

class DiarySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = Diary
        fields = ('id',)
