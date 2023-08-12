function reverseDate(date) {
    const dateObject = new Date(date);
    const dateString = dateObject.toLocaleDateString();
    const reversedDateString = dateString.split('-').reverse().join('-');
    return reversedDateString;
}

export default reverseDate;
