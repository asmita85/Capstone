// ${st.Obj.map(
//   Obj => `<div class="col-4 img-container">
//   <a href="productDetail.html" id="selected"><img src="${Obj.fields.image.fields.file.url}" class="selectedItem-img"></a>
//   <h4>"${Obj.fields.title}"</h4>
//   <p>$"${Obj.fields.price}"</p>
//   </div>`
//   ).join("")}

// `function loadProduct() {
  // let page = document.querySelector(".products-center");
  // console.log(page);
  // var x = document.getElementsByClassName("img-container");
  // for (let i = 0; i < x.length; i++) {
  //   var value = document.getElementsByClassName("img-container")[i].id;
  //   console.log(value);
  // }
  // console.log(x);
  // value = document.getElementsByClassName("img-container")[0].id;
  // console.log(value);
  `
//open product detail when click on image

//cart
// if (document.readyState == "loading") {
//   document.addEventListener("DOMContentLoaded", doIfPageLoaded);
// } else {
//   doIfPageLoaded();
// }

// function doIfPageLoaded() {
//   var removeItemLink = document.getElementsByClassName("removeItem");
//   console.log(removeItemLink);
//   for (let i = 0; i < removeItemLink.length; i++) {
//     let aLink = removeItemLink[i];
//     console.log(aLink);
//     aLink.addEventListener("click", removeItemFromCart);
//   }
//   //remove item
//   function removeItemFromCart(event) {
//     let linkClicked = event.target;
//     console.log(linkClicked);
//     linkClicked.parentElement.parentElement.parentElement.parentElement.remove();
//     updateCartTotal();
//   }
//   //update total
//   function updateCartTotal() {
//     var total = 0;
//     var cartItemsInfo = document.getElementsByClassName("cart-items")[0];
//     console.log(cartItemsInfo);
//     var cartRows = cartItemsInfo.getElementsByClassName("cart-row");
//     console.log(cartRows);
//     for (var i = 0; i < cartRows.length; i++) {
//       var cartRow = cartRows[i];
//       var itemPrice = cartRow.getElementsByClassName("cart-price")[0];
//       console.log(itemPrice);
//       var price = parseFloat(itemPrice.innerText.replace("$", ""));
//       console.log(price);
//     }
//     var quantityInput = document.getElementsByClassName("cart-number");
//     for (let i = 0; i < quantityInput.length; i++) {
//       var userInput = quantityInput[i];
//       userInput.addEventListener("change", quantityChange);
//     }
//   }
//   //change quantity
//   function quantityChange(event) {
//     var userInput = event.target;
//     if (isNaN(userInput.value) || userInput.value <= 0) {
//       userInput.value = 1;
//     }
//     updateCartTotal();
//   }
// }
//add item to cart
//   function addItemToCart() {}
//   var cartRows2 = cartItemsInfo.getElementsByClassName("cart-row2");
//   console.log(cartRows2);
//   for (var i = 0; i < cartRows2.length; i++) {
//     var cartRow2 = cartRows2[i];
//     var itemQuantity = cartRow2.getElementsByClassName("cart-number")[0];
//     console.log(itemQuantity);
//     var quantity = itemQuantity.value;
//     console.log(quantity);
//   }
//   total = total + price * quantity;
//   console.log(total);
//   document.getElementsByClassName("order-subtotal")[0].innerText = total;
// }

// //menu
// const menuItems = document.getElementById("menu-item");
// menuItems.style.maxHeight = "0px";
// function addMenuEventListeners() {
//   var menuImg = document.getElementById("menu");
//   menuImg.addEventListener("click", menuToggle);
// }
// function menuToggle() {
//   if (menuItems.style.maxHeight == "0px") {
//     menuItems.style.maxHeight = "200px";
//   } else {
//     menuItems.style.maxHeight = "0px";
//     console.log("now I am ", menuItems.style.maxHeight);
//   }
// }
