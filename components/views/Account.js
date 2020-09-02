export default () => `
<!--Account -->
    <div class="account">
        <div class="container1">
            <div class="row1">
                <div class="col-2">
                  <div class="form-container1">
                    <div class="form-btn1">
                        <!-- <span onclick="login()">LOG IN</span> -->
                        <span>LOG IN</span>
                    </div>
                    <form id="formLogin">
                        <input type="email" placeholder="E-mail" id="email1">
                        <input type="Password" placeholder="Password" id="password1">
                        <input type="submit" id="user-btn1" class="btn1" value="Sign In">
<br>
                        <a href="">forgot password</a>
                    </form>
                    </div>
                </div>
                <div class="col-2">
                    <div class="form-container1">
                        <div class="form-btn1">
                            <!-- <span onclick="register()">SIGN UP</span> -->
                            <span >SIGN UP</span>

                        </div>
                      <form action="" method="POST" class="simpleForm"  id="formRegister">
                            <input type="text" placeholder="Name" id="name" class="input-box">
                            <input type="email" placeholder="E-mail" id="email" class="input-box">
                            <p class="error"></p>
                            <input type="email" placeholder="E-mail" id="confirmEmail" class="input-box">
                            <p class="error"></p>
                            <input type="password" placeholder="password" id="password" class="input-box">
                            <p class="error"></p>
                            <input type="password" placeholder="Confirm Password" id="confirmPassword" class="input-box">
                            <p class="error"></p>
                            <input type="submit" id="user-btn" class="btn1" value="Register">
                      </form>
                    </div>
                </div>
            </div>
        </div>

`;
