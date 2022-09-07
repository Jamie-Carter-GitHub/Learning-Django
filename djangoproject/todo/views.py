from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse
from .models import Tasks

def index (request) :
    template = loader.get_template('todoIndex.html')
    context = {
        'count': 0,
    }
    return HttpResponse(template.render(context, request))

def addtodo(request):
    name = request.POST['name']
    desc = request.POST['desc']
    task = Tasks(taskname=name, taskdesc=desc)
    task.save()
    return HttpResponseRedirect(reverse('index'))