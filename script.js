let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();
let currentDate = date.getDate();
let currentDayOfWeek = date.getDay();
let getFirstDayOfCurrentMonth = new Date(currentYear, currentMonth)
let cases = ""
let february = ""

let days = document.querySelector('#days');
let dates = document.querySelector('#dates');
let months = document.querySelector('#months');
let years = document.querySelector('#years');
let hours = document.querySelector('#hours');
let minutes = document.querySelector('#minutes');
let seconds = document.querySelector('#seconds');
let goToday = document.querySelector('#goToday');

const daysInWeekArray = ["dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
const monthArray = ["Jan", "Fev", "Mar", "Avr", "Mai", "Jun", "Jui", "Aou", "Sep", "Oct", "Nov", "Dec"];

let firstDayOfCurrentMonth = daysInWeekArray[getFirstDayOfCurrentMonth.getDay()]

// Fonction qui détermine si l'année est bissextile
function isFebruaryBisextile(year) {
    if ((year % 4 === 0 && year % 100 != 0) || year % 400 === 0) {
        return true
    } else {
        return false
    }
}
// Test l'année courrante pour savoir si elle est bissextile
if (isFebruaryBisextile(currentYear)) {
    february = 29
} else {
    february = 28
}

const numberOfDayInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

days.innerHTML = daysInWeekArray[currentDayOfWeek];
dates.innerHTML = currentDate;
months.innerHTML = monthArray[currentMonth];
years.innerHTML = currentYear;
// Fontion qui affiche l'heure
function time() {
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    if (hour < 10) hour = "0" + hour;
    if (min < 10) min = "0" + min;
    if (sec < 10) sec = "0" + sec;
    hours.innerHTML = hour + " :";
    minutes.innerHTML = min + " :";
    seconds.innerHTML = sec;
}
setInterval(time, 1000);

let yearContainer = document.querySelector('#yearContainer')
let monthContainer = document.querySelector('#monthContainer')

// Affichage de l'année et du mois courant
yearContainer.innerHTML = currentYear
monthContainer.innerHTML = monthArray[currentMonth]
// Execution de la fonction qui affiche le calendrier du mois courant au chargement de la page
window.onload = () => {
    displayCalendar()
}
// Bouton pour revenir au jour courant
goToday.addEventListener('click', () => {
    window.location.reload()
})
// Fonction qui affiche le calendrier du mois courant
function displayCalendar() {
    let firstDayOfMonthIndex = getFirstDayOfCurrentMonth.getDay()
    let numberOfDays = numberOfDayInMonth[currentMonth]
    let startPosition = ""
    if (firstDayOfMonthIndex === 1) {
        startPosition = 0
    } else if (firstDayOfMonthIndex === 2) {
        startPosition = 1
    } else if (firstDayOfMonthIndex === 3) {
        startPosition = 2
    } else if (firstDayOfMonthIndex === 4) {
        startPosition = 3
    } else if (firstDayOfMonthIndex === 5) {
        startPosition = 4
    } else if (firstDayOfMonthIndex === 6) {
        startPosition = 5
    } else if (firstDayOfMonthIndex === 0) {
        startPosition = 6
    }
    // Affichage des jours du mois courant
    for (let i = 1; i <= numberOfDays; i++) {
        let cases = document.querySelector('#id' + (startPosition + i))
        cases.innerHTML = i
    }
    // Met en avant le jour courant du mois
    let checkActiveYear = parseInt(yearContainer.innerHTML)
    let checkActiveMonth = monthArray.indexOf(monthContainer.innerHTML)
    if (checkActiveYear === currentYear && checkActiveMonth === currentMonth) {
        let activeDay = document.querySelector('#id' + (startPosition + currentDate))
        activeDay.classList.add('activeDay')
    }
    removeHoverCurrent()
    displayedCalendarToArray()
}
// Ajout d'un événement sur la flèche de droite pour afficher le mois suivant
let upMonthArrow = document.querySelector('#monthRightArrow')
upMonthArrow.addEventListener('click', () => {
    upMonth()
})
// Fonction qui affiche le mois suivant
function upMonth() {
    for (let i = 1; i <= 42; i++) {
        let cases = document.querySelector('#id' + i)
        cases.innerHTML = ""
        cases.classList.remove('activeDay')
    }
    let displayedYear = parseInt(yearContainer.innerHTML)
    // Check années bisextilles
    let nextYear = displayedYear + 1
    let februaryUp = ""
    if (isFebruaryBisextile(nextYear)) {
        februaryUp = 29
    } else {
        februaryUp = 28
    }
    // Affichage des jours dans les cases à partir du bon jour de la semaine
    const numberOfDayInFollowingMonth = [31, februaryUp, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let displayedMonth = monthContainer.innerHTML
    let indexOfDisplayedMonth = monthArray.indexOf(displayedMonth)
    if (indexOfDisplayedMonth === 11) {
        displayedYear++
        let yearUp = new Date(displayedYear, 0)
        let followingYear = yearUp.getFullYear()
        console.log(followingYear);
        yearContainer.innerHTML = followingYear
        let followingMonth = yearUp.getMonth()
        monthContainer.innerHTML = monthArray[followingMonth]
        let getIndexOfFirstDayOfFollowingMonth = yearUp.getDay()
        let startPosition = ""
        if (getIndexOfFirstDayOfFollowingMonth === 1) {
            startPosition = 0
        } else if (getIndexOfFirstDayOfFollowingMonth === 2) {
            startPosition = 1
        } else if (getIndexOfFirstDayOfFollowingMonth === 3) {
            startPosition = 2
        } else if (getIndexOfFirstDayOfFollowingMonth === 4) {
            startPosition = 3
        } else if (getIndexOfFirstDayOfFollowingMonth === 5) {
            startPosition = 4
        } else if (getIndexOfFirstDayOfFollowingMonth === 6) {
            startPosition = 5
        } else if (getIndexOfFirstDayOfFollowingMonth === 0) {
            startPosition = 6
        }
        // Affichage des jours du mois suivant
        for (let i = 1; i <= numberOfDayInFollowingMonth[followingMonth]; i++) {
            let cases = document.querySelector('#id' + (startPosition + i))
            cases.innerHTML = i
        }
        // Met en avant le jour courant du mois
        let checkActiveYear = parseInt(yearContainer.innerHTML)
        let checkActiveMonth = monthArray.indexOf(monthContainer.innerHTML)
        if (checkActiveYear === currentYear && checkActiveMonth === currentMonth) {
            let activeDay = document.querySelector('#id' + (startPosition + currentDate))
            activeDay.classList.add('activeDay')
        }
        removeHoverOthers()
        displayedCalendarToArray()
    } else if (indexOfDisplayedMonth < 11) {
        // Check années bisextilles
        let yearUp = displayedYear
        let februaryUp = ""
        if (isFebruaryBisextile(yearUp)) {
            februaryUp = 29
        } else {
            februaryUp = 28
        }
        // Affichage des jours dans les cases à partir du bon jour de la semaine
        const numberOfDayInFollowingMonth = [31, februaryUp, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let monthUp = new Date(displayedYear, indexOfDisplayedMonth + 1)
        followingMonth = monthUp.getMonth()
        monthContainer.innerHTML = monthArray[followingMonth]
        getIndexOfFirstDayOfFollowingMonth = monthUp.getDay()
        let startPosition = ""
        if (getIndexOfFirstDayOfFollowingMonth === 1) {
            startPosition = 0
        } else if (getIndexOfFirstDayOfFollowingMonth === 2) {
            startPosition = 1
        } else if (getIndexOfFirstDayOfFollowingMonth === 3) {
            startPosition = 2
        } else if (getIndexOfFirstDayOfFollowingMonth === 4) {
            startPosition = 3
        } else if (getIndexOfFirstDayOfFollowingMonth === 5) {
            startPosition = 4
        } else if (getIndexOfFirstDayOfFollowingMonth === 6) {
            startPosition = 5
        } else if (getIndexOfFirstDayOfFollowingMonth === 0) {
            startPosition = 6
        }
        // Affichage des jours du mois suivant
        for (let i = 1; i <= numberOfDayInFollowingMonth[followingMonth]; i++) {
            let cases = document.querySelector('#id' + (startPosition + i))
            cases.innerHTML = i
        }
        // Met en avant le jour courant du mois
        let checkActiveYear = parseInt(yearContainer.innerHTML)
        let checkActiveMonth = monthArray.indexOf(monthContainer.innerHTML)
        if (checkActiveYear === currentYear && checkActiveMonth === currentMonth) {
            let activeDay = document.querySelector('#id' + (startPosition + currentDate))
            activeDay.classList.add('activeDay')
        }
        removeHoverOthers()
        displayedCalendarToArray()
    }
}
// Ajout d'un événement sur la flèche de gauche pour afficher le mois précédent
let downMonthArrow = document.querySelector('#monthLeftArrow')
downMonthArrow.addEventListener('click', () => {
    downMonth()
})
// Fonction qui affiche le mois précédent
function downMonth() {
    for (let i = 1; i <= 42; i++) {
        let cases = document.querySelector('#id' + i)
        cases.innerHTML = ""
        cases.classList.remove('activeDay')
    }
    let displayedYear = parseInt(yearContainer.innerHTML)
    // Check années bisextilles
    let backYear = displayedYear - 1
    let februaryDown = ""
    if (isFebruaryBisextile(backYear)) {
        februaryDown = 29
    } else {
        februaryDown = 28
    }
    // Affichage des jours dans les cases à partir du bon jour de la semaine
    const numberOfDayInBackMonth = [31, februaryDown, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let displayedMonth = monthContainer.innerHTML
    let indexOfDisplayedMonth = monthArray.indexOf(displayedMonth)
    if (indexOfDisplayedMonth === 0) {
        displayedYear--
        let yearDown = new Date(displayedYear, 11)
        let backYear = yearDown.getFullYear()
        console.log(backYear);
        yearContainer.innerHTML = backYear
        let backMonth = yearDown.getMonth()
        monthContainer.innerHTML = monthArray[backMonth]
        let getIndexOfFirstDayOfBackMonth = yearDown.getDay()
        let startPosition = ""
        if (getIndexOfFirstDayOfBackMonth === 1) {
            startPosition = 0
        } else if (getIndexOfFirstDayOfBackMonth === 2) {
            startPosition = 1
        } else if (getIndexOfFirstDayOfBackMonth === 3) {
            startPosition = 2
        } else if (getIndexOfFirstDayOfBackMonth === 4) {
            startPosition = 3
        } else if (getIndexOfFirstDayOfBackMonth === 5) {
            startPosition = 4
        } else if (getIndexOfFirstDayOfBackMonth === 6) {
            startPosition = 5
        } else if (getIndexOfFirstDayOfBackMonth === 0) {
            startPosition = 6
        }
        // Affichage des jours du mois précédent
        for (let i = 1; i <= numberOfDayInBackMonth[backMonth]; i++) {
            let cases = document.querySelector('#id' + (startPosition + i))
            cases.innerHTML = i
        }
        // Met en avant le jour courant du mois
        let checkActiveYear = parseInt(yearContainer.innerHTML)
        let checkActiveMonth = monthArray.indexOf(monthContainer.innerHTML)
        if (checkActiveYear === currentYear && checkActiveMonth === currentMonth) {
            let activeDay = document.querySelector('#id' + (startPosition + currentDate))
            activeDay.classList.add('activeDay')
        }
        removeHoverOthers()
        displayedCalendarToArray()
    } else if (indexOfDisplayedMonth > 0) {
        // check années bisextilles
        let backYear = displayedYear
        let februaryDown = ""
        if (isFebruaryBisextile(backYear)) {
            februaryDown = 29
        } else {
            februaryDown = 28
        }
        // Affichage des jours dans les cases à partir du bon jour de la semaine
        const numberOfDayInBackMonth = [31, februaryDown, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let monthDown = new Date(displayedYear, indexOfDisplayedMonth - 1)
        backMonth = monthDown.getMonth()
        monthContainer.innerHTML = monthArray[backMonth]
        getIndexOfFirstDayOfBackMonth = monthDown.getDay()
        let startPosition = ""
        if (getIndexOfFirstDayOfBackMonth === 1) {
            startPosition = 0
        } else if (getIndexOfFirstDayOfBackMonth === 2) {
            startPosition = 1
        } else if (getIndexOfFirstDayOfBackMonth === 3) {
            startPosition = 2
        } else if (getIndexOfFirstDayOfBackMonth === 4) {
            startPosition = 3
        } else if (getIndexOfFirstDayOfBackMonth === 5) {
            startPosition = 4
        } else if (getIndexOfFirstDayOfBackMonth === 6) {
            startPosition = 5
        } else if (getIndexOfFirstDayOfBackMonth === 0) {
            startPosition = 6
        }
        // Affichage des jours du mois précédent
        for (let i = 1; i <= numberOfDayInBackMonth[backMonth]; i++) {
            let cases = document.querySelector('#id' + (startPosition + i))
            cases.innerHTML = i
        }
        // Met en avant le jour courant du mois
        let checkActiveYear = parseInt(yearContainer.innerHTML)
        let checkActiveMonth = monthArray.indexOf(monthContainer.innerHTML)
        if (checkActiveYear === currentYear && checkActiveMonth === currentMonth) {
            let activeDay = document.querySelector('#id' + (startPosition + currentDate))
            activeDay.classList.add('activeDay')
        }
        removeHoverOthers()
        displayedCalendarToArray()
    }
}
// Fonction qui enlève les hover des cases vides des calendriers précédents et suivants
function removeHoverOthers() {
    for (let i = 1; i <= 42; i++) {
        let allCases = document.querySelector('#id' + i)
        allCases.classList.remove('emptyCases')
        allCases.classList.add('cases')
        if (allCases.innerHTML === "") {
            allCases.classList.remove('cases')
            allCases.classList.add('emptyCases')
        }
    }
}
// Fonction qui enlève les hover des cases vides du calendrier courant
function removeHoverCurrent() {
    for (let i = 1; i <= 42; i++) {
        let allCases = document.querySelector('#id' + i)
        if (allCases.innerHTML === "") {
            allCases.classList.remove('cases')
            allCases.classList.add('emptyCases')
        }
    }
}
// Fonction qui récupère le calendrier affiché et le push dans un tableau à partir de l'index 1
function displayedCalendarToArray() {
    let displayedArray = []
    // On push une case vide à l'index 0 avant de push le calendrier dans le tableau pour faire
    // correspondre les id des éléments html et les index du tableau
    displayedArray.push('')
    for (let i = 1; i <= 42; i++) {
        let casesToCatch = document.querySelector('#id' + i)
        console.log(casesToCatch.innerHTML);
        displayedArray.push(casesToCatch.innerHTML)
    }
    console.log(displayedArray);
}
// Fonction qui récupère la date cliquée
function getClickedDate() {
    let allCases = document.querySelectorAll('.cases')
    allCases.forEach((element) => {
        element.addEventListener('click', () => {
            let value = element.innerHTML
            if (value === "") {
                value = "empty"
            }
            console.log(value);
            if (value != "empty") {
                let clickedDate = new Date(yearContainer.innerHTML, monthArray.indexOf(monthContainer.innerHTML), value)
                let dayOfWeek = clickedDate.getDay()
                let dayOfWeekString = daysInWeekArray[dayOfWeek]
                console.log(clickedDate);
                alert("Vous avez cliqué sur le " + dayOfWeekString + " " + value + " " + monthContainer.innerHTML + " " + yearContainer.innerHTML)
            }
        })
    })
}
getClickedDate()