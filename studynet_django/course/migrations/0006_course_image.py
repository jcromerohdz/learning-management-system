# Generated by Django 3.2.18 on 2023-04-25 18:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0005_comment'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='uploads'),
        ),
    ]