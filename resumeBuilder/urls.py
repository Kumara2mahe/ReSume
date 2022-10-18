from django.urls import path
from resumeBuilder import views


urlpatterns = [
    path("", views.home, name="home"),
    path("about", views.about, name="about"),
    path("contact", views.contact, name="contact"),
    path("builder", views.builder, name="builder"),
    path("builder/personal-details",
         views.personalDetails, name="personal-details"),
    path("builder/years-of-experience",
         views.yearsofexperience, name="years-of-experience"),
    path("builder/higher-education",
         views.higherEducation, name="higher-education"),
    path("builder/certifications", views.certifications, name="certifications"),
    path("builder/additional-skills",
         views.additionalSkills, name="additional-skills"),
    path("builder/career-objective",
         views.careerObjective, name="career-objective"),
    path("builder/choose-templates",
         views.chooseTemplates, name="choose-templates"),
    path("create-account", views.createUser, name="create-account"),
    path("authenticate-user", views.authenticateUser, name="authenticate-user"),
    path("logout-user", views.logoutUser, name="logout-user"),
]
