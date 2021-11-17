let nav = 0;
let clicked = null;
let events = localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events")) : [];

const calendar = document.getElementById("calendar")
const newEventModal = document.getElementById("newEventModal")
const newEventModalGlobal = document.getElementById("newEventModalGlobal")
const deleteEventModal = document.getElementById("deleteEventModal")
const backDrop = document.getElementById("modalBackDrop")
const eventTitleInput = document.getElementById("eventTitleInput")
const eventTitleInputGlobal = document.getElementById("eventTitleInputGlobal")
let initialDate = document.getElementById("initialDate")
const weekdays = ["Sunday", "Monday", "Tuesday", "Wenesday", "Thursday", "Friday", "Saturday" ];

function openModal(date) {
    clicked = date;

    const eventForDay = events.find(e => e.date === clicked)

    if (eventForDay) {
        document.getElementById("eventText").innerText = eventForDay.title
        deleteEventModal.style.display = "block"
    } else {
        newEventModal.style.display = "block"
    }

    backDrop.style.display = "block"
}

function OpenModalGlobal() {
    backDrop.style.display = "block"
    newEventModalGlobal.style.display = "block"
}

function load() {
    const dt = new Date();
    if(nav !==0) {
        dt.setMonth(new Date().getMonth() + nav);
    }

  console.log(Date)

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfNMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString =firstDayOfNMonth.toLocaleDateString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric"
    });

    let weekdayStrings = firstDayOfNMonth.toLocaleDateString("en-GB", {
        weekday: "long"
    });

    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);
    document.getElementById("monthDisplay").innerText = dt.toLocaleDateString("en-GB", {month: "long"})+ " " + year;

    console.log(paddingDays)
    
calendar.innerHTML = "";


    for( let i = 1 ; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement("div");
        daySquare.classList.add("day");

        const dayString = `${i - paddingDays}/${month + 1}/${year}`;

        

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;

            const eventForDay = events.find(e => e.date === dayString)


            if (eventForDay) {
                const eventDiv = document.createElement("div")
                eventDiv.classList.add("event")
                eventDiv.innerText = eventForDay.title
                daySquare.appendChild(eventDiv)
            }

            daySquare.addEventListener("click", () => openModal(dayString))
        } else {
            daySquare.classList.add("padding");
        }
        calendar.appendChild(daySquare);
    }
}

function closeModal() {
    eventTitleInput.classList.remove("error")
    newEventModal.style.display = "none";
    deleteEventModal.style.display = "none";
    newEventModalGlobal.style.display = "none";
    backDrop.style.display = "none";
    eventTitleInput.value = "";
    clicked = null;
    load();
}

function saveEvent() {
    if (eventTitleInput.value) {
        eventTitleInput.classList.remove("error")

        events.push({
            date: clicked,
            title: eventTitleInput.value
        })

        localStorage.setItem("events", JSON.stringify(events))
        closeModal()
    }else {
        eventTitleInput.classList.add("error")
    }
}

function saveEventGlobal() {
    let inputDate = initialDate.value;
    console.log(inputDate)



    if (eventTitleInput.value) {
        eventTitleInput.classList.remove("error")
        events.push({
            date: inputDate,
            title: eventTitleInput.value
})
localStorage.setItem("events", JSON.stringify(events))
        closeModal()
    }else {
        eventTitleInput.classList.add("error")
    }
}


function deleteEvent() {
    events = events.filter(e => e.date !== clicked)
    localStorage.setItem("events", JSON.stringify(events))
    closeModal()
}

function initButtons() {
document.getElementById("nextButton").addEventListener("click", () => {
nav++;
load();
});

document.getElementById("backButton").addEventListener("click", () => {
    nav--;
    load();
    });

    document.getElementById("saveButton").addEventListener("click", saveEvent)
    document.getElementById("saveButton2").addEventListener("click", saveEventGlobal)
    document.getElementById("cancelButton").addEventListener("click", closeModal)
    document.getElementById("cancelButton2").addEventListener("click", closeModal)

    document.getElementById("deleteButton").addEventListener("click", deleteEvent)
    document.getElementById("closeButton").addEventListener("click", closeModal)

    document.getElementById("eventGlobal").addEventListener("click", OpenModalGlobal)
}

initButtons();

load();

