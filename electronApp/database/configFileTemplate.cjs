
function getConfigFileTemplate() {
    const configFileTemplate = {
        
        currencies: [
            "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM",
            "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BOV", "BRL", "BSD",
            "BTN", "BWP", "BYR", "BZD", "CAD", "CDF", "CHE", "CHF", "CHW", "CLF", "CLP",
            "CNY", "COP", "COU", "CRC", "CUC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP",
            "DZD", "EGP", "ERN", "ETB", "EUR", "FKP", "GBP", "GEL", "GHS", "GIP", "GMD",
            "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "IDR", "ILS", "INR", "IQD",
            "IRR", "ISK", "JMD", "JOD", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD",
            "KYD", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD",
            "MMK", "MNT", "MOP", "MRO", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD",
            "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR",
            "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG",
            "SEK", "SGD", "SHP", "SLL", "SOS", "SRD", "SSP", "STD", "SVC", "SYP", "SZL",
            "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TWD", "UAH", "UGX", "USD", "USN",
            "UYU", "UZS", "VEF", "VND", "XAF", "XAG", "XAU", "XBA", "XBB", "XBC", "XBD",
            "XCD", "XDR", "XOF", "XOF", "XPD", "XPF", "XPT", "XSU", "XTS", "XUA", "YER",
            "ZAR", "ZMW", "ZWL"
        ],

        timezone: "UTC",

        filePath: "./data/database.db", //default path to the database file

        analyticsPageFilterMenuInformation: [
            {
                heading: "Expenditure - Line Plot:",
                content: "Affected by: Transaction Type, Transaction Category, Currency, Transaction Date Range."
            },
            {
                heading: "Number of Transactoins By Category - Doughnut Plot:",
                content: "Affected by: Transaction Type, Currency, Transaction Date Range."
            },
            {
                heading: "Total Expenditure - Stat Box:",
                content: "Affected by: Transaction Category, Currency, Transaction Date Range."
            },
            {
                heading: "In Amount - Stat Box:",
                content: "Affected by: Transaction Category, Currency, Transaction Date Range."
            },
            {
                heading: "Out Amount - Stat Box:",
                content: "Affected by: Transaction Category, Currency, Transaction Date Range."
            },
            {
                heading: "In Number - Stat Box:",
                content: "Affected by: Transaction Category, Currency, Transaction Date Range."
            },
            {
                heading: "Out Number - Stat Box:",
                content: "Affected by: Transaction Category, Currency, Transaction Date Range."
            },
            {
                heading: "Number of Transactions - Stat Box:",
                content: "Affected by: Transaction Category, Currency, Transaction Date Range."
            },
            {
                heading: "Number of Financial Entities - Stat Box:",
                content: "Affected by: None."
            },
            {
                heading: "Number of Recurring Transactions - Stat Box:",
                content: "Affected by: Transaction Type, Transaction Category, Currency."
            },
            {
                heading: "Number of Transactions by Internal as Source - Stat Box:",
                content: "Affected by: Transaction Type, Transaction Category, Currency, Transaction Date Range."
            },
            {
                heading: "Number of Transactions by Internal as Destination - Stat Box:",
                content: "Affected by: Transaction Type, Transaction Category, Currency, Transaction Date Range."
            },
            {
                heading: "Number of Transactions by External as Source - Stat Box:",
                content: "Affected by: Transaction Type, Transaction Category, Currency, Transaction Date Range."
            },
            {
                heading: "Number of Transactions by External as Destination - Stat Box:",
                content: "Affected by: Transaction Type, Transaction Category, Currency, Transaction Date Range."
            },

        ],

    }
    return configFileTemplate;
}

module.exports = getConfigFileTemplate;