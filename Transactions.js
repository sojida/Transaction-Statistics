const Statistics = require('./Statistics');

class Transactions {
    constructor() {
        this.transactions = [];
        this.statistics = Statistics;
    }

    checkTransactionSixtySecondsLess() {
        setInterval(() => {
            const lastTransaction = this.transactions[this.transactions.length - 1];
            if (lastTransaction && lastTransaction.lessThanSixtySeconds()) {
                this.transactions.pop();
                this.statistics.runStatistics(this.transactions);
            }
        }, 1000)
    }

    clear() {
        this.transactions = [];
        this.statistics.runStatistics(this.transactions);
    }


    save(transaction) {
        if (!this.transactions.length) {
            this.transactions.push(transaction)
            this.statistics.runStatistics(this.transactions);
            return true;
        }
    
        let currentIndex = 0;
    
        while (currentIndex < this.transactions.length) {
            let currentTransaction = this.transactions[currentIndex];
    
            if (transaction._milliseconds >= currentTransaction._milliseconds) {
                this.transactions.splice(currentIndex, 0, transaction)
                break;
            } 
    
            currentIndex++
        }
    
        if (currentIndex >= this.transactions.length) {
            this.transactions.push(transaction)
        }

        this.statistics.runStatistics(this.transactions);
        return true;
    }
}

module.exports = new Transactions();
