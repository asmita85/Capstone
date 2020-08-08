export default () => `
<div class="account">
<div class="container1">
    <div class="row1">
        <div class="col-2">
            <img class="img-1" src="images/other/user.png" width="50%">
        </div>
        <div class="col-2">
            <div class="form-container1">
                <div class="form-btn1">
                    <span onclick="login()">log in</span>
                    <span onclick="register()">sign up</span>
                    <hr id="indicator1">
                </div>
                <form id="formLogin">
                    <input type="text" placeholder="Username">
                    <input type="password" placeholder="Password">
                    <button type="submit" class="btn1">login</button>
                    <a href="">forgot password</a>
                </form>
                <form id="formRegister" class="simpleForm">
                    <input type="text" placeholder="Username">
                    <input type="email" placeholder="E-mail">
                    <input type="password" placeholder="password">
                    <button type="submit" class="btn1">sign up</button>
                </form>

            </div>
        </div>
    </div>
</div>
`;
