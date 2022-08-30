from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse

def index (request) :
    template = loader.get_template('home.html')
    return HttpResponse(template.render())