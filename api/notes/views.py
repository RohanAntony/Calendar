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

def _fetchDataForYear(year, user_agent):
    """Fetch holiday list for a given year"""
    url = _getUrlForYear(API_KEY, year)
    req = Request(url, headers={'User-Agent': user_agent})
    response = urlopen(req)
    data = json.loads(response.read())
    return data

def _saveDataForYearInDB(data):
    """Save data for a year in DB"""
    pass

def HolidayListForYearAndMonth(request, year, month):
    """List all holidays for a given year and month as per the request"""
    print('HolidayListForYearAndMonth executed')
    print(request.META['HTTP_USER_AGENT'])
    return JsonResponse(_fetchDataForYear(year, request.META['HTTP_USER_AGENT']))
    