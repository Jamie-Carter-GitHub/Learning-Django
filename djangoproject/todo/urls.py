from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('addtodo/', views.addtodo, name='addtodo'),
    path('api/tasks', views.task_collection, name="collecttasks"),
]