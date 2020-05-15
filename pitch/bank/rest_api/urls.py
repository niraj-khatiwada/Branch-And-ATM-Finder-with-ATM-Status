from django.urls import path
from . import views


urlpatterns = [
    path('', views.BankAPIView.as_view(), name='bank-list'),
    path('<slug:pk>/', views.BankAPIDetailView.as_view(), name='bank-detail')
]
