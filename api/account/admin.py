from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext as _

from account import models


class CustomAccountAdmin(BaseUserAdmin):
    ordering = ['id']
    list_display = ['email', 'first_name']

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal Info'), {'fields': ('first_name', )}),
        (_('Permissions'), {
            'fields': (
                'is_active',
                'is_staff',
                'is_superuser'
            )
        })
    )

    # Use add_fieldsets to define what should be shown on the add page 
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'first_name')
        }),
    )


admin.site.register(models.CustomAccount, CustomAccountAdmin)
