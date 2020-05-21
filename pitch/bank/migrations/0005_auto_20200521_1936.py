# Generated by Django 3.0.6 on 2020-05-21 13:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bank', '0004_auto_20200521_1757'),
    ]

    operations = [
        migrations.RenameField(
            model_name='anonatm',
            old_name='atm_address',
            new_name='address',
        ),
        migrations.RenameField(
            model_name='anonatm',
            old_name='atm_building_number',
            new_name='building_number',
        ),
        migrations.RenameField(
            model_name='anonatm',
            old_name='atm_city_name',
            new_name='city_name',
        ),
        migrations.RenameField(
            model_name='anonatm',
            old_name='atm_district_name',
            new_name='district_name',
        ),
        migrations.RenameField(
            model_name='anonatm',
            old_name='atm_help_text',
            new_name='help_text',
        ),
        migrations.RenameField(
            model_name='anonatm',
            old_name='atm_postal_code',
            new_name='postal_code',
        ),
        migrations.RenameField(
            model_name='anonatm',
            old_name='atm_status',
            new_name='status',
        ),
        migrations.RenameField(
            model_name='anonatm',
            old_name='atm_street_name',
            new_name='street_name',
        ),
        migrations.RenameField(
            model_name='atm',
            old_name='atm_name',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='atm',
            old_name='atm_status',
            new_name='status',
        ),
        migrations.RenameField(
            model_name='bank',
            old_name='bank_building_number',
            new_name='building_number',
        ),
        migrations.RenameField(
            model_name='bank',
            old_name='bank_central_hq_address',
            new_name='central_hq_address',
        ),
        migrations.RenameField(
            model_name='bank',
            old_name='bank_city_name',
            new_name='city_name',
        ),
        migrations.RenameField(
            model_name='bank',
            old_name='bank_contact_number',
            new_name='contact_number',
        ),
        migrations.RenameField(
            model_name='bank',
            old_name='bank_description',
            new_name='description',
        ),
        migrations.RenameField(
            model_name='bank',
            old_name='bank_district_name',
            new_name='district_name',
        ),
        migrations.RenameField(
            model_name='bank',
            old_name='bank_founded',
            new_name='founded',
        ),
        migrations.RenameField(
            model_name='bank',
            old_name='bank_help_text',
            new_name='help_text',
        ),
        migrations.RenameField(
            model_name='bank',
            old_name='bank_name',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='bank',
            old_name='bank_postal_code',
            new_name='postal_code',
        ),
        migrations.RenameField(
            model_name='bank',
            old_name='bank_street_name',
            new_name='street_name',
        ),
        migrations.RenameField(
            model_name='bank',
            old_name='bank_website_url',
            new_name='website_url',
        ),
        migrations.RenameField(
            model_name='branch',
            old_name='branch_building_number',
            new_name='building_number',
        ),
        migrations.RenameField(
            model_name='branch',
            old_name='branch_city_name',
            new_name='city_name',
        ),
        migrations.RenameField(
            model_name='branch',
            old_name='branch_contact_number',
            new_name='contact_number',
        ),
        migrations.RenameField(
            model_name='branch',
            old_name='branch_description',
            new_name='description',
        ),
        migrations.RenameField(
            model_name='branch',
            old_name='branch_district_name',
            new_name='district_name',
        ),
        migrations.RenameField(
            model_name='branch',
            old_name='branch_help_text',
            new_name='help_text',
        ),
        migrations.RenameField(
            model_name='branch',
            old_name='branch_lat',
            new_name='lat',
        ),
        migrations.RenameField(
            model_name='branch',
            old_name='branch_lon',
            new_name='lon',
        ),
        migrations.RenameField(
            model_name='branch',
            old_name='branch_mAddress',
            new_name='mAddress',
        ),
        migrations.RenameField(
            model_name='branch',
            old_name='branch_municipality',
            new_name='municipality',
        ),
        migrations.RenameField(
            model_name='branch',
            old_name='branch_name',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='branch',
            old_name='branch_neighbourhood',
            new_name='neighbourhood',
        ),
        migrations.RenameField(
            model_name='branch',
            old_name='branch_place_id',
            new_name='place_id',
        ),
        migrations.RenameField(
            model_name='branch',
            old_name='branch_postal_code',
            new_name='postal_code',
        ),
        migrations.RenameField(
            model_name='branch',
            old_name='branch_province',
            new_name='province',
        ),
        migrations.RenameField(
            model_name='branch',
            old_name='branch_street_name',
            new_name='street_name',
        ),
    ]