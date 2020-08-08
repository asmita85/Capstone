export default () => `
<div class="small-container1 cart">
        <table>
            <tr>
                <th>Product</th>
                <th>quantity</th>
                <th>Subtotal</th>
            </tr>
            <tr>
                <td>
                    <div class="cart-info">
                        <img src="images/Mgallery1-1.jpg" alt="">
                        <div>
                            <p>name  shirt</p>
                            <p>price $80</p>
                            <br>
                            <a href="">remove</a>
                        </div>
                    </div>
                </td>
                <td><input type="number" value="1" class="cart-number"></td>
                <td>$50.00</td>
            </tr>
        </table>
        <div class="total">
            <table>
                <tr>
                    <td>Subtotal</td>
                    <td>$80</td>
                </tr>
                <tr>
                    <td>TAX</td>
                    <td>$10</td>
                </tr>
                <tr>
                    <td>TOTAL</td>
                    <td>$90</td>
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
