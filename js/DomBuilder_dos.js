class DomBuilder_productos{

    getCardHtml = (product) => {
        return `
        <div class="row " id="template-card">
        <div class="col-12 mb-2 col-md-4">
          <div class="shadow p-3 mb-5 bg-white rounded">
                <a href="#" class="imageProduct"><img id="${product.id}" src="${product.thumbnailUrl}" width="100%" alt="${product.title}"></a>
                <div class="card-body">
                <h5>${product.title}</h5>
                <p>${product.precio}</p>
                <button data-id=${product.id} class="btn btn-secondary">Comprar</button>
              </div>
            </div>
          </div>                
    `;
    }

    clearDom = (parent) => {
        parent.empty();
    }

    renderProducts = (products,parent) => {
        this.clearDom(parent);
        products.forEach(product => {
            parent.append(this.getCardHtml(product));
        });
    }
  
}

export default DomBuilder_productos;



