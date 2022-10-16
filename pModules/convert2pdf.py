from requests import request
from json import dumps
from os import getenv
from dotenv import load_dotenv


def docxToPdf(sourcefile, outputfile):
    """
        Function which converts the '.docx' to '.pdf' by sending a API request to
        PSPDFKit-API (https://pspdfkit.com/api/) a third party api
    """

    INSTRUCTIONS = {
        "parts": [
            {
                "file": "document"
            }
        ]
    }

    load_dotenv()
    response = request(
        "POST",
        "https://api.pspdfkit.com/build",
        headers={
            "Authorization": "Bearer " + str(getenv("PSPDFKIT_API_KEY"))
        },
        files={
            "document": open(sourcefile, "rb")
        },
        data={
            "instructions": dumps(INSTRUCTIONS)
        },
        stream=True
    )

    if response.ok:
        with open(outputfile, "wb") as fd:
            for chunk in response.iter_content(chunk_size=8096):
                fd.write(chunk)
    else:
        print(response.text)
        exit()
