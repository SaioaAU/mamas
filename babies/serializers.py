from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from babies.models import Baby
from rest_framework.fields import CurrentUserDefault

class BabiesSerializer(serializers.ModelSerializer):
    date_of_birth = serializers.DateField(required=True)
    name = serializers.CharField()

    class Meta:
        model = Baby
        fields = ('date_of_birth', 'name', 'id')

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data, created_by=self.context["user"])
        instance.save()
        return instance
