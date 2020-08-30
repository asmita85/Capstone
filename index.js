import { Header, Nav, Main, Main2, Footer } from "./components";
import * as state from "./store";
import Navigo from "navigo";
import { capitalize, compact, drop, indexOf } from "lodash";
import { auth, db } from "./firebase";
const cartItems = db.collection("cart");

//Loading the page before calling the js
// if (document.readyState == "loading") {
//   document.addEventListener("DOMContentLoaded", addCartEventListeners());
// } else {
//   addCartEventListeners();
// }

function render(st = state.Home) {
  document.querySelector("#root").innerHTML = `
  ${Header(st)}
  ${Nav(state.Links)}
  ${Main(st)}
  ${Footer()}
  `;
  router.updatePageLinks();
  if (st === state.Account) {
    listenForRegister();
    listenForSignIn();
    listenForAuthChange();
  }
  addCartEventListeners();
  addPEventListeners();
  shopNowEventListener();
  updateBlueCart();
  searchEventListener();
  addLogInAndOutListener(state.User);
  displayCartEvent();
  menuToggle();
}
//*************** END Of Render ******************//
//*************** Navigo And Router **************//

const router = new Navigo(window.location.origin);
router
  .on({
    "/": () => {
      render(state.Home);
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
        sortPriceEventListener(params);
        //menuToggle();
      } else if (formattedRoute === "Contact") {
        let pieceOfState = state[formattedRoute];
        render(pieceOfState);
      } else if (formattedRoute === "AllProduct") {
        let pieceOfState = state[formattedRoute];
        render(pieceOfState);
        //ShopNowEventListener();
      } else if (formattedRoute === "Checkout") {
        let pieceOfState = state[formattedRoute];
        render(pieceOfState);
      } else if (formattedRoute === "Cart") {
        let pieceOfState = state[formattedRoute];
        render(pieceOfState);
        //displayCartEvent();
        addCartEventListeners();
        //addLogInAndOutListener(state.User);
      } else if (formattedRoute === "Search") {
        render(state.Search);
      } else if (formattedRoute === "Account") {
        let pieceOfState = state[formattedRoute];
        render(pieceOfState);
        //listenForRegister();
        //listenForSignIn();
        //addLogInAndOutListener(state.User);
        //listenForAuthChange();
      } else {
        render();
      }
      //menuToggle();
    }
  })
  .resolve();
//********* End OF Navigo And Router **************************//

//*************** Menu Toggle Function* **********************//
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
//************** *End Of menu toggle function* ****************//
//********* Add Event For Category Button In Main Page ********//
function addPEventListeners() {
  document.querySelectorAll(" div a p ").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      let linkText = event.target.textContent;
      let pieceOfState = state[linkText];
      render(pieceOfState);
      addHtml(linkText);
      menuToggle();
    });
  });
}
//****** END of Add Event For Categories Button In Main Page ****//
//**************** Front Page Shop Now Link To All Product  ***************************/
function shopNowButton() {
  let items = state.ProductDetail.items;
  let category = ["Men", "Women", "Kids"];
  render(state.AllProduct);
  let page = document.querySelector(".products-center");
  for (let cat of category) {
    items[cat].forEach(item => {
      page.innerHTML += `
        <div class="col-4 img-container" id="${item.sys.id}">
                <a data-navigo id="selected" class="selected-item"><img src="${item.fields.image.fields.file.url}" class="selectedItem-img"></a>
              <h4 class="selectedItem-title">${item.fields.title}</h4>
              <p class="selectedItem-price">$${item.fields.price}</p>
              </div>
                `;
    });
    items[cat].map(curr => {
      document
        .getElementById(`${curr.sys.id}`)
        .addEventListener("click", () => {
          //event.preventDefault();
          router.navigate(`/${cat}/${curr.sys.id}`);
        });
    });
  }
}
function shopNowEventListener() {
  const btnShopNow = document.getElementsByClassName("btn-shop");
  for (let i = 0; i < btnShopNow.length; i++) {
    let btn = btnShopNow[i];
    btn.addEventListener("click", shopNowButton);
  }
}
//**************** END Shop Now To All Product Link ***************************/
//***************** Load Product From Json* ******************//
function addHtml(item) {
  let items = state.ProductDetail.items;
  let page = document.querySelector(".products-center");
  let products = items[item];
  products.forEach(product => {
    page.innerHTML += `
        <div class="col-4 img-container" id="${product.sys.id}">
                <a data-navigo id="selected" class="selected-item"><img src="${product.fields.image.fields.file.url}" class="selectedItem-img"></a>
              <h4 class="selectedItem-title">${product.fields.title}</h4>
              <p class="selectedItem-price">$${product.fields.price}</p>
              </div>
                `;
  });
  products.map(curr => {
    document.getElementById(`${curr.sys.id}`).addEventListener("click", () => {
      router.navigate(`/${item}/${curr.sys.id}`);
    });
  });
}
//************** *End Of Products From Json*  *******************************/
//************* *Product Detail view* ************************//
function renderProductDetails(params) {
  let cat = params.page;
  const productIndex = Number(params.id) - 1;
  const { fields } = state.ProductDetail.items[params.page][productIndex];
  render(state.Product);
  document.getElementById("data-id").id = cat + params.id;
  document.getElementsByClassName("main-img")[0].src =
    fields.image.fields.file.url;
  document.getElementsByClassName("title")[0].innerText = fields.title;
  document.getElementsByClassName("price")[0].innerText = fields.price;
  document.getElementById("none").id = cat + params.id;
  let gallery = document.getElementsByClassName("gallery-img");
  //adding gallery from json
  let items = state.ProductDetail.items;
  let products = items[params.page][productIndex];
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
//*********** end of Product Detail view* *************//
//************ *Add Item to Cart* ********************//
function displayCartEvent() {
  const cartLink = document.getElementsByClassName("cart-link");
  for (let i = 0; i < cartLink.length; i++) {
    let link = cartLink[i];
    link.addEventListener("click", () => {
      addItemToCart();
      document.documentElement.scrollTop = 0;
    });
  }
}
function addCartEventListeners() {
  //add an item to cart
  // const addToCartButtons = document.getElementsByClassName("add-button");
  const buttons = [...document.querySelectorAll(".add-button")];
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    button.addEventListener("click", addToCart);
  }
  //clear storage
  const checkoutBtn = document.getElementsByClassName("checkout-btn");
  for (let i = 0; i < checkoutBtn.length; i++) {
    let button = checkoutBtn[i];
    button.addEventListener("click", clear);
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
//clear my cart after checkout
function clear(event) {
  //let button = event.target;
  localStorage.removeItem("cart");
  updateBlueCart();
}
function removeItem(event) {
  //the link that we clicked on
  let clickedLink = event.target;
  //remove the parents
  clickedLink.parentElement.parentElement.parentElement.parentElement.remove();
  //remove the item from the storage
  let removedItem =
    clickedLink.parentElement.parentElement.parentElement.parentElement;
  let removedItemId = removedItem.getElementsByClassName("cart-row")[0].id;
  let cartHistory = getCartHistory(cartHistory);
  cartHistory = cartHistory.filter(item => item.id !== removedItemId);
  localStorage.setItem("cart", JSON.stringify(cartHistory));
  updateCart();
  updateBlueCart();
}
function updateQuantity(event) {
  let input = event.target;
  //not allow user to select 0
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  //update the quantity in local storage if user change it in the cart page
  let cartHistory = getCartHistory(cartHistory);
  let itemToUpdate = input.parentElement.parentElement;
  let idOfItemToUpdate = itemToUpdate.getElementsByClassName("cart-row")[0].id;
  let foundItem = cartHistory.find(item => {
    if (item.id === idOfItemToUpdate) {
      return true;
    } else {
      return false;
    }
  });
  if (foundItem) {
    foundItem.quantity = input.value;
    localStorage.setItem("cart", JSON.stringify(cartHistory));
  }
  updateCart();
  updateBlueCart();
}
//get data
function getCartHistory(cartHistory) {
  cartHistory = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  return cartHistory;
}
//******************** add item to local storage ***************//
function addToCart(event) {
  let cart = [];
  let button = event.target;
  let itemToAdd = button.parentElement.parentElement;
  let title = itemToAdd.getElementsByClassName("title")[0].innerText;
  let price = itemToAdd.getElementsByClassName("price")[0].innerText;
  let mainImage = itemToAdd.getElementsByClassName("main-img")[0].src;
  let quantity = itemToAdd.getElementsByClassName("selected-quantity")[0].value;
  let size = itemToAdd.getElementsByClassName("selected-size")[0].value;
  let dataId = itemToAdd.getElementsByClassName("add-button")[0].id;
  //get item from the button
  cart = {
    id: dataId,
    price: price,
    title: title,
    image: mainImage,
    quantity: quantity,
    size: size
  };
  //check if item is already in cart
  let cartHistory = getCartHistory(cartHistory);
  let itemInCart = cartHistory.find(item => {
    if (item.id === cart.id) {
      return true;
    } else {
      return false;
    }
  });
  let quantityTotal = 0;
  localStorage.setItem("cartQuantity", JSON.stringify(quantityTotal));
  //if in cart update quantity
  if (itemInCart) {
    //update the existing item quantity only
    itemInCart.quantity =
      parseFloat(itemInCart.quantity) + parseFloat(quantity);
    localStorage.setItem("cart", JSON.stringify(cartHistory));
    alert("This item is already in you cart we have updated the quantity");
    //update the blue bag quantity
    cartHistory = getCartHistory(cartHistory);
    for (let item of cartHistory) {
      let quantityOfEachItem = item.quantity;
      quantityTotal = quantityTotal + parseFloat(quantityOfEachItem);
    }
    //set the quantity of each item
    localStorage.setItem("cartQuantity", JSON.stringify(quantityTotal));
  } else {
    //item not in cart adding it
    cartHistory = [...cartHistory, cart];
    // or cartHistory.push(cart);
    localStorage.setItem("cart", JSON.stringify(cartHistory));
    for (let item of cartHistory) {
      let quantityOfEachItem = item.quantity;
      quantityTotal = quantityTotal + parseFloat(quantityOfEachItem);
    }
    localStorage.setItem("cartQuantity", JSON.stringify(quantityTotal));
    alert("your item has been added to your cart  ");
  }
  //update cart number
  document.getElementsByClassName("shopping-cart")[0].innerText = quantityTotal;
}

function updateBlueCart() {
  let quantityTotal = 0;
  let cartHistory = getCartHistory(cartHistory);
  for (let item of cartHistory) {
    let quantityOfEachItem = item.quantity;
    quantityTotal += parseFloat(quantityOfEachItem);
  }
  localStorage.setItem("cartQuantity", JSON.stringify(quantityTotal));
  document.getElementsByClassName("shopping-cart")[0].innerText = quantityTotal;
}
//*****************End of storage ***************************** //
//************** display the item in cart **********************//
function addItemToCart() {
  render(state.Cart);
  let cartHistory = getCartHistory(cartHistory);
  cartHistory.forEach(product => {
    const newCartItems = document.getElementsByClassName("cart-table")[0];
    let cartRow = document.createElement("tr");
    cartRow.classList.add("cart-item2");
    cartRow.innerHTML = "";
    cartRow.innerHTML += `
            <td class="cart-row" id=${product.id}>
                      <div class="cart-info item">
                          <img class="main-img" src="${product.image}">
                          <div>
                              <p class="item-title">${product.title}</p>
                              <p class="cart-size">${product.size}</p>
                              <p class="cart-price">${product.price}</p>
                              <br>
                              <a href="#" class="remove-item">remove</a>
                          </div>
                      </div>
                  </td>
                  <td class="cart-row2">
                  <input class="cart-number cart-quantity" type="number" value="${
                    product.quantity
                  }" > </td>
                  <td class="subtotal-item">${"subtotal"}</td>`;
    newCartItems.appendChild(cartRow);
  });
  updateCart();
  let cartRows = document.getElementsByClassName("cart-item2");
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    cartRow
      .getElementsByClassName("remove-item")[0]
      .addEventListener("click", removeItem);
    cartRow
      .getElementsByClassName("cart-quantity")[0]
      .addEventListener("click", updateCart);
    cartRow
      .getElementsByClassName("cart-quantity")[0]
      .addEventListener("click", updateQuantity);
  }
}
//************** END display the item in cart **********************//
//****************** Update the cart ******************** **********//
function updateCart() {
  let subtotal = 0;
  let total = 0;
  let tax = 7.55;
  let cartHistory = getCartHistory(cartHistory);
  document.getElementsByClassName("order-tax")[0].innerText = "$" + tax;
  for (let i = 0; i < cartHistory.length; i++) {
    let product = cartHistory[i];
    let subtotalOfEachItem =
      Math.round(product.price * product.quantity * 100) / 100;
    document.getElementsByClassName("subtotal-item")[
      i
    ].textContent = subtotalOfEachItem;
    subtotal = Math.round((subtotal + subtotalOfEachItem) * 100) / 100;
    // subtotal = Math.round(subtotal * 100) / 100;
    document.getElementsByClassName("order-subtotal")[0].innerText =
      "$" + subtotal;
    total = Math.round((subtotal + tax) * 100) / 100;
    document.getElementsByClassName("order-total")[0].innerText = "$" + total;
  }
  if (subtotal != 0) {
    document.getElementsByClassName("order-tax")[0].innerText = "$" + tax;
    document.getElementsByClassName("order-total")[0].innerText = "$" + total;
  } else {
    document.getElementsByClassName("order-subtotal")[0].innerText = "$" + 0;
    document.getElementsByClassName("order-tax")[0].innerText = "$" + 0;
    document.getElementsByClassName("order-total")[0].innerText = "$" + 0;
    document.getElementsByClassName("shopping-cart")[0].innerText = 0;
    document.getElementById("table-total").remove();
    document.getElementById("cart-table").remove();
    let child = document.createElement("p");
    child.classList.add("cart-empty");
    child.innerHTML = "Your Cart is Empty";
    document.getElementById("main-total").appendChild(child);
    document.getElementById("checkout-btn").removeAttribute("href");
  }
}
//****************** END Update the cart ******************** **********//
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
                <a href="${cat}/${item.sys.id}" data-navigo id="selected" class="selected-item"><img src="${item.fields.image.fields.file.url}" class="selectedItem-img"></a>
              <h4 class="selectedItem-title">${item.fields.title}</h4>
              <p class="selectedItem-price">$${item.fields.price}</p>
              </div>
                `;
      }
    });
  }
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
function sortPriceEventListener(params) {
  //get the object of products
  let items = document.getElementsByClassName("img-container");
  let arr = [];
  for (let i = 0; i < items.length; i++) {
    let itemPrice = document.getElementsByClassName("selectedItem-price")[i]
      .innerText;
    let image = document.getElementsByClassName("selectedItem-img")[i].src;
    let title = document.getElementsByClassName("selectedItem-title")[i]
      .innerText;
    let price = parseFloat(itemPrice.replace("$", ""));
    arr.push({ id: i + 1, price: price, title: title, image: image });
  }
  const dropDown = document.getElementsByClassName("select");
  for (let i = 0; i < dropDown.length; i++) {
    let sortOption = dropDown[i];
    sortOption.addEventListener("change", function(event) {
      let sort = event.target.value;
      arr = arr.sort(function(a, b) {
        if (sort === "select-price-low") {
          return a.price - b.price;
        }
        if (sort === "select-price-high") {
          return b.price - a.price;
        }
      });
      document.getElementById("disabled").disabled = true;
      document.querySelector(".products-center").innerHTML = "";
      let page = document.querySelector(".products-center");
      arr.forEach(item => {
        page.innerHTML += `
            <div class="col-4 img-container" id="${item.id}">
                    <a href="/${params.page}/${item.id}" data-navigo id="selected" class="selected-item" ><img src="${item.image}" class="selectedItem-img"></a>
                  <h4 class="selectedItem-title">${item.title}</h4>
                  <p class="selectedItem-price">$${item.price}</p>
                  </div>
                    `;
      });
    });
  }
}
///************* END  sort per price *****************************//
///************* firebase for cart *****************************//
function listenForCart() {
  let btn = document.getElementById("add-button");
  btn.addEventListener("click", event => {
    event.preventDefault();
    let title = document.getElementsByClassName("title")[0].innerText;
    let price = document.getElementsByClassName("price")[0].innerText;
    let mainImage = document.getElementsByClassName("main-img")[0].src;
    let quantity = document.getElementsByClassName("selected-quantity")[0]
      .value;
    let size = document.getElementsByClassName("selected-size")[0].value;
    //create user in Firebase
    auth.createUserWithEmailAndPassword(email, password).then(response => {
      addUserToStateAndDb(name, email, password);
      render(state.Home);
    });
  });
}
///************* firebase for cart *****************************//
//**************write the data of new user in firebase*************//
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
//*************** end of register ************* *******************//

// *********************verify data and sign in********************//
function listenForSignIn() {
  let btn = document.getElementById("user-btn1");
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
//******************************** end sign in ***********************//
//****************************** log in log out***********************//
function addLogInAndOutListener(User) {
  // select link in header
  console.log(state.User);
  document.getElementById("status").addEventListener("click", event => {
    // if user is logged in,
    if (User.loggedIn) {
      event.preventDefault();
      // log out functionality
      auth.signOut().then(() => {
        console.log("user logged out");
        logOutUserInDb(User.email);
        resetUserInState();
        //update user in database
        db.collection("Users").get;
        render(state.Home);
      });
      console.log(state.User);
    }
  });
}
//*********** update firebase when user log out ********************** */
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
//************* end log in log out************************************/
