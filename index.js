// Your code here

function createEmployeeRecord(empArray){
    return {
        firstName: empArray[0],
        familyName: empArray[1],
        title: empArray[2],
        payPerHour: empArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(empArrays){
    let employeeRecordsArray = []
    for (let empArray of empArrays){
        let employeeRecord = createEmployeeRecord(empArray)
        employeeRecordsArray.push(employeeRecord)
    }
    return employeeRecordsArray
}

function createTimeInEvent(employeeRecord, dateString){
    let createTimeInEvent = {
        type: "TimeIn",
        hour: parseInt(dateString.split(" ")[1]),
        date: dateString.split(" ")[0]
    }
    employeeRecord.timeInEvents.push(createTimeInEvent)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateString){
    let createTimeOutEvent = {
        type: "TimeOut",
        hour: parseInt(dateString.split(" ")[1]),
        date: dateString.split(" ")[0]
    }
    employeeRecord.timeOutEvents.push(createTimeOutEvent)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, workDate){
    let timeIn = employeeRecord.timeInEvents
    let timeOut = employeeRecord.timeOutEvents
    let timeInEventForDate = timeIn.find(event => event.date === workDate);
    let timeOutEventForDate = timeOut.find(event => event.date === workDate);
    return (timeOutEventForDate.hour/100) - (timeInEventForDate.hour/100)
}

function wagesEarnedOnDate(employeeRecord, workDate){
  return hoursWorkedOnDate(employeeRecord, workDate) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
    const allWages = employeeRecord.timeInEvents.map(event => wagesEarnedOnDate(employeeRecord, event.date));
    return allWages.reduce((total, wage) => total + wage, 0); 
}


function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, employeeRecord) => {
        return total + allWagesFor(employeeRecord);
    }, 0);
    console.log(totalPayroll);
    return totalPayroll;
}