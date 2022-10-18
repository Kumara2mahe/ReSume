from pathlib import Path
from datetime import datetime


def userDatCleaner(dirPath: Path, dateTime: datetime, max_age: int):
    """ Function for periodically deleting the unused user data stored in temporary Directory 

    dirPath (Path) - path to the root dir you want to look into\r\n
    max_age (int) - takes the maximum age(in days) of dirs to delete
    dateTime (datetime) - takes the current date and time as value

    Usage:
        userDatCleaner("myDir/toDeleteDir", 5) # this deletes the directories inside the 'dirPath' if 'modified-time' > 5 days
    """

    # Creating a new directory on the passed in path if no already exists
    Path.mkdir(dirPath, exist_ok=True)

    # Getting the list of directories lives inside the passed in Directory
    rootDIR = dirPath.iterdir()

    print("Scanning server for (in-active) TEMP-DIRS...\n")
    status = None
    for dir in rootDIR:

        # Getting the modified time from each folder and converting it to datetime object
        m_time = dir.stat().st_mtime
        c_since = datetime.fromtimestamp(m_time)

        # Calculating the no. of days since modified
        age_in_days = (dateTime - c_since).days

        if (age_in_days > max_age):
            for f in dir.iterdir():
                f.unlink()
            dir.rmdir()

            # Deleting the olds Data and Showing the status
            print(f"> {'*' * 4}{str(dir)[-6:]} -> (removed)")
            status = "_"

    print(status) if (status) else status
