from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .serializer import RatingSerializer
from .models import Ratings


# Create your views here.

class RateRestaurantAPIView(GenericAPIView):
    serializer_class = RatingSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        rate = self.get_serializer(data=request.data)
        if rate.is_valie(raise_exception=True):
            rate.save()
            return Response(data={'details': 'Your rate to this restaurant has been submitted'},
                            status=status.HTTP_200_OK)
