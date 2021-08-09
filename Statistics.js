class Statistics {
    constructor() {
        this.transactions = [];
        this.sum = Number(0).toFixed(2);
        this.avg = Number(0).toFixed(2);
        this.max = Number(0).toFixed(2);
        this.min = Number(0).toFixed(2);
        this.count = 0;
    }

    runStatistics(transactions) {
        this.transactions = transactions;

        if (!this.transactions.length) {
            return;
        }

        let currentMinTransaction = this.transactions[0];
        let currentMaxTransaction = this.transactions[0];
        let average = 0;
        let sum = 0;

        for(let i = 0; i < this.transactions.length; i++) {
            if (Number(this.transactions[i].amount) < Number(currentMinTransaction.amount)){
                currentMinTransaction = this.transactions[i];
            }

            if (Number(this.transactions[i].amount) > Number(currentMinTransaction.amount)){
                currentMaxTransaction = this.transactions[i];
            }

            sum += Number(this.transactions[i].amount);
        }

        this.sum = Number(sum).toFixed(2);
        this.max = Number(currentMaxTransaction.amount).toFixed(2);
        this.min = Number(currentMinTransaction.amount).toFixed(2);
        this.count = this.transactions.length;
        this.avg = Number(average = sum / this.count).toFixed(2);

        console.log(this);
    }
    
}

module.exports = new Statistics();