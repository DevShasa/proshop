from base.models import Product
from base.serializers import ProductSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework import status  

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id = pk)
    serializer = ProductSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, id):
    product = Product.objects.get(_id = id)
    product.delete()
    return Response('Product has been deleted')

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user = user,
        name = 'Sample Name',
        price = 0,
        brand = 'Sample Brand',
        countInStock = 0,
        category = 'Sample category', 
        description =  'lorem ipsum dolor sit amet'
    )
    
    serializer = ProductSerializer(product, many=False )
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, id):
    try:
        product = Product.objects.get(_id = id)
        data = request.data

        product.name = data['name']
        product.brand = data['brand']
        product.category = data['category']
        product.description = data['description']
        product.price = data['price']
        product.countInStock = data['countInStock']

        product.save()

        serializer = ProductSerializer(product, many=False )
        return Response(serializer.data)

    except:
        message = {
            'detail': 'Product does not exist'
        }
        return Response(message, status = status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def uploadImage(request):
    data = request.data
    product_id = data['product_id']
    product = Product.objects.get(_id = product_id)
    # product.image = request.FILES.get('image')
    print('<<REQUEST>> ', request.FILES)
    product.image = data['newProductImage']
    product.save()

    return Response('Image was Uploaded')