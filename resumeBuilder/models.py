from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator

# Modules to work with image files
from io import BytesIO
from django.core.files.base import ContentFile
from ReSume.settings.base import MEDIA_ROOT
from pModules.media import resizeImage

# Importing the required modules from cloudinary
import cloudinary.uploader as cloud_upload


# Model for storing the profile picture of user along with their user credentials
class UserProfile(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile = models.FileField(upload_to="Profile", validators=[FileExtensionValidator(["png", "jpg", "jpeg"])],
                               blank=True)

    def __str__(self):
        return self.user.username

    def uploadprofile(self, image):
        """ 
        Function to resize and update the user profile with uploaded image.

        """

        # Resizing the user uploaded image to a perfect square
        profilePic = resizeImage(image, 200)

        # Updating the user profile
        buffer = BytesIO()
        profilePic.save(buffer, format="png")
        self.profile.save(image.name,
                          ContentFile(buffer.getvalue()))

        return self.profile.url

    def trashprofile(self, debug):
        """ 
        Function to delete the user uploaded image stored in (local/production)server according to the value of DEBUG.

        """

        if not debug:

            # Delete image file in the cloudinary storage
            cloud_upload.destroy(self.profile.name)

        else:
            # Removing the old image file in the local server
            (MEDIA_ROOT / self.profile.name).unlink(True)
