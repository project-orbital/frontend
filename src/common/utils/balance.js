import { compareDesc } from "date-fns";

/**
 * Returns an array of transactions sorted by date in descending order (newest first),
 * with the balances inferred for each transaction based on transaction amounts.
 *
 * The computation will find the most recent transaction with balance information (non-zero)
 * and use that as the starting point for the balance.
 *
 * It will infer balances from that point, working towards the newest transaction,
 * and then from that same point backwards towards the oldest transaction.
 *
 * If multiple transactions have balance information, it will overwrite its own internal
 * inferred balance with the most recent balance information during its backward pass.
 *
 * @param transactions an array of transactions
 */
export function computeBalances(transactions) {
    // If there is only one transaction, there's nothing to do.
    if (transactions.length < 2) {
        return transactions;
    }

    // Sort the transactions so the newest one is first (index 0).
    const txs = transactions
        .slice()
        .sort((a, b) => compareDesc(a.date, b.date));

    // Find the index of the most recent non-zero balance.
    let basis = txs.length - 1;
    for (let i = 0; i < txs.length; i++) {
        if (txs[i].balance.intValue !== 0) {
            basis = i;
            break;
        }
    }

    // Compute the balances starting from the most recent non-zero balance, to the newest transaction.
    let balance = txs[basis].balance;
    for (let i = basis - 1; i >= 0; i--) {
        balance = balance.add(txs[i].amount);
        txs[i].balance = balance;
    }

    // Compute the balances working backwards from the most recent transaction, to the oldest transaction.
    // We have to be careful here, since the balance for a transaction `i` takes into account the balance
    // and amount from transaction `i-1`, not transaction `i`.
    balance = txs[basis].balance;
    for (let i = basis + 1; i < txs.length; i++) {
        if (txs[i].balance.intValue !== 0) {
            // We can skip it and use it as our new basis.
            balance = txs[i].balance;
            continue;
        }
        const amount = txs[i - 1].amount; // Won't be out of bounds, since there are at least two transactions.
        balance = balance.subtract(amount);
        txs[i].balance = balance;
    }

    // Return the transactions, now sorted in descending order - newest first.
    return txs;
}
