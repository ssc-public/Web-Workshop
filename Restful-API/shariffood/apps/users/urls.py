from django.urls import path
from rest_framework import routers
from .views import *

app_name = 'users'

router = routers.DefaultRouter()
router.include_root_view = False

router.register('register', RegisterView, basename='register')

urlpatterns = [
    # path('login', jwt_views.TokenObtainPairView.as_view(),
    #      name='token_obtain_pair'),
    # path('token/refresh', jwt_views.TokenRefreshView.as_view(),
    #      name='token_refresh'),
    path('password-update', ChangePassword.as_view(), name='password_update'),
    path('password/reset', ForgotPasswordView.as_view()),
    # path('password/reset/confirm', .as_view()), #TODO : plz correct the view
    path('activate/<slug:eid>/<slug:token>', ActivateView.as_view()),
    path('logout', LogoutView.as_view()),

]
