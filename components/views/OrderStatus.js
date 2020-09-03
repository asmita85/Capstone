export default () => `




                    <div class="small-container1 cart" id="cart">
<div>

                    <div class="form-btn1">
                        <!-- <span onclick="login()">Order Status</span> -->
                        <span>ORDER STATUS</span>

                    <form id="order">
                        <input type="text" placeholder="Order Number" id="order-number">
                        <input type="submit" id="order-btn" class="btn1 btn2" value="Check Status">
                        <p class="status-result"></p>
                    </form>
</div>
<div id="order-check">
                    <table  class="cart-table" id="cart-table">
                        <tr>
                            <th class="order-number"></th>
                            <th class="order-status"></th>
                            <th class="order-date"></th>
                        </tr>
                        <div class="cart-container">
                        </div>
                    </table>
                    <div class="main-total" id="main-total">
                        <table id="table-total">
                            <tr>
                                <td class="item-subtotal"></td>
                                <td class="order-subtotal"></td>
                            </tr>
                            <tr>
                                <td>TAX</td>
                                <td class ="order-tax"></td>
                            </tr>
                            <tr>
                                <td>TOTAL</td>
                                <td class="order-total">TBD</td>
                            </tr>
                        </table>
                        </div>
                     </div>
</div>

                </div>
                </div>`;
