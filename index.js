const express = require('express');
const path = require('path');
const app = express();
var Chance = require('chance');
const PORT = process.env.PORT || 3000;


var chance = new Chance();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({ extended: false }));

var coupons = [];

// Home route

app.get('/', (req, res) => {
    res.render('index');
})

// To get all coupons

app.get('/list', (req, res) => {

    // validation starts here

    if (coupons.length === 0) {
        res.json({ status: 'false', data: 'no coupon to display' });
        return;

    }

    // validation ends here

    res.json({ status: 'true', data: coupons });

})

// To create a coupon

app.post('/create', (req, res) => {
    const { expiry, minvalue, type, amountorper } = req.body;

    // validation starts here
    
    if (!expiry || !minvalue || !type || !amountorper) {
        res.status(400).json({ status: 'false', error: 'missing credentials' });
        return;
    }

    if (Date.parse(expiry) < Date.parse(new Date().toDateString())) {
        res.status(400).json({ status: 'false', error: 'expiry date should be valid' });
        return;
    }

    if (+amountorper <= 0 || (+amountorper > +minvalue)) {
        res.status(400).json({ status: 'false', error: 'invalid discount amount or percentage' });
        return;
    }

    if (type === 'percentage') {
        if (+amountorper > 100) {
            res.status(400).json({ status: 'false', error: 'invalid discount amount or percentage' });
            return;
        }
    }

    // validation ends here

    var obj = {
        coupon: chance.string(),
        minvalue: +minvalue,
        startDate: new Date().toDateString(),
        endDate: new Date(expiry).toDateString(),
        type,
        amount_or_percentage: +amountorper
    }

    coupons.push(obj);
    res.json({ status: 'true', data: obj });

})


// To validate a coupon

app.post('/validate', (req, res) => {
    const { cart, coupon } = req.body;

    // validation starts here

    if (!cart || !coupon) {
        res.status(400).json({ status: 'false', error: 'missing credentials' });
        return;
    }

    // validation ends here

    const couponDB = coupons.find((item) => item.coupon === coupon);

    // validation starts here

    if (!couponDB) {
        res.status(400).json({ status: 'false', error: 'no coupon found' });
        return;
    }

    if (Date.parse(couponDB.endDate) < Date.parse(new Date().toDateString())) {
        res.status(400).json({ status: 'false', error: 'coupon is not valid' });
        return;
    }

    if (cart < couponDB.minvalue) {
        res.status(400).json({ status: 'false', error: 'cart value less than accepted for this coupon' });
        return;
    }

    // validation ends here

    var discountAmount;

    if (couponDB.type === 'flat') {
        discountAmount = couponDB.amount_or_percentage;
        res.json({ status: 'true', data: discountAmount });
    }

    if (couponDB.type === 'percentage') {

        var percentageDiscount = (couponDB.amount_or_percentage * cart) / 100;
        var maxDiscount = (35 * cart) / 100;
        if (percentageDiscount > maxDiscount) {
            discountAmount = maxDiscount;
        } else {
            discountAmount = percentageDiscount;
        }
        res.json({ status: 'true', data: discountAmount });
    }
})

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}...`);
})
