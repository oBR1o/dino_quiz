# Generated by Django 4.0.2 on 2022-03-24 00:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dinoquiz', '0022_annoucement_owner'),
    ]

    operations = [
        migrations.RenameField(
            model_name='annoucement',
            old_name='owner',
            new_name='ownerfirstname',
        ),
        migrations.AddField(
            model_name='annoucement',
            name='ownerlastname',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
