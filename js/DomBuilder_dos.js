class DomBuilder_productos{

    getCardHtml = (product) => {
        return `
        <div class="row" id="template-card">
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


    getCardHtml_carrito = (product) => {
        return `
        <div id="template-carrito">
        <tr>
          <th scope="row">id</th>
          <td>${product.title}</td>
          <td>${product.cantidad}</td>
          <td>
              <button class="btn btn-outline-success btn-sm">
                  +
              </button>
              <button class="btn  btn-outline-warning btn-sm">
                  -
              </button>
          </td>
          <td>$ <span>${product.precio}</span></td>
        </tr>
      </div>               
    `;
    }


    getCardHtml_footCarrito = (product) => {
        return `
        <div id="template-footer">
        <th scope="row" colspan="2">Total productos</th>
        <td>10</td>
        <td>
            <button class="btn btn-danger btn-sm" id="vaciar-carrito">
                vaciar todo
            </button>
     
        </td>
        <td class="font-weight-bold">$ <span>5000</span></td>
        </div>              
    `;
    }

    getCardHtml_carritoVacio = (product) => {
        return `
        <table class="table">
        <thead>

          <tr>
            <th scope="col"><i class="fas fa-chevron-circle-down"></i></th>
            <th scope="col">Compras</th>
            <th scope="col">Cantidad</th>
            <th scope="col"><i class="fas fa-chevron-circle-down"></i></th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody id="items"></tbody>
        <tfoot>
          <tr id="footer">
            <th scope="row" colspan="5">Carrito vacío</th>
          </tr>
        </tfoot>
      </table>              
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

    renderCarrito = (carrito,parent_carrito) => {
        this.clearDom(parent_carrito);
        carrito.forEach(product => {
            parent_carrito.append(this.getCardHtml_carrito(product));
        });
    }

    renderFootCarrito = (products,parent_footer) => {
        this.clearDom(parent_footer);
        products.forEach(product => {
            parent_footer.append(this.getCardHtml_footCarrito(product));
        });
    }

    renderCarritoVacio = (products,parent_table) => {
        this.clearDom(parent_table);
        products.forEach(product => {
            parent_table.append(this.getCardHtml_carritoVacio(product));
        });
    }


}

export default DomBuilder_productos;


//template-carrito
class DomBuilder_carrito{

    getCardHtml_carrito = (product) => {
        return `
        <div id="template-carrito">
        <tr>
          <th scope="row">id</th>
          <td>${product.title}</td>
          <td>${product.cantidad}</td>
          <td>
              <button class="btn btn-outline-success btn-sm">
                  +
              </button>
              <button class="btn  btn-outline-warning btn-sm">
                  -
              </button>
          </td>
          <td>$ <span>${product.precio}</span></td>
        </tr>
      </div>               
    `;
    }

    clearDom = (parent_carrito) => {
        parent_carrito.empty();
    }

    renderProducts = (products,parent_carrito) => {
        this.clearDom(parent_carrito);
        products.forEach(product => {
            parent_carrito.append(this.getCardHtml_carrito(product));
        });
    }
}



//template-footer
class DomBuilder_fotCarrito{

    getCardHtml_footCarrito = (product) => {
        return `
        <div id="template-footer">
        <th scope="row" colspan="2">Total productos</th>
        <td>10</td>
        <td>
            <button class="btn btn-danger btn-sm" id="vaciar-carrito">
                vaciar todo
            </button>
     
        </td>
        <td class="font-weight-bold">$ <span>5000</span></td>
        </div>              
    `;
    }

    clearDom = (parent_footer) => {
        parent_footer.empty();
    }

    renderProducts = (products,parent_footer) => {
        this.clearDom(parent_footer);
        products.forEach(product => {
            parent_footer.append(this.getCardHtml_footCarrito(product));
        });
    }
}


//template footer carrito
class DomBuilder_carritoVacio{

    getCardHtml_carritoVacio = (product) => {
        return `
        <table class="table">
        <thead>

          <tr>
            <th scope="col"><i class="fas fa-chevron-circle-down"></i></th>
            <th scope="col">Compras</th>
            <th scope="col">Cantidad</th>
            <th scope="col"><i class="fas fa-chevron-circle-down"></i></th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody id="items"></tbody>
        <tfoot>
          <tr id="footer">
            <th scope="row" colspan="5">Carrito vacío</th>
          </tr>
        </tfoot>
      </table>              
    `;
    }

    clearDom = (parent_table) => {
        parent_table.empty();
    }

    renderProducts = (products,parent_table) => {
        this.clearDom(parent_table);
        products.forEach(product => {
            parent_table.append(this.getCardHtml_carritoVacio(product));
        });
    }
}
