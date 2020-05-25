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


class ATMForm(forms.ModelForm):

    class Meta:
        model = models.ATM
        fields = '__all__'


class AnnonATMForm(forms.ModelForm):
    class Meta:
        model = models.AnonATM
        fields = '__all__'
