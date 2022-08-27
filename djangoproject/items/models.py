from django.db import models

# Create your models here.

class Items(models.Model):
  itemname = models.CharField(max_length=255)
  itemdesc = models.CharField(max_length=255)