from rest_framework import serializers
from .models import Holiday, HOLIDAY_TYPES, OTHER


class HolidaySerializer(serializers.ModelSerializer):

    class Meta:
        model = Holiday
        fields = ['year', 'month', 'date', 'name', 'description', 'htype']
