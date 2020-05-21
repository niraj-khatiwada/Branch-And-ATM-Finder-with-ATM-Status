from rest_framework import generics, viewsets, response, status

from . import serializers
from .. import models


class BankViewset(viewsets.ModelViewSet):
    permisiion_classes = []
    serializer_class = serializers.BankSerializer
    queryset = models.Bank.objects.all()
    search_fields = ('bank_name', 'bank_central_hq_address', 'bank_city_name',)
    ordering_fields = ('bank_name',)

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)


class BranchViewset(viewsets.ModelViewSet):
    permisiion_classes = []
    serializer_class = serializers.BranchSerializer
    queryset = models.Branch.objects.all()
    search_fields = ('branch_name', 'branch_address', 'branch_city_name',)
    ordering_fields = ('branch_name',)

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        print(request.data)
        bank_name = request.data.get('bank_name')
        try:
            obj = models.Branch.objects.get(
                bank_name__iexact=bank_name)
            print(obj)
            return response.Response({'detail': 'Branch already exist'}, status=status.HTTP_400_BAD_REQUEST)
        except models.Bank.DoesNotExist:
            bank = models.
            return super().create(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


class ATMViewset(viewsets.ModelViewSet):
    permisiion_classes = []
    serializer_class = serializers.ATMSerializer
    queryset = models.ATM.objects.all()
    search_fields = ('branch__branch_name', 'bank__bank_name',
                     'atm_address', 'atm_city_name')
    ordering_fields = ('bank__bank_name',)

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


class AnnonViewset(ATMViewset):
    serializer_class = serializers.AnnonATMSerializer
