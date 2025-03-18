from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

class UserModelAdmin(BaseUserAdmin):
    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserModelAdmin
    # that reference specific fields on auth.User.
    list_display = ["id", "email", "name", "phone_number", "roll_number", "hostel_number", "is_verified", "is_admin"]
    list_filter = ["is_admin"]
    fieldsets = [
        ("User Credentials", {"fields": ["email", "password"]}),
        ("Personal info", {"fields": ["name", "phone_number", "roll_number", "hostel_number"]}),
        ("Permissions", {"fields": ["is_admin", "is_verified"]}),
    ]
    # add_fieldsets is not a standard ModelAdmin attribute. UserModelAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email", "name", "phone_number", "roll_number", "hostel_number", "password1", "password2", "is_verified"],
            },
        ),
    ]
    search_fields = ["email"]
    ordering = ["email", "id", "roll_number"]
    filter_horizontal = []

# Now register the new UserModelAdmin...
admin.site.register(User, UserModelAdmin)