# This is where we pick what items from the database to serialize 
from rest_framework import serializers
from django.contrib.auth.models import User 
from .models import Product
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # @classmethod 
    # def get_token(cls, user):
    #     token = super().get_token(user)

    #     token['username'] = user.username
    #     # token['message'] = 'Hello World'
    #     token['is_superuser'] = user.is_superuser
    #     token['is_staff'] = user.is_staff
    #     return token
    def validate(self, attrs):
        # Check if a user exists and return the token
        data = super().validate(attrs)

        # data['username'] = self.user.username
        # data['email']= self.user.email

        # Add additional stuff to the data response dictionary 
        #  the UserSerializerWith oken is independent and fetches data on its own...
        # this function just appends the results of userSerializerwithtoken to the...
        # token pair request
        serializer = UserSerializerWithToken(self.user)
        user_details_plus_token = serializer.data
        for k, v in user_details_plus_token.items():
            # Append detauls to data returned by validate
            data [k] = v
        
        return data

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    '''
    Serialize fields from a user object
    '''
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model = User
        fields = ['_id', 'username', 'email', 'name', 'isAdmin']
    
    def get__id(self, user_obj):
        return user_obj.id

    def get_isAdmin(self, user_obj):
        return user_obj.is_staff

    # Custom method field 
    def get_name(self, user_obj):
        name = user_obj.first_name
        if name == "":
            name = user_obj.email
        return name 

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['_id', 'username', 'email', 'name', 'isAdmin', 'token']
    
    def get_token(self, user_obj):
        # refreshtoken generates a new token given a user object 
        token = RefreshToken.for_user(user_obj)
        return str(token.access_token)
