export default () => `
<div class="account">
        <div class="container1">
            <div class="row">
            <div class="col-4">
            <h1 class="order-number"></h1>
            <h2>Thank you for placing an order on EzShop</h2>
            </div>
            </div>
            <div class="row1">
            <div class="col-2">
            <h1>TO BE CONTINUED......!!!!! </h1>
            <p> YOU HAVE PREPARED YOUR ORDER PLEASE RETURN IN 4 WEEK TO SUBMIT YOUR PAYMENT &#128528 </p>
            </div>


                <div class="col-2">
                <form action="https://formspree.io/xrgyrpza" method="POST">
                <label for="marketing">How did you hear about me?</label>
                <br>
                <br>
                <select name="marketing">
                <optgroup label="Online">
                <option value="social">Social Media (FB, Twitter, LinkedIn)</option>
                <option value="search">Search Engine</option>
                <option value="email">Email</option>
                </optgroup>
                <optgroup label="In-Person">
                <option value="github">Friend and Family</option>
                <option value="github">store</option>
                </optgroup>
                <option value="other">Other</option>
                </select>
                <input type="submit" value="Submit" class="btn1">
                </form>
             </div>
  </div>
</div>
</div>
`;
