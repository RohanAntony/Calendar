from django.urls import path
from .views import HolidayListForYearAndMonth

urlpatterns = [
    path('holidays/<int:year>/<int:month>/', HolidayListForYearAndMonth)
]
