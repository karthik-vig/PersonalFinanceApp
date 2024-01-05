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
