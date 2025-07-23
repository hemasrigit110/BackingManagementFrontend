export default function TransactionHistory({ transactions, accountNumber }) {
  return (
    <div className="flex flex-col w-full mx-auto p-6 bg-gray-50 rounded-lg shadow-md mt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Transaction History
        </h2>
      </div>

      {transactions.length === 0 ? (
        <p className="text-gray-600 text-center">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 font-semibold">ID</th>
                <th className="p-3 font-semibold">Account Number</th>
                <th className="p-3 font-semibold">From Account</th>
                <th className="p-3 font-semibold">To Account</th>
                <th className="p-3 font-semibold">Amount</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions
                .filter((e) => {
                  return e.accountNumber === accountNumber;
                })
                .reverse()
                .map((txn) => (
                  <tr
                    key={txn.id}
                    className={`border-b hover:bg-gray-100 ${
                      txn?.transactionType === "CREDIT"
                        ? "bg-green-200"
                        : "bg-red-200"
                    }`}
                  >
                    <td className="p-3">{txn.id || "N/A"}</td>
                    <td className="p-3">{txn.accountNumber || "N/A"}</td>
                    <td className="p-3">{txn.fromAccount || "N/A"}</td>
                    <td className="p-3">{txn.toAccount || "N/A"}</td>
                    <td className="p-3">
                      ₹ {txn.amount?.toFixed(2) || "0.00"}
                    </td>
                    <td className="p-3">{txn.transactionType || "N/A"}</td>

                    <td className="p-3">
                      {txn.transactionDate
                        ? new Date(txn.transactionDate).toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
