# Generated by Django 4.0.2 on 2022-03-16 14:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dinoquiz', '0012_alter_assignment_activity'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='assignment',
            name='activity',
        ),
        migrations.AddField(
            model_name='activity',
            name='activity',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='activitys', to='dinoquiz.assignment'),
        ),
    ]
