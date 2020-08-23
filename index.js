import { Header, Nav, Main, Main2, Footer } from "./components";
import * as state from "./store";
import Navigo from "navigo";
import { capitalize, compact } from "lodash";
import { auth, db } from "./firebase";
//loading the page before calling the js
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", addCartEventListeners());
} else {
  addCartEventListeners();
}
function render(st = state.Home) {
  document.querySelector("#root").innerHTML = `
  ${Header(st)}
  ${Nav(state.Links)}
  ${Main(st)}
  ${Footer()}
  `;
  router.updatePageLinks();
  addPEventListeners();
  addCartEventListeners();
  // listenForRegister(st);
  if (st === state.Account) {
    listenForRegister();
    listenForSignIn();
    addLogInAndOutListener(state.User);
    listenForAuthChange();
  }
  local();
  searchEventListener();
}
//Navigo and Router
const router = new Navigo(location.origin);
router
  .on({
    "/": () => {
      render(state.Home);
      menuToggle();
    },
    ":page/:id": params => renderProductDetails(params),
    ":page": params => {
      let routeEntered = params.page;
      let formattedRoute = capitalize(routeEntered);
      if (
        formattedRoute === "Men" ||
        formattedRoute === "Women" ||
        formattedRoute === "Kids"
      ) {
        let pieceOfState = state[formattedRoute];
        render(pieceOfState);
        addHtml(formattedRoute);
        //addProductDetailListeners();
      } else if (formattedRoute === "Contact") {
        let pieceOfState = state[formattedRoute];
        render(pieceOfState);
      } else if (formattedRoute === "Product") {
        let pieceOfState = state[formattedRoute];
        render(pieceOfState);
      } else if (formattedRoute === "Cart") {
        let pieceOfState = state[formattedRoute];
        render(pieceOfState);
      } else if (formattedRoute === "Search") {
        render(state.search);
      } else if (formattedRoute === "Account") {
        let pieceOfState = state[formattedRoute];
        render(pieceOfState);
        // listenForRegister();
        // listenForSignIn();
        // addLogInAndOutListener(state.User);
        // listenForAuthChange();
      } else {
        render();
      }
      local();
      menuToggle();
    }
  })
  .resolve();

//write the data of new user in firebase
function listenForRegister() {
  let btn = document.getElementById("user-btn");
  console.log("I am in account");
  btn.addEventListener("click", event => {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    //create user in Firebase
    auth.createUserWithEmailAndPassword(email, password).then(response => {
      console.log("user registered");
      console.log(response);
      console.log(response.user);
      addUserToStateAndDb(name, email, password);
      render(state.Home);
    });
  });
}
function addUserToStateAndDb(name, email, pass) {
  state.User.name = name;
  state.User.email = email;
  state.User.loggedIn = true;
  db.collection("Users").add({
    name: name,
    email: email,
    password: pass,
    signedIn: true
  });
}
//******* end of register ************* */

// ***************verify data and sign in**/
function listenForSignIn() {
  let btn = document.getElementById("user-btn1");
  console.log(btn);
  btn.addEventListener("click", event => {
    event.preventDefault();
    // convert HTML elements to Array
    let email = document.getElementById("email1").value;
    let password = document.getElementById("password1").value;
    auth.signInWithEmailAndPassword(email, password).then(() => {
      console.log("user signed in");
      getUserFromDb(email).then(() => render(state.Home));
    });
  });
}
function getUserFromDb(email) {
  return db
    .collection("Users")
    .get()
    .then(snapshot =>
      snapshot.docs.forEach(doc => {
        if (email === doc.data().email) {
          let id = doc.id;
          db.collection("Users")
            .doc(id)
            .update({ signedIn: true });
          console.log("user signed in in db");
          let user = doc.data();
          state.User.name = user.name;
          state.User.email = email;
          state.User.loggedIn = true;
          console.log(state.User);
        }
      })
    );
}
//********** end sign in ******** */
//************* log in log out************/
function addLogInAndOutListener(user) {
  // select link in header
  document.getElementById("status").addEventListener("click", event => {
    // if user is logged in,
    if (user.loggedIn) {
      event.preventDefault();
      // log out functionality
      auth.signOut().then(() => {
        console.log("user logged out");
        logOutUserInDb(user.email);
        resetUserInState();
        //update user in database
        db.collection("users").get;
        render(state.Home);
      });
      console.log(state.User);
    }
    // if user is logged out, clicking the link will render sign in page (handled by <a>'s href)
  });
}
function logOutUserInDb(email) {
  if (state.User.loggedIn) {
    db.collection("Users")
      .get()
      .then(snapshot =>
        snapshot.docs.forEach(doc => {
          if (email === doc.data().email) {
            let id = doc.id;
            db.collection("Users")
              .doc(id)
              .update({ signedIn: false });
          }
        })
      );
    console.log("user signed out in db");
  }
}
function resetUserInState() {
  state.User.name = "";
  state.User.email = "";
  state.User.loggedIn = false;
}
function listenForAuthChange() {
  // log user object from auth if a user is signed in
  auth.onAuthStateChanged(user => (user ? console.log(user) : ""));
}
//************* end log in log out************/

//Add event to p
function addPEventListeners() {
  document.querySelectorAll(" div a p ").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      let linkText = event.target.textContent;
      let pieceOfState = state[linkText];
      render(pieceOfState);
      addHtml(linkText);
      //addProductDetailListeners();
      menuToggle();
    });
  });
}
//************* *Product Detail view* *************
// function addProductDetailListeners() {
//   const itemsToOpen = document.getElementsByClassName("img-container");
//   for (let i = 0; i < itemsToOpen.length; i++) {
//     let img = itemsToOpen[i];
//     img.addEventListener("click", ItemToOpen);
//   }
// }
function renderProductDetails(params) {
  const productIndex = Number(params.id) - 1;
  const { fields } = state.ProductDetail.items[params.page][productIndex];
  render(state.Product);
  document.getElementsByClassName("main-img")[0].src =
    fields.image.fields.file.url;
  document.getElementsByClassName("title")[0].innerText = fields.title;
  document.getElementsByClassName("price")[0].innerText = fields.price;
  document.getElementsByClassName("selected-product")[0].id = fields.id;
  let gallery = document.getElementsByClassName("gallery-img");
  //adding gallery from json
  let items = state.ProductDetail.items;
  let products = items[params.page][productIndex];
  console.log(products);
  console.log(products.fields.image.fields.gal);
  for (let i = 0; i < gallery.length; i++) {
    gallery[i].src = products.fields.image.fields.gal[i];
  }
  //navigate gallery picture in product detail
  var mainImg = document.getElementsByClassName("main-img");
  for (let picture of gallery) {
    picture.addEventListener("click", event => {
      event.preventDefault();
      mainImg[0].src = picture.src;
    });
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
//   render(state.Product);
//   document.getElementsByClassName("main-img")[0].src = image;
//   document.getElementsByClassName("title")[0].innerText = title;
//   document.getElementsByClassName("price")[0].innerText = price;
//   document.getElementsByClassName("selected-product")[0].id = id;
//   menuToggle();
// }

//********** *END of ProductDetail* view**************

//************ *Add Item to Cart* ********************
function addCartEventListeners() {
  //add an item to cart
  const addToCartButtons = document.getElementsByClassName("add-button");
  for (let i = 0; i < addToCartButtons.length; i++) {
    let button = addToCartButtons[i];
    button.addEventListener("click", addToCart);
  }
  //remove an item
  const removeCartItem = document.getElementsByClassName("remove-item");
  for (let i = 0; i < removeCartItem.length; i++) {
    let link = removeCartItem[i];
    link.addEventListener("click", removeItem);
    updateCart();
  }
  //update the cart when quantity changes
  const quantityInput = document.getElementsByClassName("cart-quantity");
  for (let i = 0; i < quantityInput.length; i++) {
    let input = quantityInput[i];
    input.addEventListener("click", updateQuantity);
    updateCart();
  }
}
function removeItem(event) {
  //the link that we clicked on
  let clickedLink = event.target;
  //remove the parents
  clickedLink.parentElement.parentElement.parentElement.parentElement.remove();
  updateCart();
}
function updateQuantity(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCart();
}
function addToCart(event) {
  let button = event.target;
  let itemToAdd = button.parentElement.parentElement;
  let title = itemToAdd.getElementsByClassName("title")[0].innerText;
  let price = itemToAdd.getElementsByClassName("price")[0].innerText;
  let mainImage = itemToAdd.getElementsByClassName("main-img")[0].src;
  let quantity = itemToAdd.getElementsByClassName("selected-quantity")[0].value;
  let size = itemToAdd.getElementsByClassName("selected-size")[0].value;
  let id = document.getElementsByClassName("selected-product")[0].id;
  addItemToCart(id, title, price, mainImage, quantity, size);
  updateCart();
}
function setItem(id, title, price, mainImage, quantity, size) {
  //save our added item in our local storage for our cart page
  // let product = {};
  // product = { [id]: [title, price, mainImage, quantity, size] };
  // localStorage.setItem("addedItemToCart", JSON.stringify(product));
  // console.log(product);
}
//ovoid data to be overwriting
// function setItem2(product) {
//   let itemInCart = localStorage.getItem("addedItemToCart");
//   console.log("my cart item are,", itemInCart);
//   itemInCart = JSON.parse(itemInCart);
//   console.log("my cart item are,", itemInCart);
//   if (itemInCart != null) {
//     if (itemInCart[product.id] === undefined) {
//       console.log(itemInCart[product.id]);
//       itemInCart = {
//         1: "hello",
//         [product.id]: product
//       };
//     }
//   }
// }

function local() {
  //update out nav shopping cart
  document.getElementsByClassName(
    "shopping-cart"
  )[0].innerHTML = localStorage.getItem("q");
}
function addItemToCart(id, title, price, mainImage, quantity, size) {
  render(state.Cart);
  menuToggle();
  console.log("I am here I should now open cart");
  const newCartItems = document.getElementsByClassName("cart-table")[0];
  console.log(newCartItems);
  let cartRow = document.createElement("tr");
  cartRow.classList.add("cart-items");
  let subtotal = price * quantity;
  //ovoid adding same item twice
  let itemInCartId = document.getElementsByClassName("cart-row");
  for (let i = 0; i < itemInCartId.length; i++) {
    if (itemInCartId[i].id === id) {
      alert("this item already in your cart");
      return;
    }
  }
  //add html of added item to cart
  cartRow.innerHTML = "";
  cartRow.innerHTML += `
  <td class="cart-row" id=${id}>
                    <div class="cart-info item">
                        <img class="main-img" src="${mainImage}">
                        <div>
                            <p class="item-title">${title}</p>
                            <p class="cart-size">${size}</p>
                            <p class="cart-price">${price}</p>
                            <br>
                            <a href="#" class="remove-item">remove</a>
                        </div>
                    </div>
                </td>
                <td class="cart-row2"> <input class="cart-number cart-quantity" type="number" value="${quantity}" > </td>
                <td class="subtotal-item">${subtotal}</td>`;
  newCartItems.appendChild(cartRow);
  //set added item
  let product = {};
  product = { [id]: [title, price, mainImage, quantity, size] };
  // localStorage.setItem("addedItemToCart", JSON.stringify(product));
  console.log(product);
  // setItem2(product);
  cartRow
    .getElementsByClassName("remove-item")[0]
    .addEventListener("click", removeItem);
  cartRow
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("click", updateCart);
  cartRow
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("click", updateQuantity);
  // setItem2(product);
}
function updateCart() {
  let cartRows = document.getElementsByClassName("cart-items");
  let subtotal = 0;
  let total = 0;
  let quantityTotal = 0;
  let tax = 7.55;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let itemPrice = cartRow.getElementsByClassName("cart-price")[0];
    let itemQuatity = cartRow.getElementsByClassName("cart-quantity")[0];
    let price = parseFloat(itemPrice.innerText.replace("$", ""));
    let quantity = parseFloat(itemQuatity.value);
    quantityTotal = quantityTotal + quantity;
    console.log(quantityTotal);
    let subtotalItem = price * quantity;
    document.getElementsByClassName(
      "shopping-cart"
    )[0].innerText = quantityTotal;
    localStorage.setItem("q", quantityTotal);
    document.getElementsByClassName("subtotal-item")[i].innerText =
      Math.round(subtotalItem * 100) / 100;
    subtotal = subtotal + subtotalItem;
  }
  subtotal = Math.round(subtotal * 100) / 100;
  document.getElementsByClassName("order-subtotal")[0].innerText =
    "$" + subtotal;
  total = Math.round((subtotal + tax) * 100) / 100;

  if (subtotal != 0) {
    document.getElementsByClassName("order-tax")[0].innerText = "$" + tax;
    document.getElementsByClassName("order-total")[0].innerText = "$" + total;
  } else {
    document.getElementsByClassName("order-tax")[0].innerText = "$" + 0;
    document.getElementsByClassName("order-total")[0].innerText = "$" + 0;
    document.getElementsByClassName("shopping-cart")[0].innerText = 0;
    localStorage.setItem("q", 0);
  }
}
//*********** *End Of Cart* ************************************

//**************** *load product from json* ********************
function addHtml(item) {
  let items = state.ProductDetail.items;
  let page = document.querySelector(".products-center");
  let products = items[item];
  products.forEach(products => {
    page.innerHTML += `
        <div class="col-4 img-container" id="${products.sys.id}">
                <a href="${item}/${products.sys.id}" id="selected" class="selected-item"><img src="${products.fields.image.fields.file.url}" class="selectedItem-img"></a>
              <h4 class="selectedItem-title">${products.fields.title}</h4>
              <p class="selectedItem-price">$${products.fields.price}</p>
              </div>
                `;
  });
}
//************** *End Of Json*  ***********************

//************** *menu toggle function* ***************
function menuToggle() {
  const menuItems = document.getElementById("menu-item");
  menuItems.style.maxHeight = "0px";
  var menuImg = document.getElementById("menu");
  menuImg.addEventListener("click", () => {
    if (menuItems.style.maxHeight == "0px") {
      menuItems.style.maxHeight = "200px";
    } else if (menuItems.style.maxHeight == "200px") {
      menuItems.style.maxHeight = "0px";
    }
  });
}
//************** *END menu toggle function* ***************

//**************** search bar ***************************/
function findSearchedWord(event) {
  let items = state.ProductDetail.items;
  let input = event.target;
  let category = ["Men", "Women", "Kids"];
  render(state.Search);
  for (let cat of category) {
    items[cat].forEach(item => {
      let output = item.fields.title.toLowerCase();
      const searchedWord = input.value;
      let page = document.querySelector(".products-center");
      if (output.includes(searchedWord.toLowerCase())) {
        page.innerHTML += `
        <div class="col-4 img-container" id="${item.sys.id}">
                <a href="${cat}/${item.sys.id}" id="selected" class="selected-item"><img src="${item.fields.image.fields.file.url}" class="selectedItem-img"></a>
              <h4 class="selectedItem-title">${item.fields.title}</h4>
              <p class="selectedItem-price">$${item.fields.price}</p>
              </div>
                `;
      }
    });
  }
  renderProductDetails();
}
function searchEventListener() {
  const search = document.getElementsByClassName("search");
  for (let i = 0; i < search.length; i++) {
    let input = search[i];
    input.addEventListener("search", findSearchedWord);
  }
}
//************* end of search bar ************ *********/

//************* sort per price ************************ */
function sortPerPrice(event) {}
function sortPriceEventListener() {
  const sortPrice = document.getElementsByClassName("sort-price");
  for (let i = 0; i < sortPrice.length; i++) {
    let sort = sortPrice[i];
    sort.addEventListener("search", sortPerPrice);
  }
}
//************* end  sort per price ************************ */
