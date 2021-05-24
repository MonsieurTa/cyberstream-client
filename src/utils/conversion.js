const suffixes = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

export function convertDataUnit(size) {
    let i = 0;

    while (size >= 1000) {
        size *= 2 ** -10
        i++;
    }
    return size.toFixed(2).toString(10) + " " + suffixes[i];
}
