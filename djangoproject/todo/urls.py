from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('addtodo/', views.addtodo, name='addtodo'),
    path('api/tasks', views.task_collection, name="collecttasks"),
    path('api/tasks/<int:id>', views.task_specific, name="specifictask"),
    path('api/tasks/update', views.task_update, name="updatetask"),
    path('api/tasks/delete/<int:id>', views.task_delete, name="deletetask"),
]