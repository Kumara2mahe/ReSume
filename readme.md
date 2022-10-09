###
<h1 align="center">Re-Sume</h1>

Re-Sume is a resume builder web application created on Django (a high-level Python web framework) which helps users to automatically generate their resume from templates by filling out the details in the given forms and also converts the resume into downloadable pdf formats.

<br>

## Getting Started
<p>These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.</p>
<br>

### Prerequisites (Requirements)

- `python==3.10+`
- `pip/pip3`

<br>

First clone this repository from Github to your local machine and switch to the project (ReSume) directory:

    $ https://github.com/Kumara2mahe/ReSume.git
    $ cd ReSume

    
Install project dependencies using the 'requirements' file in the project directory:

    $ pip install -r requirements.txt
    
    
Then simply apply the migrations:

    $ python manage.py migrate
    

You can now run the development server:

    $ python manage.py runserver

<br>

### License
[MIT](https://choosealicense.com/licenses/mit/)