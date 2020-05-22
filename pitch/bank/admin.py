from django.contrib import admin
from . import models
from . import forms


class BankAdmin(admin.ModelAdmin):
    list_display = ('name', 'central_hq_address',)
    form = forms.BankForm
    readonly_fields = ('central_hq_address',)


class BranchAdmin(admin.ModelAdmin):
    list_display = ('name', 'bank',)
    form = forms.BranchForm
    readonly_fields = ('name',)


class ATMAdmin(admin.ModelAdmin):
    list_display = ('branch', 'name', 'status')
    form = forms.ATMForm


class AnnonAtmAdmin(admin.ModelAdmin):
    list_display = ('bank', 'address')
    form = forms.AnnonATMForm


admin.site.register(models.Bank, BankAdmin)
admin.site.register(models.Branch, BranchAdmin)
admin.site.register(models.ATM, ATMAdmin)
admin.site.register(models.AnonATM, AnnonAtmAdmin)
