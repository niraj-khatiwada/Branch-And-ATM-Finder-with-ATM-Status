from django.contrib import admin
from . import models
from . import forms


class BankAdmin(admin.ModelAdmin):
    list_display = ('name', 'central_hq_address',)
    search_fields = ('name',)
    ordering = ('name',)
    form = forms.BankForm
    readonly_fields = ('central_hq_address',)


class BranchAdmin(admin.ModelAdmin):
    list_display = ('name', 'bank',)
    list_filter = ('bank', 'street_name',)
    search_fields = ('name', 'bank__name',)
    form = forms.BranchForm
    readonly_fields = ('name',)


class ATMAdmin(admin.ModelAdmin):
    list_display = ('branch', 'name', 'status')
    list_filter = ('branch__bank', 'branch__street_name',)
    search_fields = ('branch__name', 'branch__bank__name',)
    ordering = ('branch__name',)
    form = forms.ATMForm


class AnnonAtmAdmin(admin.ModelAdmin):
    list_display = ('bank', 'address')
    list_filter = ('bank__name', 'street_name',)
    search_fields = ('bank__name', 'street_name',)
    ordering = ('bank__name',)
    form = forms.AnnonATMForm


admin.site.register(models.Bank, BankAdmin)
admin.site.register(models.Branch, BranchAdmin)
admin.site.register(models.ATM, ATMAdmin)
admin.site.register(models.AnonATM, AnnonAtmAdmin)
