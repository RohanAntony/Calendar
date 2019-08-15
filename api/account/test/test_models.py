from django.test import TestCase

from account.models import CustomAccount


class PublicTestAccountAPI(TestCase):
    """ Test public api's in Accounts """

    def test_user_new_account_created(self):
        """ Test to check if user is created """
        email = 'rantony@rantony.com'
        password = 'testpass123'
        first_name = 'Rohan'
        user = CustomAccount.objects.create_user(
            email=email,
            password=password,
            first_name=first_name
        )

        self.assertTrue(user.id)
        self.assertEqual(user.first_name, first_name)
        self.assertEqual(user.email, email) 

    def test_user_without_email_created(self):
        """ Test that user creation fails without email """
        email = ''
        password = 'testpass123'
        first_name = 'Rohan'
        with self.assertRaises(ValueError):
            CustomAccount.objects.create_user(
                email=email,
                password=password,
                first_name=first_name
            )
    
    def test_user_without_firstname_created(self):
        """ Test that user creation fails without firstname """
        email = 'rantony@rantony.com'
        password = 'testpass123'
        first_name = ''
        with self.assertRaises(ValueError):
            CustomAccount.objects.create_user(
                email=email,
                password=password,
                first_name=first_name
            )

    def test_user_with_case_insensitive_email_created(self):
        """ Test that email field is considered to be case insensitive """
        email = 'RANTONY@RANTONY.cOM'
        password = 'testpass123'
        first_name = 'Rohan'
        user = CustomAccount.objects.create_user(
            email=email,
            password=password,
            first_name=first_name
        )

        self.assertEqual(user.email, email.lower())
