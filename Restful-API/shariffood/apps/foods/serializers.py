from rest_framework import serializers

from .models import Foods


class FoodsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Foods
        fields = ['name', 'restaurant', 'category']
