from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Items
 
def index (request) :
    items = Items.objects.all().values()
    template = loader.get_template('index.html')
    context = {
        'items' : items,
    }
    return HttpResponse(template.render(context, request))