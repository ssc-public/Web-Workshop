from django.urls import path

from . import views

app_name = 'orders'

urlpatterns = [
    path('<username>', views.UserOrdersListAPIView.as_view(), 'user_orders_list'),
]
