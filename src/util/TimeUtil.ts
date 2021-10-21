function format(time: number): [string, string, string] {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const second = Math.floor(time % 60);

    return [padZero(hours), padZero(minutes), padZero(second)];
}

function padZero(time: number) {
    return time.toString().padStart(2, '0');
}

export const TimeUtil = Object.freeze({
    format,
});
