export default links => `
<!----------------navbar ----------------->
    <div class="main-nav">
        <div class="container1">
            <div class="navbar">
                <div class="logo">
                    <a href="index.html">
                        <img src="https://github.com/asmita85/Capstone/blob/master/images/header/logo.png?raw=true" alt="store logo" width="80px">
                    </a>
                </div>
                <nav class="nav1">
                    <ul id="menu-item">

                        ${links
                          .map(link => `<li><a href="#">${link}</a></li>`)
                          .join("")}
                    </ul>
                </nav>
                <a href="cart.html"><img src="https://github.com/asmita85/Capstone/blob/master/images/header/shopping-bag.png?raw=true" width="30px" height="30px"></a>
                <div class="cart-item">empty</div>
                <img src="https://github.com/asmita85/Capstone/blob/master/images/header/menu.png?raw=true" class="menu-icon" onclick="menuToggle()">
            </div>
        </div>
    </div>
</div>
`;
