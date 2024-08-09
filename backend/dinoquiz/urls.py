from django.urls import path
from rest_framework import routers
from django.urls import path, include

from .views import *
from . import views


router = routers.DefaultRouter()
router.register(r'grade', GradedAssignmentViewSet)
router.register(r'choice', ChoiceViewSet)
router.register(r'quiz', QuestionViewSet)
router.register(r'announcePage', AnnouncePageViewSet, basename='announce_page')
router.register(r'activityPage', ActivityPageViewSet, basename='activity_page')
router.register(r'homePage', HomePageViewSet, basename='home_page')
router.register(r'student', StudentViewSet, basename='student')
router.register(r'teacher', TeacherViewSet, basename='teacher')

urlpatterns = [
    path('', include(router.urls)),
    # path('assignmentList/', AssignmentListView.as_view())
    path('user_done_activity/<int:pk>/', views.user_done_activity),
]