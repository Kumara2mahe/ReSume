from django.contrib import admin
from resumeBuilder.models import UserProfile
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User


# Creating a custom model for stacking the User-Profile model inside the create admin model
class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = "UserProfiles"


# Creating a custom model to stack with the User model
class CustomUserAdmin(UserAdmin):
    inlines = (UserProfileInline, )


# Unregistering the default User model from the admin section
admin.site.unregister(User)

# Registering the Custom models to display on the admin Interface
admin.site.register(UserProfile)
admin.site.register(User, CustomUserAdmin)
