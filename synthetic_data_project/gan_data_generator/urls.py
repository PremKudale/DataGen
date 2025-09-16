from django.urls import path
from . import views

urlpatterns = [
    path('generate_synthetic_data/', views.generate_synthetic_data_view, name='generate_synthetic_data'),
]
