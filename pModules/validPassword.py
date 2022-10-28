

def pwdvalidate(password: str, minlength: int, hasUpper=True, hasSymbol=True, password2: str | None = None):
    """
        Function to validate the user entered password matches some critiria like,
            - must be mixture of alphanumeric character
            - should not contain whitespaces
            - should contain a minimum length according to the condition

        Parameters (required)

                    - 'password':str  -holds the user entered password
                    - 'minlength':int -takes the minimum length of password

        Parameters (optional)

                    - 'hasUpper': bool       -must atleast contain one Uppercase letter if True
                    - 'hasSymbol': bool      -must atleast contain one Symbol from {SYMBOLS} if True
                    - 'password2': str|None  -takes another string of password to check for equality if not None

    """

    SYMBOLS = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*",
               "(", ")", "_", "-", "+" "=", "{", "[", "}", "]", "|",
               "\\", ":", ";", "\"", "'", "<", ",", ">", ".", "?", "/"]
    passwordError = None

    if (password.isdigit()):
        passwordError = "Password shouldn't have only numbers"

    elif (password.isalpha()):
        passwordError = "Password shouldn't have only alphabets"

    elif (" " in password):
        passwordError = "Password shouldn't have spaces in it"

    elif (hasUpper and not [True for c in password if c.isupper()]):
        passwordError = "Password must atleast contain one uppercase letter"

    elif (hasSymbol and not [True for c in password if c in SYMBOLS]):
        passwordError = "Password must atleast have one symbol"

    elif (len(password) < minlength):
        passwordError = f"Password must contain minimum of {minlength} characters"

    elif (password2 and password2 != password):
        passwordError = "Passwords doesn't match"

    return passwordError
