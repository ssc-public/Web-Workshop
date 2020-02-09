from rest_framework import status
from rest_framework.generics import GenericAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Restaurants
from .serializers import RestaurantsSerializer, RestaurantWithItsFoodsSerializer


# Create your views here.


class RestaurantsListAPIView(GenericAPIView):
    serializer_class = RestaurantsSerializer
    queryset = Restaurants.objects.all()
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        data = self.get_serializer(self.get_queryset(), many=True).data
        return Response(data={'restaurants': data}, status=status.HTTP_200_OK)


class RestaurantWithItsFoodsListAPIView(GenericAPIView):
    serializer_class = RestaurantWithItsFoodsSerializer
    queryset = Restaurants.objects.all()
    permission_classes = (IsAuthenticated,)

    def get(self, request, restaurant_id):
        restaurant = get_object_or_404(self.get_queryset(), id=restaurant_id)
        data = self.get_serializer(restaurant).data
        return Response(data={'restaurant': data}, status=status.HTTP_200_OK)
