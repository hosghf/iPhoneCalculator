let numberA = 0
let numberB = 0
let operator
let activeNumberB = false
const screen = document.querySelector('#screen')

function operate(a, b , operant) {
  switch(operant) {
    case '+':
      return Number(a) + Number(b)
    case '-':
      return a - b
    case '×':
      return a * b
    case '÷':
      return a / b
    case '%':
      return a / 100
  }
}

const numbers = document.querySelectorAll('.number')
numbers.forEach(number => {
  number.addEventListener('click', numberClicked)
});

function numberClicked(e) {
  if (!activeNumberB) {
    numberA += e.target.innerText
    screen.innerText = Number(numberA)
  } else {
    numberB += e.target.innerText
    screen.innerText = Number(numberB)
  }

  toggleSmallClass()
}

const operators = document.querySelectorAll('.operator')
operators.forEach((operator) => {
  operator.addEventListener('click', operationClicked)
})

function operationClicked(e) {
  activeNumberB = true
  operator = e.target.innerText
}

const equal = document.querySelector('.equal')
equal.addEventListener('click', calculate)

function calculate() {
  numberA = operate(numberA, numberB, operator)
  if(String(numberA).split('.')[1] > 4)
    numberA = numberA.toFixed(4)

  screen.innerText = numberA
  activeNumberB = false
  numberB = 0

  toggleSmallClass()
}

const AC = document.querySelector('.AC')
AC.addEventListener('click', clear) 

function clear() {
  screen.innerText = '0'
  numberA = 0
  numberB = 0
  activeNumberB = false
}

const percent = document.querySelector('.percent')
percent.addEventListener('click', calcPercent)

function calcPercent() {
  numberA = operate(numberA, null, '%')
  screen.innerText = numberA
}

const dot = document.querySelector('.dot')
dot.addEventListener('click', addDot)

function addDot() {
  if(!activeNumberB) {
    if(String(numberA).includes('.'))
      return

    numberA += '.'
    screen.innerText = numberA
  } else {
    if(String(numberB).includes('.'))
      return

    numberB += '.'
    screen.innerText = numberB
  }
}

const negative = document.querySelector('.negative')
negative.addEventListener('click', toggleNegative)

function toggleNegative() {
  if(!activeNumberB) {
    numberA = -numberA
    screen.innerText = numberA
  } else {
    numberB = -numberB
    screen.innerText = numberB
  }
}

function toggleSmallClass() {
  if(screen.innerText.length > 7)
    screen.classList.add('small')
  else 
    screen.classList.remove('small')
}