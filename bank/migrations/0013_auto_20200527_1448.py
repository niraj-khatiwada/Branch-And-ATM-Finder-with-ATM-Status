# Generated by Django 3.0.6 on 2020-05-27 09:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bank', '0012_auto_20200525_1355'),
    ]

    operations = [
        migrations.AlterField(
            model_name='anonatm',
            name='address',
            field=models.CharField(help_text='Read Only field', max_length=255),
        ),
        migrations.AlterField(
            model_name='anonatm',
            name='building_number',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='anonatm',
            name='district_name',
            field=models.CharField(blank=True, default='', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='anonatm',
            name='lat',
            field=models.CharField(blank=True, default='', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='anonatm',
            name='lon',
            field=models.CharField(blank=True, default='', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='anonatm',
            name='street_name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
