const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(cors());
var Regex = require("regex");

function numToArr(a, b, a1, b1) {
    let n1 = a;
    let n2 = b;
    while (n1 > 0) {
        a1.push(n1 % 10);
        n1 = parseInt(n1 / 10);
    }
    while (n2 > 0) {
        b1.push(n2 % 10);
        n2 = parseInt(n2 / 10);
    }

    if (a1.length > b1.length) {
        for (let i = b1.length; i < a1.length; i++) {
            b1.push(0);
        }
    }
    else {
        for (let i = a1.length; i < b1.length; i++) {
            a1.push(0);
        }
    }

}



function addNumber(a1, b1, result) {
    let x = "", y = "_";
    let sum = 0;
    let carry = 0;

    let value = {};


    for (let i = 0; i < a1.length; i++) {
        let element = a1[i] + b1[i] + carry;
        sum = element % 10;
        x = x + sum;
        if (i < a1.length - 1) {
            carry = parseInt(element / 10);
            y = y + carry;
        }
        if (i == a1.length - 1) {
            carry = parseInt(element / 10);
            if (carry != 0) {
                x = x + carry;
            }
        }


        x = x.split('').reverse().join('');
        y = y.split('').reverse().join('');

        value = {
            "carryString": y,
            "sumString": x
        }
    
        let key = "Step" + (i = i + 1);
        result.push(value);
        x = x.split('').reverse().join('');
        y = y.split('').reverse().join('');
        i--;
    }

}


app.post('/add', (req, res) => {
    const { num1, num2 } = req.body;
    console.log(num1, num2, "num1, num2")
    let a1 = [];
    let b1 = [];
    const regex = /^[1-9]\d*$/;
    // const regex = new Regex(/-=#^[1-9]\d*$/);
    if (!regex.test(num1) || !regex.test(num2)) {
        return res.status(400).json({ error: 'Invalid input. Only positive integers are allowed.' });
    }
    let a = parseInt(num1);
    let b = parseInt(num2);

    numToArr(a, b, a1, b1);
    let result = [];
    addNumber(a1, b1, result);
    res.send(result);
})




app.listen(5000, () => {
    console.log('Server is working at port 5000');
})
