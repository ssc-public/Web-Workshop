from rest_framework import serializers

from .models import Restaurants


class RestaurantsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurants
        fields = ['owner', 'name', 'address', 'image', 'description', 'delivery_price', 'working_hours']


class RestaurantWithItsFoodsSerializer(serializers.ModelSerializer):
    from ..foods.serializers import FoodsSerializer
    foods = FoodsSerializer(many=True, read_only=True)

    class Meta:
        model = Restaurants
        fields = ['owner', 'name', 'address', 'image', 'description', 'delivery_price', 'working_hours', 'foods']
