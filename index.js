// Your code here

function createEmployeeRecord ([firstName,lastName, title, rate]){
    return {
        firstName: firstName,
        familyName: lastName,
        title: title,
        payPerHour: rate,
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords (arr) {
    let employeeRecords = []
    arr.forEach(item => createEmployeeRecords.push(createEmployeeRecord(item)))
    return employeeRecords
}

function createEmployeeRecords (employeeRecordData) {
    return employeeRecordData.map(function(empR){return createEmployeeRecord(empR)})
}

function createTimeInEvent (employee, timeIn) {
    let timeArray = timeIn.split(" ")
    let timeInEvent = {
        type: "TimeIn",
        hour: parseInt(timeArray[1]),
        date: timeArray[0]
    }
    employee.timeInEvents.push(timeInEvent)
    return employee
}

function createTimeOutEvent (employee, timeOut) {
    let timeArray = timeOut.split(" ")
    let timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(timeArray[1]),
        date: timeArray[0]
    }
    employee.timeOutEvents.push(timeOutEvent)
    return employee
}

function hoursWorkedOnDate (employee, dateFormatted) {
    let clockInEvent = employee.timeInEvents.find(function(e){
        return e.date === dateFormatted
    })
    let clockOutEvent = employee.timeOutEvents.find(function(e){
        return e.date === dateFormatted
    })
    return (clockOutEvent - clockInEvent)
}

function wagesEarnedOnDate(employee, date) {
    let wagesEarned = employee.payPerHour
    let hoursWorked = hoursWorkedOnDate(employee, date)
    return wagesEarned * hoursWorked
}

function allWagesFor(employee) {
    let allDays = []

    let datesWorked = employee.timeInEvents.map(element => element.date)
    let total = 0;

    datesWorked.forEach(element => {
        total += wagesEarnedOnDate(employee, element)
        console.log(total)
    })
    return total;
}

function calculatePayroll(employees){
    return employees.reduce((sum, employee)=> {
        return sum + allWagesFor(employee)
    }, 0)
}
