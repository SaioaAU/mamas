
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers


class BabySerializer(serializers.ModelSerializer):
    date_of_birth = serializers.DateField(required=True)
    name = serializers.CharField()
    created_by = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Baby
        fields = ('date_of_birth', 'name', 'created_by')

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance
