let titleEl = document.getElementById('title');
titleEl.style.textAlign = 'center';
let pEl = document.querySelector('.cool'); 
pEl.innerHTML = 'Comments for <strong>Today</strong>';
pEl.style.color = 'blue';
let aEl = document.querySelector('a'); //attributes of an element
aEl.setAttribute('href', 'https://www.google.com');
let commentEls = document.querySelectorAll('.comment');
console.log(commentEls);
// for(let commentEl of commentEls) {
//     console.log(commentEl);
// }; 
for(let commentEl of commentEls) {
    commentEl.style.fontSize = '30px'; //be sure to include the part in red
};