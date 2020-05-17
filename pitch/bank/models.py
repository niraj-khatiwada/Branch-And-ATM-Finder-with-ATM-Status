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
    bank_name = models.CharField(max_length=255)
    bank_description = models.TextField()
    bank_founded = models.DateField(
        blank=True, null=True, default=None, help_text='YYYY-MM-DD')
    bank_type = models.CharField(max_length=100, choices=bank_type_choices)
    bank_class = models.CharField(choices=bank_class_choices, max_length=10)

    # Address
    bank_central_hq_address = models.CharField(
        max_length=255, blank=True, null=True, help_text='Read Only field')  # Automatic
    bank_district_name = models.CharField(max_length=100)
    bank_city_name = models.CharField(max_length=100, blank=True, null=True)
    bank_postal_code = models.IntegerField(blank=True, null=True)
    bank_street_name = models.CharField(max_length=100, blank=True, null=True)
    bank_building_number = models.CharField(
        max_length=100, blank=True, null=True)
    bank_help_text = models.TextField(blank=True, null=True)

    bank_contact_number = ArrayField(models.CharField(
        max_length=10, unique=True))
    bank_website_url = models.URLField(blank=True, null=True, default=None)
    tags = ArrayField(models.CharField(
        max_length=50, blank=True, null=True), blank=True)

    def __str__(self):
        return self.bank_name

    class Meta:
        verbose_name = 'Bank'
        verbose_name_plural = 'Banks'
        db_table = 'bank'

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        self.bank_central_hq_address = f'{self.bank_street_name or ""}, {self.bank_city_name or ""}, {self.bank_district_name}'.lstrip(
            ', ')
        return super().save(force_insert=force_insert, force_update=force_update, using=using, update_fields=update_fields)


class Branch(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    bank = models.ForeignKey(Bank, on_delete=models.CASCADE)
    branch_name = models.CharField(max_length=255)
    branch_description = models.TextField(null=True, blank=True)

    # Address
    branch_address = models.CharField(
        max_length=255, help_text='Read Only field')  # Automatic
    branch_district_name = models.CharField(
        max_length=100)
    branch_city_name = models.CharField(max_length=100, blank=True, null=True)
    branch_postal_code = models.IntegerField(blank=True, null=True)
    branch_street_name = models.CharField(
        max_length=100, blank=True, null=True)
    branch_building_number = models.CharField(
        max_length=100, blank=True, null=True)
    branch_help_text = models.TextField(blank=True, null=True)
    # ATM

    branch_contact_number = ArrayField(
        models.CharField(max_length=10))
    tags = ArrayField(models.CharField(
        max_length=50, blank=True, null=True), blank=True)

    def __str__(self):
        return self.branch_name

    class Meta:
        verbose_name = 'Branch'
        verbose_name_plural = 'Branches'
        db_table = 'branch'

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        self.branch_address = f'{self.branch_street_name or ""} {self.branch_city_name or ""} {self.branch_district_name}'.lstrip(
            ', ')
        return super().save(force_insert=force_insert, force_update=force_update, using=using, update_fields=update_fields)


class ATM(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    atm_name = models.CharField(max_length=100)
    atm_status = models.BooleanField(default=True)
    # ATM DIRECTION HELP TEXT
    atm_help_text = models.TextField(blank=True, null=True)
    tags = ArrayField(models.CharField(
        max_length=50, blank=True, null=True), blank=True)

    def __str__(self):
        return f'{self.branch}, {self.branch__bank_name}, {self.branch__branch_address}'

    class Meta:
        verbose_name = 'ATM'
        verbose_name_plural = "ATM's"
        db_table = 'atm'


class AnonATM(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    bank = models.ForeignKey(Bank, on_delete=models.CASCADE)
    # Address
    atm_address = models.CharField(max_length=100, help_text='Read Only field')
    atm_district_name = models.CharField(max_length=100)
    atm_city_name = models.CharField(max_length=100, blank=True, null=True)
    atm_postal_code = models.IntegerField(blank=True, null=True)
    atm_street_name = models.CharField(max_length=100, blank=True, null=True)
    atm_building_number = models.CharField(
        max_length=100, blank=True, null=True)
    # ATM DIRECTION HELP TEXT
    atm_help_text = models.TextField(blank=True, null=True)
    atm_status = models.BooleanField(default=True)

    tags = ArrayField(models.CharField(
        max_length=50, blank=True, null=True), blank=True)

    def __str__(self):
        return f'{self.bank__bank_name}, {self.atm_address}'

    class Meta:
        verbose_name = 'Annon ATM'
        verbose_name_plural = "Annon ATM's"
        db_table = 'annon_atm'
