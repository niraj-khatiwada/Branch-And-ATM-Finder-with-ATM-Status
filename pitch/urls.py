
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('bank.rest_api.urls')),
    re_path('.*', TemplateView.as_view('index.html'))
]
