// DOM elements
const rotateLeftButton = document.getElementById('rotate-left-button');
const rotateRightButton = document.getElementById('rotate-right-button');
const mushiBorder = document.getElementById('mushi-border');
const mushiForm = document.getElementById('mushi-form');

// global variables
let rotation = 0;

// event handlers
function toggleMushi() {
    const mushi = document.getElementById('toggle-mushi');
    toggleVisibility(mushi);
}

function rotateMushi(event) {
    const mushi = document.getElementById('small-mushi');
    rotate(mushi, event);
}

function addMush(event) {
    event.preventDefault();
    if (mushiForm.mush.value != ""){
        const mush = mushiForm.mush.value;
        const newMushLi = document.createElement('li')
        const newMushAvatar = document.createElement('div')
        newMushAvatar.className = 'avatar'
        const newMushText = document.createElement('span')
        newMushText.innerText = mush
        const mushes = document.getElementById('mushes').getElementsByTagName('ul')[0]
        const newerMushLi = mushes.appendChild(newMushLi);
        newerMushLi.appendChild(newMushAvatar);
        newerMushLi.appendChild(newMushText)
        mushiForm.mush.value = "";
    }
}

// helpers
//given a DOM element, change it's visibility style property from hidden to visable
function toggleVisibility(element){
    if (element.style.visibility === 'hidden') {
        element.style.visibility = 'visible'
    } else {
        element.style.visibility = 'hidden'
    }
}

// given a DOM element and direction, rotate that element in that direction
function rotate(element, event) {
    if (event.target.id == 'rotate-left-button') {
        rotation = rotation - 15
    } else {
        rotation = rotation + 15
    }
    element.style.transform = 'rotate(' + rotation + 'deg)'
}

// add event handlers when mouse events are triggered
mushiBorder.onmouseenter = toggleMushi;
mushiBorder.onmouseleave = toggleMushi;
rotateLeftButton.onclick = rotateMushi;
rotateRightButton.onclick = rotateMushi;
mushiForm.onsubmit = addMush;
