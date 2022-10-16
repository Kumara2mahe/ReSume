from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse, FileResponse
from django.contrib.auth.models import User
from django.contrib import auth
from django.utils.datastructures import MultiValueDictKeyError
from resumeBuilder.models import userDetail

# Importing some pre-built modules to work with ospaths and '.json' files
from json import load
import os

# Importing some third-party modules to work with .docx and .pdf files
from mailmerge import MailMerge
from pModules.convert2pdf import docxToPdf

# -----------------------------------------------------------------------------------------------------------------------------------------------------------------

previousURL = "/"
linkClick = "none"

# Loading json file for Countries List
COUNTRIES_FILE = load(open("Static/Assets/countries.json"))


# Month and Years for DropDown Boxes
MONTHS = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"]

years = []
for i in range(1950, 2023):
    years.append(i)
years.sort(reverse=True)


# Path to temporary files
TEMPLATES = "Static/temp"

# -----------------------------------------------------------------------------------------------------------------------------------------------------------------


def home(request):

    # Function for resetting form values
    resetFormValue()

    return render(request, "home.html")


def about(request):

    global previousURL
    previousURL = "/about"

    return render(request, "about.html")


def build(request):

    global previousURL
    previousURL = "/resume-builder"

    return redirect("/resume-builder/getting-started")


def builderStart(request):

    global linkClick
    if (linkClick != "none"):
        linkClick = "none"

    global previousURL
    previousURL = "/resume-builder/getting-started"

    # Function for resetting form values
    resetFormValue()

    return render(request, "builderStart.html")


def personalDetails(request):

    global linkClick
    if (linkClick == "none"):
        linkClick = "personal"

    global previousURL
    previousURL = "/resume-builder/personal-details"

    if request.method == "POST":

        global first_name, last_name, current_email, phone_number, current_address, current_country, current_city, current_state, pin_code
        first_name = request.POST["firstname"]
        last_name = request.POST["lastname"]
        current_email = request.POST["currentemail"]
        phone_number = request.POST["phonenumber"]
        current_address = request.POST["currentaddress"]
        current_country = request.POST.get("currentcountry")
        current_city = request.POST["currentcity"]
        current_state = request.POST["currentstate"]
        pin_code = request.POST["pincode"]

        if first_name == "":
            emptyMessage = ("fName", 0)
            return JsonResponse({"message": list(emptyMessage)})

        elif last_name == "":
            emptyMessage = ("lName", 0)
            return JsonResponse({"message": list(emptyMessage)})

        elif current_email == "":
            emptyMessage = ("Email", 0)
            return JsonResponse({"message": list(emptyMessage)})

        else:
            successMessage = (
                "Verified", "/resume-builder/years-of-experience")
            return JsonResponse({"message": list(successMessage)})

    personal_details = {
        "first_name": first_name,
        "last_name": last_name,
        "current_email": current_email,
        "phone_number": phone_number,
        "current_address": current_address,
        "current_country": current_country,
        "current_city": current_city,
        "current_state": current_state,
        "pin_code": pin_code
    }

    return render(request, "personalDetails.html", {"countries": COUNTRIES_FILE, "detail": personal_details, "link": linkClick})


def experience(request):

    global linkClick
    if linkClick == "personal":
        linkClick = "experience"

    global previousURL
    previousURL = "/resume-builder/years-of-experience"

    if request.method == "POST":

        global job_title, company_name, country_name, city_name, start_month, start_year, end_month, end_year
        job_title = request.POST["jobtitle"]
        company_name = request.POST["companyname"]
        country_name = request.POST["countryname"]
        city_name = request.POST["cityname"]
        start_month = request.POST["startmonth"]
        start_year = request.POST["startyear"]
        end_month = request.POST["endmonth"]
        end_year = request.POST["endyear"]

        if job_title == "" or company_name == "":
            emptyMessage = ("Empty", "/resume-builder/higher-education")
            return JsonResponse({"message": list(emptyMessage)})

        else:
            successMessage = (
                "Notempty", "/resume-builder/higher-education")
            return JsonResponse({"message": list(successMessage)})

    years_of_experience = {
        "job_title": job_title,
        "company_name": company_name,
        "country_name": country_name,
        "city_name": city_name,
        "start_month": start_month,
        "start_year": start_year,
        "end_month": end_month,
        "end_year": end_year
    }

    return render(request, "experience.html", {"countries": COUNTRIES_FILE, "months": MONTHS, "years": years, "experience": years_of_experience, "link": linkClick})


def education(request):

    global linkClick
    if linkClick == "experience":
        linkClick = "education"

    global previousURL
    previousURL = "/resume-builder/higher-education"

    if (request.method == "POST"):

        try:

            if (request.POST["schoolform"] == "school"):

                global school_name, school_percentage, school_passedyear, school_country, school_city
                school_name = request.POST["schoolname"]
                school_percentage = request.POST["schoolpercentage"]
                school_passedyear = request.POST["schoolpassedyear"]
                school_country = request.POST["schoolcountry"]
                school_city = request.POST["schoolcity"]

                if school_name == "":
                    emptyMessage = ("emptyname", 0)
                    return JsonResponse({"message": list(emptyMessage)})

                elif school_passedyear == "Passed Out Year*":
                    emptyMessage = ("emptyyear", 0)
                    return JsonResponse({"message": list(emptyMessage)})

                else:
                    successMessage = (
                        "Notempty", 0)
                    return JsonResponse({"message": list(successMessage)})

        except MultiValueDictKeyError:

            if (request.POST["collegeform"] == "college"):

                global college_name, college_percentage, college_passedyear, college_degree, college_branch, college_country, college_city
                college_name = request.POST["collegename"]
                college_percentage = request.POST["collegepercentage"]
                college_passedyear = request.POST["collegepassedyear"]
                college_degree = request.POST["collegedegree"]
                college_branch = request.POST["collegebranch"]
                college_country = request.POST["collegecountry"]
                college_city = request.POST["collegecity"]

                if college_name == "":
                    emptyMessage = ("emptyname", 0)
                    return JsonResponse({"message": list(emptyMessage)})

                elif college_passedyear == "Passed Out Year*":
                    emptyMessage = ("emptyyear", 0)
                    return JsonResponse({"message": list(emptyMessage)})

                elif college_degree == "":
                    emptyMessage = ("emptydegree", 0)
                    return JsonResponse({"message": list(emptyMessage)})

                elif college_branch == "":
                    emptyMessage = ("emptybranch", 0)
                    return JsonResponse({"message": list(emptyMessage)})

                else:
                    successMessage = (
                        "Notempty", 0)
                    return JsonResponse({"message": list(successMessage)})

    education_high_school = {
        "school_name": school_name,
        "school_percentage": school_percentage,
        "school_passedyear": school_passedyear,
        "school_country": school_country,
        "school_city": school_city
    }

    education_college = {
        "college_name": college_name,
        "college_percentage": college_percentage,
        "college_passedyear": college_passedyear,
        "college_degree": college_degree,
        "college_branch": college_branch,
        "college_country": college_country,
        "college_city": college_city,
    }

    return render(request, "education.html", {"countries": COUNTRIES_FILE, "years": years, "highschool": education_high_school, "college": education_college, "link": linkClick})


def certifications(request):

    global linkClick
    if linkClick == "education":
        linkClick = "certifications"

    global previousURL
    previousURL = "/resume-builder/certifications"

    if request.method == "POST":

        global certification_1, certification_2, certification_3, certification_4, certification_5, certification_6
        certification_1 = request.POST["certification1"]
        certification_2 = request.POST["certification2"]
        certification_3 = request.POST["certification3"]
        certification_4 = request.POST["certification4"]
        certification_5 = request.POST["certification5"]
        certification_6 = request.POST["certification6"]

        if certification_1 == "" and certification_2 == "" and certification_3 == "" and certification_4 == "" and certification_5 == "" and certification_6 == "":
            emptyMessage = ("Success", "/resume-builder/additional-skills")
            return JsonResponse({"message": list(emptyMessage)})

        elif certification_1 != "" and certification_2 == "" and certification_3 == "" and certification_4 == "" and certification_5 == "" and certification_6 == "":
            successMessage = ("Success", "/resume-builder/additional-skills")
            return JsonResponse({"message": list(successMessage)})

        elif certification_1 != "" and certification_2 != "" and certification_3 == "" and certification_4 == "" and certification_5 == "" and certification_6 == "":
            successMessage = ("Success", "/resume-builder/additional-skills")
            return JsonResponse({"message": list(successMessage)})

        elif certification_1 != "" and certification_2 != "" and certification_3 != "" and certification_4 == "" and certification_5 == "" and certification_6 == "":
            successMessage = ("Success", "/resume-builder/additional-skills")
            return JsonResponse({"message": list(successMessage)})

        elif certification_1 != "" and certification_2 != "" and certification_3 != "" and certification_4 != "" and certification_5 == "" and certification_6 == "":
            successMessage = ("Success", "/resume-builder/additional-skills")
            return JsonResponse({"message": list(successMessage)})

        elif certification_1 != "" and certification_2 != "" and certification_3 != "" and certification_4 != "" and certification_5 != "" and certification_6 == "":
            successMessage = ("Success", "/resume-builder/additional-skills")
            return JsonResponse({"message": list(successMessage)})

        elif certification_1 != "" and certification_2 != "" and certification_3 != "" and certification_4 != "" and certification_5 != "" and certification_6 != "":
            successMessage = ("Success", "/resume-builder/additional-skills")
            return JsonResponse({"message": list(successMessage)})

        else:
            errorMessage = ("Error", 0)
            return JsonResponse({"message": list(errorMessage)})

    license_certifications = {
        "certification_1": certification_1,
        "certification_2": certification_2,
        "certification_3": certification_3,
        "certification_4": certification_4,
        "certification_5": certification_5,
        "certification_6": certification_6
    }

    return render(request, "certifications.html", {"certifications": license_certifications, "link": linkClick})


def skills(request):

    global linkClick
    if linkClick == "certifications":
        linkClick = "skills"

    global previousURL
    previousURL = "/resume-builder/additional-skills"

    if request.method == "POST":

        global skill_1, skill_2, skill_3, skill_4, skill_5, skill_6, skill_7, skill_8, skill_9, skill_10, skill_11, skill_12, skill_13, skill_14, skill_15, skill_16
        skill_1 = request.POST["skill1"]
        skill_2 = request.POST["skill2"]
        skill_3 = request.POST["skill3"]
        skill_4 = request.POST["skill4"]
        skill_5 = request.POST["skill5"]
        skill_6 = request.POST["skill6"]
        skill_7 = request.POST["skill7"]
        skill_8 = request.POST["skill8"]
        skill_9 = request.POST["skill9"]
        skill_10 = request.POST["skill10"]
        skill_11 = request.POST["skill11"]
        skill_12 = request.POST["skill12"]
        skill_13 = request.POST["skill13"]
        skill_14 = request.POST["skill14"]
        skill_15 = request.POST["skill15"]
        skill_16 = request.POST["skill16"]

        if skill_1 == "" or skill_2 == "" or skill_3 == "":
            errorMessage = ("requiredError", 0)
            return JsonResponse({"message": list(errorMessage)})

        elif skill_1 != "" and skill_2 != "" and skill_3 != "" and skill_4 == "" and skill_5 == "" and skill_6 == "" and skill_7 == "" and skill_8 == "" and skill_9 == "" and skill_10 == "" and skill_11 == "" and skill_12 == "" and skill_13 == "" and skill_14 == "" and skill_15 == "" and skill_16 == "":
            successMessage = ("Success", "/resume-builder/career-objective")
            return JsonResponse({"message": list(successMessage)})

        elif skill_1 != "" and skill_2 != "" and skill_3 != "" and skill_4 != "" and skill_5 == "" and skill_6 == "" and skill_7 == "" and skill_8 == "" and skill_9 == "" and skill_10 == "" and skill_11 == "" and skill_12 == "" and skill_13 == "" and skill_14 == "" and skill_15 == "" and skill_16 == "":
            successMessage = ("Success", "/resume-builder/career-objective")
            return JsonResponse({"message": list(successMessage)})

        elif skill_1 != "" and skill_2 != "" and skill_3 != "" and skill_4 != "" and skill_5 != "" and skill_6 == "" and skill_7 == "" and skill_8 == "" and skill_9 == "" and skill_10 == "" and skill_11 == "" and skill_12 == "" and skill_13 == "" and skill_14 == "" and skill_15 == "" and skill_16 == "":
            successMessage = ("Success", "/resume-builder/career-objective")
            return JsonResponse({"message": list(successMessage)})

        elif skill_1 != "" and skill_2 != "" and skill_3 != "" and skill_4 != "" and skill_5 != "" and skill_6 != "" and skill_7 == "" and skill_8 == "" and skill_9 == "" and skill_10 == "" and skill_11 == "" and skill_12 == "" and skill_13 == "" and skill_14 == "" and skill_15 == "" and skill_16 == "":
            successMessage = ("Success", "/resume-builder/career-objective")
            return JsonResponse({"message": list(successMessage)})

        elif skill_1 != "" and skill_2 != "" and skill_3 != "" and skill_4 != "" and skill_5 != "" and skill_6 != "" and skill_7 != "" and skill_8 == "" and skill_9 == "" and skill_10 == "" and skill_11 == "" and skill_12 == "" and skill_13 == "" and skill_14 == "" and skill_15 == "" and skill_16 == "":
            successMessage = ("Success", "/resume-builder/career-objective")
            return JsonResponse({"message": list(successMessage)})

        elif skill_1 != "" and skill_2 != "" and skill_3 != "" and skill_4 != "" and skill_5 != "" and skill_6 != "" and skill_7 != "" and skill_8 != "" and skill_9 == "" and skill_10 == "" and skill_11 == "" and skill_12 == "" and skill_13 == "" and skill_14 == "" and skill_15 == "" and skill_16 == "":
            successMessage = ("Success", "/resume-builder/career-objective")
            return JsonResponse({"message": list(successMessage)})

        elif skill_1 != "" and skill_2 != "" and skill_3 != "" and skill_4 != "" and skill_5 != "" and skill_6 != "" and skill_7 != "" and skill_8 != "" and skill_9 != "" and skill_10 == "" and skill_11 == "" and skill_12 == "" and skill_13 == "" and skill_14 == "" and skill_15 == "" and skill_16 == "":
            successMessage = ("Success", "/resume-builder/career-objective")
            return JsonResponse({"message": list(successMessage)})

        elif skill_1 != "" and skill_2 != "" and skill_3 != "" and skill_4 != "" and skill_5 != "" and skill_6 != "" and skill_7 != "" and skill_8 != "" and skill_9 != "" and skill_10 != "" and skill_11 == "" and skill_12 == "" and skill_13 == "" and skill_14 == "" and skill_15 == "" and skill_16 == "":
            successMessage = ("Success", "/resume-builder/career-objective")
            return JsonResponse({"message": list(successMessage)})

        elif skill_1 != "" and skill_2 != "" and skill_3 != "" and skill_4 != "" and skill_5 != "" and skill_6 != "" and skill_7 != "" and skill_8 != "" and skill_9 != "" and skill_10 != "" and skill_11 != "" and skill_12 == "" and skill_13 == "" and skill_14 == "" and skill_15 == "" and skill_16 == "":
            successMessage = ("Success", "/resume-builder/career-objective")
            return JsonResponse({"message": list(successMessage)})

        elif skill_1 != "" and skill_2 != "" and skill_3 != "" and skill_4 != "" and skill_5 != "" and skill_6 != "" and skill_7 != "" and skill_8 != "" and skill_9 != "" and skill_10 != "" and skill_11 != "" and skill_12 != "" and skill_13 == "" and skill_14 == "" and skill_15 == "" and skill_16 == "":
            successMessage = ("Success", "/resume-builder/career-objective")
            return JsonResponse({"message": list(successMessage)})

        elif skill_1 != "" and skill_2 != "" and skill_3 != "" and skill_4 != "" and skill_5 != "" and skill_6 != "" and skill_7 != "" and skill_8 != "" and skill_9 != "" and skill_10 != "" and skill_11 != "" and skill_12 != "" and skill_13 != "" and skill_14 == "" and skill_15 == "" and skill_16 == "":
            successMessage = ("Success", "/resume-builder/career-objective")
            return JsonResponse({"message": list(successMessage)})

        elif skill_1 != "" and skill_2 != "" and skill_3 != "" and skill_4 != "" and skill_5 != "" and skill_6 != "" and skill_7 != "" and skill_8 != "" and skill_9 != "" and skill_10 != "" and skill_11 != "" and skill_12 != "" and skill_13 != "" and skill_14 != "" and skill_15 == "" and skill_16 == "":
            successMessage = ("Success", "/resume-builder/career-objective")
            return JsonResponse({"message": list(successMessage)})

        elif skill_1 != "" and skill_2 != "" and skill_3 != "" and skill_4 != "" and skill_5 != "" and skill_6 != "" and skill_7 != "" and skill_8 != "" and skill_9 != "" and skill_10 != "" and skill_11 != "" and skill_12 != "" and skill_13 != "" and skill_14 != "" and skill_15 != "" and skill_16 == "":
            successMessage = ("Success", "/resume-builder/career-objective")
            return JsonResponse({"message": list(successMessage)})

        elif skill_1 != "" and skill_2 != "" and skill_3 != "" and skill_4 != "" and skill_5 != "" and skill_6 != "" and skill_7 != "" and skill_8 != "" and skill_9 != "" and skill_10 != "" and skill_11 != "" and skill_12 != "" and skill_13 != "" and skill_14 != "" and skill_15 != "" and skill_16 != "":
            successMessage = ("Success", "/resume-builder/career-objective")
            return JsonResponse({"message": list(successMessage)})

        else:
            errorMessage = ("Error", 0)
            return JsonResponse({"message": list(errorMessage)})

    additional_skills = {
        "skill_1": skill_1,
        "skill_2": skill_2,
        "skill_3": skill_3,
        "skill_4": skill_4,
        "skill_5": skill_5,
        "skill_6": skill_6,
        "skill_7": skill_7,
        "skill_8": skill_8,
        "skill_9": skill_9,
        "skill_10": skill_10,
        "skill_11": skill_11,
        "skill_12": skill_12,
        "skill_13": skill_13,
        "skill_14": skill_14,
        "skill_15": skill_15,
        "skill_16": skill_16
    }

    return render(request, "skills.html", {"skills": additional_skills, "link": linkClick})


def objective(request):

    global linkClick
    if linkClick == "skills":
        linkClick = "objective"

    global previousURL
    previousURL = "/resume-builder/career-objective"

    if request.method == "POST":

        global career_objective
        career_objective = request.POST["careerobjective"]

        successMessage = ("Success", "/resume-builder/templates")
        return JsonResponse({"message": list(successMessage)})

    return render(request, "careerObjective.html", {"objectives": career_objective, "link": linkClick})


def addToDataBase():

    # Creating resume templates with the user entered details
    userdetails = userDetail.objects.create(
        firstname=first_name,
        lastname=last_name,
        currentemail=current_email,
        phonenumber=phone_number,
        currentaddress=current_address,
        currentcountry=current_country,
        currentcity=current_city,
        currentstate=current_state,
        pincode=pin_code,
        job_title=job_title,
        company_name=company_name,
        country_name=country_name,
        city_name=city_name,
        start_month=start_month,
        start_year=start_year,
        end_month=end_month,
        end_year=end_year,
        school_name=school_name,
        school_percentage=school_percentage,
        school_passedyear=school_passedyear,
        school_country=school_country,
        school_city=school_city,
        college_name=college_name,
        college_percentage=college_percentage,
        college_passedyear=college_passedyear,
        college_degree=college_degree,
        college_branch=college_branch,
        college_country=college_country,
        college_city=college_city,
        certification_1=certification_1,
        certification_2=certification_2,
        certification_3=certification_3,
        certification_4=certification_4,
        certification_5=certification_5,
        certification_6=certification_6,
        skill_1=skill_1,
        skill_2=skill_2,
        skill_3=skill_3,
        skill_4=skill_4,
        skill_5=skill_5,
        skill_6=skill_6,
        skill_7=skill_7,
        skill_8=skill_8,
        skill_9=skill_9,
        skill_10=skill_10,
        skill_11=skill_11,
        skill_12=skill_12,
        skill_13=skill_13,
        skill_14=skill_14,
        skill_15=skill_15,
        skill_16=skill_16,
        career_objective=career_objective
    )
    userdetails.save()


def templates(request):

    global linkClick
    if linkClick == "objective":
        linkClick = "templates"

    global previousURL
    previousURL = "/resume-builder/templates"

    # Saving the data to the database
    addToDataBase()

    templates = [
        "Static/Assets/Template/template_01.docx",
        "Static/Assets/Template/template_02.docx",
        "Static/Assets/Template/template_03.docx",
        "Static/Assets/Template/template_04.docx",
        "Static/Assets/Template/template_05.docx",
        "Static/Assets/Template/template_06.docx",
        "Static/Assets/Template/template_07.docx",
        "Static/Assets/Template/template_08.docx"
    ]
    x = 0
    for template in templates:

        document = MailMerge(template)

        # Merging new values to merge fields in the template file
        document.merge(
            first_name=first_name,
            last_name=last_name,
            current_email=current_email,
            phone_number=phone_number,
            current_address=current_address,
            current_country=current_country,
            current_city=current_city,
            job_title=job_title,
            company_name=company_name,
            start_month=start_month,
            start_year=start_year,
            end_month=end_month,
            end_year=end_year,
            school_name=school_name,
            school_percentage=school_percentage,
            school_passedyear=school_passedyear,
            school_country=school_country,
            school_city=school_city,
            college_name=college_name,
            college_percentage=college_percentage,
            college_passedyear=college_passedyear,
            college_degree=college_degree,
            college_branch=college_branch,
            college_country=college_country,
            college_city=college_city,
            certification_1=certification_1,
            certification_2=certification_2,
            certification_3=certification_3,
            certification_4=certification_4,
            certification_5=certification_5,
            certification_6=certification_6,
            skill_1=skill_1,
            skill_2=skill_2,
            skill_3=skill_3,
            skill_4=skill_4,
            skill_5=skill_5,
            career_objective=career_objective
        )
        x += 1
        document.write("Static/temp/template_"+str(x)+".docx")

    return render(request, "templates.html", {"link": linkClick})


def downloadTemplate(request):

    if request.method == "POST":

        # Getting the value of parameter to perform some operation
        data_holder = request.POST["dataholder"]
        if (data_holder == "convert"):

            # Getting the name of the selected template
            selected_template = request.POST["selectedtemplate"]
            path_to_doc = os.path.join(TEMPLATES, f"{selected_template}.docx")

            if os.path.exists(path_to_doc):

                # Converting the '.docx' to '.pdf' and saving it in the temporary path
                pdfPath = os.path.join(TEMPLATES, "resume.pdf")
                docxToPdf(path_to_doc, pdfPath)

                successMessage = ("Success", pdfPath)
                return JsonResponse({"message": list(successMessage)})

            else:
                errormessage = ("Error", 0)
                return JsonResponse({"message": list(errormessage)})

        else:
            # Opening and reading the newly converted pdf and send as download response
            file = open(data_holder, "rb")
            return FileResponse(file, as_attachment=True, filename="reSume.pdf")

    return redirect(previousURL)


def contact(request):

    global previousURL
    previousURL = "/contact"

    if request.method == "POST":

        return HttpResponse("Your request has been received successfully")

    return render(request, "contact.html")


def signup(request):

    if request.method == "POST":

        username = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"]
        password2 = request.POST["password2"]

        if username == "" or email == "" or password == "" or password2 == "":

            emptyMessage = ("Fields can't be empty", 0)
            return JsonResponse({"message": list(emptyMessage)})

        else:

            if User.objects.filter(username=username).exists():

                userExists = ("UserName already exists", 0)
                return JsonResponse({"message": list(userExists)})

            else:
                if User.objects.filter(email=email).exists():

                    emailExists = ("Email Id already exists", 0)
                    return JsonResponse({"message": list(emailExists)})

                else:
                    symbols = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*",
                               "(", ")", "_", "-", "+" "=", "{", "[", "}", "]", "|", "\\", ":", ";", "\"", "'", "<", ",", ">", ".", "?", "/"]

                    if password.isdigit():

                        passwordError = (
                            "Password should n't have only numbers", 0)
                        return JsonResponse({"message": list(passwordError)})

                    elif password.isalpha():

                        passwordError = (
                            "Password should n't have only alphabets", 0)
                        return JsonResponse({"message": list(passwordError)})

                    elif password.isspace():

                        passwordError = (
                            "Password shouldn't have spaces", 0)
                        return JsonResponse({"message": list(passwordError)})

                    uppercase = ""
                    for word in password:
                        if word.isupper():
                            uppercase = "true"
                            break
                        else:
                            uppercase = "false"

                    if uppercase == "true":

                        condition = ""
                        for symbol in symbols:
                            if condition == "success":
                                break

                            else:
                                for value in password:

                                    if value == symbol:
                                        condition = "success"
                                        break
                                    else:
                                        condition = "failed"

                        if condition == "success":

                            if len(password) < 8:

                                passwordError = (
                                    "Password must contain minimum 8 characters", 0)
                                return JsonResponse({"message": list(passwordError)})

                            else:
                                if password == password2:

                                    user = User.objects.create_user(
                                        username=username, email=email, password=password)
                                    user.save()

                                    successMessage = (
                                        "Success", previousURL)
                                    return JsonResponse({"message": list(successMessage)})

                                else:
                                    passwordError = (
                                        "Passwords doesn't match", 0)
                                    return JsonResponse({"message": list(passwordError)})

                        else:

                            passwordError = (
                                "Password must atleast have one symbol", 0)
                            return JsonResponse({"message": list(passwordError)})

                    else:

                        passwordError = (
                            "Password must atleast contain one uppercase letter", 0)
                        return JsonResponse({"message": list(passwordError)})

    else:
        return redirect(previousURL)


def login(request):

    if request.method == "POST":

        user2name = request.POST["user2name"]
        pass2word = request.POST['pass2word']

        if user2name == "" or pass2word == "":

            emptyMessage = ("Fields can't be empty", 0)
            return JsonResponse({"message": list(emptyMessage)})

        # Checking the credentials in database
        user = auth.authenticate(username=user2name, password=pass2word)

        if user is not None:
            auth.login(request, user)

            # Getting the url of where login is called and creating a list with it
            successMessage = ("Success", previousURL)
            return JsonResponse({"message": list(successMessage)})

        else:
            invalidMessage = ("Credentials Invalid, please check", 0)
            return JsonResponse({"message": list(invalidMessage)})

    else:
        return redirect(previousURL)


def logout(request):

    auth.logout(request)
    return redirect(previousURL)

# -----------------------------------------------------------------------------------------------------------------------------------------------------------------


def resetFormValue():

    # Resetting PersonalDetails Form Values
    global first_name, last_name, current_email, phone_number, current_address, current_country, current_city, current_state, pin_code
    first_name = ""
    last_name = ""
    current_email = ""
    phone_number = ""
    current_address = ""
    current_country = "Country"
    current_city = ""
    current_state = ""
    pin_code = ""

    # Resetting YearsOfExperience Form Values
    global job_title, company_name, country_name, city_name, start_month, start_year, end_month, end_year
    job_title = ""
    company_name = ""
    country_name = "Country"
    city_name = ""
    start_month = "Start Month"
    start_year = "Start Year"
    end_month = "End Month"
    end_year = "End Year"

    # Resetting HigherEducation - HighSchool Form values
    global school_name, school_country, school_city, school_percentage, school_passedyear
    school_name = ""
    school_percentage = ""
    school_passedyear = "Passed Out Year*"
    school_country = "Country"
    school_city = ""

    # Resetting HigherEducation - College Form values
    global college_name, college_percentage, college_passedyear, college_degree, college_branch, college_country, college_city
    college_name = ""
    college_percentage = ""
    college_passedyear = "Passed Out Year*"
    college_degree = ""
    college_branch = ""
    college_country = "Country"
    college_city = ""

    # Resetting Certifications Form values
    global certification_1, certification_2, certification_3, certification_4, certification_5, certification_6
    certification_1 = ""
    certification_2 = ""
    certification_3 = ""
    certification_4 = ""
    certification_5 = ""
    certification_6 = ""

    # Resetting Additional-Skills Form values
    global skill_1, skill_2, skill_3, skill_4, skill_5, skill_6, skill_7, skill_8, skill_9, skill_10, skill_11, skill_12, skill_13, skill_14, skill_15, skill_16
    skill_1 = ""
    skill_2 = ""
    skill_3 = ""
    skill_4 = ""
    skill_5 = ""
    skill_6 = ""
    skill_7 = ""
    skill_8 = ""
    skill_9 = ""
    skill_10 = ""
    skill_11 = ""
    skill_12 = ""
    skill_13 = ""
    skill_14 = ""
    skill_15 = ""
    skill_16 = ""

    # Resetting Career-Objective Form values
    global career_objective
    career_objective = ""

    # Deleting the temporary files
    if not os.path.exists(TEMPLATES):
        os.mkdir(TEMPLATES)
    files = os.listdir(TEMPLATES)

    if len(files) != 0:

        for file in files:
            os.remove(os.path.join(TEMPLATES, file))
