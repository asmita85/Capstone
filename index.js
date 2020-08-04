// account validation
function ValidateForm() {
  var email = document.getElementById("email");
  var confirmEmail = document.getElementById("confirmEmail");
  var password = document.getElementById("password");
  var confirmPassword = document.getElementById("confirmPassword");
  removeMessage();
  var valid = true;
  if (email.value.length == 0) {
    email.className = "wrong-input";
    email.nextElementSibling.innerHTML = `email can not be blank`;
    valid = false;
  }
  if (password.value.length < 6) {
    password.className = "wrong-input";
    password.nextElementSibling.innerHTML = `password can not be less than 6`;
    valid = false;
  }
  if (confirmPassword.value != password.value) {
    password.className = "wrong-input";
    password.nextElementSibling.innerHTML = `password does not match`;
    valid = false;
  }

  if (confirmEmail.value != email.value) {
    email.className = "wrong-input";
    email.nextElementSibling.innerHTML = `email does not match`;
    valid = false;
  }
  return valid;
}

function removeMessage() {
  var errorInput = document.querySelectorAll(".input-box");
  [].forEach.call(errorInput, function(el) {
    el.classList.remove("wrong-input");
  });
  var errorPara = document.querySelectorAll(".error");
  [].forEach.call(errorPara, function(el) {
    el.innerHTML = "";
  });
}
//end of account validation

// menu
var menuItems = document.getElementById("menu-item");
menuItems.style.maxHeight = "0px";

function menuToggle() {
  if (menuItems.style.maxHeight == "0px") {
    menuItems.style.maxHeight = "200px";
  } else {
    menuItems.style.maxHeight = "0px";
  }
}
//end of menu

//product detail gallery
var mainImg = document.getElementById("main-img");
var galleryImg = document.getElementsByClassName("gallery-img");
for (let i = 0; i < galleryImg.length; i++) {
  galleryImg[i].onclick = function() {
    mainImg.src = galleryImg[i].src;
  };
}
//end product detail gallery

// toggle form account page
var formLogin = document.getElementById("formLogin");
var formRegister = document.getElementById("formRegister");
var indicator = document.getElementById("indicator1");
function register() {
  formLogin.style.transform = "translateX(-400px)";
  formRegister.style.transform = "translateX(0px)";
  indicator.style.transform = "translateX(100px)";
}
function login() {
  formLogin.style.transform = "translateX(0px)";
  formRegister.style.transform = "translateX(400px)";
  indicator.style.transform = "translateX(0px)";
}
//end of toggle

//load product form the json file
const menProductsDOM = document.querySelector(".men-products-center");
const womenProductsDOM = document.querySelector(".women-products-center");
const kidProductsDOM = document.querySelector(".kid-products-center");
const menA = document.getElementById("men-a");

//getting the men product
// class Productstest {
//   async getProductstest() {
//     try {
//       let result = await fetch("products.json");
//       let data = await result.json();
//       let productsmtest = data.menItems;
//       let productswtest = data.womenItems;
//       let productsktest = data.kidItems;

//       productsmtest = productsmtest.map(item1 => {
//         const { title, price } = item1.fields;
//         const { id } = item1.sys;
//         const image = item1.fields.image.fields.file.url;
//         return { title, price, id, image };
//       });

//       productswtest = productswtest.map(item2 => {
//         const { title, price } = item2.fields;
//         const { id } = item2.sys;
//         const image = item2.fields.image.fields.file.url;
//         return { title, price, id, image };
//       });

//       productsktest = productsktest.map(item3 => {
//         const { title, price } = item3.fields;
//         const { id } = item3.sys;
//         const image = item3.fields.image.fields.file.url;
//         return { title, price, id, image };
//       });
//       console.log(productsmtest, productswtest, productsktest);
//       return productsmtest, productswtest, productsktest;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }
class Products {
  async getProducts() {
    try {
      let result = await fetch("products.json");
      let data = await result.json();
      let products = data.menItems;
      products = products.map(item => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, price, id, image };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}
//display men products
class UI {
  displayProducts(products) {
    menProductsDOM.innerHTML = "";
    products.forEach(products => {
      menProductsDOM.innerHTML += `
          <div class="col-4 img-container">
              <a href="productDetail.html"><img src=${products.image} class="selectedItem-img"></a>
              <div class="rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star-half-o"></i>
                </div>
              <h4>${products.title}</h4>
              <p>$${products.price}</p>
          </div>
      `;
    });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  //get all product
  products.getProducts().then(products => {
    ui.displayProducts(products);
  });
});

//getting women product
class wProducts {
  async getWomenProducts() {
    try {
      let result = await fetch("products.json");
      let data = await result.json();
      let wproducts = data.womenItems;
      wproducts = wproducts.map(item => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, price, id, image };
      });
      return wproducts;
    } catch (error) {
      console.log(error);
    }
  }
}
//display women products
class WUI {
  displayWomenProducts(products) {
    products.forEach(products => {
      womenProductsDOM.innerHTML += `
          <div class="col-4 img-container">
              <a href="productDetail.html" id="selected"><img src=${products.image} class="selectedItem-img"></a>
              <div class="rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star-half-o"></i>
                </div>
              <h4>${products.title}</h4>
              <p>$${products.price}</p>
          </div>
      `;
    });
  }
}
//
document.addEventListener("DOMContentLoaded", () => {
  const wui = new WUI();
  const products = new wProducts();
  //get all product
  products
    .getWomenProducts()
    .then(products => wui.displayWomenProducts(products));
});

// getting kid product
class kProducts {
  async getKidProducts() {
    try {
      let result = await fetch("products.json");
      let data = await result.json();
      let products = data.kidItems;
      products = products.map(item => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, price, id, image };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

//display kid products
class KUI {
  displayKidProducts(products) {
    products.forEach(products => {
      kidProductsDOM.innerHTML += `
          <div class="col-4 img-container">
              <a id="store" href="productDetail.html" ><img src=${products.image} class="selectedItem-img"></a>
              <div class="rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star-half-o"></i>
                </div>
              <h4>${products.title}</h4>
              <p>$${products.price}</p>
          </div>
      `;
    });
  }
}
//
document.addEventListener("DOMContentLoaded", () => {
  const kui = new KUI();
  const products = new kProducts();
  //get all product
  products.getKidProducts().then(products => kui.displayKidProducts(products));
});
//end of loading product form the json file
