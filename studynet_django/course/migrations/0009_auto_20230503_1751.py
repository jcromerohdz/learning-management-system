# Generated by Django 3.2.18 on 2023-05-04 00:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0008_auto_20230501_1827'),
    ]

    operations = [
        migrations.AddField(
            model_name='lesson',
            name='youtube_id',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='lesson',
            name='lesson_type',
            field=models.CharField(choices=[('article', 'Article'), ('quiz', 'Quiz'), ('video', 'Video')], default='article', max_length=20),
        ),
    ]
