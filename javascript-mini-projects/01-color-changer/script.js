let a;

function getrandomcolor(){
    let val1=Math.ceil(0+Math.random()*(255));
    let val2=Math.ceil(0+Math.random()*(255));
    let val3=Math.ceil(0+Math.random()*(255));
    a=`rgb(${val1},${val2},${val3})`
    return `rgb(${val1},${val2},${val3})`
     
}

let div=document.querySelector(".class");

div.addEventListener("click" , ()=>{
    document.querySelector(".box").style.backgroundColor =getrandomcolor();
    div.innerHTML=a
})
