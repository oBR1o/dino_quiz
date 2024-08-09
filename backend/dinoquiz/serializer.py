from rest_framework import serializers
from .models import *


class GradedAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = GradedAssignment
        fields = '__all__'


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


class AnnouncePageDisplaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Annoucement
        fields = '__all__'



class ActivityPageDisplaySerializer(serializers.ModelSerializer):
    due_time = serializers.DateTimeField(format="%d/%m/%Y %H:%M")
    activity_title = serializers.CharField(source = 'activity.title', required = False,)

    class Meta:
        model = Assignment
        fields = '__all__'


class HomePageDisplaySerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassRoom
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        exclude = ('password','password2')

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        exclude = ('password','password2')

        #list 
        # rank of activity
        # title 
        # due date