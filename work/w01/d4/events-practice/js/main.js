const btn = document.querySelector('button');
const ul = document.querySelector('ul')
//referencing an anonymous function
btn.addEventListener('click', function(evt) {
    const li = document.createElement('li');
    const inp = document.querySelector('input');
    li.textContent = inp.value; //getter expression
    ul.appendChild(li);
    inp.value = ""; // setter expression
});
//referencing a named function
ul.addEventListener('click', handleClick); //name the function
//be sure the function is defined somewhere
function handleClick(evt){
    console.log(evt.target);

};