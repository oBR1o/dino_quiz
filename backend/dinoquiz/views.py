from django.http import HttpResponseNotFound
from rest_framework import viewsets, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializer import *
from .models import *


class GradedAssignmentViewSet(viewsets.ModelViewSet):
    queryset = GradedAssignment.objects.all()
    serializer_class = GradedAssignmentSerializer


class ChoiceViewSet(viewsets.ModelViewSet):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


# class AssignmentListView(generics.ListAPIView):
#     queryset = Assignment.objects.all()
#     serializer_class = AssignmentSerializer

    #def get_queryset(self):
        #return 


class AnnouncePageViewSet(viewsets.ModelViewSet):
    serializer_class = AnnouncePageDisplaySerializer

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def get_queryset(self):
        return Annoucement.objects.all()


class ActivityPageViewSet(viewsets.ModelViewSet):
    serializer_class = ActivityPageDisplaySerializer

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

    def get_queryset(self):
        return Assignment.objects.all()


class HomePageViewSet(viewsets.ModelViewSet):
    serializer_class = HomePageDisplaySerializer

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def get_queryset(self):
        return ClassRoom.objects.all()


class StudentViewSet(viewsets.ModelViewSet):
    serializer_class = StudentSerializer

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def get_queryset(self):
        return Student.objects.all()

class TeacherViewSet(viewsets.ModelViewSet):
    serializer_class = TeacherSerializer

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    
    def get_queryset(self):
        return Teacher.objects.all()

@api_view(['POST'])
def user_done_activity(request, pk):
    snippets = Assignment.objects.filter(id=pk)
    if(len(snippets) > 0):
        snippet = snippets[0]
        snippet.activity_status = True
        snippet.save()
        return Response({"data": {"activity_status": snippet.activity_status}})
    else:
        return HttpResponseNotFound()