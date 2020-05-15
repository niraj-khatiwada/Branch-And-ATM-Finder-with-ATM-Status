from django.urls import path
from . import views


urlpatterns = [
    # Bank
    path('bank/', views.BankAPIView.as_view(), name='bank-list'),
    path('bank/<slug:pk>/', views.BankAPIDetailView.as_view(), name='bank-detail'),
    # Branch
    path('branch/', views.BranchAPView.as_view(), name='branch-list'),
    path('branch/<slug:pk>/', views.BranchAPIDetail.as_view(), name='branch-detail'),
    # ATM
    path('atm/', views.ATMAPIView.as_view(), name='atm-list'),
    path('atm/<slug:pk>/', views.ATMAPIView.as_view(), name='atm-detail')

]
