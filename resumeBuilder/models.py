from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator


# Model for storing the profile picture of user along with their user credentials
class UserProfile(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile = models.FileField(upload_to="Profile", validators=[FileExtensionValidator(["png", "jpg", "jpeg"])],
                               blank=True)

    def __str__(self):
        return self.user.username
