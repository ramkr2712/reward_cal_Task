import { CUSTOMERS, TRANSACTIONS } from '../constant/cust-transactions';
import { JAN, FEB, MAR, APR, MAY, JUN, JUL,
     AUG, SEPT, OCT, NOV, DEC } from '../constant/monthname';

const getTransactionDetailOfCustomer = (startDate, endDate) => {
    const searchedTransactions = TRANSACTIONS.filter((tran) => tran.tran_date > startDate && tran.tran_date < endDate);
    if (searchedTransactions.length > 0) {
        const data = [];
        const customers = searchedTransactions.map((tran) => tran.cust_id);
        const uniqueCustomers = Array.from(new Set(customers));
        return new Promise(async (resolve) => {
            for (let custId of uniqueCustomers) {
                const filteredTransactions = searchedTransactions.filter((trn) => trn.cust_id === custId);
                let dataCustWise = await Promise.resolve(getRewardPoints(custId, [...filteredTransactions]));
                data.push(dataCustWise);
            }
            resolve(data);
        });
    }
    else {
        return Promise.resolve([]);
    }
}

const getRewardPoints = async (customerId, transactions) => {
    let data = {};
    const transMonthWise = await Promise.resolve(transactions.map(transaction => {
        let points = 0;
        let overHundred = transaction.transaction_amt - 100;

        if (overHundred > 0) {
            points += (overHundred * 2);
        }
        if (transaction.transaction_amt > 50) {
            points += 50;
        }
        const month = new Date(transaction.tran_date).getMonth();
        return { ...transaction, points, month };
    }));
    data.name = CUSTOMERS.find((customer) => customer.id === customerId).name;
    let totalRewards = 0;
    for (let i = 0; i < 12; i++) {
        let month = getMonthByIndex(i);
        let monthlyTrans = await transMonthWise.filter((transaction) => transaction.month === i);
        let initialPoints = 0;
        let rewards = monthlyTrans.length > 0 ? monthlyTrans.reduce((total, current) => { return total + current.points }, initialPoints) : 0;
        data[month] = rewards;
        totalRewards += rewards;
    }
    data["total"] = totalRewards;
    return data;
}

const getMonthByIndex = (index) => {
    switch (index) {
        case 0:
            return JAN;
        case 1:
            return FEB;
        case 2:
            return MAR;
        case 3:
            return APR;
        case 4:
            return MAY;
        case 5:
            return JUN;
        case 6:
            return JUL;
        case 7:
            return AUG;
        case 8:
            return SEPT;
        case 9:
            return OCT;
        case 10:
            return NOV;
        case 11:
            return DEC;
        default:
            return '';
    }
}

export {
    getTransactionDetailOfCustomer
}