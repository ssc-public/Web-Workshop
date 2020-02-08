# Merge User and Profile fields in Admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

from django.contrib import admin
from .models import Profile

class ProfileInline(admin.StackedInline):
    verbose_name_plural = 'Profile'
    can_delete = False
    model = Profile
    fk_name = 'user'

class CustomUserAdmin(UserAdmin):
    inlines = (ProfileInline, )

    list_display = ('username', 'email', 'get_activated', 'get_phone_no', 'get_credit')


    def get_activated(self, instance):
        return instance.profile.is_activated
    
    def get_phone_no(self, instance):
        return instance.profile.phone_no
    
    def get_credit(self, instance):
        return instance.profile.credit

    get_activated.short_description = "Activated"
    get_activated.boolean = True
    get_phone_no.short_description = "Phone No."
    get_credit.short_description = "Credit"


admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)


