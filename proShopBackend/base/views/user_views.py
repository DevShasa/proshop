from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.serializers import  MyTokenObtainPairSerializer, UserSerializer, UserSerializerWithToken
from django.contrib.auth.hashers import make_password 
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        # Create the user and return the associated user object 
        user = User.objects.create(
            first_name = data['name'],
            username = data['email'],
            email = data['email'],
            password = make_password(data['password'])
        )
        # Create a noice token for the newly created user 
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {
            'detail': 'User with this email already exists'
        }
        return Response(message, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    '''
    Accept a bearer jwt token in the GET request header
    use token to get user obj
    '''
    user = request.user # Get user from token 
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)



