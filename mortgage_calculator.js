let readline = require('readline-sync');

function print(message) {
  console.log(`${message}`);
}

function invalidNumber(number) {
  return (number.trimStart() === '' ||
          Number.isNaN(Number(number)) ||
          number <= 0);
}

function invalidInterest(input) {
  return (input.trimStart() === '' ||
          Number.isNaN(Number(input)) ||
          input < 0 ||
          input >= 50);
}

function calculateMonthlyPayment(loanAmount, interestMonthly, lengthInMonths) {
  let monthlyPayment = loanAmount * (interestMonthly /
  (1 - Math.pow((1 + interestMonthly), (-lengthInMonths))));

  if (interestMonthly === 0) {
    monthlyPayment = loanAmount / lengthInMonths;
  }
  return monthlyPayment;
}

function checkInput(answer) {
  if (answer === 'y' || answer === 'yes') {
    return true;
  } else if (answer === 'n' || answer === 'no') {
    return false;
  } else {
    return 'bad input';
  }
}

console.clear();
print("---Welcome to Mortgage Payment Calculator---");
print("I can help you calculate what you'll pay each month for your mortgage.");
print("Note that I don't calculate compound interest, so I can only estimate your actual payment.");


while (true) {

  //Get loan amount and check for proper input
  print('\nEnter the loan amount without a dollar sign or commas.');
  print('For example, for $2,000 enter 2000: ');
  let loanAmount = readline.prompt();

  while (invalidNumber(loanAmount)) {
    print('Please try again. Enter a number without "$" or commas.');
    loanAmount = readline.prompt();
  }

  //Get APR and check for valid input
  print('\nEnter the annual percentage rate for the loan as a number.');
  print('For example, for a 5% APR enter the number 5: ');
  let interestAnnual = readline.prompt();

  while (invalidInterest(interestAnnual))  {
    print('Please try again. Enter a number between 0 and 49 without "%."');
    print('For example, for 6% enter the number 6: ');
    interestAnnual = readline.prompt();
  }

  //Get length of loan and check for valid input
  print('\nEnter the length of the loan in years.');
  print('For example, for a 30-year mortgage enter 30: ');
  let lengthInYears = readline.prompt();

  while (invalidNumber(lengthInYears)) {
    print('Please try again. Enter how long the mortgage is in years.');
    print('For example, for a 15-year mortgage enter 15: ');
    lengthInYears = readline.prompt();
  }

  //Convert interest and length values to work in the formula
  let lengthInMonths = lengthInYears * 12;
  let interestMonthly = interestAnnual / 100 / 12;

  //Calculate the monthly payment
  let payment = calculateMonthlyPayment(loanAmount, interestMonthly,
    lengthInMonths).toFixed(2);

  print(`\nThe monthly payment for this loan is $${payment}.`);
  print('\nWould you like to do another calculation? Enter y/n');

  //Get answer about another calculation and determine if valid y/n input
  let calculateMoreAnswer = readline.prompt().toLowerCase();

  while (checkInput(calculateMoreAnswer) === 'bad input') {
    print(`\nPlease type yes to do another calculation or no to quit.`);
    calculateMoreAnswer = readline.prompt().toLowerCase();
  }
  if (checkInput(calculateMoreAnswer) === false) {
    break;
  } else {
    console.clear();
  }
}
print('\nThanks for using Mortgage Calculator!');


//Add function for looping with y/n input more specifically defined