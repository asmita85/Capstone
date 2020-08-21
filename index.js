import { Header, Nav, Main, Main2, Footer } from "./components";
import * as state from "./store";
import Navigo from "navigo";
import { capitalize, compact } from "lodash";
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
  local();
}
//Navigo and Router
const router = new Navigo(location.origin);
router
  .on({
    "/": () => {
      render(state.Home);
      menuToggle();
    },
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
        addProductDetailListeners();
      } else if (formattedRoute === "Account" || formattedRoute === "Contact") {
        let pieceOfState = state[formattedRoute];
        render(pieceOfState);
      } else if (formattedRoute === "Product") {
        let pieceOfState = state[formattedRoute];
        render(pieceOfState);
      } else if (formattedRoute === "Cart") {
        let pieceOfState = state[formattedRoute];
        render(pieceOfState);
      } else {
        render();
      }
      local();
      menuToggle();
    }
  })
  .resolve();
//Add event to p
function addPEventListeners() {
  document.querySelectorAll(" div a p ").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      let linkText = event.target.textContent;
      let pieceOfState = state[linkText];
      render(pieceOfState);
      addHtml(linkText);
      addProductDetailListeners();
      menuToggle();
    });
  });
}
//************* *Product Detail view* *************
function addProductDetailListeners() {
  const itemsToOpen = document.getElementsByClassName("img-container");
  for (let i = 0; i < itemsToOpen.length; i++) {
    let img = itemsToOpen[i];
    img.addEventListener("click", ItemToOpen);
  }
}
//define the data from the item that we are clicking
function ItemToOpen(event) {
  let clickedImg = event.target;
  let itemToOpen = clickedImg.parentElement.parentElement;
  let image = itemToOpen.getElementsByClassName("selectedItem-img")[0].src;
  let price = itemToOpen.getElementsByClassName("selectedItem-price")[0]
    .innerText;
  console.log(price);
  let title = itemToOpen.getElementsByClassName("selectedItem-title")[0]
    .innerText;
  let id = itemToOpen.id;
  console.log(id);
  displayItemDetail(image, title, price, id);
}
//display the data of the clicked item in our product detail view
function displayItemDetail(image, title, price, id) {
  render(state.Product);
  document.getElementsByClassName("main-img")[0].src = image;
  document.getElementsByClassName("title")[0].innerText = title;
  document.getElementsByClassName("price")[0].innerText = price;
  document.getElementsByClassName("selected-product")[0].id = id;
  menuToggle();
}

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
  console.log(id);
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
function setItem2(product) {
  let itemInCart = localStorage.getItem("addedItemToCart");
  console.log("my cart item are,", itemInCart);
  itemInCart = JSON.parse(itemInCart);
  console.log("my cart item are,", itemInCart);
  if (itemInCart != null) {
    if (itemInCart[product.id] === undefined) {
      console.log(itemInCart[product.id]);
      itemInCart = {
        [product.id]: product
      };
    }
  }
}

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
  //add html of new item to cart
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
  let product = {};
  product = { [id]: [title, price, mainImage, quantity, size] };
  localStorage.setItem("addedItemToCart", JSON.stringify(product));
  console.log(product);
  cartRow
    .getElementsByClassName("remove-item")[0]
    .addEventListener("click", removeItem);
  cartRow
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("click", updateCart);
  cartRow
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("click", updateQuantity);
  setItem2(product);
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
  let items = JSON.stringify({
    Men: [
      {
        sys: { id: "1" },
        fields: {
          title: "Jacket",
          price: 10.99,
          image: {
            fields: {
              file: {
                url:
                  "https://github.com/asmita85/Capstone/blob/master/images/Men-Product/Mproduct-1.jpg?raw=true"
              }
            }
          }
        }
      },
      {
        sys: { id: "2" },
        fields: {
          title: "Leather Jacket",
          price: 12.99,
          image: {
            fields: {
              file: {
                url:
                  "https://github.com/asmita85/Capstone/blob/master/images/Men-Product/Mproduct-2.jpg?raw=true"
              }
            }
          }
        }
      },
      {
        sys: { id: "3" },
        fields: {
          title: "Eyeglasses",
          price: 12.99,
          image: {
            fields: {
              file: {
                url:
                  "https://github.com/asmita85/Capstone/blob/master/images/Men-Product/Mproduct-3.jpg?raw=trueg"
              }
            }
          }
        }
      },
      {
        sys: { id: "4" },
        fields: {
          title: "pant",
          price: 22.99,
          image: {
            fields: {
              file: {
                url:
                  "https://github.com/asmita85/Capstone/blob/master/images/Men-Product/Mproduct-4.jpg?raw=true"
              }
            }
          }
        }
      },
      {
        sys: { id: "5" },
        fields: {
          title: "Black pant",
          price: 88.99,
          image: {
            fields: {
              file: {
                url:
                  "https://github.com/asmita85/Capstone/blob/master/images/Men-Product/Mproduct-5.jpg?raw=true"
              }
            }
          }
        }
      },
      {
        sys: { id: "6" },
        fields: {
          title: "White Sweather",
          price: 32.99,
          image: {
            fields: {
              file: {
                url:
                  "https://github.com/asmita85/Capstone/blob/master/images/Men-Product/Mproduct-6.jpg?raw=true"
              }
            }
          }
        }
      },
      {
        sys: { id: "7" },
        fields: {
          title: "Kaki pant",
          price: 45.99,
          image: {
            fields: {
              file: {
                url:
                  "https://github.com/asmita85/Capstone/blob/master/images/Men-Product/Mproduct-7.jpg?raw=true"
              }
            }
          }
        }
      },
      {
        sys: { id: "8" },
        fields: {
          title: "White Tshirt",
          price: 33.99,
          image: {
            fields: {
              file: {
                url:
                  "https://github.com/asmita85/Capstone/blob/master/images/Men-Product/Mproduct-8.jpg?raw=true"
              }
            }
          }
        }
      }
    ],
    Women: [
      {
        sys: { id: "1" },
        fields: {
          title: "Jacket",
          price: 10.99,
          image: {
            fields: {
              file: {
                url:
                  "https://github.com/asmita85/Capstone/blob/master/images/Women-Product/Wproduct-1.jpg?raw=true"
              }
            }
          }
        }
      },
      {
        sys: { id: "2" },
        fields: {
          title: "Leather Jacket",
          price: 12.99,
          image: {
            fields: {
              file: {
                url:
                  "https://github.com/asmita85/Capstone/blob/master/images/Women-Product/Wproduct-2.jpg?raw=true"
              }
            }
          }
        }
      },
      {
        sys: { id: "3" },
        fields: {
          title: "Eyeglasses",
          price: 12.99,
          image: {
            fields: {
              file: {
                url:
                  "https://github.com/asmita85/Capstone/blob/master/images/Women-Product/Wproduct-3.jpg?raw=true"
              }
            }
          }
        }
      },
      {
        sys: { id: "4" },
        fields: {
          title: "white top",
          price: 22.99,
          image: {
            fields: {
              file: {
                url:
                  "https://github.com/asmita85/Capstone/blob/master/images/Women-Product/Wproduct-4.jpg?raw=true"
              }
            }
          }
        }
      },
      {
        sys: { id: "5" },
        fields: {
          title: "Black pant",
          price: 88.99,
          image: {
            fields: {
              file: {
                url:
                  "https://github.com/asmita85/Capstone/blob/master/images/Women-Product/Wproduct-5.jpg?raw=true"
              }
            }
          }
        }
      },
      {
        sys: { id: "6" },
        fields: {
          title: "White Sweather",
          price: 32.99,
          image: {
            fields: {
              file: {
                url:
                  "https://github.com/asmita85/Capstone/blob/master/images/Women-Product/Wproduct-6.jpg?raw=true"
              }
            }
          }
        }
      },
      {
        sys: { id: "7" },
        fields: {
          title: "Kaki pant",
          price: 45.99,
          image: {
            fields: {
              file: {
                url:
                  "https://github.com/asmita85/Capstone/blob/master/images/Women-Product/Wproduct-7.jpg?raw=true"
              }
            }
          }
        }
      },
      {
        sys: { id: "8" },
        fields: {
          title: "White Tshirt",
          price: 33.99,
          image: {
            fields: {
              file: {
                url:
                  "https://github.com/asmita85/Capstone/blob/master/images/Women-Product/Wproduct-8.jpg?raw=true"
              }
            }
          }
        }
      }
    ],
    Kids: [
      {
        sys: { id: "1" },
        fields: {
          title: "Jacket",
          price: 10.99,
          image: {
            fields: {
              file: {
                url:
                  "https://github.com/asmita85/Capstone/blob/master/images/Kid-Product/Kproduct-1.jpg?raw=true"
              }
            }
          }
        }
      },
      {
        sys: { id: "2" },
        fields: {
          title: "Leather Jacket",
          price: 12.99,
          image: {
            fields: {
              file: {
                url:
                  "https://github.com/asmita85/Capstone/blob/master/images/Kid-Product/Kproduct-2.jpg?raw=true"
              }
            }
          }
        }
      },
      {
        sys: { id: "3" },
        fields: {
          title: "Eyeglasses",
          price: 12.99,
          image: {
            fields: {
              file: {
                url:
                  "https://github.com/asmita85/Capstone/blob/master/images/Kid-Product/Kproduct-3.jpg?raw=true"
              }
            }
          }
        }
      },
      {
        sys: { id: "4" },
        fields: {
          title: "dress",
          price: 22.99,
          image: {
            fields: {
              file: {
                url:
                  "https://github.com/asmita85/Capstone/blob/master/images/Kid-Product/Kproduct-4.jpg?raw=trueg"
              }
            }
          }
        }
      },
      {
        sys: { id: "5" },
        fields: {
          title: "Black pant",
          price: 88.99,
          image: {
            fields: {
              file: {
                url:
                  "https://github.com/asmita85/Capstone/blob/master/images/Kid-Product/Kproduct-5.jpg?raw=trueg"
              }
            }
          }
        }
      },
      {
        sys: { id: "6" },
        fields: {
          title: "White Sweather",
          price: 32.99,
          image: {
            fields: {
              file: {
                url:
                  "https://github.com/asmita85/Capstone/blob/master/images/Kid-Product/Kproduct-6.jpg?raw=true"
              }
            }
          }
        }
      },
      {
        sys: { id: "7" },
        fields: {
          title: "Kaki pant",
          price: 45.99,
          image: {
            fields: {
              file: {
                url:
                  "https://github.com/asmita85/Capstone/blob/master/images/Kid-Product/Kproduct-7.jpg?raw=trueg"
              }
            }
          }
        }
      },
      {
        sys: { id: "8" },
        fields: {
          title: "White Tshirt",
          price: 33.99,
          image: {
            fields: {
              file: {
                url:
                  "https://github.com/asmita85/Capstone/blob/master/images/Kid-Product/Kproduct-9.jpg?raw=true"
              }
            }
          }
        }
      }
    ]
  });
  let Obj = JSON.parse(items);
  let page = document.querySelector(".products-center");
  let products = Obj[item];
  products.forEach(products => {
    page.innerHTML += `
        <div class="col-4 img-container" id="${products.sys.id}">
                <a href="Product" id="selected" class="selected-item"><img src="${products.fields.image.fields.file.url}" class="selectedItem-img"></a>
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

//save shopping cart quantity in local storage fo nav

//navigate gallery picture in product detail
function navigateGallery() {
  var mainImg = document.getElementsByClassName("main-img");
  var galleryImg = document.getElementsByClassName("gallery-img");
  for (let i = 0; i < galleryImg.length; i++) {
    let img = galleryImg[i];
    img.addEventListener("click", event => {
      event.preventDefault();
      let img = event.target;
      mainImg.src = img.src;
    });
  }
}
