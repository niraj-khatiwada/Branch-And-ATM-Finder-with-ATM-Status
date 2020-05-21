from rest_framework import serializers
from rest_framework.viewsets import reverse
from rest_framework.fields import ListField
from .. import models


class ArrayField(ListField):
    def to_representation(self, data):
        obj = super().to_representation(data)
        return ','.join([str(item) for item in obj])

    def to_internal_value(self, data):
        data = data.split(',')
        return super().to_internal_value(data)


class BankSerializer(serializers.ModelSerializer):
    detail_url = serializers.SerializerMethodField(read_only=True)
    contact_number = ArrayField()
    tags = ArrayField(required=False)

    class Meta:
        model = models.Bank
        fields = '__all__'
        extra_fields = ('detail_url')
        read_only_fields = ('central_hq_address',)

    def get_detail_url(self, instance):
        return reverse('bank:bank-viewset-detail', kwargs={'pk': instance.id}, request=self.context.get('request'))


class BranchSerializer(serializers.ModelSerializer):
    detail_url = serializers.SerializerMethodField(read_only=True)
    branch_contact_number = ArrayField(required=False)
    tags = ArrayField(required=False)

    class Meta:
        model = models.Branch
        fields = '__all__'
        extra_fields = ('detail_url',)
        read_only_fields = ('address',)

    def get_detail_url(self, instance):
        return reverse('bank:branch-viewset-detail', kwargs={'pk': instance.id}, request=self.context.get('request'))


class ATMSerializer(serializers.ModelSerializer):
    detail_url = serializers.SerializerMethodField(read_only=True)
    tags = ArrayField(required=False)

    class Meta:
        model = models.ATM
        fields = '__all__'
        extra_fields = ('detail_url',)
        read_only_fields = ('ddress',)

    def get_detail_url(self, instance):
        return reverse('bank:atm-viewset:detail', kwargs={'pk': instance.id}, request=self.context.get('request'))


class AnnonATMSerializer(ATMSerializer):
    class Meta:
        model = models.AnonATM
        fields = '__all__'
        extra_fields = ('detail_url',)
        read_only_fields = ('address',)
