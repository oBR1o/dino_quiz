from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

# API

class ClassRoom(models.Model):
    title = models.CharField(max_length=200)
    members = models.ManyToManyField(User, null=True)
    #teacher = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.title

# class Activity(models.Model):
#     title = models.CharField(max_length=200)

#     def __str__(self):
#         return self.title

class Assignment(models.Model):
    title = models.CharField(max_length=50)
    due_time = models.DateTimeField(default=datetime.now, blank=True,)
    # activity = models.ForeignKey(Activity, on_delete=models.CASCADE, blank=True, null=True, related_name="activitys")
    activity_status = models.BooleanField(default = False)
    class_room = models.ForeignKey(ClassRoom, on_delete=models.CASCADE, null=True)
    #teacher = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class GradedAssignment(models.Model):
    #student = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200, null=True, blank=True)
    assignment = models.ForeignKey(Assignment, on_delete=models.SET_NULL, blank=True, null=True)
    grade = models.FloatField()

    def __str__(self):
        return self.title


class Choice(models.Model):
    title = models.CharField(max_length=50)

    def __str__ (self):
        return self.title


class Question(models.Model):
    question = models.CharField(max_length=200)
    choices = models.ManyToManyField(Choice)
    answer = models.ForeignKey(Choice, on_delete=models.CASCADE, related_name='answer')
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)
    # order = models.SmallIntegerField()

    def __str__(self):
        return self.question

class Annoucement(models.Model):
    ownerfirstname = models.CharField(max_length=200, null=True)
    ownerlastname = models.CharField(max_length=200, null=True)
    description = models.TextField()
    class_room = models.ForeignKey(ClassRoom, on_delete=models.CASCADE, null=True)
    #teacher = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.description

class Student(models.Model):
    username = models.CharField(max_length=200, null=True)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    password2 = models.CharField(max_length=200)

    def __str__(self):
        return '{}-{}'.format(self.first_name, self.last_name)

class Teacher(models.Model):
    username = models.CharField(max_length=200, null=True)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    password2 = models.CharField(max_length=200)

    def __str__(self):
        return '{}-{}'.format(self.first_name, self.last_name)



