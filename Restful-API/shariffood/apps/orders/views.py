from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .serializers import OrdersSerializer
from .models import Orders


# Create your views here.

class UserOrdersListAPIView(GenericAPIView):
    serializer_class = OrdersSerializer
    queryset = Orders.objects.all()
    permission_classes = (IsAuthenticated,)

    def get(self, request, username):
        queryset = self.get_queryset().filter(owner__user__username=username)
        data = self.get_serializer(queryset, many=True).data
        return Response(data={'orders': data}, status=status.HTTP_200_OK)
