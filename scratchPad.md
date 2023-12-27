###### <u>Object from a row of Transaction Table:</u>

```js
{
id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx", //uuidv4 template
title: null,
description: null,
value: 0.0,
currency: null,
transactionType: null,
transactionCategory: null,
fromRef: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx", //uuidv4 template
fromType: null,
toRef: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx", //uuidv4 template
toType: null,
recurringRef:"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx", //uuidv4 template
file: false,
createdDate: "yyyy.mm.dd at hh:mm:ss",
modifiedDate: "yyyy.mm.dd at hh:mm:ss",
transactionDate: "yyyy.mm.dd at hh:mm:ss",
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