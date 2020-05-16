from rest_framework import generics, mixins

from . import serializers
from .. import models


class BankAPIView(mixins.CreateModelMixin, generics.ListAPIView):
    permisiion_classes = []
    serializer_class = serializers.BankSerializer
    queryset = models.Bank.objects.all()
    search_fields = ('bank_name', 'bank_central_hq_address', 'bank_city_name',)
    ordering_fields = ('bank_name',)

    def post(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def get_serializer_context(self):
        return {'request': self.request}


class BankAPIDetailView(mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.RetrieveAPIView):
    permisiion_classes = []
    serializer_class = serializers.BankSerializer
    queryset = models.Bank.objects.all()
    lookup_field = 'pk'

    def put(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


class BranchAPIView(mixins.CreateModelMixin, generics.ListAPIView):
    permisiion_classes = []
    serializer_class = serializers.BranchSerializer
    queryset = models.Branch.objects.all()
    search_fields = ('branch_name', 'branch_address', 'branch_city_name',)
    ordering_fields = ('branch_name',)

    def post(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def get_serializer_context(self):
        return {'request': self.request}


class BranchAPIDetail(mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.RetrieveAPIView):
    permisiion_classes = []
    serializer_class = serializers.BranchSerializer
    queryset = models.Branch.objects.all()
    lookup_field = 'pk'

    def put(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


class AtmAPIView(mixins.CreateModelMixin, generics.ListAPIView):
    permisiion_classes = []
    serializer_class = serializers.ATMSerializer
    queryset = models.ATM.objects.all()
    search_fields = ('branch__branch_name', 'bank__bank_name',
                     'atm_address', 'atm_city_name')
    ordering_fields = ('bank__bank_name',)

    def post(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def get_serializer_context(self):
        return {'request': self.request}


class AtmAPIDetailView(mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.RetrieveAPIView):
    permisiion_classes = []
    serializer_class = serializers.ATMSerializer
    queryset = models.ATM.objects.all()
    lookup_field = 'pk'

    def put(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


class AnnonAtmAPIView(AtmAPIView):
    serializer_class = serializers.AnnonATMSerializer


class AnnonAtmAPIDetailView(AtmAPIDetailView):
    serializer_class = serializers.AnnonATMSerializer
