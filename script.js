let nav = 0;
let clicked = null;
let events = localStorage.getItem("events") ?
    JSON.parse(localStorage.getItem("events")) :
    [];

const calendar = document.getElementById("calendar");
const newEventModal = document.getElementById("newEventModal");
const newEventModalGlobal = document.getElementById("newEventModalGlobal");
const deleteEventModal = document.getElementById("deleteEventModal");
const backDrop = document.getElementById("modalBackDrop");
const eventTitleInput = document.getElementById("eventTitleInput");
const eventTitleInputGlobal = document.getElementById("eventTitleInputGlobal");
let initialDateGlobal = document.getElementById("initialDateGlobal");
let endDateGlobal = document.getElementById("EndDateGlobal")
let descriptiontGlobal = document.getElementById("descriptiontGlobal")
let eventTypeGlobal = document.getElementById("eventTypeGlobal")

let initialDate = document.getElementById("initialDate")
let endDate = document.getElementById("endDate")
let eventType = document.getElementById("eventType")
let description = document.getElementById("description")

const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
let yearGlobal = 0;

function openModal(date) {
    clicked = date;
    const eventForDay = events.find((e) => e.date === clicked);

    if (eventForDay) {
        document.getElementById("eventText").innerText = eventForDay.title;
        deleteEventModal.style.display = "block";
    } else {
        newEventModal.style.display = "block";
    }

    backDrop.style.display = "block";
}

function changeYear(number) {
    nav = 0;
    nav = nav + 12 * number;
    load();
}

function showYear() {
    var table = document.getElementById("tableyear");
    var counter = -12;
    for (var i in table.rows) {
        var row = table.rows[i];
        for (var j in row.cells) {
            if (isNaN(j)) break;
            var col = row.cells[j];
            var actualYear = yearGlobal + counter;
            col.innerHTML =
                "<button class='buttonYear' value='" +
                counter +
                "' onclick='changeYear(value)'>" +
                actualYear +
                "</button>";
            counter = counter + 1;
        }
    }
}

function OpenModalGlobal() {
    backDrop.style.display = "block";
    newEventModalGlobal.style.display = "block";
}

function load() {
    const dt = new Date();
    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    const hour = dt.getHours();
    const minutes = dt.getMinutes();
 
    const firstDayOfNMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfNMonth.toLocaleDateString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });

    let weekdayStrings = firstDayOfNMonth.toLocaleDateString("en-GB", {
        weekday: "long",
    });

    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);
    document.getElementById("monthDisplay").innerText = dt.toLocaleDateString(
        "en-GB", {
            month: "long"
        }
    );

    var yearDiv = document.getElementById("yearDisplay");
    yearDiv.innerText = year;
    yearGlobal = year;
    yearDiv.addEventListener("click", showYear);

    calendar.innerHTML = "";

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement("div");
        daySquare.classList.add("day");

        const dayString = `${i - paddingDays}/${month + 1}/${year}`;

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;

            const eventForDay = events.find((e) => e.date === dayString);

            if (i - paddingDays === day && nav === 0) {
                daySquare.id = "currentDay";
            }

            if (eventForDay) {
                const eventDiv = document.createElement("div");
                eventDiv.classList.add("event");
                eventDiv.innerText = eventForDay.title;
                daySquare.appendChild(eventDiv);
            }

            daySquare.addEventListener("click", () => openModal(dayString));
        } else {
            daySquare.classList.add("padding");
        }
        calendar.appendChild(daySquare);
    }
}



function closeModal() {
    eventTitleInput.classList.remove("error");
    newEventModal.style.display = "none";
    deleteEventModal.style.display = "none";
    newEventModalGlobal.style.display = "none";
    backDrop.style.display = "none";
    eventTitleInput.value = "";
    clicked = null;
    load();
}

document.addEventListener('keydown', function(esc){
	if(esc.key === "Escape"){
        closeModal()
    }})

function saveEvent() {
    let finishDate = endDate.value

 let b = new Date(finishDate)


 let finishDateFormat = b.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false
 })

    if (eventTitleInput.value) {
        eventTitleInput.classList.remove("error");

        events.push({
            date: clicked,
            title: eventTitleInput.value,
            hour: initialDate.value,
            eventEndDate: finishDateFormat,
            eventDescription: description.value,
            eventEventType: eventType.value
            

        });

        localStorage.setItem("events", JSON.stringify(events));
        closeModal();
    } else {
        eventTitleInput.classList.add("error");
    }
}

function endDateDisplay() {
        document.getElementById("endDate").classList.toggle("displayBlock")
}
function endDateDisplayGlobal() {
    document.getElementById("EndDateGlobal").classList.toggle("displayBlock")
}


function saveEventGlobal() {
    let inputDate = initialDateGlobal.value;
    let endDates = endDateGlobal.value;

 let z = new Date(endDates)
 let x = new Date(inputDate)

 let endDateFormat = z.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false
 })

 let dateFormat = x.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false
 })

let r = dateFormat.split(", ")
 console.log(r)

 if (dateFormat) {
    eventTitleInputGlobal.classList.remove("error")

    events.push({
        date: r[0],
        title: eventTitleInputGlobal.value,
        hour: r[1],
        eventEndDate: endDateFormat,
        eventDescription: descriptiontGlobal.value,
        eventEventType: eventTypeGlobal.value
    
    })

    localStorage.setItem("events", JSON.stringify(events))
    closeModal()
}else {
    eventTitleInputGlobal.classList.add("error")
}


}

function deleteEvent() {
    events = events.filter((e) => e.date !== clicked);
    localStorage.setItem("events", JSON.stringify(events));
    closeModal();
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

    document.getElementById("saveButton").addEventListener("click", saveEvent);
    document
        .getElementById("saveButton2")
        .addEventListener("click", saveEventGlobal);
    document.getElementById("cancelButton").addEventListener("click", closeModal);
    document
        .getElementById("cancelButton2")
        .addEventListener("click", closeModal);

    document
        .getElementById("deleteButton")
        .addEventListener("click", deleteEvent);
    document.getElementById("closeButton").addEventListener("click", closeModal);

    document
        .getElementById("eventGlobal")
        .addEventListener("click", OpenModalGlobal);
}

initButtons();

load();

console.log(events)
