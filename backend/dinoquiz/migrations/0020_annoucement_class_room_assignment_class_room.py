# Generated by Django 4.0.2 on 2022-03-23 16:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dinoquiz', '0019_remove_activity_activity_status_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='annoucement',
            name='class_room',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='dinoquiz.classroom'),
        ),
        migrations.AddField(
            model_name='assignment',
            name='class_room',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='dinoquiz.classroom'),
        ),
    ]
