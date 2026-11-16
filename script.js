const productos = [
    {
        nombre: "Arroz", categoria: "Granos", precio: 4500, cantidad: 25, minimo: 10
    },
    {
        nombre: "Aceite", categoria: "Despensa", precio: 12000, cantidad: 3, minimo: 5
    },
    {
        nombre: "Azucar", categoria: "Despensa", precio: 3800, cantidad: 0, minimo: 8
    },
    {
        nombre: "Cafe", categoria: "Bebidas", precio: 18500, cantidad: 8, minimo: 4
    },
    {
        nombre: "Leche", categoria: "Lacteos", precio: 4200, cantidad: 2, minimo: 6
    },
    {
        nombre: "Panela", categoria: "Despensa", precio: 3000, cantidad: 15, minimo: 10
    },
    {
        nombre: "Queso", categoria: "Lacteos", precio: 9800, cantidad: 4, minimo: 5
    },
    {
        nombre: "jugo", categoria: "Bebidas", precio: 5200, cantidad: 4, minimo: 3
    }
];

//console.log(productos);
//console.log(productos.length);
//console.log(productos[0].nombre);

const cuerpoTabla = document.getElementById("cuerpo-tabla");

const resumen = document.getElementById("resumen");

function mostrarInventario() {

    cuerpoTabla.innerHTML = "";
    resumen.innerHTML = "";

    let totalAgotados = 0;
    let totalBajoStock = 0;
    let unidadesApedir = 0;
    let valorInventario = 0;

    let mayorSubtotal = -1;
    let filaMayor = null;
    let nombreMayor = "";



    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];

        const subtotal = producto.precio * producto.cantidad;

        const fila = document.createElement("tr");

        const tdNombre = document.createElement("td");
        tdNombre.textContent = producto.nombre;

        const tdCategoria = document.createElement("td");
        const etiqueta = document.createElement("span");
        etiqueta.textContent = producto.categoria;
        etiqueta.classList.add("etiqueta");

        if (producto.categoria === "Granos") {
            etiqueta.style.backgroundColor = "#8d6e63";

        } else if (producto.categoria === "Despensa") {
            etiqueta.style.backgroundColor = "#6f42c1";

        } else if (producto.categoria === "Bebidas") {
            etiqueta.style.backgroundColor = "#0d6efd";

        } else if (producto.categoria === "Lacteos") {
            etiqueta.style.backgroundColor = "#20c997";

        } else {
            etiqueta.style.backgroundColor = "gray";
        }
        tdCategoria.appendChild(etiqueta);

        const tdPrecio = document.createElement("td");

        tdPrecio.textContent = "$" + producto.precio.toLocaleString("es-CO");

        if (producto.precio > 10000) {
            tdPrecio.style.fontWeight = "bold";
        }

        const tdCantidad = document.createElement("td");

        const btnMenos = document.createElement("button");
        btnMenos.textContent = "-";
        btnMenos.classList.add("btn", "btn-menos");

        if (producto.cantidad === 0) {
            btnMenos.disabled = true;
        }

        btnMenos.addEventListener("click", function () {
            if (productos[i].cantidad > 0) {
                productos[i].cantidad--;
                mostrarInventario();
            }
        });

        const numero = document.createElement("span");
        numero.textContent = producto.cantidad;
        numero.classList.add("numero");

        const btnMas = document.createElement("button");
        btnMas.textContent = "+";
        btnMas.classList.add("btn", "btn-mas");

        btnMas.addEventListener("click", function () {
            productos[i].cantidad++;
            mostrarInventario();
        });


        tdCantidad.appendChild(btnMenos);
        tdCantidad.appendChild(numero);
        tdCantidad.appendChild(btnMas);

        const tdMinimo = document.createElement("td");
        tdMinimo.textContent = producto.minimo;

        const tdSubtotal = document.createElement("td");
        tdSubtotal.textContent = "$" + subtotal.toLocaleString("es-CO");


        const tdEstado = document.createElement("td");

        if (producto.cantidad === 0) {
            fila.classList.add("agotado");
            const faltan = producto.minimo;
            tdEstado.textContent = "AGOTADO - pedir " + faltan;
            tdEstado.style.color = "#dc3545";
            tdEstado.style.fontWeight = "bold";
            totalAgotados++;
            unidadesApedir += faltan;

        } else if (producto.cantidad < producto.minimo) {
            fila.classList.add("bajo-stock");
            const faltan = producto.minimo - producto.cantidad;
            tdEstado.textContent = "Bajo stock - pedir " + faltan;
            totalBajoStock++;
            unidadesApedir += faltan;

        } else {
            fila.classList.add("disponible");
            tdEstado.textContent = "OK";
        }

        valorInventario += subtotal;

        if (subtotal > mayorSubtotal) {
            mayorSubtotal = subtotal;
            filaMayor = fila;
            nombreMayor = producto.nombre;
        }

        fila.appendChild(tdNombre);
        fila.appendChild(tdCategoria);
        fila.appendChild(tdPrecio);
        fila.appendChild(tdCantidad);
        fila.appendChild(tdMinimo);
        fila.appendChild(tdSubtotal);
        fila.appendChild(tdEstado);


        cuerpoTabla.appendChild(fila);

    }

    filaMayor.classList.add("destacado");


    const pAgotados = document.createElement("p");
    pAgotados.textContent = "Produtos agotados: " + totalAgotados;

    const pBajo = document.createElement("p");
    pBajo.textContent = "Productos con bajos stock: " + totalBajoStock;

    const pPedir = document.createElement("p");
    pPedir.textContent = "Unidades a pedir: " + unidadesApedir;

    const pValor = document.createElement("p");
    pValor.textContent = "Valor total del inventario: $" + valorInventario.toLocaleString("es-CO");
    pValor.style.fontWeight = "bold";

    const pMayor = document.createElement("p");

    pMayor.textContent = "Productos con mayor valor: " + nombreMayor +
        " ($" + mayorSubtotal.toLocaleString("es-CO") + ")";

    resumen.appendChild(pAgotados);
    resumen.appendChild(pBajo);
    resumen.appendChild(pPedir);
    resumen.appendChild(pValor);
    resumen.appendChild(pMayor);

}

mostrarInventario();


