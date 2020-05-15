from rest_framework import generics, mixins

from . import serializers
from .. import models


class BankAPIView(mixins.CreateModelMixin, generics.ListAPIView):
    permisiion_classes = []
    serializer_class = serializers.BankSerializer
    queryset = models.Bank.objects.all()

    def post(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def get_parser_context(self, http_request):
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
