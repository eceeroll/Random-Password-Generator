// https://www.w3schools.com/html/html_charset.asp
/*  
97 - 122 -> lowercase
65 - 90 -> uppercase
48 - 57 -> numbers
*/

// getting DOM elements:
const resultDom = document.getElementById("result");
const clipboardDom = document.getElementById("clipboard");
const lengthDom = document.getElementById("length");
const uppercaseDom = document.getElementById("uppercase");
const lowercaseDom = document.getElementById("lowercase");
const numberDom = document.getElementById("numbers");
const symbolDom = document.getElementById("symbols");
const generateDom = document.getElementById("generate");

const randomFunctions  = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

function eventListeners() {
    generateDom.addEventListener("click", getValues);
    clipboardDom.addEventListener("click", copyPassword);
}

const getValues = () => {
    var length = +lengthDom.value; // i used + operator for return this string to a number
    var hasUpper = uppercaseDom.checked;
    var hasLower = lowercaseDom.checked;
    var hasNumber = numberDom.checked;
    var hasSymbol = symbolDom.checked;

    // shows the password on screen that has been returns from function
    resultDom.innerText = generatePassword(
        hasUpper, hasLower, hasNumber, hasSymbol, length
    );
} 

function generatePassword(upper,lower,number,symbol,length) {

    let password = ""; 
    let typesCount = upper + lower + number + symbol; // this returns the count of checked types 
    
    // creates an array and filter objects according to their values equals to false 
    const typesArr = [{upper},{lower},{number},{symbol}].filter(
        item => Object.values(item)[0]
    )
    
        if (typesCount === 0) {
            return '';
        }

        // creating password :
        for(let i=0; i < length; i+= typesCount) {
            typesArr.forEach(type => {
                const funcName = Object.keys(type)[0];
                password += randomFunctions[funcName]();
            })
        }
        
        const finalPassword = password.slice(0,length); // slice method will save user length choice even its lower than 4 

        return finalPassword;
}

// function for copy password to clickboard: 
function copyPassword() {

    const textarea = document.createElement("textarea");
    const password = resultDom.innerText;

    if(!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert("Password successfully copied to clipboard!");
}

function getRandomLower() {
    return String.fromCharCode((Math.floor(Math.random() * 26) + 97));
}

function getRandomUpper() {
    return String.fromCharCode((Math.floor(Math.random() * 26) + 65));
}

function getRandomNumber() {
    return String.fromCharCode((Math.floor(Math.random() * 10) + 48));
}

function getRandomSymbol() {
    const symbols = '!@$^<>&/=%,.*';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

eventListeners();