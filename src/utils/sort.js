export function sort(users, sortBy, sortDir) {
    let direction = (sortDir == 'asc') ? 1 : -1;
    const sorted = [].slice.call(users).sort((a, b) => {
        if (a[sortBy] === b[sortBy]) { return 0; }
        return a[sortBy] > b[sortBy] ? direction : direction * -1;
    });
    return sorted;
}
