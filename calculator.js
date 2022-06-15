calculate(); 

function calculate() {

  const buttons = document.querySelectorAll('button'); //select all buttons from html file 
  const display = document.querySelector('#display');

    num1Array = [];
    num1 = null; 
    num2Array = []; 
    num2 = null;
    num1Defined = false; 
    num2Defined = false;
    operatorDefined = false; 
    operator = null;
    nextOperatorDefined = false;
    nextoperator = null; 
    factorialApply = false  
    display.textContent = "0"; 
    buttons.forEach((button) => {

      button.addEventListener('click', () => {
        
        if (button.className === "clear") { //if user clicks on AC, returns all original values from above 
          num1Array = [];
          num1 = null; 
          num2Array = []; 
          num2 = null;
          num1Defined = false; 
          num2Defined = false;
          operatorDefined = false; 
          operator = null;
          display.textContent = "0";  
        }
        else if (button.className === "posOrNeg" && num1Defined === false) { // the case where they click the +/- first, we just shovel it in 
          num1Array.push("-");
        }
        else if (button.className === "number" && num1Defined === false) { // first time around, we don't have a num1 yet 
          num1Array.push(`${button.textContent}`);  
          display.textContent = parseFloat(num1Array.join("")); 
        }
        else if (button.className === "operator" && num1Defined === false) { // as soon as user hits an operator, num1 is defined and we set operaterDefined equal to true 
          num1 = parseFloat(num1Array.join("")); 
          console.log(num1); 
          operator = `${button.textContent}`; 
          console.log(operator);
          num1Defined = true; 
          operatorDefined = true; 
          }
        else if (button.className === "operator factorial" && num1Defined === false) { //in the case that the operator is a factorial we define num1 immediately and trigger factorial below
          num1 = parseFloat(num1Array.join("")); 
          operator = `${button.textContent}`; 
          num1Defined = true; 
          operatorDefined = true;
          factorialApply = true; 
        }
        else if (button.className === "operator factorial" && num1Defined === true) { //this is for the case that we want to apply factorial to an existing result. for example, we've run 4+5 and run factorial on the result of 9.
          operator = `${button.textContent}`;  
          console.log(operator); 
          operatorDefined = true;
          factorialApply = true; 
        }
        else if (button.className === "posOrNeg" && num2Defined === false) { // the case where they click the +/- first, we just shovel it in 
          num2Array.push("-");
        }
        else if (button.className === "number" && num2Defined === false) { // adding numbers to our num2 
          num2Array.push(`${button.textContent}`);
          display.textContent = parseFloat(num2Array.join("")); 
        }
        else if (button.className === "equal" && num2Array.length >= 1) { //when user clicks equal, defines num2 and triggers our operate function below if we have a non-empty array
          num2 = parseFloat(num2Array.join(""));
          console.log(num2);  
          num2Defined = true;
          console.log(operatorDefined);
          console.log(num1Defined);
        }
        else if(button.className === "equal" && num2Array.length < 1 ) { // is a user clicks equal before we have a num2, we set num2 equal to num1 and trigger operate
          num2 = num1; 
          num2Defined = true;
        }
        else if (button.className === "operator" && num2Array.length >= 1) { //user can also click on an operator to trigger the function below but will only define num2 if we have an array that contains at least one value 
          num2 = parseFloat(num2Array.join(""));
          console.log(num2);  
          num2Defined = true;
          console.log(operatorDefined);
          console.log(num1Defined);
          operatorDefined = false; 
          // nextoperator = `${button.textContent}`;
          // nextOperatorDefined = true; 
        }
        else if (button.className === "operator" && num2Array.length < 1) { //this is for the case that the user clicks an operator multiple times in a row. 
          operator = `${button.textContent}`;  
          operatorDefined = true;
        }

        if (num1Defined === true && operatorDefined === true && factorialApply === true) { // factorial triggers only when factorialApply is true
          let result = factorial(num1); 
          display.textContent = result;
          num1 = result;
          operatorDefined = false; 
          operator = null; 
          factorialApply = false; 
        }
        else if (num1Defined === true && num2Defined === true && operatorDefined === true) { // general case in which the user uses the equals button to trigger operate
          let result = +operate(operator, num1, num2).toFixed(6); 
          display.textContent = result; 
          console.log(result); 
          num1 = result; 
          num2Array = []; 
          num2 = null;
          num2Defined = false;
          operatorDefined = false; 
          operator = null; 
          console.log(num1);
          }
          else if (num1Defined === true && num2Defined === true && operatorDefined === false) { // the case in which user clicks on an operator to trigger operate
            let result = operate(operator, num1, num2); 
            display.textContent = result; 
            console.log(result); 
            num1 = result; 
            num2Array = []; 
            num2 = null;
            num2Defined = false;
            operatorDefined = true; 
            operator = `${button.textContent}`; 
            console.log(num1);
            };
      });
       
    });
}; 

function operate(operator, num1, num2) {
  
  if (operator === "+") {
    return add(num1, num2);
  }
  else if (operator === "-") {
    return subtract(num1, num2); 
  }
  else if (operator === "*") {
    return multiply(num1, num2); 
  }
  else if (operator === "/") {
    return divide(num1, num2);
  }
}

function add(...elements) {

	let numbers = [...elements]; 

  sumOf = 0; 

  numbers.forEach(num => {
    sumOf += num; 
  }); 

  return sumOf;

};

function subtract(num1, num2) {

  if (num1 > num2) {
    return num1 - num2;
  }
  else if (num2 > num1) {
    return num2 - num1; 
  }
  else {
    return 0
  }; 
	
};

function multiply(...elements) {

	let numbers = [...elements];
   
  product = 1; 

  numbers.forEach(numeral => {
    product *= numeral; 
  })

  return product; 

};

function divide(num1, num2) {

  return num1 / num2; 

};

function power(num1, num2) {

  return Math.pow(num1, num2); 
	
};

function factorial(number) {
	
  if (number === 0) {
    return 1; 
  }; 

  startingArr = []; 

  for (let i = number; i > 0; i--) {
    startingArr.push(i);
  }; 

  newProduct = 1; 

  startingArr.forEach(ele => {
    newProduct *= ele; 
  }); 

  return newProduct; 

};

  // const numberButtons = document.getElementsByClassName('number'); 

//   numberButtons.onclick = function getNum1() {
//     num1Array = [];
//     num1Array.push(`${button.textContent}`)
//   }
//       const display = document.querySelector('#display');

      // num1Array = []; 
      // // this while loop causes the page to freeze 
      // while (button.className != 'operator') {
      //   num1Array.push(`${button.textContent}`);
      //   display.textContent = num1Array; 
      // };
      // num1Array = [`${button.textContent}`];



      // strNum = ""; 

      // while (button.className = 'number') {
      //   strNum += button.textContent;
      //   display.textContent = `${strNum}`;
      // };
      
//       display.textContent = `${button.textContent}`; 


//       num1 = parseInt(button.textContent); 
//       console.log(num1);
//       // console.log(typeof(num1));
      
//       button.addEventListener('click', () => {
//         operator = button.textContent; 

//         button.addEventListener('click', () => {
//           num2 = parseInt(button.textContent);
//           display.textContent = `${button.textContent}`;
//           console.log(num1);
//           console.log(num2);
//           console.log(operator); 
//           result = operate(operator, num1, num2); 
//           display.textContent = `${result}`;
//         });

//       });
//     });
//   });
// }; 

// console.log(add(6, 7));
// console.log(subtract(10, 8)); 
// console.log(multiply(8, 8)); 
// console.log(divide(10, 5));

// console.log(operate('multiplication', 6, 7));
// console.log(operate("addition", 2, 5));
// console.log(operate("subtraction", 10, 8));
// console.log(operate("division", 10, 5)); 


 
//  function add(...elements) {

// 	let numbers = [...elements]; 

//   sumOf = 0; 

//   numbers.forEach(num => {
//     sumOf += num; 
//   }); 

//   return sumOf;

// };

// function subtract(num1, num2) {

//   if (num1 > num2) {
//     return num1 - num2;
//   }
//   else if (num2 > num1) {
//     return num2 - num1; 
//   }
//   else {
//     return 0
//   }; 
	
// };

// function multiply(...elements) {

// 	let numbers = [...elements];
   
//   product = 1; 

//   numbers.forEach(numeral => {
//     product *= numeral; 
//   })

//   return product; 

// };

// function divide(num1, num2) {

//   return num1 / num2; 

// };

// function power(num1, num2) {

//   return Math.pow(num1, num2); 
	
// };


// function factorial(number) {
	
//   if (number === 0) {
//     return 1; 
//   }; 

//   startingArr = []; 

//   for (let i = number; i > 0; i--) {
//     startingArr.push(i);
//   }; 

//   newProduct = 1; 

//   startingArr.forEach(ele => {
//     newProduct *= ele; 
//   }); 

//   return newProduct; 

// };
// function sum(arr) {

//   newSumOf = 0; 

//   arr.forEach(item => {
//     newSumOf += item; 
//   }); 

//   return newSumOf;

// remanants

 // else if (button.className === "operator" && num1Defined === true && operatorDefined === false ) { // this is for the case when we have gotten a result and click on an operator after getting a result. might want to move this to further down
        //   operator = `${button.textContent}`;  
        //   operatorDefined = true;
        // }

         // console.log(num1);
        // console.log(num2);
        // console.log(operator);
        // console.log(num2Defined);
        // console.log(num1Defined);
        // console.log(operatorDefined);

          // else if (button.className === "number") {
        //   num2 = parseInt(num2Array.join(""));
        //   console.log(num2);  
        //   num2Defined = true;
        // }
        // else if (button.className === "operator" && num2Defined === false) {
        //   num2 = parseInt(num2Array.join(""));
        //   console.log(num2);  
        //   num2Defined = true;
        //   console.log("here"); 
        // }