##
# Importing the required module from the Pillow library
from PIL import Image


# Function to crop and resize the image object
def resizeImage(obj, tosize: int):

    # Assigning the latest resampling filter if available, else assigning the old filter
    FILTER = Image.Resampling.LANCZOS if (
        Image.Resampling.LANCZOS) else Image.LANCZOS

    # Getting the image dimensions
    profilePic = Image.open(obj).convert("RGBA")
    img_width, img_height = profilePic.size
    minsize = min(profilePic.size)

    # Cropping the user uploaded image to a perfect square
    profilePic = profilePic.crop(((img_width - minsize) // 2,
                                  (img_height - minsize) // 2,
                                  (img_width + minsize) // 2,
                                  (img_height + minsize) // 2))

    return profilePic.resize((tosize, tosize), FILTER)
