# Generated by Django 4.0.2 on 2022-03-19 19:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dinoquiz', '0015_teacher_remove_student_name_student_email_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='email',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='student',
            name='first_name',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='student',
            name='last_name',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='student',
            name='password',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='student',
            name='password2',
            field=models.CharField(max_length=200),
        ),
    ]