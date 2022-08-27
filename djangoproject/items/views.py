from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from .models import Items
from django.urls import reverse
 
def index (request) :
    items = Items.objects.all().values()
    template = loader.get_template('index.html')
    context = {
        'items' : items,
    }
    return HttpResponse(template.render(context, request))

def add(request):
  template = loader.get_template('add.html')
  return HttpResponse(template.render({}, request))

def addrecord(request):
    name = request.POST['name']
    desc = request.POST['desc']
    item = Items(itemname=name, itemdesc=desc)
    item.save()
    return HttpResponseRedirect(reverse('index'))

def delete(request, id):
    item = Items.objects.get(id=id)
    item.delete()
    return HttpResponseRedirect(reverse('index'))