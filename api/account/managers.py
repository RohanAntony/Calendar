from django.contrib.auth.models import BaseUserManager


class CustomAccountManager(BaseUserManager):

    def create_user(self, email, first_name, password=None, **extra_fields):
        """Create and save a new user"""
        if not email:
            raise ValueError('Email not provided')
        if not first_name:
            raise ValueError('First name not provided')
        user = self.model(
            email=self.normalize_email(email.lower()),
            first_name=first_name,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, password=None, **extra_fields):
        """Create and save a new superuser"""
        user = self.create_user(email, first_name, password, **extra_fields)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
        