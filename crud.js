//get total
//creat prodect 
//save localstorage
//clear input
//read
//count 
//update
//delete
//search
//clean date

let title = document.getElementById('text');
let price= document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tem ;
//get total
function getTotal()
{
    if (price.value != '') {
        let reste =(+price.value + +taxes.value + +ads.value ) - +discount.value ;
        total.innerHTML = reste;
        total.style.background ='rgb(11, 136, 0' ;
    } else {
        total.innerHTML = '' ;
        total.style.background ='hsl(0, 99%, 34%)' ;
    }
}
//creat prodect 
let detePro ;
if(localStorage.product != null){
    detePro = JSON.parse(localStorage.product)
}else {
    detePro = [] ;
}


submit.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if (title.value != '' && price.value != '' && category.value != '') {
        if (mood === 'create') {
            if(newPro.count > 1) {
                for(let i =0; i < newPro.count;i++) {
                    detePro.push(newPro)
                    
                }
            }else {
                detePro.push(newPro)
                total.style.background='hsl(0, 99%, 34%)' ;
            }
        }else {
             detePro[tem] =newPro ;
             mood = 'create';
             count.style.display='block';
             total.style.background='hsl(0, 99%, 34%)' ;
             submit.innerHTML = 'create' ;
    
        }
        clearData()
    }
  
    localStorage.setItem('product', JSON.stringify(detePro))
    showDate() 
    
}
//clear input
function clearData() {
    title.value = '' ;
    price.value = '' ;
    taxes.value = '' ;
    ads.value = '' ;
    discount.value = '' ;
    total.innerHTML = '' ;
    count.value = '' ;
    category.value = '' ;
}

//read 
function showDate() {
    let teble = '' ;
    for(let i = 0 ; i<detePro.length;i++) {
        teble += `
        <tr>
        <td>${i}</td>
        <td>${detePro[i].title}</td>
        <td>${detePro[i].price}</td>
        <td>${detePro[i].taxes}</td>
        <td>${detePro[i].ads}</td>
        <td>${detePro[i].discount}</td>
        <td>${detePro[i].total}</td>
        <td>${detePro[i].category}</td>
        <td><button onclick="update(${i})"  id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `
    }
      document.getElementById('tbody').innerHTML = teble;
      let deleall =document.getElementById('deleall');
      if(detePro.length > 0){
        deleall.innerHTML = `<button  onclick="deleall()" >DeleteAll (${detePro.length})</button>`
      }else {
        deleall.innerHTML = '';
        count.style.display='block';
      }
}
showDate() 

//delete
function deleteData(i)
{
   detePro.splice(i,1) 
   localStorage.product=JSON.stringify(detePro)
   showDate() 
}

function deleall() {
    detePro.splice(0) 
    localStorage.clear()
    showDate() 
}
//update
function update(i) {
    title.value = detePro[i].title;
    price.value = detePro[i].price;
    taxes.value = detePro[i].taxes;
    ads.value = detePro[i].ads;
    title.discount = detePro[i].discount;
    getTotal()
    count.style.display='none';
    category.value = detePro[i].category;
    submit.innerHTML = 'update' ;
    mood = 'update' ;
    tem = i;
    scroll({
        top:0,
        behavior :'smooth'
    })
}
//search
let searchmood = 'title'
function getsearch(id) {
    let search = document.getElementById('search');
   if (id == 'searchtitle') {
    searchmood = 'title' ;
   }else {
    searchmood = 'Category';
   }
   search.Placeholder = 'Search By ' +searchmood ;
   search.focus()
   search.value = '' ;
   showDate() 
}

function searchget(value){
    let teble = '' ;
    if (searchmood == 'title') {
        for(let i = 0 ; i<detePro.length;i++){
            if (detePro[i].title.includes(value.toLowerCase())) {
                teble += `
        <tr>
        <td>${i}</td>
        <td>${detePro[i].title}</td>
        <td>${detePro[i].price}</td>
        <td>${detePro[i].taxes}</td>
        <td>${detePro[i].ads}</td>
        <td>${detePro[i].discount}</td>
        <td>${detePro[i].total}</td>
        <td>${detePro[i].category}</td>
        <td><button onclick="update(${i})"  id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr> 
        `
            }
        }
    }else {
        for(let i = 0 ; i<detePro.length;i++){
            if (detePro[i].category.includes(value.toLowerCase())) {
                teble += `
        <tr>
        <td>${i}</td>
        <td>${detePro[i].title}</td>
        <td>${detePro[i].price}</td>
        <td>${detePro[i].taxes}</td>
        <td>${detePro[i].ads}</td>
        <td>${detePro[i].discount}</td>
        <td>${detePro[i].total}</td>
        <td>${detePro[i].category}</td>
        <td><button onclick="update(${i})"  id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr> 
        `
            }
        }
    }
    document.getElementById('tbody').innerHTML = teble;
}