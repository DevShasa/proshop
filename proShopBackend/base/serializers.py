# This is where we pick what items from the database to serialize 
from rest_framework import serializers
from django.contrib.auth.models import User 
from .models import Product
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod 
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        # token['message'] = 'Hello World'
        token['is_superuser'] = user.is_superuser
        token['is_staff'] = user.is_staff
        return token

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'