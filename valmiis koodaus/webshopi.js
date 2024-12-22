
const url = 'https://fakestoreapi.com/products'

/*tässä login credentialit
Username: mor_2314
Password: 83r5^_
*/

// Hae ja näytä tuotehakutiedot
async function getData() {
    const tuote = document.getElementById("tuote").value; // Haetaan hakukentän arvo
    const response = await fetch(`https://fakestoreapi.com/products/${tuote}`); // Hae tuote API:sta
    const data = await response.json();
    console.log(data); // Tulostetaan hakutulos konsoliin

    // Haetaan kategoriat ja mitä ne sisältää
    const categoria = await fetch(`https://fakestoreapi.com/products/categories`);
    const categoriadata = await categoria.json();
    console.log(categoriadata); 
}

// Elektroniikan tuotehakufunktio
async function elektroniikanfunktio() {
    const elek = await fetch(`https://fakestoreapi.com/products/category/electronics`); // Hae elektroniikkatuotteet
    const elekdata = await elek.json();
    return elekdata; // Palautetaan tuotteet
}

// Korujen tuotehakufunktio
async function jewerlyfunktio() {
    const jewe = await fetch(`https://fakestoreapi.com/products/category/jewelery`); // Hae korutuotteet
    const jewedata = await jewe.json();
    return jewedata; // Palautetaan tuotteet
}


//koodi alkaa tästä oikeasti ylhäällä vaan testailut



//fetchataan kaikki etusivulle
async function fetchkaikki(){
const respon = await fetch(`https://fakestoreapi.com/products`);
const data = await respon.json();

console.log(data)
const productList = document.getElementById("alkunäyttö"); 
    productList.innerHTML = "" //tyhjentää alkunäytön


//otan datan mitä haluan fetchata jokaisesta productista ja teen siitä suoraan html:n 
data.forEach((product) => {


    console.log(product)
    const price = product.price;
    const title = product.title;
    const image = product.image;

  //tässä tehdään uusi div elementti jossa on halutut tiedot
    const productDiv = document.createElement("div");
    productDiv.className = "kaikki"; //tällä pystyy suoraan muokkaamaan div olevia elementtejä
    productDiv.innerHTML = `
        <img src="${image}" alt="${title}" style="width:150px; height:150px;">
        <h3>${title}</h3>
        <p>Summa: $${price}</p>
          <button class="add-to-cart" data-id="${product.id}" data-title="${title}" data-price="${price}" data-image="${image}">Lisää ostoskoriin</button>
        
    `;
    //tässä annetaan tulos lopullisessa muodossa etusivulla näkyvään tekstiin jotta painikkeesta toimii tässä tapauksessa
    productList.appendChild(productDiv);
});
 // Hakee kaikki elementit, joilla on luokka add-to-cart
 const addToCartButtons = document.querySelectorAll('.add-to-cart');

 //kaikki funktion eli napin käymät tapahtumat
 addToCartButtons.forEach(button => {
     button.addEventListener('click', function () {
         const productId = this.getAttribute('data-id');
         const productTitle = this.getAttribute('data-title');
         const productPrice = parseFloat(this.getAttribute('data-price'));
         const productImage = this.getAttribute('data-image');
         //lopuksi kutsuu addproducttocart funktiota ja antaa sille nämä tiedot
         addProductToCart(productId, productTitle, productPrice, productImage);
     });
 });
}
//tämän avulla fetchkaikki funktio kutsuu itsensä heti sivun avauduttua
document.addEventListener("DOMContentLoaded", fetchkaikki);



 


// Elektroniikkaosio
document.getElementById("electronics").addEventListener("click", async function () {
    const data = await elektroniikanfunktio(); // Haetaan elektroniikkatuotteet
    console.log(data); // Tulostetaan tuotteet konsoliin

    // Piilotetaan muut osiot
    document.getElementById("productlistjewerly").style.display = "none";
    document.getElementById("productlistmens").style.display = "none";
    document.getElementById("productlistwomens").style.display = "none";
    document.getElementById("alkunäyttö").style.display="none";

    // Näytetään elektroniikkaosio html:ssä. tarkoitus tyhjentää kaikki muut siittä. ei olisi enään pakollinen koska kaikki piilotettiin jo
    const productList = document.getElementById("productlistelektroniikka");
    productList.innerHTML = ""; // Tyhjennetään mahdollinen vanha sisältö
    productList.style.display = "block"; // Varmistetaan, että se on näkyvissä

    //otan datan mitä haluan fetchata jokaisesta productista ja teen siitä suoraan html:n 
    data.forEach((product) => {
        const price = product.price;
        const title = product.title;
        const image = product.image;

  //tässä tehdään uusi div elementti jossa on halutut tiedot
        const productDiv = document.createElement("div");
        productDiv.className = "elektrocss"; //tällä pystyy suoraan muokkaamaan div olevia elementtejä
        productDiv.innerHTML = `
            <img src="${image}" alt="${title}" style="width:150px; height:150px;">
            <h3>${title}</h3>
            <p>Summa: $${price}</p>
            <button class="add-to-cart" data-id="${product.id}" data-title="${title}" data-price="${price}" data-image="${image}">Lisää ostoskoriin</button>
        `;
        //tässä annetaan tulos lopullisessa muodossa etusivulla näkyvään tekstiin jotta painikkeesta toimii
        productList.appendChild(productDiv);
    });

   // Hakee kaikki elementit, joilla on luokka add-to-cart
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    //kaikki funktion eli napin käymät tapahtumat
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-id');
            const productTitle = this.getAttribute('data-title');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            const productImage = this.getAttribute('data-image');
             //lopuksi kutsuu addproducttocart funktiota ja antaa sille nämä tiedot
            addProductToCart(productId, productTitle, productPrice, productImage);
        });
    });
});







//korujen
document.getElementById("jewerly").addEventListener("click", async function () {
    const data = await jewerlyfunktio(); // Haetaan korutuotteet
    console.log(data); // Tulostetaan tuotteet konsoliin

    // Piilotetaan muut osiot
    document.getElementById("productlistelektroniikka").style.display = "none";
    document.getElementById("productlistmens").style.display = "none";
    document.getElementById("productlistwomens").style.display = "none";
    document.getElementById("alkunäyttö").style.display="none";

    // Näytetään koruosio html:ssä. tarkoitus tyhjentää kaikki muut siittä. ei olisi enään pakollinen koska kaikki piilotettiin jo
    const productList = document.getElementById("productlistjewerly");
    productList.innerHTML = ""; // Tyhjennetään mahdollinen vanha sisältö
    productList.style.display = "block"; // Varmistetaan, että se on näkyvissä

   //otan datan mitä haluan fetchata jokaisesta productista ja teen siitä suoraan html:n 
    data.forEach((product) => {
        const price = product.price;
        const title = product.title;
        const image = product.image;

  //tässä tehdään uusi div elementti jossa on halutut tiedot
        const productDiv = document.createElement("div");
        productDiv.className = "jewerlyncss"; //tällä pystyy suoraan muokkaamaan div olevia elementtejä
        productDiv.innerHTML = `
            <img src="${image}" alt="${title}" style="width:150px; height:auto;">
            <h3>${title}</h3>
            <p>Summa: $${price}</p>
            <button class="add-to-cart" data-id="${product.id}" data-title="${title}" data-price="${price}" data-image="${image}">Lisää ostoskoriin</button>
        `;
        //tässä annetaan tulos lopullisessa muodossa etusivulla näkyvään tekstiin jotta painikkeesta toimii
        productList.appendChild(productDiv);
    });

    // Hakee kaikki elementit, joilla on luokka add-to-cart
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    //kaikki funktion eli napin käymät tapahtumat
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-id');
            const productTitle = this.getAttribute('data-title');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            const productImage = this.getAttribute('data-image');
             //lopuksi kutsuu addproducttocart funktiota ja antaa sille nämä tiedot
            addProductToCart(productId, productTitle, productPrice, productImage);
        });
    });
});

// Miesten vaatteet -osio
async function mens() {
    const menn = await fetch(`https://fakestoreapi.com/products/category/men's clothing`); // Hae miesten vaatteet
    const menndata = await menn.json();
    return menndata; // Palautetaan tuotteet
}

// Näytä miesten vaatteet -osio
document.getElementById("mena").addEventListener("click", async function () {
    const data = await mens(); // Haetaan miesten vaatteet
    console.log(data); // Tulostetaan tuotteet konsoliin

    // Piilotetaan muut osiot
    document.getElementById("productlistelektroniikka").style.display = "none";
    document.getElementById("productlistjewerly").style.display = "none";
    document.getElementById("productlistwomens").style.display = "none";
    document.getElementById("alkunäyttö").style.display="none";

    // Näytetään miesten vaatteet -osio html:ssä. tarkoitus tyhjentää kaikki muut siittä. ei olisi enään pakollinen koska kaikki piilotettiin jo
    const productList = document.getElementById("productlistmens");
    productList.innerHTML = ""; // Tyhjennetään mahdollinen vanha sisältö
    productList.style.display = "block"; // Varmistetaan, että se on näkyvissä

   //otan datan mitä haluan fetchata jokaisesta productista ja teen siitä suoraan html:n 
    data.forEach((product) => {
        const price = product.price;
        const title = product.title;
        const image = product.image;

  //tässä tehdään uusi div elementti jossa on halutut tiedot
        const productDiv = document.createElement("div");
        productDiv.className = "menscss"; //tällä pystyy suoraan muokkaamaan div olevia elementtejä
        productDiv.innerHTML = `
            <img src="${image}" alt="${title}" style="width:150px; height:auto;">
            <h3>${title}</h3>
            <p>Summa: $${price}</p>
             <button class="add-to-cart" data-id="${product.id}" data-title="${title}" data-price="${price}" data-image="${image}">Lisää ostoskoriin</button>
        `;
        //tässä annetaan tulos lopullisessa muodossa etusivulla näkyvään tekstiin jotta painikkeesta toimii
        productList.appendChild(productDiv);
    });
      // Hakee kaikki elementit, joilla on luokka add-to-cart
      const addToCartButtons = document.querySelectorAll('.add-to-cart');
      //kaikki funktion eli napin käymät tapahtumat
      addToCartButtons.forEach(button => {
          button.addEventListener('click', function () {
              const productId = this.getAttribute('data-id');
              const productTitle = this.getAttribute('data-title');
              const productPrice = parseFloat(this.getAttribute('data-price'));
              const productImage = this.getAttribute('data-image');
               //lopuksi kutsuu addproducttocart funktiota ja antaa sille nämä tiedot
              addProductToCart(productId, productTitle, productPrice, productImage);
          });
                });
});


// Naisten vaatteet testi
async function women() {
    const woma = await fetch(`https://fakestoreapi.com/products/category/women's clothing`); 
    const womadata = await woma.json();
    return womadata; 
}

// Näytä naisten vaatteet 
document.getElementById("womens").addEventListener("click", async function () { //painamalla naisten vaatteet kohtaa tulee tulokset
    const data = await women(); // Haetaan naisten vaatteet
    console.log(data); // Tulostetaan tuotteet konsoliin

    // Piilotetaan muut osiot kun funktioo callataan
    document.getElementById("productlistelektroniikka").style.display = "none";
    document.getElementById("productlistjewerly").style.display = "none";
    document.getElementById("productlistmens").style.display = "none";
    document.getElementById("alkunäyttö").style.display="none";

    // Näytetään naisten vaatteet osio html:ssä. tarkoitus tyhjentää kaikki muut siittä. ei olisi enään pakollinen koska kaikki piilotettiin jo
    const productList = document.getElementById("productlistwomens");
    productList.innerHTML = ""; // Tyhjennetään mahdollinen vanha sisältö
    productList.style.display = "block"; // Varmistetaan, että se on näkyvissä

    //otan datan mitä haluan fetchata jokaisesta productista ja teen siitä suoraan html:n 
    data.forEach((product) => {
        const price = product.price;
        const title = product.title;
        const image = product.image;

        //tässä tehdään uusi div elementti jossa on halutut tiedot
        const productDiv = document.createElement("div");
        productDiv.className = "womenscss"; //tällä pystyy suoraan muokkaamaan div olevia elementtejä
        productDiv.innerHTML = `
            <img src="${image}" alt="${title}" style="width:150px; height:auto;">
            <h3>${title}</h3>
            <p>Summa: $${price}</p>
            <button class="add-to-cart" data-id="${product.id}" data-title="${title}" data-price="${price}" data-image="${image}">Lisää ostoskoriin</button>
        `;
        productList.appendChild(productDiv); //tässä annetaan tulos lopullisessa muodossa etusivulla näkyvään tekstiin jotta painikkeesta toimii
    });

    // Hakee kaikki elementit, joilla on luokka add-to-cart
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    //kaikki funktion eli napin käymät tapahtumat
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-id');
            const productTitle = this.getAttribute('data-title');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            const productImage = this.getAttribute('data-image');
             //lopuksi kutsuu addproducttocart funktiota ja antaa sille nämä tiedot
            addProductToCart(productId, productTitle, productPrice, productImage);
        });
              });
            });





// tässä alla kaikki shopping cartin ja kotinäppäimen


//haetaan cartin tiedot selaimen storage muistista
let cart = JSON.parse(localStorage.getItem("cart")) || []

function addProductToCart(id, title, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    //jos itemi on jo korissa niin sen määrä vain lisääntyy. muuten uusi itemi vain tulee
    const existingProductIndex = cart.findIndex(item => item.id === id);
    if (existingProductIndex !== -1) {
        
        cart[existingProductIndex].quantity += 1;
    } else {
        
        cart.push({ id, title, price, image, quantity: 1 });
    }

    //tallennetaan ostoskori localstorageen
    localStorage.setItem("cart", JSON.stringify(cart));

    
    updateCart();
}


function updateCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

     // Tyhjennetään lista ennen kuin lisätään uudet tavarat
    cartItemsList.innerHTML = '';

    let totalPrice = 0;

     // Käydään läpi kaikki ostoskorissa olevat tuotteet
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.title} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
            <button class="remove-from-cart" data-id="${item.id}">Remove</button>
        `;
        cartItemsList.appendChild(li);

         // Lasketaan kokonaissumma
        totalPrice += item.price * item.quantity;
    });

  // Päivitetään kokonaissumma HTML:ssä
    totalPriceElement.textContent = totalPrice.toFixed(2); //pyöristää summan

   //remove buttonin lisäys
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-id');
            removeProductFromCart(productId);
        });
    });
}

// poistaa tuotteen sen idn perusteella
function removeProductFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

     // Poistaa tuotteen ostoskorista, jonka ID vastaa annettua id tä
    cart = cart.filter(item => item.id !== id);

     // Tallentaa päivitetyn ostoskorin takaisin localStorageen
    localStorage.setItem("cart", JSON.stringify(cart));

    // päivittää näkymän
    updateCart();
}
// Odottaa, että sivu on täysin ladattu ennen kuin päivittää ostoskorin
document.addEventListener('DOMContentLoaded', function () {
    updateCart(); // päivittää taas
});

// Kotinäppäin, joka vie käyttäjän takaisin verkkokauppasivulle ja säilyttää ostoskorin tiedot
document.getElementById("kotinä").addEventListener("click", function () {
    window.location.href = "web shop.html"; 
});


////////////////
//orderi tämän alla
async function placeOrder() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderOutput = document.getElementById('order-output');

    // Tarkistetaan, onko ostoskori tyhjä
    if (cart.length === 0) {
        orderOutput.textContent = "Ostoskori on tyhjä!";
        return;
    }

    // Lähetetään tilaus POST-pyynnöllä fakestoreapiin 
    const response = await fetch('https://fakestoreapi.com/carts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Lähetetään JSON-tietoa
        },
        body: JSON.stringify({
            userId: 1,  // Käyttäjän ID 
            date: new Date().toISOString(), // Tilauspäivämäärä
            products: cart.map(item => ({
                productId: item.id, // Tuotteen ID
                quantity: item.quantity, // Tuotteen määrä ostoskorissa
            })),
        }),
    });

    // Tarkistetaan, että pyyntö onnistui
    if (!response.ok) {
        orderOutput.textContent = "Tilaus epäonnistui: " + response.statusText;
        return;
    }

    // Saadaan vastaus APIlta
    const data = await response.json();
    orderOutput.textContent = "Tilaus onnistui!";
    console.log("Tilaus vastaus:", data); // Tulostetaan tilauksen vastaus konsoliin

    // Tyhjennetään ostoskori ja päivitetään näkymä
    localStorage.removeItem("cart");
    updateCart();
}

document.getElementById('place-order').addEventListener('click', placeOrder);




document.getElementById("productlistelektroniikka").addEventListener('click', function() {
    // Vaihda koko sivun tyyli
    document.body.classList.toggle('new-style');

})




//loginni tähä
//submitin avulla tieto lähetetään apiin
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // estää sivun lataamisen

    //Otetaan tiedot etusivulta
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

   //kutsuu login funktioo
    const loginResult = await login(username, password);

    //jos tulos on oiein/väärin tulostaa vastauksen
    if (loginResult) {
        console.log('kirjautuminen onnistui', loginResult);
        
    } else {
        console.error('kirjautuminen epäonnistui');
    }
});

// Login function
async function login(username, password) {
    try {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST', //post pyyntö apiin 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }), 
            
        });
        //kun pyyntö on valmis tarkistetaan menikö läpi
        if (!response.ok) {
            throw new Error(`Login failed: ${response.statusText}`);
        }

        const data = await response.json();
        
        //sitten katsotaan sisältääkö se halutun tokenin
        if (data.token) {
            return data.token; 
        } else {
            throw new Error('Tokenia ei löytynyt');
        }
    } catch (error) {
        console.error(error);
        return null; 
    }
}


/*tässä  login credentialit
Username: mor_2314
Password: 83r5^_ */