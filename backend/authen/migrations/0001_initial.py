# Generated by Django 4.0.2 on 2022-03-17 19:49

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Member',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role_name', models.CharField(choices=[('นักเรียน', 'นักเรียน'), ('คุณครู', 'คุณครู')], default='นักเรียน', max_length=100)),
                ('member_name', models.CharField(max_length=200)),
            ],
        ),
    ]
