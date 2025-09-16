from django.db import models

# Create your models here.
from django.db import models

class TableA(models.Model):
    field1 = models.CharField(max_length=100)
    field2 = models.IntegerField()
    # Add more fields as needed

class TableB(models.Model):
    field3 = models.DateTimeField()
    field4 = models.ForeignKey(TableA, on_delete=models.CASCADE)