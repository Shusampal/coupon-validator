# coupon code creator and validator
* This is a simple full stack project which provides feature to create coupons and validate coupons.
* all coupons can also be listed.

## Tech stack
* Frontend is made of EJS ( which is server side templating engine).
* Backend is made using ExpressJS.
* Array is used as mock Database for all coupons

## How to run locally
Please follow below instructions below -
1. npm install
2. npm run start

After these instructions , one can visit below url on browser to access application.
http://localhost:3000

## Routes

### To create coupon
There are 4 inputs from client to create a coupon
1. expiry date ( when coupon can expire).
2. min cart value required ( This is min value of cart at which this coupon will be valid)
3. type ( Coupon Type : this can be flat or percentage)
4. flat amount or % ( amount of flat discount or percentage for percentage discount )

To send create request , press create button.

### List all coupons
This is list all coupons.
Only need is to press the list button.

### validate any coupon
There are 2 inputs from client to validate a coupon
1. cart amount ( the cart amount ).
2. coupon ( coupon code )

To send create request , press validate button.

## working

### create coupon
1. When one creates a coupon , there are validations.
2. it will throw error json if validation is not met.
3. if all validations are done , then this coupon is saved in array.
4. that saved coupon will be send as response.

### list all coupons
it is simple , when user hits the list button , the server pulls all dat from that array and send it as JSON.

### validate a coupon
1. When one validates a coupon , there are validations.
2. it will throw error json if validation is not met.
3. if all validations are done , then the discount amount will be send as response.


### NOTE - All validations are in index.js file under validation starts here comment