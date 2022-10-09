from django.urls import path
from resumeBuilder import views


urlpatterns = [
    path("", views.home, name="home"),
    path("about", views.about, name="about"),
    path("resume-builder", views.build, name="build"),
    path("resume-builder/getting-started",
         views.builderStart, name="getting-started"),
    path("resume-builder/personal-details",
         views.personalDetails, name="personal-details"),
    path("resume-builder/years-of-experience",
         views.experience, name="years-of-experience"),
    path("resume-builder/higher-education",
         views.education, name="higher-education"),
    path("resume-builder/certifications",
         views.certifications, name="certifications"),
    path("resume-builder/additional-skills",
         views.skills, name="additional-skills"),
    path("resume-builder/career-objective",
         views.objective, name="career-objective"),
    path("resume-builder/templates", views.templates, name="templates"),
    path("resume-builder/download-template-pdf",
         views.downloadTemplate, name="download-template-pdf"),
    path("contact", views.contact, name="contact"),
    path("signup", views.signup, name="signup"),
    path("login", views.login, name="login"),
    path("logout", views.logout, name="logout")
]
