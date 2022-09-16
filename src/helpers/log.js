const getHour = () => {
    const date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if (hour < 10)
        hour = "0" + hour.toString();

    if (minutes < 10)
        minutes = "0" + minutes.toString();

    if (seconds < 10)
        seconds = "0" + seconds.toString();

    return `\x1b[43m\x1b[30m${hour}:${minutes}:${seconds}\x1b[0m - `;
};

const log = {
    blue: value => console.log(`${getHour()}\x1b[34m${value}\x1b[0m`),
    cyan: value => console.log(`${getHour()}\x1b[36m${value}\x1b[0m`),
    green: value => console.log(`${getHour()}\x1b[32m${value}\x1b[0m`),
    magenta: value => console.log(`${getHour()}\x1b[35m${value}\x1b[0m`),
    red: value => console.log(`${getHour()}\x1b[31m${value}\x1b[0m`),
    yellow: value => console.log(`${getHour()}\x1b[33m${value}\x1b[0m`),
    white: value => console.log(`${getHour()}\x1b[37m${value}\x1b[0m`)
};

export default log;