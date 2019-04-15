const Months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
]

const Days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
]

const firstDayOfMonth = (month, year) => {
  let genDate = new Date(year, month, 1);
  return genDate;
}

const lastDayOfMonth = (month, year) => {
  let genDate = new Date(year, month + 1, 0)
  return genDate;
}

let calendar = {}

const generateDaysForMonth = (month, year, calendar) => {
  month = !isNaN(parseInt(month)) ? month : Months[month];
  let firstDay = firstDayOfMonth(month, year)
  let lastDay = lastDayOfMonth(month, year)
  calendar[year] = calendar[year] ? calendar[year] : {};
  calendar[year][month] = {
    start: firstDay.getDay(),
    end: lastDay.getDate()
  }
}

const getDataForYear = (year, calendar) => {
  for(let i = 0; i < 12; i++){
    generateDaysForMonth(i, year, calendar)
  }
}
//populate the above object with all the days for the month when a specific month is to be obtained

let month = (new Date()).getMonth();
let year = (new Date()).getYear() + 1900;
getDataForYear(year, calendar);

const printMonth = (month, year, calendar) => {
  for(let i = calendar[year][month].start, date = 1; i <= calendar[year][month].end; i++, date++)
    document.getElementById(i).innerHTML = date;
  document.getElementById("month").innerHTML = Months[month]
  document.getElementById("year").innerHTML = year;
}

printMonth(month, year, calendar);
