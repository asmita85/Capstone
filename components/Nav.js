import { User } from "../store";

export default links => `
<!----------------navbar ----------------->
    <div class="main-nav">
        <div class="container1">
            <div class="navbar">
                <div class="logo">
                    <a href="/" data-navigo>
                        <img src="https://github.com/asmita85/Capstone/blob/master/images/header/logo.png?raw=true" alt="store logo" width="80px">
                    </a>
                </div>
                <div class="search">
                        <input type="search" placeholder="search ..." class="search">
                    </div>
                <nav class="nav1">
                    <ul id="menu-item">

                        ${links
                          .map(
                            link =>
                              `<li><a href="/${link}" class="clickLink" data-navigo>${link}</a></li>`
                          )
                          .join("")}

                          <li>  <a href="${
                            !User.loggedIn ? "/Account" : "/"
                          }" id="status" data-navigo>${
  !User.loggedIn ? "LOG IN" : "LOG OUT"
}</a></li>
                    </ul>
                </nav>
                <a href="/${"Cart"}" data-navigo class="cart-link"><img src="https://github.com/asmita85/Capstone/blob/master/images/header/shopping-bag.png?raw=true" width="30px" height="30px"></a>
                <div class="shopping-cart">empty</div>
                <a id="menu"><img src="https://github.com/asmita85/Capstone/blob/master/images/header/menu.png?raw=true" class="menu-icon" ></>
            </div>
        </div>
    </div>
</div>
`;
