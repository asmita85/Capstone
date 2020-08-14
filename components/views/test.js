${st.Obj.map(
  Obj => `<div class="col-4 img-container">
  <a href="productDetail.html" id="selected"><img src="${Obj.fields.image.fields.file.url}" class="selectedItem-img"></a>
  <h4>"${Obj.fields.title}"</h4>
  <p>$"${Obj.fields.price}"</p>
  </div>`
  ).join("")}
