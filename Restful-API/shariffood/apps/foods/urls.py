from django.urls import path

from . import views

app_name = 'foods'

urlpatterns = [
    path('all', views.FoodsListAPIView.as_view(), name='all_foods_list'),
    path('<int:category_num>', views.FoodsListByCategoryAPIView.as_view(), name='foods_by_category')
]
