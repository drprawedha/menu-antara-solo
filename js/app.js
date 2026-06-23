// =======================
// LOADER
// =======================

window.onload = () => {

    setTimeout(() => {

        document.getElementById("loader").style.opacity = 0;

        setTimeout(() => {
            document.getElementById("loader").style.display = "none";
        }, 1000);

    }, 2000);

}


let menuData = [];


// =======================
// LOAD JSON
// =======================

fetch("data/menu.json")
.then(res => res.json())
.then(data => {

    menuData = data;

    // halaman awal kosong
    showHome();

    // search
    document.getElementById("searchInput")
    .addEventListener("keyup", (e)=>{

        let keyword = e.target.value.toLowerCase();

        let filtered = menuData.filter(item =>
            item.name.toLowerCase().includes(keyword)
        );

        document.getElementById("currentCategory").innerHTML = "SEARCH RESULT";

        showMenu(filtered);

    });


    // kategori
    document.querySelectorAll("[data-category]").forEach(btn=>{

        btn.addEventListener("click",(e)=>{

            e.preventDefault();

            let category = btn.dataset.category;

            showCategory(category);

        });

    });


    // tombol home
    document.getElementById("homeBtn")
    .addEventListener("click",(e)=>{

        e.preventDefault();

        showHome();

    });


});


// =======================
// HOME
// =======================

function showHome(){

    document.getElementById("currentCategory").innerHTML = "";

    document.getElementById("menu-container").innerHTML = `

        <div class="welcome">

            <h2>Welcome to ANTARA Restaurant</h2>

            <p>
            Experience Indonesian Heritage and International Cuisine.
            Please select a category from the menu above.
            </p>

        </div>

    `;

    document.getElementById("hero-title").innerHTML =
    "ANTARA RESTAURANT";

}


// =======================
// CATEGORY
// =======================

function showCategory(category){

    document.getElementById("currentCategory").innerHTML =
    category;

    let filtered = menuData.filter(item =>
        item.category === category
    );

    showMenu(filtered);

}


// =======================
// MENU
// =======================

function showMenu(data){

    let html = "";

    data.forEach(item=>{

        html += `

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

        `;

    });

    document.getElementById("menu-container").innerHTML = html;

}
// ====================================
// DRAG NAVBAR
// ====================================

const slider = document.querySelector(".nav-menu");

let isDown = false;

let startX;

let scrollLeft;


slider.addEventListener("mousedown",(e)=>{

    isDown = true;

    slider.classList.add("active");

    startX = e.pageX - slider.offsetLeft;

    scrollLeft = slider.scrollLeft;

});


slider.addEventListener("mouseleave",()=>{

    isDown = false;

    slider.classList.remove("active");

});


slider.addEventListener("mouseup",()=>{

    isDown = false;

    slider.classList.remove("active");

});


slider.addEventListener("mousemove",(e)=>{

    if(!isDown) return;

    e.preventDefault();

    const x = e.pageX - slider.offsetLeft;

    const walk = (x - startX) * 2;

    slider.scrollLeft = scrollLeft - walk;

});

