from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .serializers import FoodsSerializer
from .models import Foods


# Create your views here.

class FoodsListAPIView(GenericAPIView):
    serializer_class = FoodsSerializer
    queryset = Foods.objects.all()
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        data = self.get_serializer(self.get_queryset(), many=True).data
        return Response(data={'foods': data}, status=status.HTTP_200_OK)


class FoodsListByCategoryAPIView(GenericAPIView):
    serializer_class = FoodsSerializer
    queryset = Foods.objects.all()
    permission_classes = (IsAuthenticated,)

    def get(self, request, category_num):
        data = self.get_serializer(self.get_queryset().filter(category=category_num), many=True).data
        return Response(data={'foods': data}, status=status.HTTP_200_OK)
