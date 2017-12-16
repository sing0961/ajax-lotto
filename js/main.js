// js/main.js

document.addEventListener('DOMContentLoaded',init);

function init(){
    document.getElementById('btnSend').addEventListener('click', getNumbers);
    document.getElementById('btnBack').addEventListener('click', nav);

}

function nav(ev){
   
    ev.preventDefault();
    
    
    let btn = ev.target;
   
    if(btn.id == 'btnBack'){
       
        
        document.getElementById('home').classList.add('active');
        document.getElementById('list').classList.remove('active');
        
    }else if (btn.id == 'btnSend'){
        document.getElementById('home').classList.remove('active');
        document.getElementById('list').classList.add('active');
   
    }
}

function getNumbers(ev){
    let url = "http://localhost/mad9014-lotto/nums.php";
    let fd = new FormData();
    let digits = document.getElementById('digits');
    let max = document.getElementById('max');
    let d = digits.value;
    let m = max.value;
    
    
    if(parseInt(d) && parseInt(m)){
       
        fd.append("digits",d);
        fd.append("max",m);
   
        
        let info = {
        method:'POST',
        body: fd
    };
    
    nav(ev);
    fetch(url,info)
    .then(response => response.json() )     
    .then(data => {
        
        if( data.code == 0){
        let ul = document.querySelector('ul.num_list');
        ul.innerHTML = "";
        data.numbers.forEach(num => {
            let li = document.createElement('li');
            li.className = 'num';
            li.textContent = num;
            ul.appendChild(li);
        })
        }
    });
    }else{
        
        alert('Enter Values');
    }
}