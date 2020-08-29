//new way to load product

// const mProducts = document.querySelector(".men-products-center");
// const wProducts = document.querySelector(".women-products-center");
// const kidProducts = document.querySelector(".kid-products-center");

// let showObj = function(products, page) {
//   page.innerHTML = " ";
//   ("I am in men printing");
//   // (products);
//   products.forEach(products => {
//     page.innerHTML += `
//             <div class="col-4 img-container">
//                   <a href="productDetail.html" id="selected"><img src="${products.fields.image.fields.file.url}" class="selectedItem-img"></a>
//                 <h4>"${products.fields.title}"</h4>
//                <p>$"${products.fields.price}"</p>
//              </div>
//          `;
//   });
// };

// let mainObj = {};
// fetch("./products.json")
//   .then(function(resp) {
//     (resp.json);
//     return resp.json();
//   })
//   .then(function(data) {
//     //(data);
//     mainObj = data;
//     showObj(mainObj.menItems, mProducts);
//   });

// fetch("./products.json")
//   .then(function(resp) {
//     (resp.json);
//     return resp.json();
//   })
//   .then(function(data) {
//     //(data);
//     mainObj = data;
//     showObj(mainObj.womenItems, wProducts);
//   });

// fetch("./products.json")
//   .then(function(resp) {
//     (resp.json);
//     return resp.json();
//   })
//   .then(function(data) {
//     //(data);
//     mainObj = data;
//     showObj(mainObj.kidItems, kidProducts);
//   });
// //end of loading product
// //cart;

//old nav
// function addNavEventListeners() {
//   document.querySelectorAll("nav a").forEach(link => {
//     link.addEventListener("click", event => {
//       event.preventDefault();
//       let linkText = event.target.textContent;
//       (linkText);
//       if (linkText === "Men" || linkText === "Women" || linkText === "Kids") {
//         ("I am in product");
//         let pieceOfState = state[linkText];
//         menuItems.style.maxHeight = "0px";

//         render(pieceOfState);
//         addHtml(linkText);
//       } else {
//         ("I am not in product page");
//         render(state[linkText]);
//       }
//     });
//   });
//}
//
// // account validation
// function ValidateForm() {
//   var email = document.getElementById("email");
//   var confirmEmail = document.getElementById("confirmEmail");
//   var password = document.getElementById("password");
//   var confirmPassword = document.getElementById("confirmPassword");
//   removeMessage();
//   var valid = true;
//   if (email.value.length == 0) {
//     email.className = "wrong-input";
//     email.nextElementSibling.innerHTML = `email can not be blank`;
//     valid = false;
//   }
//   if (password.value.length < 6) {
//     password.className = "wrong-input";
//     password.nextElementSibling.innerHTML = `password can not be less than 6`;
//     valid = false;
//   }
//   if (confirmPassword.value != password.value) {
//     password.className = "wrong-input";
//     password.nextElementSibling.innerHTML = `password does not match`;
//     valid = false;
//   }

//   if (confirmEmail.value != email.value) {
//     email.className = "wrong-input";
//     email.nextElementSibling.innerHTML = `email does not match`;
//     valid = false;
//   }
//   return valid;
// }

// function removeMessage() {
//   var errorInput = document.querySelectorAll(".input-box");
//   [].forEach.call(errorInput, function(el) {
//     el.classList.remove("wrong-input");
//   });
//   var errorPara = document.querySelectorAll(".error");
//   [].forEach.call(errorPara, function(el) {
//     el.innerHTML = "";
//   });
// }
// //prevent default to not go to error page
// let form = document.querySelector(".simpleForm");
// function stopFormSubmit(e) {
//   e.preventDefault();
// }
// //form.onclick = stopFormSubmit;

// //end of account validation

// //end of menu
//************************* Product Page ****************************/
function addProductDetailListeners() {
  const itemsToOpen = document.getElementsByClassName("img-container");
  for (let i = 0; i < itemsToOpen.length; i++) {
    let img = itemsToOpen[i];
    img.addEventListener("click", addToCart);
  }
}
//define the data from the item that we are clicking
// function ItemToOpen(event) {
//   let clickedImg = event.target;
//   let itemToOpen = clickedImg.parentElement.parentElement;
//   let image = itemToOpen.getElementsByClassName("selectedItem-img")[0].src;
//   let price = itemToOpen.getElementsByClassName("selectedItem-price")[0]
//     .innerText;
//   let title = itemToOpen.getElementsByClassName("selectedItem-title")[0]
//     .innerText;
//   let id = itemToOpen.id;
//   displayItemDetail(image, title, price, id);
// }
// //display the data of the clicked item in our product detail view
// function displayItemDetail(image, title, price, id) {
//   //render(state.Product);
//   document.getElementsByClassName("main-img")[0].src = image;
//   document.getElementsByClassName("title")[0].innerText = title;
//   document.getElementsByClassName("price")[0].innerText = price;
//   document.getElementsByClassName("selected-product")[0].id = id;
//   menuToggle();
// }
// //********************************** *END of ProductDetail* view**************//
