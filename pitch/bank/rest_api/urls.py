from django.urls import path
from . import views


urlpatterns = [
    # Bank
    path('bank/', views.BankAPIView.as_view(), name='bank-list'),
    path('bank/<slug:pk>/', views.BankAPIDetailView.as_view(), name='bank-detail'),
    # Branch
    path('branch/', views.BranchAPIView.as_view(), name='branch-list'),
    path('branch/<slug:pk>/', views.BranchAPIDetail.as_view(), name='branch-detail'),
    # ATM
    path('atm/', views.AtmAPIView.as_view(), name='atm-list'),
    path('atm/<slug:pk>/', views.AtmAPIDetailView.as_view(), name='atm-detail'),
    # Annon ATM
    path('annon-atm/', views.AnnonAtmAPIView.as_view(), name='annon-atm-list'),
    path('annon-atm/<slug:pk>/',
         views.AnnonAtmAPIDetailView.as_view(), name='annon-atm-detail'),


]
