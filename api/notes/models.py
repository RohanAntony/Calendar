from django.db import models
from datetime import date

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


class Holiday(models.Model):
    """Store the list of holidays for a year"""
    year = models.IntegerField(default=date.today().year)
    month = models.IntegerField(default=date.today().month)
    date = models.IntegerField(default=date.today().day)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    htype = models.CharField(
        max_length=2,
        choices=HOLIDAY_TYPES,
        default=OTHER
    )

    def __str__(self):
        return self.name

    def set_holiday_type(self, holiday_type):
        self.htype = OTHER
        if 'national' in holiday_type.lower():
            self.htype = NATIONAL
        elif 'observance' in holiday_type.lower():
            self.htype = OBSERVANCE
        elif 'season' in holiday_type.lower():
            self.htype = SEASON
        print(self.htype, holiday_type)