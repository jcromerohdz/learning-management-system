# Generated by Django 3.2.18 on 2023-04-17 17:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0003_lessons'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Lessons',
            new_name='Lesson',
        ),
    ]
