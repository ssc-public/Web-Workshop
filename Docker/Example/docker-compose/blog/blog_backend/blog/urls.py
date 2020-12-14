from . import views
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register("posts", views.PostViewSet, "posts")

urlpatterns = router.urls