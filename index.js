document.addEventListener("DOMContentLoaded", () => {
    fetch("textoXML.xml")
        .then(response => response.text())
        .then(xmlTexto => {
            const parser = new DOMParser();
            const textoXML = parser.parseFromString(xmlTexto, "text/xml");

            const inventario = pasarAXML(textoXML);
            mostrarTabla(inventario);
        })

    function pasarAXML(xml){
        const productos = [];
        const nodo = xml.getElementsByTagName("producto");

        for (let producto of nodo) {
            const nombre = producto.querySelector("nombre").textContent;
            const precio = parseFloat(producto.querySelector("precio").textContent);
            const stock = parseInt(producto.querySelector("stock").textContent);
            productos.push({nombre, precio, stock});
        }
        return productos;
    }

    function mostrarTabla(inventario){
        let html =
            `<table>
                <thead>
                <tr><th>Nombre</th><th>Precio</th><th>Stock</th></tr>
                </thead>
                <tbody>
                `;

        inventario.forEach(producto => {
            const claseMenor20 = producto.stock < 20 ? "bajoStock" : "";
            html += `
              <tr class="${claseMenor20}">
                <td>${producto.nombre}</td>
                <td>${producto.precio.toFixed(2)} €</td>
                <td>${producto.stock}</td>
              </tr>
            `;
        })

        html += `</tbody></table>`;
        document.getElementById("tabla-contenedor").innerHTML = html;
    }
});