from django.db import models
import uuid
from django.contrib.postgres.fields import ArrayField
from smart_selects.db_fields import ChainedManyToManyField
from django.db.models import F


bank_type_choices = (('Public', 'Public'), ('Private', 'Private'))
bank_class_choices = (('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'))


class Bank(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField()
    founded = models.DateField(
        blank=True, null=True, default=None, help_text='YYYY-MM-DD')
    bank_type = models.CharField(max_length=100, choices=bank_type_choices)
    bank_class = models.CharField(choices=bank_class_choices, max_length=10)

    # Address
    central_hq_address = models.CharField(
        max_length=255, blank=True, null=True, help_text='Read Only field')  # Automatic
    district_name = models.CharField(max_length=100)
    city_name = models.CharField(max_length=100, blank=True, null=True)
    postal_code = models.IntegerField(blank=True, null=True)
    street_name = models.CharField(max_length=100, blank=True, null=True)
    building_number = models.CharField(
        max_length=100, blank=True, null=True)
    help_text = models.TextField(blank=True, null=True)

    contact_number = ArrayField(models.CharField(
        max_length=10, unique=True))
    website_url = models.URLField(blank=True, null=True, default=None)
    tags = ArrayField(models.CharField(
        max_length=50, blank=True, null=True), blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Bank'
        verbose_name_plural = 'Banks'
        db_table = 'bank'

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        self.central_hq_address = f'{self.street_name or ""}, {self.city_name or ""}, {self.district_name}'.lstrip(
            ', ')
        return super().save(force_insert=force_insert, force_update=force_update, using=using, update_fields=update_fields)


class Branch(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    bank = models.ForeignKey(Bank, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)  # display name
    description = models.TextField(null=True, blank=True)
    place_id = models.CharField(
        max_length=255, blank=True, null=True, default='')  # place_id in map
    # Address
    lat = models.CharField(
        max_length=100, blank=True, null=True, default='')  # latitude
    lon = models.CharField(
        max_length=100, blank=True, null=True, default='')  # longitude
    district_name = models.CharField(
        max_length=255, blank=True, null=True, default='')  # county
    city_name = models.CharField(
        max_length=255, blank=True, null=True, default='')  # city name
    postal_code = models.CharField(max_length=255,
                                   blank=True, null=True)
    street_name = models.CharField(
        max_length=255, blank=True, null=True, default='')  # road
    building_number = models.CharField(
        max_length=255, blank=True, null=True, default='')
    neighbourhood = models.CharField(
        max_length=255, blank=True, null=True, default='')
    province = models.CharField(
        max_length=255, blank=True, null=True, default='')  # region
    municipality = models.CharField(
        max_length=255, blank=True, null=True, default='')
    help_text = models.TextField(blank=True, null=True, default='')
    # ATM
    # Extra fields from search
    extra_tags = models.TextField(
        blank=True, null=True, default='')  # extra tags like opening hours website
    namedetails = models.CharField(
        max_length=255, blank=True, null=True, default='')  # other versions of same name

    contact_number = ArrayField(
        models.CharField(max_length=10, blank=True, null=True, default=''), blank=True, default=list)
    tags = ArrayField(models.CharField(
        max_length=50, blank=True, null=True, default=''), blank=True, default=list)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Branch'
        verbose_name_plural = 'Branches'
        db_table = 'branch'


class ATM(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    status = models.BooleanField(default=True)
    # ATM DIRECTION HELP TEXT
    atm_help_text = models.TextField(blank=True, null=True)
    tags = ArrayField(models.CharField(
        max_length=50, blank=True, null=True), blank=True)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'ATM'
        verbose_name_plural = "ATM's"
        db_table = 'atm'


class AnonATM(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    bank = models.ForeignKey(Bank, on_delete=models.CASCADE)
    place_id = models.CharField(
        max_length=255, default='', null=True, blank=True)
    # Address
    lat = models.CharField(max_length=100, blank=True, null=True, default='')
    lon = models.CharField(max_length=100, blank=True, null=True, default='')
    address = models.CharField(
        max_length=100, help_text='Read Only field')  # display_name
    district_name = models.CharField(
        max_length=100, blank=True, null=True, default='')  # county
    city_name = models.CharField(max_length=100, blank=True, null=True)
    postal_code = models.CharField(max_length=255, blank=True, null=True)
    street_name = models.CharField(
        max_length=100, blank=True, null=True)  # street
    building_number = models.CharField(
        max_length=100, blank=True, null=True)
    neighbourhood = models.CharField(
        max_length=255, null=True, blank=True, default='')
    province = models.CharField(
        max_length=255, null=True, blank=True, default='')
    # ATM DIRECTION HELP TEXT
    namedetails = models.CharField(
        max_length=255, blank=True, null=True, default='')
    help_text = models.TextField(blank=True, null=True, default='')
    status = models.BooleanField(default=True)
    extra_tags = models.TextField(blank=True, null=True, default='')
    tags = ArrayField(models.CharField(
        max_length=50, blank=True, null=True), blank=True, default=list)

    def __str__(self):
        return f'{self.bank}, {self.address}'

    class Meta:
        verbose_name = 'Annon ATM'
        verbose_name_plural = "Annon ATM's"
        db_table = 'annon_atm'
