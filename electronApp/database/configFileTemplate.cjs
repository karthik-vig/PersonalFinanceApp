
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
                heading: "Transaction Type:",
                content: "This filter is used by line plot and some stat boxes."
            },
            {
                heading: "Transaction Category:",
                content: "This filter is used by all the plots and stat boxes."
            },
            {
                heading: "Currency:",
                content: "This filter is used by line plot and some stat boxes."
            },
            {
                heading: "Transaction Date Range:",
                content: "This filter is used by all the plots and stat boxes."
            },
        ],

    }
    return configFileTemplate;
}

module.exports = getConfigFileTemplate;