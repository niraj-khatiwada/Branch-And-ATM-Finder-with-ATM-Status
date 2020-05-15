from django import forms
from . import models


class BankForm(forms.ModelForm):
    class Meta:
        model = models.Bank
        fields = '__all__'


class BranchForm(forms.ModelForm):
    class Meta:
        model = models.Branch
        fields = '__all__'


class SubsidiaryForm(forms.ModelForm):
    class Meta:
        model = models.Subsidiary
        fields = '__all__'


class ATMForm(forms.ModelForm):

    class Meta:
        model = models.ATM
        fields = '__all__'
