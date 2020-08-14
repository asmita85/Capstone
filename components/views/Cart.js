export default () => `
<div class="small-container1 cart">
        <table>
            <tr>
                <th>Product</th>
                <th>quantity</th>
                <th>Subtotal</th>
            </tr>
            <tr class="cart-items">
                <td class="cart-row">
                    <div class="cart-info item">
                        <img src="https://github.com/asmita85/Capstone/blob/master/images/Men-Product/Mproduct-1.jpg?raw=true" alt="">
                        <div>
                            <p> shirt</p>
                            <p class="cart-price">$10.00</p>
                            <br>
                            <a href="#" class="removeItem">remove</a>
                        </div>
                    </div>
                </td>
                <td class="cart-row2"> <input class="cart-number" type="number" value="1" > </td>
                <td >$10.00</td>
            </tr>
            <tr class="cart-items">
                <td class="cart-row">
                    <div class="cart-info item">
                        <img src="https://github.com/asmita85/Capstone/blob/master/images/Men-Product/Mproduct-1.jpg?raw=true" alt="">
                        <div>
                            <p> shirt</p>
                            <p class="cart-price">$100.00</p>
                            <br>
                            <a href="#" class="removeItem">remove</a>
                        </div>
                    </div>
                </td>
                <td class="cart-row2"> <input class="cart-number" type="number" value="2" > </td>
                <td >$50.00</td>
            </tr>
        </table>
        <div class="main-total">
            <table>
                <tr>
                    <td>Subtotal</td>
                    <td class="order-subtotal">$80</td>
                </tr>
                <tr>
                    <td>TAX</td>
                    <td class = "order-tax">$10</td>
                </tr>
                <tr>
                    <td>TOTAL</td>
                    <td class="order-total">$90</td>
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
