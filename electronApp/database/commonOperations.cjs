
let db = null;

function setDB(database) {
  db = database;
}

function addFilterOptionsToQueryStmt(queryStmt,
                                     filterOptions,
                                     selectFilterOptions = {
                                        transactionType: false,
                                        transactionCategory: false,
                                        currency: false,
                                        date: false,
                                     }) {
  if (filterOptions.transactionType !== "All" && filterOptions.transactionType !== "Expenditure" && selectFilterOptions.transactionType) queryStmt += ` AND (transactionType = "${filterOptions.transactionType}")`;
  if (filterOptions.transactionCategory !== "All" && selectFilterOptions.transactionCategory) queryStmt += ` AND (transactionCategory = "${filterOptions.transactionCategory}")`;
  if (filterOptions.currency !== "All" && selectFilterOptions.currency) queryStmt += ` AND (currency = "${filterOptions.currency}")`;
  if (filterOptions.startDate !== "yyyy-mm-ddThh:mm" && filterOptions.endDate !== "yyyy-mm-ddThh:mm" && selectFilterOptions.date) queryStmt += ` AND (transactionDate BETWEEN "${filterOptions.startDate}" AND "${filterOptions.endDate}")`;
  return queryStmt;
}

function getSumOfTransactionTypeIn(filterOptions) {
  return new Promise((resolve, reject) => {
    let queryStmt = `SELECT SUM(value) as sumOfTransactionTypeIn, \
                    COUNT(*) as numInTransactions \
                    FROM transactions WHERE transactionType = "In" `;
    // if (filterOptions.transactionCategory !== "All") queryStmt += ` AND (transactionCategory = "${filterOptions.transactionCategory}")`;
    // if (filterOptions.currency !== "All") queryStmt += ` AND (currency = "${filterOptions.currency}")`;
    // if (filterOptions.startDate !== "yyyy-mm-ddThh:mm" && filterOptions.endDate !== "yyyy-mm-ddThh:mm") queryStmt += ` AND (transactionDate BETWEEN "${filterOptions.startDate}" AND "${filterOptions.endDate}")`;
    const selectFilterOptions = {
        transactionType: false,
        transactionCategory: true,
        currency: true,
        date: true,
    };
    queryStmt = addFilterOptionsToQueryStmt(queryStmt, filterOptions, selectFilterOptions);
    db.get(queryStmt, 
            (err, row) => { 
                if (err) reject(err);
                resolve([row.sumOfTransactionTypeIn, row.numInTransactions]);
            });
});
}

function getSumOfTransactionTypeOut(filterOptions) {
  return new Promise((resolve, reject) => {
    let queryStmt = `SELECT SUM(value) as sumOfTransactionTypeOut, \
                     COUNT(*) as numOutTransactions \
                    FROM transactions WHERE transactionType = "Out" `;
    // if (filterOptions.transactionCategory !== "All") queryStmt += ` AND (transactionCategory = "${filterOptions.transactionCategory}")`;
    // if (filterOptions.currency !== "All") queryStmt += ` AND (currency = "${filterOptions.currency}")`;
    // if (filterOptions.startDate !== "yyyy-mm-ddThh:mm" && filterOptions.endDate !== "yyyy-mm-ddThh:mm") queryStmt += ` AND (transactionDate BETWEEN "${filterOptions.startDate}" AND "${filterOptions.endDate}")`;
    const selectFilterOptions = {
      transactionType: false,
      transactionCategory: true,
      currency: true,
      date: true,
    };
    queryStmt = addFilterOptionsToQueryStmt(queryStmt, filterOptions, selectFilterOptions);
    db.get(queryStmt, 
            (err, row) => { 
                if (err) reject(err);
                resolve([row.sumOfTransactionTypeOut, row.numOutTransactions]);
            });
  });
} 

// function getTotalExpenditure(filterOptions) {
//     return new Promise((resolve, reject) => {
//         const getSumOfTransactionTypeIn = getSumOfTransactionTypeIn(filterOptions);
//         const getSumOfTransactionTypeOut = getSumOfTransactionTypeOut(filterOptions);
//         Promise.all([getSumOfTransactionTypeIn, getSumOfTransactionTypeOut])
//             .then(([sumOfTransactionTypeIn, sumOfTransactionTypeOut]) => {
//                 const expenditure = sumOfTransactionTypeIn - sumOfTransactionTypeOut;
//                 resolve(expenditure);
//             }).catch((err) => reject(err));
//     });

// }



async function getStatsAboutDB(event, filterOptions) {
        const [sumOfTransactionTypeIn, numInTransactions] = await getSumOfTransactionTypeIn(filterOptions);
        const [sumOfTransactionTypeOut, numOutTransactions] = await getSumOfTransactionTypeOut(filterOptions);
        const statBoxData = [
            {
              title: "Total Exp.",
              value: sumOfTransactionTypeIn - sumOfTransactionTypeOut,
              color: "#FF0000", // Red
            },
            {
              title: "In - Amount",
              value: sumOfTransactionTypeIn ?? "N/A",
              color: "#008000", // Green
            },
            {
              title: "Out - Amount",
              value: sumOfTransactionTypeOut ?? "N/A",
              color: "#800000", // Maroon
            },
            {
              title: "In - Num",
              value: numInTransactions ?? "N/A",
              color: "#00FF00", // Lime
            },
            {
              title: "Out - Num",
              value: numOutTransactions ?? "N/A",
              color: "#808000", // Olive
            },
            {
              title: "Num Trans.",
              value: "N/A",
              color: "#008080", // Teal
            },
            {
              title: "Num Fin. Entities",
              value: "N/A",
              color: "#0000FF", // Blue
            },
            {
              title: "Num Recur. Trans. Entities",
              value: "N/A",
              color: "#FF00FF", // Fuchsia
            },
            {
              title: "Num Trans. Int. Source",
              value: "N/A",
              color: "#800080", // Purple
            },
            {
              title: "Num Trans. Ext. Source",
              value: "N/A",
              color: "#FFA500", // Orange
            },
            {
              title: "Num Trans. Int. Dest.",
              value: "N/A",
              color: "#FFFF00", // Yellow
            },
            {
              title: "Num Trans. Ext. Dest.",
              value: "N/A",
              color: "#A52A2A", // Brown
            },
          ];
    return statBoxData;
}

module.exports = {
    getStatsAboutDB,
    setDB,
};