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
  return calendar[year];
}
//populate the above object with all the days for the month when a specific month is to be obtained


const printMonth = (month, year, calendar) => {
  for(let i = 0; i < 35; i++){
    document.getElementById(i).innerHTML = ""
    console.log(document.getElementById(i).className);
  }
  for(let i = calendar[year][month].start, date = 1; date <= calendar[year][month].end; i++, date++)
    document.getElementById(i%35).innerHTML = date;
  document.getElementById("month").innerHTML = Months[month]
  document.getElementById("year").innerHTML = year;
}


let cal = {
  calendar: {},
  month: (new Date()).getMonth(),
  year: (new Date()).getYear() + 1900
}

console.log(cal.month, cal.year)
getDataForYear(cal.year, cal.calendar)
printMonth(cal.month, cal.year, cal.calendar);

const setMonth = (months, cal) => {
  if(months < 0){
    if(months == -12)
      cal.year--;
    else if(cal.month == 0){
      cal.year--;
      cal.month = 11;
    }else
      cal.month--;
  }else if(months > 0){
    if(months == 12)
      cal.year++;
    else if(cal.month == 11){
      cal.year++;
      cal.month = 0;
    }else {
      cal.month++;
    }
  }else{  //Reset calendar to current month
    cal.month = (new Date()).getMonth(),
    cal.year = (new Date()).getYear() + 1900
  }
}

const updateMonth = (months) => {
  setMonth(months, cal)
  if(!cal.calendar[cal.year])
    getDataForYear(cal.year, cal.calendar)
  printMonth(cal.month, cal.year, cal.calendar)
}
