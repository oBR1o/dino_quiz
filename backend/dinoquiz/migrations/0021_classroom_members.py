# Generated by Django 4.0.2 on 2022-03-23 21:50

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('dinoquiz', '0020_annoucement_class_room_assignment_class_room'),
    ]

    operations = [
        migrations.AddField(
            model_name='classroom',
            name='members',
            field=models.ManyToManyField(null=True, to=settings.AUTH_USER_MODEL),
        ),
    ]