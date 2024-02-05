from django.urls import path

from meteo import views

urlpatterns = [
    path("", views.main_form, name="main_form")
]