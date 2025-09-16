from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('gan_data_generator.urls')),  # Assuming 'gan_data_generator' is your app name
]
