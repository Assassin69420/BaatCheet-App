export function extractTime(dataString) {
    const date = new Date(dataString);
    const hour = padZero(date.getHours());
    const minute = padZero(date.getMinutes());
    return `${hour}:${minute}`;
}

function padZero(number) {
    return number.toString().padStart(2, '0');
}