from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse

def index (request) :
    template = loader.get_template('todoIndex.html')
    context = {
        'count': 0,
    }
    return HttpResponse(template.render(context, request))