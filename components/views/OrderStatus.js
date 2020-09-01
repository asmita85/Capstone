export default () => `
    <div class="account">
        <div class="container1">
            <div class="row1">
                <div class="col-2">
                  <div class="form-container">
                    <div class="form-btn1">
                        <!-- <span onclick="login()">Order Status</span> -->
                        <span>ORDER STATUS</span>
                    </div>
                    <form id="order">
                        <input type="text" placeholder="Order Number" id="order-number">
                        <input type="submit" id="order-btn" class="btn1 btn2" value="Check Status">
                        <p class="status-result"></p>
                    </form>
                    </div>
                </div>
                </div>
                </div>`;
