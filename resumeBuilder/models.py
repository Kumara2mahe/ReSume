from django.db import models


# Class for storing the user data as temporary
class userDetail(models.Model):

    # Personal Details
    firstname = models.CharField(max_length=30, blank=True)
    lastname = models.CharField(max_length=50, blank=True)
    currentemail = models.CharField(max_length=100)
    phonenumber = models.CharField(max_length=20, blank=True)
    currentaddress = models.CharField(max_length=10000, blank=True)
    currentcountry = models.CharField(max_length=30, blank=True)
    currentcity = models.CharField(max_length=50, blank=True)
    currentstate = models.CharField(max_length=50, blank=True)
    pincode = models.CharField(max_length=6, blank=True)

    # Work Experience
    job_title = models.CharField(max_length=100, null=True, blank=True)
    company_name = models.CharField(max_length=300, null=True, blank=True)
    country_name = models.CharField(max_length=50, null=True, blank=True)
    city_name = models.CharField(max_length=50, null=True, blank=True)
    start_month = models.CharField(max_length=20, null=True, blank=True)
    start_year = models.CharField(max_length=10, null=True, blank=True)
    end_month = models.CharField(max_length=20, null=True, blank=True)
    end_year = models.CharField(max_length=10, null=True, blank=True)

    # Higher Education - School
    school_name = models.CharField(max_length=300, null=True, blank=True)
    school_percentage = models.CharField(max_length=10, null=True, blank=True)
    school_passedyear = models.CharField(max_length=10, null=True, blank=True)
    school_country = models.CharField(max_length=50, null=True, blank=True)
    school_city = models.CharField(max_length=50, null=True, blank=True)

    # Higher Education - College
    college_name = models.CharField(max_length=300, null=True, blank=True)
    college_percentage = models.CharField(max_length=10, null=True, blank=True)
    college_passedyear = models.CharField(max_length=10, null=True, blank=True)
    college_degree = models.CharField(max_length=100, null=True, blank=True)
    college_branch = models.CharField(max_length=50, null=True, blank=True)
    college_country = models.CharField(max_length=50, null=True, blank=True)
    college_city = models.CharField(max_length=50, null=True, blank=True)

    # Certification
    certification_1 = models.CharField(max_length=300, null=True, blank=True)
    certification_2 = models.CharField(max_length=300, null=True, blank=True)
    certification_3 = models.CharField(max_length=300, null=True, blank=True)
    certification_4 = models.CharField(max_length=300, null=True, blank=True)
    certification_5 = models.CharField(max_length=300, null=True, blank=True)
    certification_6 = models.CharField(max_length=300, null=True, blank=True)

    # Additional Skills
    skill_1 = models.CharField(max_length=100, null=True, blank=True)
    skill_2 = models.CharField(max_length=100, null=True, blank=True)
    skill_3 = models.CharField(max_length=100, null=True, blank=True)
    skill_4 = models.CharField(max_length=100, null=True, blank=True)
    skill_5 = models.CharField(max_length=100, null=True, blank=True)
    skill_6 = models.CharField(max_length=100, null=True, blank=True)
    skill_7 = models.CharField(max_length=100, null=True, blank=True)
    skill_8 = models.CharField(max_length=100, null=True, blank=True)
    skill_9 = models.CharField(max_length=100, null=True, blank=True)
    skill_10 = models.CharField(max_length=100, null=True, blank=True)
    skill_11 = models.CharField(max_length=100, null=True, blank=True)
    skill_12 = models.CharField(max_length=100, null=True, blank=True)
    skill_13 = models.CharField(max_length=100, null=True, blank=True)
    skill_14 = models.CharField(max_length=100, null=True, blank=True)
    skill_15 = models.CharField(max_length=100, null=True, blank=True)
    skill_16 = models.CharField(max_length=100, null=True, blank=True)

    # Career Objective
    career_objective = models.CharField(
        max_length=10000, null=True, blank=True)
