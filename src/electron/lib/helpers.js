export function padTwo(nr) {
    const padded = ('00' + nr).slice(-2);
    return padded;
}
