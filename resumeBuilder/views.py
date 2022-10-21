from django.shortcuts import render, redirect
from django.http import JsonResponse, FileResponse

# Importing some built-in modules to authenticate users
from django.contrib.auth.models import User
from django.contrib import auth

# Importing some built-in modules to format and send emails
import re
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import EmailMultiAlternatives, BadHeaderError

# Importing some built-in modules to work with Path and datetime objects
from datetime import datetime
from pathlib import Path

# Importing some functionality from built-in modules to load the json data and getting the list of month names
from json import load
from calendar import month_name

# Importing some constant variables from custom modules in this app
from ReSume.settings.base import SESSION_COOKIE_SECURE, DEFAULT_FROM_EMAIL, EMAIL_HOST_USER

# Importing some third party libraries to work with '.docx' & '.pdf' files
from docxtpl import DocxTemplate
from pModules.datDump import userDatCleaner
from pModules.convert2pdf import docxToPdf


# Main view to render the Home-Page
def home(request):

    # Creating a python dictionary of data according to the requested URL
    tempDICT = dataCollector(request)

    # Rendering the Home-Page as a response
    response = render(request, "home.html", tempDICT)

    # Settings the Url of Home-Page as a cookie to reference later
    response.set_cookie(key="previousurlpath", value=request.path, samesite="Lax",
                        secure=SESSION_COOKIE_SECURE)

    return response


# View to render the About-Page
def about(request):

    # Creating a python dictionary of data according to the requested URL
    tempDICT = dataCollector(request)

    # Rendering the About-Page as a response
    response = render(request, "about.html", tempDICT)

    # Settings the Url of About-Page as a cookie to reference later
    response.set_cookie(key="previousurlpath", value=request.path, samesite="Lax",
                        secure=SESSION_COOKIE_SECURE)

    return response


# View to render the Contact-Page
def contact(request):

    # Function to convert HTML version to plain TEXT version
    def render_to_plain(html):

        # Remove all html tags and continuous whitespaces
        plainText = re.sub("[ \t]+", " ", strip_tags(html))

        # Strip single spaces in the beginning of each line
        return plainText.replace("\n ", "\n").strip()

    if (request.method == "POST"):

        # Getting the values from the Feedback form
        c_name = request.POST["customername"].title()
        c_email = request.POST["customeremail"]
        c_feedback = request.POST["customerfeedback"].capitalize()

        # Rendering the html template to a plain string to send as HTML version
        plainHTML = render_to_string("mail.html", {"name": c_name,
                                                   "email": c_email,
                                                   "feedback": c_feedback})

        # Converting the rendered HTML version to a plain Text version for users who can't view mails in HTML version
        plainTEXT = render_to_plain(plainHTML)

        try:
            # Sending HTML version as a E-mail with reply emails
            mail = EmailMultiAlternatives(subject=f"Got a Feedback - {c_name}",
                                          body=plainTEXT,
                                          from_email=f"Re-Sume {DEFAULT_FROM_EMAIL}",
                                          to=[EMAIL_HOST_USER],
                                          alternatives=[
                                              (plainHTML, "text/html")
                                          ],
                                          reply_to=[c_email])
            mail.send()

            statusMessage = ("Sent",
                             "Thank you we got your feedback, will respond to you shortly")

        except BadHeaderError:
            statusMessage = ("failed", "Invalid Header Found!")

        return JsonResponse({"message": list(statusMessage)})

    # Creating a python dictionary of data according to the requested URL
    tempDICT = dataCollector(request)

    # Rendering the Contact-Page as a response
    response = render(request, "contact.html", tempDICT)

    # Settings the Url of Contact-Page as a cookie to reference later
    response.set_cookie(key="previousurlpath", value=request.path, samesite="Lax",
                        secure=SESSION_COOKIE_SECURE)

    return response


# View to render the Builder-Page
def builder(request):

    if (request.method == "POST"):

        # Updating the specific key's value in session object
        request.session["active_form"] = {"fromPATH": request.path,
                                          "link": None,
                                          "devicewidth": int(request.POST["screenwidth"])}

        return redirect("/builder/personal-details")

    # Creating a python dictionary of data according to the requested URL
    tempDICT = dataCollector(request)

    # Rendering the Builder-Page as a response
    response = render(request, "builder.html", tempDICT)

    # Settings the Url of Builder-Page as a cookie to reference later
    response.set_cookie(key="previousurlpath", value=request.path, samesite="Lax",
                        secure=SESSION_COOKIE_SECURE)

    return response


# View to render the PersonalDetails-Page
def personalDetails(request):

    # Getting the value of a particular key from the session object
    valid_key = [request.session[key]
                 for key in request.session.keys() if (key == "active_form")]

    statusCode = 403
    if (valid_key and valid_key[0] and valid_key[0]["devicewidth"] > 677):

        if (request.method == "POST"):

            first_name = request.POST["firstname"]
            last_name = request.POST["lastname"]
            current_email = request.POST["currentemail"]
            phone_number = request.POST["phonenumber"]
            current_address = request.POST["currentaddress"]
            current_country = request.POST.get("currentcountry")
            current_city = request.POST["currentcity"]
            current_state = request.POST["currentstate"]
            pin_code = request.POST["pincode"]

            if (first_name == ""):
                emptyMessage = ("first_name", 0)
                return JsonResponse({"message": list(emptyMessage)})

            elif (last_name == ""):
                emptyMessage = ("last_name", 0)
                return JsonResponse({"message": list(emptyMessage)})

            elif (current_email == ""):
                emptyMessage = ("current_email", 0)
                return JsonResponse({"message": list(emptyMessage)})

            else:

                # Updating the initial values of the form present in current URL with user filled data
                request.session["personalDetails"] = {
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

                successMessage = ("Verified", "/builder/years-of-experience")
                return JsonResponse({"message": list(successMessage)})

        # Updating the specific key's value in session object as current path
        request.session["active_form"]["fromPATH"] = request.path

        # Setting the initial values for the form present in current URL if only the key has no value
        if (not request.session["personalDetails"]):

            request.session["personalDetails"] = {
                "first_name": "",
                "last_name": "",
                "current_email": "",
                "phone_number": "",
                "current_address": "",
                "current_country": PLACEHOLDER_TEXT[0],
                "current_city": "",
                "current_state": "",
                "pin_code": ""
            }

        # Adding new or Updating the existing key in the dictionary which passed to template
        if (valid_key[0]["link"] is None):
            request.session["active_form"]["link"] = request.path.split(
                "builder/")[1]

        # Creating a python dictionary of data according to the requested URL
        tempDICT = dataCollector(request)
        tempDICT["formData"] = request.session["personalDetails"]

        return render(request, "personalDetails.html", tempDICT)

    elif (valid_key and valid_key[0] and valid_key[0]["devicewidth"] < 678):
        statusCode = 400

    # Rendering the Error-Page as a response and also updating the status code of it
    response = render(request, ERROR_TEMPLATE, {"statuscode": statusCode})
    response.status_code = statusCode

    return response


# Views to render the YearOfExperience-Page
def yearsofexperience(request):

    # Getting the value of a particular key from the session object
    valid_key = [request.session[key]
                 for key in request.session.keys() if (key == "personalDetails")]

    if (valid_key and valid_key[0]):

        if (request.method == "POST"):

            job_title = request.POST["jobtitle"]
            company_name = request.POST["companyname"]
            country_name = request.POST["countryname"]
            city_name = request.POST["cityname"]
            start_month = request.POST["startmonth"]
            start_year = request.POST["startyear"]
            end_month = request.POST["endmonth"]
            end_year = request.POST["endyear"]

            if (job_title == "" or company_name == ""):
                emptyMessage = ("Empty", "/builder/higher-education")
                return JsonResponse({"message": list(emptyMessage)})

            else:

                # Updating the initial values of the form present in current URL with user filled data
                request.session["yearsOfExperience"] = {
                    "job_title": job_title,
                    "company_name": company_name,
                    "country_name": country_name,
                    "city_name": city_name,
                    "start_month": start_month,
                    "start_year": start_year,
                    "end_month": end_month,
                    "end_year": end_year
                }

                successMessage = (
                    "Notempty", "/builder/higher-education")
                return JsonResponse({"message": list(successMessage)})

        # Updating the specific key's value in session object as current path
        request.session["active_form"]["fromPATH"] = request.path

        # Setting the initial values for the form present in current URL if only the key has no value
        if (not request.session["yearsOfExperience"]):

            # Setting the initial values for the form present in current URL
            request.session["yearsOfExperience"] = {
                "job_title": "",
                "company_name": "",
                "country_name": PLACEHOLDER_TEXT[0],
                "city_name": "",
                "start_month": PLACEHOLDER_TEXT[1],
                "start_year": PLACEHOLDER_TEXT[2],
                "end_month": PLACEHOLDER_TEXT[3],
                "end_year": PLACEHOLDER_TEXT[4]
            }

        # Adding new or Updating the existing key in the dictionary which passed to template
        if (request.session["active_form"]["link"] == "personal-details"):
            request.session["active_form"]["link"] = request.path.split(
                "builder/")[1]

        # Creating a python dictionary of data according to the requested URL
        tempDICT = dataCollector(request)
        tempDICT["formData"] = request.session["yearsOfExperience"]

        return render(request, "yearsofexperience.html", tempDICT)

    # Rendering the Error-Page as a response and also updating the status code of it
    response = render(request, ERROR_TEMPLATE)
    response.status_code = 404

    return response


# View to render the HigherEducation Page
def higherEducation(request):

    # Getting the value of a particular key from the session object
    valid_key = [request.session[key]
                 for key in request.session.keys() if (key == "yearsOfExperience")]

    if (valid_key and valid_key[0]):

        if (request.method == "POST"):

            form_name = request.POST["formname"]
            name = request.POST["name"]
            grade = request.POST["grade"]
            passed_year = request.POST["passedyear"]
            country = request.POST["country"]
            city = request.POST["city"]

            if (name == ""):
                emptyMessage = ("emptyname", form_name)
                return JsonResponse({"message": list(emptyMessage)})

            elif (passed_year == "Passed Out Year*"):
                emptyMessage = ("emptyyear", form_name)
                return JsonResponse({"message": list(emptyMessage)})

            elif (form_name == "highschool"):

                # Getting the values of College form
                college = request.session["higherEducation"]["college"]

                # Updating the initial values of the highschool form present in current URL with user filled data
                request.session["higherEducation"] = {
                    "highschool": {
                        "name": name,
                        "grade": grade,
                        "passed_year": passed_year,
                        "country": country,
                        "city": city
                    },
                    "college": {
                        "name": college["name"],
                        "grade": college["grade"],
                        "passed_year": college["passed_year"],
                        "degree": college["degree"],
                        "branch": college["branch"],
                        "country": college["country"],
                        "city": college["city"]
                    }
                }

            elif (form_name == "college"):

                degree = request.POST["degree"]
                branch = request.POST["branch"]

                if (degree == ""):
                    emptyMessage = ("emptydegree", form_name)
                    return JsonResponse({"message": list(emptyMessage)})

                elif (branch == ""):
                    emptyMessage = ("emptybranch", form_name)
                    return JsonResponse({"message": list(emptyMessage)})

                # Getting the values of HighSchool form
                highschool = request.session["higherEducation"]["highschool"]

                # Updating the initial values of the college form present in current URL with user filled data
                request.session["higherEducation"] = {
                    "highschool": {
                        "name": highschool["name"],
                        "grade": highschool["grade"],
                        "passed_year": highschool["passed_year"],
                        "country": highschool["country"],
                        "city": highschool["city"]
                    },
                    "college": {
                        "name": name,
                        "grade": grade,
                        "passed_year": passed_year,
                        "degree": degree,
                        "branch": branch,
                        "country": country,
                        "city": city
                    }
                }

            successMessage = ("Verified", 0)
            return JsonResponse({"message": list(successMessage)})

        # Updating the specific key's value in session object as current path
        request.session["active_form"]["fromPATH"] = request.path

        # Setting the initial values for the form present in current URL if only the key has no value
        if (not request.session["higherEducation"]):

            # Setting the initial values for the form present in current URL
            request.session["higherEducation"] = {
                "highschool": {
                    "name": "",
                    "grade": "",
                    "passed_year": PLACEHOLDER_TEXT[5],
                    "country": PLACEHOLDER_TEXT[0],
                    "city": ""
                },
                "college": {
                    "name": "",
                    "grade": "",
                    "passed_year": PLACEHOLDER_TEXT[5],
                    "degree": "",
                    "branch": "",
                    "country": PLACEHOLDER_TEXT[0],
                    "city": ""
                }
            }

        # Adding new or Updating the existing key in the dictionary which passed to template
        if (request.session["active_form"]["link"] == "years-of-experience"):
            request.session["active_form"]["link"] = request.path.split(
                "builder/")[1]

        # Creating a python dictionary of data according to the requested URL
        tempDICT = dataCollector(request)
        tempDICT["formData"] = request.session["higherEducation"]

        return render(request, "higherEducation.html", tempDICT)

    # Rendering the Error-Page as a response and also updating the status code of it
    response = render(request, ERROR_TEMPLATE)
    response.status_code = 404

    return response


# View to render the Certifications Page
def certifications(request):

    # Getting the value of a particular key from the session object
    valid_key = [request.session[key]
                 for key in request.session.keys() if (key == "higherEducation")]

    if (valid_key and valid_key[0]):

        INPUT_COUNT = 2
        if (request.method == "POST"):

            # Getting all the certificates passed as a list
            all_certificates = request.POST.getlist("skills[]")

            newValues = []
            for n, data in enumerate(all_certificates):
                newValues.append({"name": data,
                                  "id": n + 1})

            # Filling a dummy value when the length is between '0-2'
            val_length = len(all_certificates)
            if (val_length >= 0 and val_length < 2):

                for n in range(val_length, INPUT_COUNT):
                    newValues.append({"name": "",
                                      "id": n + 1})

            # Updating the initial values of the form present in current URL with user filled data
            request.session["certifications"] = newValues

            successMessage = ("Success", "/builder/additional-skills")
            return JsonResponse({"message": list(successMessage)})

        # Updating the specific key's value in session object as current path
        request.session["active_form"]["fromPATH"] = request.path

        # Setting the initial values for the form present in current URL if only the key has no value
        if (not request.session["certifications"]):

            defaultValues = []
            for n in range(INPUT_COUNT):
                defaultValues.append({"name": "",
                                      "id": n + 1})

            # Setting the initial values for the form present in current URL
            request.session["certifications"] = defaultValues

        # Adding new or Updating the existing key in the dictionary which passed to template
        if (request.session["active_form"]["link"] == "higher-education"):
            request.session["active_form"]["link"] = request.path.split(
                "builder/")[1]

        # Creating a python dictionary of data according to the requested URL
        tempDICT = dataCollector(request)
        tempDICT["formData"] = request.session["certifications"]

        return render(request, "certifications.html", tempDICT)

    # Rendering the Error-Page as a response and also updating the status code of it
    response = render(request, ERROR_TEMPLATE)
    response.status_code = 404

    return response


# View to render the AdditionalSkills Page
def additionalSkills(request):

    # Getting the value of a particular key from the session object
    valid_key = [request.session[key]
                 for key in request.session.keys() if (key == "certifications")]

    if (valid_key and valid_key[0]):

        INPUT_COUNT = 3
        if (request.method == "POST"):

            # Getting all the skills passed as a list
            all_skills = request.POST.getlist("skills[]")

            newValues = []
            for n, data in enumerate(all_skills):
                newValues.append({"name": data,
                                  "id": n + 1})

            # Updating the initial values of the form present in current URL with user filled data
            request.session["additionalSkills"] = newValues

            successMessage = ("Success", "/builder/career-objective")
            return JsonResponse({"message": list(successMessage)})

        # Updating the specific key's value in session object as current path
        request.session["active_form"]["fromPATH"] = request.path

        # Setting the initial values for the form present in current URL if only the key has no value
        if (not request.session["additionalSkills"]):

            defaultValues = []
            for n in range(INPUT_COUNT):
                defaultValues.append({"name": "",
                                      "id": n + 1})

            # Setting the initial values for the form present in current URL
            request.session["additionalSkills"] = defaultValues

        # Adding new or Updating the existing key in the dictionary which passed to template
        if (request.session["active_form"]["link"] == "certifications"):
            request.session["active_form"]["link"] = request.path.split(
                "builder/")[1]

        # Creating a python dictionary of data according to the requested URL
        tempDICT = dataCollector(request)
        tempDICT["formData"] = request.session["additionalSkills"]

        return render(request, "additionalSkills.html", tempDICT)

    # Rendering the Error-Page as a response and also updating the status code of it
    response = render(request, ERROR_TEMPLATE)
    response.status_code = 404

    return response


# View to render the CareerObjective Page
def careerObjective(request):

    # Getting the value of a particular key from the session object
    valid_key = [request.session[key]
                 for key in request.session.keys() if (key == "additionalSkills")]

    if (valid_key and valid_key[0]):

        if (request.method == "POST"):

            # Getting all the values passed as a dict
            career_objective = request.POST["careerobjective"]
            show_objective = request.POST["showobjective"]

            # Updating the initial values of the form present in current URL with user filled data
            request.session["careerObjective"] = {
                "objective": career_objective,
                "include": True if (show_objective == "true") else False,
            }

            successMessage = ("Success", "/builder/choose-templates")
            return JsonResponse({"message": list(successMessage)})

        # Updating the specific key's value in session object as current path
        request.session["active_form"]["fromPATH"] = request.path

        # Setting the initial values for the form present in current URL if only the key has no value
        if (not request.session["careerObjective"]):

            # Setting the initial values for the form present in current URL
            request.session["careerObjective"] = {
                "objective": "",
                "include": False,
            }

        # Adding new or Updating the existing key in the dictionary which passed to template
        if (request.session["active_form"]["link"] == "additional-skills"):
            request.session["active_form"]["link"] = request.path.split(
                "builder/")[1]

        # Creating a python dictionary of data according to the requested URL
        tempDICT = dataCollector(request)
        tempDICT["formData"] = request.session["careerObjective"]

        return render(request, "careerObjective.html", tempDICT)

    # Rendering the Error-Page as a response and also updating the status code of it
    response = render(request, ERROR_TEMPLATE)
    response.status_code = 404

    return response


# View to render the Templates Page
def chooseTemplates(request):

    # Getting the value of a particular key from the session object
    valid_key = [request.session[key]
                 for key in request.session.keys() if (key == "careerObjective")]

    statusCode = 404
    if (valid_key and valid_key[0]):

        # Assigning the variables to hold the path to all Templates & its previews
        RESUME_TEMPLATES_DIR = "Static/Assets/Template"
        TEMPLATES_PREVIEW = "Static/Assets/Images"

        if (request.method == "POST"):

            # Getting the value of the parameter to perform some operation
            data_holder = request.POST["dataholder"]
            if (data_holder == "convert"):

                # Getting the Selected template name passed through request
                selected_template = request.POST["selectedtemplate"]

                # Joining the selected template name to a valid path
                template_path = Path(RESUME_TEMPLATES_DIR).joinpath(
                    selected_template + ".docx")

                if (template_path.exists()):

                    # Creating new resume with data user provided and Storing the it's path in session object
                    path_to_resume = createResume(request, template_path)

                    successMessage = ("Success", path_to_resume)
                    return JsonResponse({"message": list(successMessage)})

                successMessage = ("Error", "Something went wrong, Try Again!")
                return JsonResponse({"message": list(successMessage)})

            else:
                # Opening and reading the newly converted pdf and send as download response
                file = open(data_holder, "rb")
                file_name = "reSume." + data_holder.split(".")[-1]
                return FileResponse(file, as_attachment=True, filename=file_name)

        # Updating the specific key's value in session object as current path
        request.session["active_form"]["fromPATH"] = request.path

        # Setting the initial values for the form present in current URL if only the key has no value
        if (not request.session["chooseTemplates"]):

            all_templates = []
            for doc in Path(RESUME_TEMPLATES_DIR).glob("*.docx"):

                # Removing the extension from template's name
                image_name = doc.name.replace(".docx", "")

                # Joining the template's preview image name to Images path
                image_path = Path(TEMPLATES_PREVIEW).joinpath(
                    image_name + ".jpg")

                if (image_path.exists()):

                    # Converting the image path to a working url
                    image_url = f"/{image_path}".replace("\\", "/")

                    # Creating a list with image path & name for template files to be used on current path
                    all_templates.append([image_url, image_name])

            # Setting the initial values for the templates present in current URL
            request.session["chooseTemplates"] = all_templates

        # Adding new or Updating the existing key in the dictionary which passed to template
        if (request.session["active_form"]["link"] == "career-objective"):
            request.session["active_form"]["link"] = request.path.split(
                "builder/")[1]

        # Creating a python dictionary of data according to the requested URL
        tempDICT = dataCollector(request)
        tempDICT["formData"] = request.session["chooseTemplates"]

        if (tempDICT["formData"]):
            return render(request, "chooseTemplates.html", tempDICT)

        statusCode = 500

    # Rendering the Error-Page as a response and also updating the status code of it
    response = render(request, ERROR_TEMPLATE, {"statuscode": statusCode})
    response.status_code = statusCode

    return response


# View to validate and create new user using the credentials passed through request
def createUser(request):

    # Getting the value of a particular key from the session object
    valid_key = [request.session[key]
                 for key in request.session.keys() if (key == "active_form")]

    if (valid_key):

        # Getting the previous URL stored on the Cookies or Session object according to the condition
        previousURL = valid_key[0]["fromPATH"] if (
            valid_key[0] and valid_key[0]["fromPATH"] != "/builder") else request.COOKIES["previousurlpath"]

        if (request.method == "POST"):

            username = request.POST["username"]
            email = request.POST["email"]
            password = request.POST["password"]
            password2 = request.POST["password2"]

            if (username == "" or email == "" or password == "" or password2 == ""):

                emptyMessage = ("Fields can't be empty", 0)
                return JsonResponse({"message": list(emptyMessage)})

            else:
                if (User.objects.filter(username=username).exists()):

                    userExists = ("UserName already exists", 0)
                    return JsonResponse({"message": list(userExists)})

                elif (User.objects.filter(email=email).exists()):

                    emailExists = ("Email Id already exists", 0)
                    return JsonResponse({"message": list(emailExists)})

                else:
                    symbols = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*",
                               "(", ")", "_", "-", "+" "=", "{", "[", "}", "]", "|", "\\", ":", ";", "\"", "'", "<", ",", ">", ".", "?", "/"]

                    if (password.isdigit()):

                        passwordError = (
                            "Password shouldn't have only numbers", 0)
                        return JsonResponse({"message": list(passwordError)})

                    elif (password.isalpha()):

                        passwordError = (
                            "Password shouldn't have only alphabets", 0)
                        return JsonResponse({"message": list(passwordError)})

                    elif (password.isspace()):

                        passwordError = ("Password shouldn't have spaces", 0)
                        return JsonResponse({"message": list(passwordError)})

                    uppercase = False
                    for char in password:
                        if (char.isupper()):
                            uppercase = True
                            break
                        else:
                            uppercase = False

                    if (uppercase):

                        hasSymbol = False
                        for symbol in symbols:
                            if (hasSymbol):
                                break

                            else:
                                for char in password:

                                    if (char == symbol):
                                        hasSymbol = True
                                        break
                                    else:
                                        hasSymbol = False

                        if (hasSymbol):

                            if (len(password) < 8):

                                passwordError = (
                                    "Password must contain minimum 8 characters", 0)
                                return JsonResponse({"message": list(passwordError)})

                            else:
                                if password == password2:

                                    # Creating a new user with the credentials
                                    user = User.objects.create_user(username=username,
                                                                    email=email,
                                                                    password=password)
                                    user.save()

                                    successMessage = (
                                        "Success", "Thanks for signing up. Welcome to our community")
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

        return redirect(previousURL)

    # Rendering the Error-Page as a response and also updating the status code of it
    response = render(request, ERROR_TEMPLATE, {"statuscode": 403})
    response.status_code = 403

    return response


# View to authenticate the user credentials passed through request
def authenticateUser(request):

    # Getting the value of a particular key from the session object
    valid_key = [request.session[key]
                 for key in request.session.keys() if (key == "active_form")]

    if (valid_key):

        # Getting the previous URL stored on the Cookies or Session object according to the condition
        previousURL = valid_key[0]["fromPATH"] if (
            valid_key[0] and valid_key[0]["fromPATH"] != "/builder") else request.COOKIES["previousurlpath"]

        if (request.method == "POST"):

            user2name = request.POST["user2name"]
            pass2word = request.POST["pass2word"]

            if (user2name == "" or pass2word == ""):

                emptyMessage = ("Fields can't be empty", 0)
                return JsonResponse({"message": list(emptyMessage)})

            # Confirming the user credentials are a valid
            user = auth.authenticate(username=user2name, password=pass2word)

            if (user is not None):

                # Authenticating the user as logged-in user
                auth.login(request, user)

                successMessage = ("Success", previousURL)
                return JsonResponse({"message": list(successMessage)})

            invalidMessage = ("Credentials Invalid, please check", 0)
            return JsonResponse({"message": list(invalidMessage)})

        else:
            return redirect(previousURL)

    # Rendering the Error-Page as a response and also updating the status code of it
    response = render(request, ERROR_TEMPLATE, {"statuscode": 403})
    response.status_code = 403

    return response


# View to logout the logged-in user
def logoutUser(request):

    # Getting the value of a particular key from the Cookies
    valid_cookie = [request.COOKIES[key]
                    for key in request.COOKIES.keys() if (key == "previousurlpath")]

    if (valid_cookie):

        # Getting the previous URL stored on the Cookies
        previousURL = request.COOKIES["previousurlpath"]

        if (request.user.is_authenticated):
            auth.logout(request)

        return redirect(previousURL)

    # Rendering the Error-Page as a response and also updating the status code of it
    response = render(request, ERROR_TEMPLATE)
    response.status_code = 404

    return response


# Function for converting the collected data into a python dict, so it can be passed to HTML template
def dataCollector(userRequest):

    # Getting the current path
    cPath = userRequest.path

    # Getting the current year & Calculating a range of -80 years from now
    running_year = TODAY.year

    # Checking the current path is the parent path
    display_footer = (cPath.count("/") == 1)

    if (display_footer):

        # Creating a list of key names which later used to stores some data
        builderKeys = ["active_form",
                       "personalDetails",
                       "yearsOfExperience",
                       "higherEducation",
                       "certifications",
                       "additionalSkills",
                       "careerObjective",
                       "chooseTemplates"]

        # Iterating throw each item present in the session object
        for key in builderKeys:

            # Re-setting the value of item stored in the session object
            userRequest.session[key] = {}

        # Creating a python dictionary from the collected data so it can be passed to HTML template
        dataDICT = {
            "display_footer": display_footer,
            "running_year": running_year
        }

    else:

        # Calculating a range of -80 years from now
        years = [year for year in range(running_year - 80, running_year + 1)]
        years.sort(reverse=True)

        # Creating a python dictionary from the collected data so it can be passed to HTML template
        dataDICT = {
            "display_footer": display_footer,
            "activeLink": userRequest.session["active_form"]["link"],
            "countries": COUNTRIES_LIST,
            "months": [month_name[m] for m in range(1, 13)],
            "years": years
        }

    return dataDICT


# Function for converting the raw data into a '.docx' file
def createResume(userRequest, templatePath):

    # Function to populate the defined variables in the template with user submitted values
    def varPopulator(vars, formData, context, key):

        for k in formData.keys():

            if (k in ["highschool", "college"]):
                context = varPopulator(vars, formData[k], context, k)

            elif (formData[k] not in PLACEHOLDER_TEXT):

                # Creating a two letter id from the session key
                id = key[0:2]

                # Populating the variables with their values
                context[f"{id}_{k}"] = formData[k]

                # Creating uppercase keys for variables contain Uppercase values
                kUpper = f"{id}_{k}".upper()
                if (kUpper in vars):
                    context[kUpper] = formData[k].upper()

        return context

    # Collecting the user-data stored in the session object
    sessionKeys = ["personalDetails",
                   "yearsOfExperience",
                   "higherEducation",
                   "certifications",
                   "additionalSkills",
                   "careerObjective"]

    # Creating a new word document with the provided template
    doc = DocxTemplate(templatePath)

    # Getting the name of defined variables from the templates as list
    variables = list(doc.get_undeclared_template_variables())

    # Populating the variables in the template with values from the session object
    varDICT = {}
    for key in sessionKeys:

        # Getting the data stored in the current key
        data = userRequest.session[key]

        if (type(data).__name__ == "list"):
            varDICT[key] = data

        else:
            varDICT = varPopulator(
                variables, userRequest.session[key], varDICT, key)

    # Rendering the template with the values
    doc.render(context=varDICT,
               autoescape=True)

    # Generating the path for user specific dir and Creating that dirs if not exists
    USER_FILES = TEMP_DIR.joinpath(userRequest.COOKIES["sessionid"])
    Path.mkdir(USER_FILES, exist_ok=True)

    # Removing the old files from the user specific DIRS if does
    for file in USER_FILES.iterdir():
        file.unlink()

    # Creating the path for the rendered template and Saving it
    tempfile = USER_FILES.joinpath("resume.docx")
    doc.save(tempfile)

    # Converting the .docx -> .pdf
    pdffile = USER_FILES.joinpath("resume.pdf")
    docxToPdf(tempfile, pdffile)

    return str(pdffile)


# ---------------------------------------------------------------------------------------------------------------

# Assigning a variable to hold the Error Template name
ERROR_TEMPLATE = "errorpage.html"

# Assigning a variable to hold the current date & time
TODAY = datetime.now()

# Assigning a variable to hold the path to temporary files directory
TEMP_DIR = Path(".temp")

# Assigning a variable to hold the list of country names loaded from a JSON file
COUNTRIES_LIST = load(open("Static/Assets/countries.json"))

# Assigning a list to hold the placeholder text for dropdowns
PLACEHOLDER_TEXT = ["Country",
                    "Start Month",
                    "Start Year",
                    "End Month",
                    "End Year",
                    "Passed Out Year*"]

# ----- Clearing the (in-active) user's data ------

userDatCleaner(dirPath=TEMP_DIR,
               dateTime=TODAY,
               max_age=10)

# ---------------------------------------------
