export default () => `
<div class="account">
        <div class="container1">
            <div class="row1">
                <div class="col-2">
                <form action="https://formspree.io/xrgyrpza" method="POST">
                <input type="text" name="name" id="name" placeholder="Full Name">
                <input type="email" name="email" id="email" placeholder="you@somewhere.com">
                <input type="tel" name="fone" id="fone" placeholder="You Phone number">
                <textarea name="msg" id="msg" cols="30" rows="10" placeholder="Enter your message"=></textarea>
                <br>
                <br>
                <label for="news">Subscribe me to your newsletter!</label>
                <input type="checkbox" name="optIn" value="trusting" id="news" checked>
                <label for="marketing">What's this message about?</label>
                <br>
                <br>
                <select name="marketing">
                <optgroup label="Online Order">
                <option value="social">New Order</option>
                <option value="search">Order Status</option>
                <option value="email">Return Exchange</option>
                </optgroup>
                <optgroup label="Recommendations">
                <option value="github">Size and Fit</option>
                <option value="github">Product details</option>
                </optgroup>
                <option value="other">Other</option>
                </select>
                <br>
                <br>
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
                <input type="submit" value="Submit" class="btn1 contact-btn" >
                </form>
             </div>
  </div>
</div>
</div>
`;
