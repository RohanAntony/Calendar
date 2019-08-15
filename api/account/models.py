from django.db import models
from django.contrib.auth.models import AbstractUser

from account.managers import CustomAccountManager


class CustomAccount(AbstractUser):
    """ Define a custom user which is used to login and store user credentials """

    username = None
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255, blank=False, null=False)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name']

    def __str__(self):
        return self.email
