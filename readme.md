###
<h1 align="center">Re-Sume</h1>

Re-Sume is a resume builder web application created on Django (a high-level Python web framework) which helps users to automatically generate their resume from templates by filling out the details in the given forms and also converts the resume into downloadable pdf formats.

<br>

## Getting Started
<p>These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.</p>

### Prerequisites (Requirements)

- `python>=3.10`
- `pip/pip3`

<br>

First clone/download this repository from Github to your local machine and switch to the project (ReSume) directory where 'manage.py' lives:

    $ git clone https://github.com/Kumara2mahe/ReSume.git
    $ cd ReSume

    
Install project dependencies using the 'requirements/local' file in the project directory:

    $ pip install -r requirements/local.txt


Rename the '.env.example' to '.env' and change the environment values with your own like below

    SECRET_KEY="your-secret-key-here-and-must-be-greater-than-50character"
    DEBUG=True
    ..
    
    
Then simply apply the migrations:

    $ python manage.py migrate
    

You can now run the development server:

    $ python manage.py runserver

<br>

## Screenshots

<kbd><img src="https://drive.google.com/uc?export=view&id=1sPUSYRAwwUzx2OEdYJbVLC6DtQni3Rnq" alt="preview of resume builder page" width=400 height=225></kbd> <span>&gt;&gt;&gt;&nbsp;Builder Page</span>

<kbd><img src="https://drive.google.com/uc?export=view&id=1dEjCUkCbbei0I5B_E0L_XmwbmlMhfI6G" alt="Preview of resume builder's personal details page" width=400 height=225></kbd> <span>&gt;&gt;&gt;&nbsp;Personal-Details Page</span>

<kbd><img src="https://drive.google.com/uc?export=view&id=1lZhPm_-xE-K3-zAbCWHsfHBEXrb1Flzt" alt="Preview of resume builder's choose template page with a window showing download options for not-authenticated users" width=400 height=225></kbd> <span>&gt;&gt;&gt;&nbsp;Choose-Template Page (not-authenticated)</span>

<kbd><img src="https://drive.google.com/uc?export=view&id=12qOyv2WLCnU8_Df7YxXgrTSIFoOdpkn_" alt="Preview of Create Account Window" width=400 height=225></kbd> <span>&gt;&gt;&gt;&nbsp;Create Account Window</span>

<kbd><img src="https://drive.google.com/uc?export=view&id=1AQ6o5b848kPA58UZ-zWNbC98_BbsEOkO" alt="Preview of resume builder's choose template page with a window showing download options for authenticated users" width=400 height=225></kbd> <span>&gt;&gt;&gt;&nbsp;Choose-Template Page (authenticated)</span>

[...to see more screenshots](https://drive.google.com/drive/folders/1z9153KVpxWEdq_jj-2erJcj36pnZuiG0?usp=share_link)

<br>

## Features

- Separate developer and production settings as well as requirements files

- Included own CSS and JavaScript files to make it more responsive and interactive

- Has a custom python module(envCast) to type cast the values of enviromental variables to (bool | tuple | int | str), according to the function called.

- Another custom python module(datDump) to clear the in-active user data stored in the server whenever it starts or reloads. Particularly the data(files & folders) not being active for more than 10 days got deleted from the server.

- Custom HTML templates for showing error message and also for receiving customer feedback as emails.

- To convert '.docx' to '.pdf' a third party API named [PSPDFKit API](https://pspdfkit.com/api/) is used.

- Special Features (for Authenticated Users):

    - They can download not only 'pdf' version of the resume, but also they can download the 'docx' format (Word document) as well.

    - As a fancy feature, they can see nice little profile picture once they login and it can also be changed according to their choice.

    - Resume template which has profile picture is replaced with the user's own profile picture when they download their own.

<br>

### License
[MIT](https://choosealicense.com/licenses/mit/)