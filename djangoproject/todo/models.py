from django.db import models

# Create your models here.
class Tasks(models.Model):
  taskname = models.CharField(max_length=255)
  taskdesc = models.CharField(max_length=255)