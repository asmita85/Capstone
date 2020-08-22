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
                        <input type="email" placeholder="E-mail">
                        <input type="Password" placeholder="Password">
                        <button type="submit" class="btn1">SUBMIT</button>
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
                      <form action="#" method="post" class="simpleForm" onsubmit="return    ValidateForm()" id="formRegister">
                            <input type="email" placeholder="E-mail" id="email" class="input-box">
                            <p class="error"></p>
                            <input type="email" placeholder="E-mail" id="confirmEmail" class="input-box">
                            <p class="error"></p>
                            <input type="password" placeholder="Password" id="password" class="input-box">
                            <p class="error"></p>
                            <input type="password" placeholder="Confirm Password" id="confirmPassword" class="input-box">
                            <p class="error"></p>
                            <button type="submit" class="btn1">SUBMIT</button>
                      </form>
                    </div>
                </div>
            </div>
        </div>

`;
