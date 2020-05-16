from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

app_name = 'bank'
router = DefaultRouter()
router.register('bank', views.BankViewset, basename='bank-viewset')
router.register('branch', views.BranchViewset, basename='branch-viewset')
router.register('atm', views.ATMViewset, basename='atm-viewset')
router.register('annon-atm', views.AnnonViewset, basename='annon-atm-viewset')

urlpatterns = [
    path('', include(router.urls))
]
