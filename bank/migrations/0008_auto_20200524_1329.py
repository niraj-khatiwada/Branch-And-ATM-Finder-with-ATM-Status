# Generated by Django 3.0.6 on 2020-05-24 07:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bank', '0007_auto_20200521_2337'),
    ]

    operations = [
        migrations.AddField(
            model_name='anonatm',
            name='extratags',
            field=models.TextField(blank=True, default='', null=True),
        ),
        migrations.AddField(
            model_name='anonatm',
            name='lat',
            field=models.CharField(blank=True, default='', max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='anonatm',
            name='lon',
            field=models.CharField(blank=True, default='', max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='anonatm',
            name='neighbourhood',
            field=models.CharField(blank=True, default='', max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='anonatm',
            name='place_id',
            field=models.CharField(blank=True, default='', max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='anonatm',
            name='province',
            field=models.CharField(blank=True, default='', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='anonatm',
            name='district_name',
            field=models.CharField(blank=True, default='', max_length=100, null=True),
        ),
    ]
