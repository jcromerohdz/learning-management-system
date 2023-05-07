# Generated by Django 3.2.18 on 2023-05-07 03:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('course', '0009_auto_20230503_1751'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='created_by',
            field=models.ForeignKey(default=6, on_delete=django.db.models.deletion.CASCADE, related_name='courses', to='auth.user'),
            preserve_default=False,
        ),
    ]
