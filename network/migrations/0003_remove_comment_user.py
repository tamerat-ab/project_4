# Generated by Django 4.2.4 on 2023-09-16 16:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0002_comment_current_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='user',
        ),
    ]
