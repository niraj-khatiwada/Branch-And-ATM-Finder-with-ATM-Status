from django.contrib import admin
from . import models
from . import forms


class BankAdmin(admin.ModelAdmin):
    list_display = ('bank_name', 'bank_central_hq_address',)
    form = forms.BankForm
    readonly_fields = ('bank_central_hq_address',)


class BranchAdmin(admin.ModelAdmin):
    list_display = ('branch_name', 'bank', 'branch_address',)
    form = forms.BranchForm
    readonly_fields = ('branch_address',)


class ATMAdmin(admin.ModelAdmin):
    list_display = ('branch', 'atm_name',)
    form = forms.ATMForm    


class AnnonAtmAdmin(admin.ModelAdmin):
    list_display = ('bank', 'atm_address')
    form = forms.AnnonATMForm


admin.site.register(models.Bank, BankAdmin)
admin.site.register(models.Branch, BranchAdmin)
admin.site.register(models.ATM, ATMAdmin)
admin.site.register(models.AnonATM, AnnonAtmAdmin)
