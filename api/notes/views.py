from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from urllib.request import urlopen, Request
import json

from .models import Holiday
from .serializers import HolidaySerializer
from api.settings import API_KEY

def _getUrlForYear(api_key, year):
    """ returns the url for the given api key and year"""
    API_URL = 'https://calendarific.com/api/v2/holidays?api_key='
    MONTH_FIELD = '&country=IN&year='
    return API_URL + api_key + MONTH_FIELD + str(year)

def _fetchDataForYearFromDB(year):
    """Fetch holiday list from DB for a given year"""
    holidays = Holiday.objects.filter(year=year)
    rHolidays = []
    for hol in holidays:
        rHolidays.append(HolidaySerializer(hol).data)
    return rHolidays

def _fetchDataForYearFromURL(year, user_agent):
    """Fetch holiday list for a given year"""
    url = _getUrlForYear(API_KEY, year)
    req = Request(url, headers={'User-Agent': user_agent})
    response = urlopen(req)
    data = json.loads(response.read())
    return data['response']['holidays']

def _saveDataForYearInDB(data):
    """Save data for a year in DB"""
    for hol in data:
        obj = Holiday(
            year=hol["date"]["datetime"]["year"],
            month=hol["date"]["datetime"]["month"],
            date=hol["date"]["datetime"]["day"],
            name=hol["name"],
            description=(hol["description"] if hol["description"] else "")
        )
        obj.set_holiday_type(hol["type"][0])
        obj.save()
    return True

def HolidayListForYearAndMonth(request, year, month):
    """List all holidays for a given year and month as per the request"""
    print("Outside")
    data = _fetchDataForYearFromDB(year)
    if not data:
        print("Inside")
        _saveDataForYearInDB(_fetchDataForYearFromURL(year, request.META['HTTP_USER_AGENT']))
        data = _fetchDataForYearFromDB(year)
    return JsonResponse({
        "holidays": data
    })
