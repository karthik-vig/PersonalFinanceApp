###### <u>Object from a row of Transaction Table:</u>

```js
{
id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx", //uuidv4 template
title: null, //string(50)
description: null, //string(500)
value: 0.0, //float
currency: null, //string(5)
transactionType: null, //string(3); in or out
transactionCategory: null, //string(20)
fromRef: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx", //uuidv4 template
fromType: null, //not needed to be kept track of by this table
toRef: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx", //uuidv4 template
toType: null, //not needed to be kept track of by this table
recurringRef:"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx", //uuidv4 template
file: false, //bool
createdDate: "yyyy.mm.dd at hh:mm:ss", //dateime
modifiedDate: "yyyy.mm.dd at hh:mm:ss", //datetime
transactionDate: "yyyy.mm.dd at hh:mm:ss", //datetime
}
```

###### <u>The Section we have in the detail section in the main page:</u>

* input section
* text area section
* h3 heading section
* radio button section
* select section
* file section
* date and time section (some are readonly and other can be modified)

This can be further broken down to simple elements:

* h6 heading
* h3 heading
* input text
* input text area
* input number
* input radio
* input select
* input file
* input date and time (with option to enable and disable the readonly mode)


###### <u>The basic components needed for filter + sort menu:</u>

* h6 heading
* label
* checkbox
* number input
* date input
* select box
* section container for range (hidden or shown based on the checkbox for the filter param)
* section container for select only (hidden or shows based on checkbox for the fitler param)
* section container for each filter param


###### <u>TailwindCSS color setting classess used for bg:</u>

* bg-lime-100 (side secton button, which is used in app.jsx; to denote active)
* bg-back (basicInputComponents; for text input; on hover)
* bg-back (basicInputComponents; for text area input; on hover)
* bg-back (basicInputComponents; for number input; on hover)
* bg-back (basicInputComponents; for datetime input; on hover)
* bg-slate-950/30 (genericFail; for the darkening of the entire page)
* bg-red-200 (genericFail; for the bg on the text box)
* bg-cyan-600 (genericSideBar; on hover highlight the box)
* bg-cyan-200 (genericSideBar; highlight the box when selected)
* bg-slate-950/30 (genericSuccess; for the darkening of the background)
* bg-green-200 (genericSuccess; for the success box)
* bg-slate-950/30 (genericWarningBox; for the darkening of the backgroud)
* bg-yellow-200 (genericWarningBox; for the warning box)
* bg-yellow-500 (genericWArningBox; for the "yes" and "no" buttons)
* bg-yellow-600 (genericWarningBox; for the "yes" and "no" buttons when hovering on them)

###### <u>TailwindCSS color setting classess used for text:</u>

* border-red-500 (genericFail; for the fail box)
* border-green-500 (genericSuccess; for the sucess box)
* border-yellow-500 (genericWarningBox; for the warning box)

###### <u>TailwindCSS color setting classess used for text:</u>

* text-black/50 (basicUserInputComponents; h6 heading)
* text-black (basicUserINputComponents; h3 heading, textInputSection, textAreaSection selectInputSection, NumberInputSection, datetimeinputsection)
* text-green-500 (sideBar; for "in" type of transaction)
* text-red-500 (sideBar; for "out" type of transaction)
* text-red-800 (genericFail; for the fail message text)
* text-green-500 (genericSideBar; as a part of items object structure)
* text-black/50 (genericSideBar; the botton text)
* text-green-800 (genericSuccess; for the success message)
* text-yellow-800 (genericWarningBox; for the warning message)
* text-white (genericWarningBox; the "yes" and "no" button text)

###### <u>Size measurement for basic input components - additionalClasses:</u>
* first radio btn = h-[100%] w-[20%] mx-2
* second radio btn = h-[100%] w-[20%]
* select menu = w-[30%] h-[100%]
* h6 heading = w-[40%] h-[100%]

###### <u>List of all possible transaction categories:</u>

Groceries: `fas fa-shopping-basket`
Restaurants and Dining: `fas fa-utensils`
Shopping: `fas fa-shopping-cart`
Utilities: `fas fa-tools`
Telecommunication: `fas fa-phone`
Transportation: `fas fa-bus`
Rent or Mortgage: `fas fa-home`
Insurance: `fas fa-shield-alt`
Healthcare: `fas fa-heartbeat`
Education: `fas fa-graduation-cap`
Entertainment: `fas fa-film`
Travel and Lodging: `fas fa-plane`
Personal Care: `fas fa-spa`
Fitness and Wellness: `fas fa-dumbbell`
Investments and Savings: `fas fa-piggy-bank`
Loans and Credit Payments: `fas fa-credit-card`
Charity and Donations: `fas fa-hand-holding-heart`
Home Improvement and Maintenance: `fas fa-hammer`
Childcare and Education: `fas fa-baby`
Pet Care: `fas fa-paw`
Taxes: `fas fa-file-invoice-dollar`
Legal Services: `fas fa-balance-scale`
Other: `fas fa-ellipsis-h`

###### <u>List of all possible currency abbreviations in the world:</u>

    AFN
    EUR
    ALL
    DZD
    USD
    AOA
    XCD
    ARS
    AMD
    AWG
    AUD
    AZN
    BSD
    BHD
    BDT
    BBD
    BYR
    BZD
    XOF
    BMD
    BTN
    INR
    BOB
    BOV
    BAM
    BWP
    NOK
    BRL
    BND
    BGN
    BIF
    KHR
    XAF
    CAD
    CVE
    KYD
    CLF
    CLP
    CNY
    COP
    COU
    KMF
    CDF
    NZD
    CRC
    HRK
    CUC
    CUP
    ANG
    CZK
    DKK
    DJF
    DOP
    EGP
    SVC
    ERN
    ETB
    FKP
    XPF
    GMD
    GEL
    GHS
    GIP
    GTQ
    GBP
    GNF
    GYD
    HTG
    HNL
    HKD
    ISK
    IDR
    XDR
    IRR
    IQD
    ILS
    JMD
    JOD
    KES
    KPW
    KRW
    KWD
    KGS
    LAK
    LBP
    LSL
    ZAR
    LRD
    LYD
    CHF
    MOP
    MKD
    MGA
    MWK
    MYR
    MVR
    MRO
    MUR
    XUA
    MXN
    MDL
    MNT
    MAD
    MZN
    MMK
    NAD
    NPR
    NIO
    NGN
    OMR
    PKR
    PAB
    PGK
    PYG
    PEN
    PHP
    PLN
    QAR
    RON
    RUB
    RWF
    SHP
    STD
    SAR
    RSD
    SCR
    SLL
    SGD
    XSU
    SBD
    SOS
    SSP
    LKR
    SDG
    SRD
    SZL
    SEK
    CHE
    CHW
    SYP
    TWD
    TJS
    THB
    XOF
    TOP
    TND
    TRY
    TMT
    UGX
    UAH
    AED
    USN
    UYU
    UZS
    VEF
    VND
    YER
    ZMW
    ZWL
    XBA
    XBB
    XBC
    XBD
    XTS
    XAU
    XPD
    XPT
    XAG