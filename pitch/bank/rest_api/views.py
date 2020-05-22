from rest_framework import generics, viewsets, response, status
from django.db.models import Q
import json

from . import serializers
from .. import models

import logging
logging.basicConfig(level=logging.DEBUG)


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
    search_fields = ('name', 'address', 'city_name',)
    ordering_fields = ('name',)

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        data = request.data
        bank_name = data.pop('bank')
        try:
            obj = models.Bank.objects.get(
                name__iexact=bank_name)
        except models.Bank.DoesNotExist:
            try:
                obj = models.Bank.objects.get(
                    Q(name__iexact=data.get('namedetails').get('name')) |
                    Q(name__iexact=data.get('namedetails').get('name:en')) |
                    Q(name__iexact=data.get('namedetails').get('name:ne')))
            except models.Bank.DoesNotExist:
                return response.Response({'detail': 'Bank doesn\'t exists'}, status=status.HTTP_400_BAD_REQUEST)
        place_id = data.get('place_id')
        try:
            branch_obj = models.Branch.objects.get(
                place_id__exact=place_id)
        except models.Branch.DoesNotExist:
            get_bank_id = obj.id
            new_branch = models.Branch(bank_id=get_bank_id, **data)
            new_branch.save()
            return response.Response({'detail': 'Branch does not exist. Creating branch...', 'id': new_branch.id, 'place_id': new_branch.place_id}, status=status.HTTP_201_CREATED)
        return response.Response({'detail': 'Branch already exists', 'id': branch_obj.id, 'place_id': branch_obj.place_id}, status=status.HTTP_409_CONFLICT)

    def retrieve(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        try:
            branch = models.Branch.objects.get(id=pk)
        except models.Branch.DoesNotExist:
            return response.Response({'detail': 'Branch does not exist'}, status=status.HTTP_404_NOT_FOUND)
        try:
            atms = models.ATM.objects.filter(branch=branch)
        except models.ATM.DoesNotExist:
            return response.Response({'detail': 'Not ATM found'}, status=status.HTTP_404_NOT_FOUND)
        serialized_atm_array = [
            serializers.ATMSerializer(item).data for item in atms]
        return response.Response({'parent': branch.bank.name, 'headquarter': branch.bank.central_hq_address, 'contact_number': branch.bank.contact_number, 'website': branch.bank.website_url, 'atm': serialized_atm_array})

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


class ATMViewset(viewsets.ModelViewSet):
    permisiion_classes = []
    serializer_class = serializers.ATMSerializer
    queryset = models.ATM.objects.all()
    search_fields = ('name', 'branch')
    ordering_fields = ('branch')

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
