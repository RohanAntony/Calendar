from django.db import models

class Holiday(models.Model):
    """Store the list of holidays for a year"""
    NATIONAL = 'NT'
    OBSERVANCE = 'OB'
    SEASON = 'SE'
    OTHER = 'OT'
    HOLIDAY_TYPES = [
        (NATIONAL, 'National'),
        (OBSERVANCE, 'Observance'),
        (SEASON, 'Season'),
        (OTHER, 'Other')
    ]
    year = models.IntegerField()
    month = models.IntegerField()
    date = models.IntegerField()
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=200)
    htype = models.CharField(
        max_length=2,
        choices=HOLIDAY_TYPES,
        default=OTHER
    )

    def __str__(self):
        return self.name