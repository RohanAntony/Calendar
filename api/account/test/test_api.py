from django.test import TestCase
from django.urls import reverse

from account.models import CustomAccount

from rest_framework.test import APIClient
from rest_framework import status


CREATE_USER_URL = reverse('account:register')
TOKEN_URL = reverse('account:token')

USER_EMAIL = 'rantony@gmail.com'
USER_GOOD_PWD = 'testpass123@gmail'
USER_BAD_PWD = 'pw'
USER_FIRST_NAME = 'Rohan'

def create_user(**param):
    return CustomAccount.objects.create_user(**param)


class PublicUserApiTests(TestCase):
    """Test the users API """

    def setUp(self):
        self.client = APIClient()

    def test_create_valid_user_success(self):
        """Test creating user with valid payload is successful"""
        payload = {
            'email': USER_EMAIL,
            'password': USER_GOOD_PWD,
            'first_name': USER_FIRST_NAME
        }

        res = self.client.post(CREATE_USER_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

        user = CustomAccount.objects.get(**res.data)
        self.assertTrue(user.check_password(payload['password']))
        self.assertNotIn('password', res.data)

    def test_user_exists(self):
        """Test creating user that already exists"""
        payload = {
            'email': USER_EMAIL,
            'password': USER_GOOD_PWD,
            'first_name': USER_FIRST_NAME
        }
        create_user(**payload)
        
        res = self.client.post(CREATE_USER_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

        user_exists = CustomAccount.objects.filter(
            email=payload['email']
        ).exists()
        self.assertTrue(user_exists)

    def test_password_too_short(self):
        """Test to check if password too short"""
        payload = {
            'email': USER_EMAIL,
            'password': USER_BAD_PWD
        }
        res = self.client.post(CREATE_USER_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        user_exists = CustomAccount.objects.filter(
            email=payload['email']
        ).exists()
        self.assertFalse(user_exists)

    def test_create_token_for_user(self):
        """Test that a token is created for user"""
        payload = {
            'email': USER_EMAIL,
            'password': USER_GOOD_PWD,
        }
        create_user(first_name=USER_FIRST_NAME, **payload)
        res = self.client.post(TOKEN_URL, payload)
        self.assertIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_create_invalid_token_credentials(self):
        """Test that token is not created if invalid credentials are given"""
        create_user(first_name=USER_FIRST_NAME, email=USER_EMAIL, password=USER_GOOD_PWD)
        payload = {
            'email': USER_EMAIL,
            'password': USER_BAD_PWD,
        }
        res = self.client.post(TOKEN_URL, payload)
        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_token_no_user(self):
        """Test that token is not created if user doesn't exist"""
        payload = {
            'email': USER_EMAIL,
            'password': USER_GOOD_PWD
        }
        res = self.client.post(TOKEN_URL, payload)
        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_missing_password_field(self):
        """Test that missing password is not allowed"""
        res = self.client.post(TOKEN_URL, {
            'email': USER_EMAIL,
            'password': ''
        })
        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
