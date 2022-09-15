from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse
from .models import Tasks
from rest_framework.decorators import api_view
from rest_framework.response import Response
from todo.serializers import TaskSerializer

def index (request) :
    template = loader.get_template('todoIndex.html')
    return HttpResponse(template.render({}, request))

def addtodo(request):
    name = request.POST['name']
    desc = request.POST['desc']
    task = Tasks(taskname=name, taskdesc=desc)
    task.save()
    return HttpResponseRedirect(reverse('index'))

@api_view(['GET'])
def task_collection(request):
    if request.method == 'GET':
        tasks = Tasks.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def task_specific(request, id):
    try:
        task = Tasks.objects.get(pk=id)
    except Post.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = TaskSerializer(task)
        return Response(serializer.data)