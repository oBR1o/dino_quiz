from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *
from rest_framework import viewsets

@api_view()
def whoami(request):
    s = UserSerializer(request.user)
    return Response(s.data)

class MemberListViewSet(viewsets.ModelViewSet):
    serializer_class = MemberSerializer

    def get_queryset(self):
        return User.objects.all()