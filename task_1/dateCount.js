
Date.prototype.daysTo = function(secondDate) {
    if (!(secondDate instanceof Date)) {
        throw new TypeError('Enter a valid Date object');
    }
    
    const date1 = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    const date2 = new Date(secondDate.getFullYear(), secondDate.getMonth(), secondDate.getDate());
    
    const timeDiff = date2.getTime() - date1.getTime();
    return Math.floor(timeDiff / (24 * 60 * 60 * 1000));
};

function test() {
    
    console.log('Days from Jan 1 to Jan 5:', new Date('2024-01-01').daysTo(new Date('2024-01-05')));

    console.log('Days from Jan 5 to Jan 1:', new Date('2024-01-05').daysTo(new Date('2024-01-01')));

    console.log('Days between same date:', new Date('2024-01-01').daysTo(new Date('2024-01-01')));

    console.log('Days from Jan 31 to Feb 2:', new Date('2024-01-31').daysTo(new Date('2024-02-02')));

    console.log('Days from Dec 31, 2023 to Jan 2, 2024:', new Date('2023-12-31').daysTo(new Date('2024-01-02')));
}

test();