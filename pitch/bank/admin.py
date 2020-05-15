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
    list_display = ('bank', 'atm_address',)
    form = forms.ATMForm
    readonly_fields = ('atm_address',)


admin.site.register(models.Bank, BankAdmin)
admin.site.register(models.Branch, BranchAdmin)
admin.site.register(models.ATM, ATMAdmin)
