from django.urls import path
from . import views


urlpatterns = [
    # Bank
    path('bank/', views.BankAPIView.as_view(), name='bank-list'),
    path('bank/<slug:pk>/', views.BankAPIDetailView.as_view(), name='bank-detail'),
    # Branch
    path('branch/', views.BranchAPView.as_view(), name='branch-list'),
    path('branch/<slug:pk>/', views.BranchAPIDetail.as_view(), name='branch-detail')

]
