// loader

window.onload = ()=>{

setTimeout(()=>{

document.getElementById("loader").style.opacity=0;

setTimeout(()=>{
document.getElementById("loader").style.display="none";
},1000)

},2000)

}



fetch("data/menu.json")
.then(res=>res.json())
.then(data=>{

showMenu(data)

document
.getElementById("searchInput")
.addEventListener("keyup",(e)=>{

let keyword=e.target.value.toLowerCase()

let filtered=data.filter(item=>

item.name.toLowerCase().includes(keyword)

)

showMenu(filtered)

})

})


function showMenu(data){

let html=""

data.forEach(item=>{

html+=`

<div class="menu-item">

<div class="info">

<div class="name">
${item.name}
</div>

<div class="description">
${item.description}
</div>

</div>

<div class="price">

${item.price}

</div>

</div>

`

})

document.getElementById("menu-container").innerHTML=html

}