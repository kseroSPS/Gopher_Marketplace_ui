# Generated by Django 5.0.3 on 2024-11-01 20:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="product",
            name="user_email",
        ),
        migrations.AlterField(
            model_name="product",
            name="category",
            field=models.CharField(
                choices=[
                    ("SCHOOL_SUPPLIES", "School Supplies"),
                    ("SPORTS", "Sports"),
                    ("ELECTRONICS", "Electronics"),
                    ("FURNITURE", "Furniture"),
                    ("CLOTHING", "Clothing"),
                    ("BOOKS", "Books"),
                    ("OTHER", "Other"),
                ],
                default="OTHER",
                max_length=20,
            ),
        ),
    ]
