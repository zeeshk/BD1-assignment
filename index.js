const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
