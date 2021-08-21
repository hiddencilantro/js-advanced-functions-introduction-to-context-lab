function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arr) {
    return arr.map(infoArray => createEmployeeRecord(infoArray));
}

function createTimeInEvent(record, datestamp) {
    const [date, hour] = datestamp.split(' ');
    const timeInObject = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    };
    record.timeInEvents.push(timeInObject);
    return record;
}

function createTimeOutEvent(record, datestamp) {
    const [date, hour] = datestamp.split(' ');
    const timeOutObject = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    };
    record.timeOutEvents.push(timeOutObject);
    return record;
}

function hoursWorkedOnDate(record, dateInput) {
    const timeIn = record.timeInEvents.find(element => element.date === dateInput);
    const timeOut = record.timeOutEvents.find(element => element.date === dateInput);
    if (timeIn && timeOut) {
        return (timeOut.hour - timeIn.hour)/100;
    };
}

function wagesEarnedOnDate(record, dateInput) {
    return parseFloat(hoursWorkedOnDate(record, dateInput) * record.payPerHour);
}

function allWagesFor(record) {
    return record.timeInEvents.reduce((totalWage, currentValue) => {
        return totalWage + wagesEarnedOnDate(record, currentValue.date);
    }, 0);
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(element => element.firstName === firstName);
}

function calculatePayroll(arr) {
    return arr.reduce((totalPay, currentValue) => totalPay + allWagesFor(currentValue), 0);
}
