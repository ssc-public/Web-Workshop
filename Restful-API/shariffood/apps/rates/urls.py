from django.urls import path

from . import views

app_name = 'rates'

urlpatterns = [
    path('rate-restaurant', views.RateRestaurantAPIView.as_view(), name='rate_restaurant')
]
