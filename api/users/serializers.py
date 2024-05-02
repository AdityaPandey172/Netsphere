from django.contrib.auth import get_user_model
from rest_framework import serializers
from . import models
import json

User = get_user_model()


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['email', 'first_name', 'last_name', 'password', 'role']

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password'],
            role="student",
            status='inactive'
        )
        user.save()
        return user