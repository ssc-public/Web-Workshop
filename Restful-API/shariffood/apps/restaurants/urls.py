from django.urls import path

from . import views

app_name = 'restaurants'

urlpatterns = [
    path('all', views.RestaurantsListAPIView.as_view(), name='all_restaurants_list'),
    path('<int:restaurant_id>', views.RestaurantWithItsFoodsListAPIView.as_view(), name='restaurant_with_it_foods'),
]
