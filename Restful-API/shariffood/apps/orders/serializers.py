from rest_framework import serializers

from .models import Orders


class OrdersSerializer(serializers.ModelSerializer):
    from ..foods.serializers import FoodsSerializer
    foods = FoodsSerializer(many=True, read_only=True)

    class Meta:
        model = Orders
        exclude = ['id']
