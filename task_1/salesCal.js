
function processSales(salesData) {
    
    const processedSales = salesData.map(sale => ({
        ...sale,
        Total: sale.amount * sale.quantity
    }));

    
    return processedSales.sort((a, b) => b.Total - a.Total);
}

const inputSales = [
    { amount: 10000, quantity: 10 },
    { amount: 5000, quantity: 25 },
    { amount: 15000, quantity: 5 }
];

console.log('sorted array:', processSales(inputSales));