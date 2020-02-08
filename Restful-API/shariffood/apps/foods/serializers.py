from rest_framework import serializers

from .models import Foods


class FoodsSerializer(serializers.ModelSerializer):
    from ..restaurants.serializers import RestaurantsSerializer

    restaurant = RestaurantsSerializer()

    class Meta:
        model = Foods
        fields = ['name', 'restaurant', 'category']
