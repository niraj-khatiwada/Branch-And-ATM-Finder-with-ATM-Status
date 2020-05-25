# Generated by Django 3.0.6 on 2020-05-21 12:11

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bank', '0002_auto_20200521_1751'),
    ]

    operations = [
        migrations.AlterField(
            model_name='branch',
            name='branch_contact_number',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, default='', max_length=10, null=True), blank=True, default=[], size=None),
        ),
        migrations.AlterField(
            model_name='branch',
            name='tags',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, default='', max_length=50, null=True), blank=True, default=[], size=None),
        ),
    ]