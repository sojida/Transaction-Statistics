class Transaction {
    constructor(amount, timestamp) {
        this.amount = amount;
        this.timestamp = timestamp;
        this._milliseconds = new Date(timestamp).getTime()
    }

    lessThanSixtySeconds() {
        const sixtySecondsAgo = new Date(Date.now() - 60000).getTime();

        return this._milliseconds < sixtySecondsAgo
    }
}

module.exports = Transaction;