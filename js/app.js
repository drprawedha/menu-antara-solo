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

const heroImages = {

    "HOME": "home.png",

    "LIGHT BITES": "light-bites.png",

    "APPETIZER & SALAD": "appetizer.png",

    "SOUP": "soup.png",

    "INTERNATIONAL FAVOURITES": "international.png",

    "GRILL": "grill.png",

    "THIN CRUST PIZZA": "pizza.png",

    "INDONESIAN HERITAGE": "heritage.png",

    "ASIAN DELIGHT": "asian.png",

    "DESSERT": "dessert.png",

    "COFFEE SELECTIONS": "coffee.png",

    "TEA SPECIALITIES": "tea.png",

    "FRESH JUICE": "juice.png",

    "MOCKTAILS": "mocktail.png",

    "TRADITIONAL DRINKS": "traditional.png",

    "MILKSHAKE": "milkshake.png",

    "SOFT DRINK": "softdrink.png",

    "BEERS": "beer.png"

};
// =======================
// LOAD JSON
// =======================

fetch("data/menu.json")
.then(res => res.json())
.then(data => {

    menuData = data;

    // tampilkan halaman home pertama kali
    showHome();

    // search
    document.getElementById("searchInput")
    .addEventListener("keyup",(e)=>{

        let keyword=e.target.value.toLowerCase();

        let filtered = menuData.filter(item=>

            item.name.toLowerCase().includes(keyword) ||

            item.description.toLowerCase().includes(keyword)

        );

        document.getElementById("currentCategory").innerHTML =
        "SEARCH RESULT";

        changeHero("HOME");

        document.getElementById("hero-title").innerHTML =
        "SEARCH RESULT";

        document.getElementById("hero-description").innerHTML =
        "Find your favourite dishes";

        showMenu(filtered);

    });

    // kategori
    document.querySelectorAll("[data-category]")
    .forEach(btn=>{

        btn.addEventListener("click",(e)=>{

            e.preventDefault();

            let category = btn.dataset.category;

            showCategory(category);

        });

    });

    // HOME BUTTON
document.getElementById("homeBtn")
.addEventListener("click",(e)=>{

    e.preventDefault();

    showHome();

    document
    .querySelectorAll(".nav-menu a")
    .forEach(item=>{

        item.classList.remove("active");

    });

});

});

// =======================
// HOME
// =======================

function showHome(){

    document.getElementById("currentCategory").innerHTML = "";

    changeHero("HOME");
    document
.querySelectorAll(".nav-menu a")
.forEach(item=>{

    item.classList.remove("active");

});

    document.getElementById("hero-title").innerHTML =
    "ANTARA RESTAURANT";

    document.getElementById("hero-description").innerHTML =
    "Experience Indonesian Heritage & International Cuisine";

    document.getElementById("menu-container").innerHTML = `

    <div class="welcome">

        <h2>
            A Tasteful Experience Awaits
        </h2>

        <div class="subtitle">
            Inspired by Heritage, Crafted with Passion
        </div>

        <p>
            From traditional Indonesian recipes to international classics,
            every dish at ANTARA is carefully prepared to create memorable
            experiences through authentic flavours and refined culinary artistry.
        </p>

    </div>

    `;

}


// =======================
// CATEGORY
// =======================

function setActiveMenu(category){

    document
    .querySelectorAll(".nav-menu a")
    .forEach(item=>{

        item.classList.remove("active");

    });

    document
    .querySelector(`[data-category="${category}"]`)
    ?.classList.add("active");

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

if(slider){

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

}

function changeHero(category){

    const hero = document.getElementById("hero");

    const image = heroImages[category] || "home.png";

    hero.style.backgroundImage =
        `url('images/hero/${image}')`;

}


function showCategory(category){

    document.getElementById("currentCategory").innerHTML =
    category;

    changeHero(category);

    document.getElementById("hero-title").innerHTML =
    category;

    document.getElementById("hero-description").innerHTML =
    "Explore our selection";

    let filtered = menuData.filter(item=>

        item.category === category

    );

    showMenu(filtered);

    setActiveMenu(category);

}


