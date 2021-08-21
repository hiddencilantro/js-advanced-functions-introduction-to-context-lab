function createEmployeeRecord(arr) {
    const employeeRecord = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employeeRecord;
}

function createEmployeeRecords(arr) {
    return arr.map(infoArray => createEmployeeRecord(infoArray));
}

function createTimeInEvent(record, datestamp) {
    const datestampArray = datestamp.split(' ');
    const timeInObject = {
        type: "TimeIn",
        hour: parseInt(datestampArray[1]),
        date: datestampArray[0]
    };
    record.timeInEvents.push(timeInObject);
    return record;
}

function createTimeOutEvent(record, datestamp) {
    const datestampArray = datestamp.split(' ');
    const timeOutObject = {
        type: "TimeOut",
        hour: parseInt(datestampArray[1]),
        date: datestampArray[0]
    };
    record.timeOutEvents.push(timeOutObject);
    return record;
}

function hoursWorkedOnDate(record, dateInput) {
    const timeIn = record.timeInEvents.find(element => element.date === dateInput);
    const timeOut = record.timeOutEvents.find(element => element.date === dateInput);
    if (timeIn && timeOut) {
        return (parseInt(timeOut.hour) - parseInt(timeIn.hour))/100;
    };
}

function wagesEarnedOnDate(record, dateInput) {
    return hoursWorkedOnDate(record, dateInput) * record.payPerHour;
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
    return arr.map(element => allWagesFor(element)).reduce((totalPay, currentValue) => totalPay + currentValue, 0);
}
