const months = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec'
]


export const first_date = (year) => {
  return dateToSearch(new Date(year, 0, 1))
}

export const last_date = (year) => {
  return dateToSearch(new Date(year, 11, 31))
}

export const dateToSearch = (date) => {
  let month = date.getMonth() + 1
  if (month < 10) {
    month = "0" + month
  }
  let day = date.getDate()
  if (day < 10) {
    day = "0" + day
  }
  return `${date.getFullYear()}-${month}-${day}`
}


export const getFormattedMonth = (num) => {
  return months[num]
}

export const formatNumber = (num) => {
  return num?.toLocaleString(undefined, { minimumFractionDigits: 2 })
}

export const formatNumberNoFractions = (num) => {
  return num?.toLocaleString(undefined, { minimumFractionDigits: 0 })
}

export const formatDate = (dateString) => {
  var date = new Date(dateString)
  return date.getDay() + ' ' + months[date.getMonth()]
}

export const formatDateInput = (date) => {
  return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate());
}

function pad(number) {
  if (number <= 9999) {
    number = ("0" + number).slice(-2);
  }
  return number;
}

export const groupBy = function(values, grouping) {

  return values.reduce(function(rv, value) {

    (rv[grouping(value)] = rv[grouping(value)] || []).push(value);
    return rv;
  }, {});
};