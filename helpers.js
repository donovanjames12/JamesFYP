export function formatDate(date) {
    try {
        
        let day = ("0" + date.getDate()).slice(-2) // https://stackoverflow.com/questions/6040515/how-do-i-get-month-and-date-of-javascript-in-2-digit-format/18610204
        let month = ("0" + (date.getMonth() + 1)).slice(-2)   

        let year = date.getFullYear()

        return day + "/" + month + "/" + year // Getting individual values from date object for day, month, and year and concatenating them together. 
    } catch(error) {
        alert("Format Date: " + error.message)
    }
}