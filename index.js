import { Header, Nav, Main, Main2, Footer } from "./components";
import * as state from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";

function render(st = state.Home) {
  document.querySelector("#root").innerHTML = `
  ${Header(st)}
  ${Nav(state.Links)}
  ${Main(st)}
  ${Footer()}
  `;
  addNavEventListeners();
  addPEventListeners();
  addProductEventListners();
}
//render(state.Home);
//navigo router
const router = new Navigo(location.origin);
router
  .on({
    "/": () => render(state.Home),
    ":page": params => {
      let routeEntered = params.page;
      let formattedRoute = capitalize(routeEntered);
      if (
        formattedRoute === "Men" ||
        formattedRoute === "Women" ||
        formattedRoute === "Kids"
      ) {
        console.log("I am in product");
        let pieceOfState = state[formattedRoute];
        render(pieceOfState);
        addHtml(formattedRoute);
      } else if (formattedRoute === "Account" || formattedRoute === "Contact") {
        console.log("I am not in product page");
        let pieceOfState = state[formattedRoute];
        render(pieceOfState);
      } else {
        render();
      }
    }
  })
  .resolve();

function addNavEventListeners() {
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      let linkText = event.target.textContent;
      console.log(linkText);
      if (linkText === "Men" || linkText === "Women" || linkText === "Kids") {
        console.log("I am in product");
        let pieceOfState = state[linkText];
        render(pieceOfState);
        addHtml(linkText);
      } else {
        console.log("I am not in product page");
        render(state[linkText]);
      }
    });
  });
}
function addProductEventListners() {
  let selectedItem = document.querySelectorAll("div .img-container");
  console.log(selectedItem);
}
function addPEventListeners() {
  document.querySelectorAll(" div a p ").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      let linkText = event.target.textContent;
      console.log(linkText);
      let pieceOfState = state[linkText];
      render(pieceOfState);
      addHtml(linkText);
    });
  });
}
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
                  "hhttps://github.com/asmita85/Capstone/blob/master/images/Kid-Product/Kproduct-9.jpg?raw=true"
              }
            }
          }
        }
      }
    ]
  });
  let Obj = JSON.parse(items);
  console.log(Obj);
  console.log("Iam", item);
  let page = document.querySelector(".products-center");
  let products = Obj[item];
  console.log(products);
  products.forEach(products => {
    page.innerHTML += `
         <div class="col-4 img-container">
                <a href="productDetail.html" id="selected"><img src="${products.fields.image.fields.file.url}" class="selectedItem-img"></a>
               <div class="rating">
                 <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-half-o"></i>
                </div>
                <h4>"${products.fields.title}"</h4>
                <p>$"${products.fields.price}"</p>
                </div>
                `;
  });
}
//navigo router

// menu
// var menuItems = document.getElementById("menu-item");
// menuItems.style.maxHeight = "0px";

// function menuToggle() {
//   if (menuItems.style.maxHeight == "0px") {
//     menuItems.style.maxHeight = "200px";
//   } else {
//     menuItems.style.maxHeight = "0px";
//   }
// }
// //end menu
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

// //product detail gallery
// var mainImg = document.getElementById("main-img");
// var galleryImg = document.getElementsByClassName("gallery-img");
// for (let i = 0; i < galleryImg.length; i++) {
//   galleryImg[i].onclick = function() {
//     mainImg.src = galleryImg[i].src;
//   };
// }
// //end product detail gallery

// // toggle form account page
// var formLogin = document.getElementById("formLogin");
// var formRegister = document.getElementById("formRegister");
// var indicator = document.getElementById("indicator1");
// function register() {
//   formLogin.style.transform = "translateX(-400px)";
//   formRegister.style.transform = "translateX(0px)";
//   indicator.style.transform = "translateX(100px)";
// }
// function login() {
//   formLogin.style.transform = "translateX(0px)";
//   formRegister.style.transform = "translateX(400px)";
//   indicator.style.transform = "translateX(0px)";
// }
//end of toggle

//new way to load product

// const mProducts = document.querySelector(".men-products-center");
// const wProducts = document.querySelector(".women-products-center");
// const kidProducts = document.querySelector(".kid-products-center");

// let showObj = function(products, page) {
//   page.innerHTML = " ";
//   console.log("I am in men printing");
//   // console.log(products);
//   products.forEach(products => {
//     page.innerHTML += `
//             <div class="col-4 img-container">
//                   <a href="productDetail.html" id="selected"><img src="${products.fields.image.fields.file.url}" class="selectedItem-img"></a>
//                 <div class="rating">
//                 <i class="fa fa-star"></i>
//                 <i class="fa fa-star"></i>
//                 <i class="fa fa-star"></i>
//                 <i class="fa fa-star"></i>
//                 <i class="fa fa-star-half-o"></i>
//                 </div>
//                 <h4>"${products.fields.title}"</h4>
//                <p>$"${products.fields.price}"</p>
//              </div>
//          `;
//   });
// };

// let mainObj = {};
// fetch("./products.json")
//   .then(function(resp) {
//     console.log(resp.json);
//     return resp.json();
//   })
//   .then(function(data) {
//     //console.log(data);
//     mainObj = data;
//     showObj(mainObj.menItems, mProducts);
//   });

// fetch("./products.json")
//   .then(function(resp) {
//     console.log(resp.json);
//     return resp.json();
//   })
//   .then(function(data) {
//     //console.log(data);
//     mainObj = data;
//     showObj(mainObj.womenItems, wProducts);
//   });

// fetch("./products.json")
//   .then(function(resp) {
//     console.log(resp.json);
//     return resp.json();
//   })
//   .then(function(data) {
//     //console.log(data);
//     mainObj = data;
//     showObj(mainObj.kidItems, kidProducts);
//   });
// //end of loading product
