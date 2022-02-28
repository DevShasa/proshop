from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User 
from .models import Product
from .serializers import ProductSerializer, MyTokenObtainPairSerializer, UserSerializer 
# CUSTOMISING THE USER ACCESS TOKEN
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/products/',
        '/api/products/create/',
        '/api/products/upload/',
        '/api/products/<id>/reviews/',
        '/api/products/top/',
        '/api/products/<id>/',
        '/api/products/delete/<id>/',
        '/api/products/<update>/<id>/',
    ]
    return Response(routes)

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getUserProfile(request):
    '''
    Accept a bearer jwt token in the GET request header
    use token to get user obj
    '''
    user = request.user # Get user from token 
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id = pk)
    # for i in products:
    #     if i['_id'] == pk:
    #         product = i
    #         break
    serializer = ProductSerializer(product,many=False)

    return Response(serializer.data)