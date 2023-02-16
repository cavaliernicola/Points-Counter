class Counter {
  constructor(counterDisplay) {
    this.counterDisplay = counterDisplay;
    this.reset();
  }

  increase() {
    this.curretCount++;
  }

  decrease() {
    this.curretCount--;
  }

  reset() {
    this.curretCount = 0;
  }

  updateDisplay() {
    let valueToSet;
    if (this.curretCount < 10 && this.curretCount >= 0) {
      valueToSet = "0" + this.curretCount; 
    }
    else if (this.curretCount < 0 && this.curretCount > -10) {
      valueToSet = "-0" + this.curretCount.toString()[1];
    }
    else {
      valueToSet = this.curretCount;
    }
  
    if (this.curretCount < 0) this.counterDisplay.style.color = "red";
    else this.counterDisplay.style.color = "black";
  
    this.counterDisplay.innerHTML = valueToSet;
  }
}

const htmlElements = [
  {
    element: 'div',
    class: 'counter-container',
    children: [
      {
        element: 'button',
        class: 'restart-button',
      },
      {
        element: 'div',
        class: 'counter-display',
        content: '00'
      }
    ]
  },
  {
    element: 'div',
    class: 'buttons-container',
    children: [
      {
        element: 'button',
        class: 'minus-button',
      },
      {
        element: 'div',
        class: 'counter-title',
        content: 'The Counter'
      },
      {
        element: 'button',
        class: 'plus-button',
      }
    ]    
  },
  {
    element: 'footer', // This is not needed and could be written in the index.html itself, but since there is a script that builds the page content, I decided to build all elements in that way.
    children: [
      {
        element: 'p',
        content: '&#169; Designed and developed by Nicola Cavalier',
      }
    ]
  }
];

htmlElements.forEach(item => {
  let element = document.createElement(item.element);
  element.setAttribute('class', item.class ?? "");
  for (let ch of item.children) {
    let children = document.createElement(ch.element)
    children.setAttribute('class', ch.class);
    children.innerHTML = ch.content ?? "";
    element.appendChild(children)
  }
  document.body.appendChild(element)
}) // Add elements to the html page from JS

const restartButton = document.querySelector(".restart-button");
const minusButton = document.querySelector(".minus-button");
const plusButton = document.querySelector(".plus-button");
const counterDisplay = document.querySelector(".counter-display");
const counter = new Counter(counterDisplay);

minusButton.addEventListener('click', () => {
  counter.decrease();
  counter.updateDisplay();
  addClickAnimation(minusButton);
});

plusButton.addEventListener('click', () => {
  counter.increase();
  counter.updateDisplay();
  addClickAnimation(plusButton);
});

restartButton.addEventListener('click', () => {
  if (counter.curretCount !== 0) {
    counter.reset();
    counter.updateDisplay();
    restartButton.style.animation = "rotation 0.5s linear";
    setTimeout(() => restartButton.style.animation = "", 500);
  }
  else alert("The counter is already reset.")
});

function addClickAnimation(button) {
  button.style.transform = "scale(0.9)"; // A basic tapping animation
  setTimeout(() => button.style.transform = "", 100);
}