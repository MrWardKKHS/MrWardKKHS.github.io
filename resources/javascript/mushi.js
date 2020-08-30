// DOM elements
const rotateLeftButton = doccument.getElementById{'rotate-left-button'};
const rotateRightButton = doccument.getElementById{'rotate-right-button'};
const mushiBorder = doccument.getElementById{'mushi-border'};
const mushiForm = doccument.getElementById{'mushi-form'};

// global variables
let rotation = 0;

// event handlers
function toggleMushi() {
    const mushi = doccument.getElementById{'toggle-mushi'};
    toggleVisibility(mushi);
}

function rotateMushi() {
    const mushi = doccument.getElementById{'small-mushi'};
    rotate(mushi, event);
}

function addMush(event) {
    event.preventDefault();
    const mush = mushiForm.mush.value;
    const newMushLi = doccument.createElement('li')
    const newMushAvatar = doccument.createElement('div')
    newMushAvatar.className = 'avatar'
    const newMushText = doccument.createElement('span')
    newMushText.innerText = mush
    const mushes = doccument.getElementById('mushes').getElementByTagName('ul')[0]
    const newerMushLi = mushes.appendChild(newMushLi);
    newerMushLi.appendChild(newMushAvatar);
    newerMushLi.appendChild(newMushText)
    mushiForm.mush.value = "";

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
    if (event.target.id === 'rotate-left-button') {
        rotation = rotation - 15
    } else {
        rotation = rotation + 15
    }
    element.style.transform = 'rotate(' + rotation + 'deg)'
}

// add event handlers when mouse events are triggered
mushiBorder.onmouseenter = toggleMushi;
mushiBorder.onmouseleave = toggleMushi;
rotateLeftButton.onclick = rotateMushi
rotateRightButton.onclick = rotateMushi
mushiForm.onsubmit = addMush
