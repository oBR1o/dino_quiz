from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'memberlist', MemberListViewSet, basename='member_list')

urlpatterns = [
    path('', include(router.urls)),
    path('whoami/', whoami, name="whoami")
]

