export default () => `
<div class="small-container1 product-detail  button-div">
     <div class="row1  selected-product " id="none">
     <img src="https://github.com/asmita85/Capstone/blob/master/images/Women-Product/Wgallery12.jpg?raw=true" width=100%" class="main-img main-img2">
     <div class="img-row1">
         <div class="img-col-4">
             <img src="https://github.com/asmita85/Capstone/blob/master/images/Women-Product/Wgallery12.jpg?raw=true" width="100%" class="gallery-img">
         </div>
         <div class="img-col-4">
             <img src="https://github.com/asmita85/Capstone/blob/master/images/Women-Product/Wproduct-1.jpg?raw=true" width="100%" class="gallery-img">
         </div>
         <div class="img-col-4">
             <img src="https://github.com/asmita85/Capstone/blob/master/images/Women-Product/Wproduct-9.jpg?raw=true" width="100%" class="gallery-img">
         </div>
         <div class="img-col-4">
             <img src="https://github.com/asmita85/Capstone/blob/master/images/Women-Product/Wproduct-1.jpg?raw=true" width="100%" class="gallery-img">
         </div>
     </div>
        </div>

    <div class="col-2 size-q">
          <h2 class="title"></h2>
          <h4>Select your size</h4>
          <div class="size-btn">
          <select class="selected-size" required>
          <option hidden="" disabled="disabled" selected="selected" value="">Select Size</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          </select>
    </div>
          <h4>Quantity</h4>
          <div>
              <input class="selected-quantity" type="number" value="1">
          </div>
          <div class="product-price">
              <h4>Price:</h4>
              <h4 class="price"></h4>
          </div>
          <button class="btn1 add-button " id="data-id">Add to cart</button>
          <h4>Product detail</h4>
          <p>A T-shirt, or tee shirt, is a style of fabric shirt named after the T shape of its body and sleeves.
          </p>
</div>
  </div>
    </div>
    </div>
`;
