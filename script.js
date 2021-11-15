let nav = 0;
let clicked = null;
let events = localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events")) : [];

const calendar = document.getElementById("calendar")
const weekdays = ["Sunday", "Monday", "Tuesday", "Wenesday", "Thursday", "Friday", "Saturday" ];

function load() {
    const dt = new Date();

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

    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

    for(let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement("div");
        daySquare.classList.add("day");
        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;

            daySquare.addEventListener("click", () => {
                console.log("click");
            })
        } else {
            daySquare.classList.add("padding");
        }
        calendar.appendChild(daySquare);
    }
    console.log(paddingDays)
}

load();