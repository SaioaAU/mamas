from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from diaries.models import Diary
from rest_framework.fields import CurrentUserDefault

class DiarySerializer(serializers.ModelSerializer):
    diaries = serializers.IntegerField()

    class Meta:
        model = Diary
        fields = ('diaries')

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data, created_by=self.context["user"])
        instance.save()
        return instance
