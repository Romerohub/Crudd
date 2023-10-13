import datos from "../data/data.json" assert { type: "json" };
import { Gift } from "./clases.js";

const cuerpoTabla = document.querySelector("#cuerpo-tabla");
const myModal = new bootstrap.Modal(document.getElementById("modalGift"));

let idGiftUpdate = null;

window.mostrarModal = (id) => {
  console.log(id);
  idGiftUpdate = id;
  let index = datos.findIndex((item) => item.id == idGiftUpdate);

  document.querySelector("#giftModal").value = datos[index].gift;
  document.querySelector("#tipoModal").value = datos[index].tipo;
  document.querySelector("#tiempoModal").value = datos[index].tiempo;
  document.querySelector("#precioModal").value = datos[index].precio;
  document.querySelector("#imagenModal").value = datos[index].imagen;

  myModal.show();
};

const agregarMensaje = (mensaje, color) => {
  const mensajeDiv = document.querySelector("#mensajeActualizar");
  mensajeDiv.textContent = mensaje;
  mensajeDiv.style.display = "block";
  mensajeDiv.style.backgroundColor = color;
  setTimeout(() => {
    mensajeDiv.style.display = "none";
  }, 4000);
};

const giftUpdate = (e) => {
  e.preventDefault();
  let index = datos.findIndex((item) => item.id == idGiftUpdate);
  datos[index].gift = document.querySelector("#giftModal").value;
  datos[index].tipo = document.querySelector("#tipoModal").value;
  datos[index].tiempo = document.querySelector("#tiempoModal").value;
  datos[index].precio = document.querySelector("#precioModal").value;
  datos[index].imagen = document.querySelector("#imagenModal").value;

  cargarTabla();
  myModal.hide();

  agregarMensaje(` Producto "${datos[index].gift}" Actualizado con exito`);
};

const cargarTabla = () => {
  cuerpoTabla.innerHTML = "";
  datos.map((item) => {
    const fila = document.createElement("tr");

    const celdas = `<th>${item.gift}</th>
        <td>${item.tipo}</td>
        <td>${item.tiempo}</td>
        <td>$${item.precio}</td>
        <td><img src="${item.imagen}" alt="${item.gift}" width="60" height="65"></td>
        <td>
        <div class="d-flex gap-2">
        <button class="btn btn-outline-warning" onclick="mostrarModal(${item.id})"><i class="fa fa-pencil" aria-hidden="true"></i></button>
        <button class="btn btn-outline-danger" onclick="borrarGift(${item.id})"><i class="fa fa-times" aria-hidden="true"></i></button>
        </div>
        </td>
        `;

    fila.innerHTML = celdas;
    cuerpoTabla.append(fila);
  });
};

const agregarGift = (event) => {
  event.preventDefault();

  let id = datos.at(-1).id + 1;
  let gift = document.querySelector("#gift").value;
  let tipo = document.querySelector("#tipo").value;
  let tiempo = document.querySelector("#tiempo").value;
  let precio = document.querySelector("#precio").value;
  let imagen = document.querySelector("#imagen").value;

  datos.push(new Gift(id, gift, tipo, tiempo, precio, imagen));
  document.querySelector("#formGift").reset();
  cargarTabla();
  const mensajeDiv = document.querySelector("#mensaje");
  mensajeDiv.textContent = "Se registró un nuevo producto exitosamente";
  mensajeDiv.style.display = "block";
  setTimeout(() => {
    mensajeDiv.style.display = "none";
  }, 4000);
};

window.borrarGift = (id) => {
  let index = datos.findIndex((item) => item.id == id);

  let validar = confirm(
    `Está seguro/a que quiere eliminar la gift card ${datos[index].gift}?`
  );

  if (validar) {
    datos.splice(index, 1);
    cargarTabla();
    const mensajeEliminarDiv = document.querySelector("#mensajeEliminar");
    mensajeEliminarDiv.textContent = `Producto "${datos[index].gift}" eliminado con exito`;
    mensajeEliminarDiv.style.display = "block";
    setTimeout(() => {
        mensajeEliminarDiv.style.display = "none";
      }, 4000);
    
  }
};

cargarTabla();

document.querySelector("#formGift").addEventListener("submit", agregarGift);
document.querySelector("#formModal").addEventListener("submit", giftUpdate);
