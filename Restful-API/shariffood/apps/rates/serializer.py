from rest_framework import serializers

from .models import Ratings


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ratings
        fields = ['restaurant', 'score']

    def validate(self, attrs):
        attrs['user'] = self.context['request'].user
        return attrs
