export default () => `
<div class="small-container1 cart" id="cart">
        <table  class="cart-table" id="cart-table">
            <tr>
                <th>Product</th>
                <th>quantity</th>
                <th>Subtotal</th>
            </tr>
            <div class="cart-container">

            </div>
        </table>
        <div class="main-total" id="main-total">
            <table id="table-total">
                <tr>
                    <td>Subtotal</td>
                    <td class="order-subtotal"></td>
                </tr>
                <tr>
                    <td>TAX</td>
                    <td class = "order-tax">TBD</td>
                </tr>
                <tr>
                    <td>TOTAL</td>
                    <td class="order-total">TBD</td>
                </tr>
            </table>
        </div>
        <div class="checkout1">
            <div class="checkout">
                <a href="/" data-navigo class="btn1">Continue Shopping</a>
                <a href="/${"Checkout"}" data-navigo class="btn1 checkout-btn" id="checkout-btn">Checkout Now</a>
            </div>
        </div>
    </div>
`;
