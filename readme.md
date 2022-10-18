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
    DEBUG="True"
    ..
    
    
Then simply apply the migrations:

    $ python manage.py migrate
    

You can now run the development server:

    $ python manage.py runserver


## Features

- Separate developer and production settings as well as requirements files

- Included own CSS and JavaScript files to make it more responsive and interactive

- Has a custom python module to type cast the values of enviromental variables to bool or tuple or int, according to the function called.

- To convert '.docx' to '.pdf' a third party API named [PSPDFKit API](https://pspdfkit.com/api/) is used

- Another custom module(datDump) to clear the in-active user data stored in the server whenever it starts or reloads. Particularly the data(files & folders) not being active for more than 10 days got deleted from the server.

<br>

### License
[MIT](https://choosealicense.com/licenses/mit/)