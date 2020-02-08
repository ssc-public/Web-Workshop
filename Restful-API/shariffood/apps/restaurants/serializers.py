from rest_framework import serializers

from .models import Restaurants


class RestaurantsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurants
        fields = ['owner', 'name', 'address', 'image', 'description', 'delivery_price', 'working_hours']
