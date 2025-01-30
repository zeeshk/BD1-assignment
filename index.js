const express = require('express');
const { rmSync } = require('fs');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

//Exercise 1
function calculateCartTotal(newItemPrice, cartTotal) {
  let total = newItemPrice + cartTotal;
  return total;
}

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let result = calculateCartTotal(newItemPrice, cartTotal);
  return res.send(result.toString());
});

//Exercise 2
function calculateDiscount(discount, cartTotal){
  let discountprice = (discount/100)*cartTotal;
  let finalprice = cartTotal-discountprice;
  return finalprice;
}
app.get('/membership-discount',(req,res)=>{
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === "true";
  let discount = 10;
  if(isMember){
    let result = calculateDiscount(discount, cartTotal);
    res.send(result.toString());
  }else{
    return res.send("You are not logged in");
  }
});

//Exercise 3
function calculateTax(tax, cartTotal){
  let taxprice = (tax/100)*cartTotal;
  return taxprice;
}
app.get('/calculate-tax',(req,res)=>{
  let cartTotal = parseFloat(req.query.cartTotal);
  let tax = 5;
    let result = calculateTax(tax, cartTotal);
    res.send(result.toString());
});

//Exercise 4
function calculateDeliveryTime(distance, shippingMethod){
  let time = '';
  if(shippingMethod == 'Standard'){
    time = distance/50;
  }else if(shippingMethod == 'Express'){
    time = distance/100
  }
  return time;
}
app.get('/estimate-delivery', (req,res)=>{
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distanceinkms);
  let result = calculateDeliveryTime(distance, shippingMethod);
  res.send(result.toString());
});

//Exercise 5
function calculateShippingCost(weight,distance){
  let cost = weight*distance*0.1;
  return cost;
}
app.get('/shipping-cost',(req,res)=>{
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let result = calculateShippingCost(weight, distance);
  return res.send(result.toString());
});

//Exercise 6
function calculateLoyaltyPoints(purchaseAmount){
  let loyaltypoints = purchaseAmount*2;
  return loyaltypoints;
}
app.get('/loyalty-points',(req,res)=>{
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let result = calculateLoyaltyPoints(purchaseAmount);
  return res.send(result.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
