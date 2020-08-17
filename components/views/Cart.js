export default () => `
<div class="small-container1 cart">
        <table  class="cart-table">
            <tr>
                <th>Product</th>
                <th>quantity</th>
                <th>Subtotal</th>
            </tr>
            <div class="cart-container">


        </table>
        <div class="main-total">
            <table>
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
                <a href="product.html" class="btn1">Continue Shopping</a>
                <a href="checkout.html" class="btn1">Checkout Now</a>
            </div>
        </div>
    </div>
`;
