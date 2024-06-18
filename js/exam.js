window.addEventListener("load", function () {
  // Leer datos de sessionStorage
  const welcome = document.getElementById("welcome");
  const usuario = sessionStorage.getItem("usuario");
  welcome.textContent = ""; // Limpiar el mensaje de bienvenida
  if (usuario) {
    welcome.textContent = `Bienvenido ${usuario}`;
  }

  // Esperar a que la página cargue completamente
  console.log("Inicio");

  // --- Manejo del formulario y tabla SELECTORES ---

  const createButton = document.getElementById("create");
  const resultsTableBody = document.querySelector("#results tbody");
  const selectedCocheTextarea = document.getElementById("selected-coche");
  const modalLogin = document.getElementById("modalLogin");
  const modalContent = document.getElementById("modal-content");
  const modalTitle = document.getElementById("modalLoginLabel");
  const deleteButton = document.getElementById("delete");
  
  const header = document.getElementsByTagName("header")[0];
  const logoutButton = document.getElementById("logout"); // Botón de cerrar sesión
  const loginButton = document.getElementById("loginButton"); // Botón de iniciar sesión
  const mensajes = document.getElementById("mensajes");
  const selectCoche = document.querySelector("#categorias");
  const searchButton = document.getElementById("button-addon2");
  const addButton = document.getElementById("añadirProducto");
  const formularioProducto = document.getElementById("formularioProducto");
  //carrito
  const tablaCarrito = document.querySelector("#lista-carrito tbody");
  const botonVaciarCarrito = document.getElementById("vaciar-carrito");
  const btnAgregaraCarrito = document.getElementById("btnAgregaraCarrito");
  const resultadoElement = document.querySelector("#resultado");
  const modalFooter = document.querySelector("#modal .modal-footer");

  //FAVORITOS
  const btnFavoritos = document.getElementById("btnFavoritos");

  //Modal de producto
  const modalBody = document.querySelector("#modal .modal-body");


  //FIN SELECTORES

  //Función que añade filas a la tabla
  function addRowToTable(marca, modelo, year, precio, color) {
    const newRow = document.createElement("tr");
    const newMarca = document.createElement("td");
    const newModelo = document.createElement("td");
    const newYear = document.createElement("td");
    const newPrecio = document.createElement("td");
    const newColor = document.createElement("td");

    newMarca.textContent = marca;
    newModelo.textContent = modelo;
    newYear.textContent = year;
    newPrecio.textContent = precio;
    newColor.textContent = color;

    newRow.append(newMarca, newModelo, newYear, newPrecio, newColor);
    resultsTableBody.appendChild(newRow);
  }

  //Limpiar formulario

  function clearForm() {
    document.querySelectorAll("input").forEach((input) => {
      input.value = "";
      input.classList.remove("is-invalid", "is-valid");
    });
  }

  //Función para mostrar alertas

  function showAlert(message, type = "success") {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    mensajes.appendChild(alert);
    // document.body.appendChild(alert);
    setTimeout(() => {
      alert.remove();
    }, 5000);
  }

  //Función para validar formulario
  function validateForm() {
    let isValid = true;
    document.querySelectorAll("input[required]").forEach((input) => {
      if (input.value === "") {
        input.classList.add("is-invalid");
        isValid = false;
      } else {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");

        // Validar si los campos numéricos son realmente números
        if (
          input.id === "validationDefault03" ||
          input.id === "validationDefault04"
        ) {
          if (isNaN(parseFloat(input.value))) {
            input.classList.add("is-invalid");
            isValid = false;
          }
        }
      }
    });
    return isValid;
  }
  // Instancia única del modal LOGIN Y REGISTRO
  const modal = new bootstrap.Modal(modalLogin);
  // Event listeners para botones dentro del modal (delegación de eventos)
  modalContent.addEventListener("click", (event) => {
    if (event.target.id === "btnSignIn") {
      event.preventDefault();
      loginUser();
    } else if (event.target.id === "btnRegistro") {
      event.preventDefault();
      registerUser();
    } else if (event.target.classList.contains("abrir-modal")) {
      openModal(event.target.dataset.modalType);
    }
  });

  function openModal(type) {
    modalTitle.textContent =
      type === "login" ? "Iniciar Sesión" : "Registrarse";

    modalContent.innerHTML = `
        <h4>${modalTitle.textContent}</h4>
        ${type === "login" ? loginFormHTML : registroFormHTML}
    `;

    modal.show();
  }

  function closeModal() {
    modal.hide();
  }

  // HTML de los formularios (login y registro)
  const loginFormHTML = `
    <input type="text" class="form-control mb-2" id="txtUsuario" placeholder="Usuario">
    <input type="password" class="form-control mb-2" id="txtClave" placeholder="Contraseña">
    <button id="btnSignIn" class="btn btn-primary">Ingresar</button>
    <p class="mt-2">¿No tienes cuenta? <a href="#" class="abrir-modal" data-modal-type="registro">Regístrate</a></p>
`;

  const registroFormHTML = `
    <input type="text" class="form-control mb-2" id="txtNombre" placeholder="Nombre">
    <input type="email" class="form-control mb-2" id="txtEmail" placeholder="Email">
    <input type="text" class="form-control mb-2" id="txtUsuario" placeholder="Usuario">
    <input type="password" class="form-control mb-2" id="txtClave" placeholder="Contraseña">
    <button id="btnRegistro" class="btn btn-primary">Registrarse</button>
`;

  function registerUser() {
    const nombre = document.getElementById("txtNombre").value;
    const email = document.getElementById("txtEmail").value;
    const usuario = document.getElementById("txtUsuario").value;
    const clave = document.getElementById("txtClave").value;

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("email", email);
    formData.append("usuario", usuario);
    formData.append("clave", clave);

    fetch("../php/registerUser.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          closeModal();
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error al registrar el usuario:", error);
        alert("Error al registrar el usuario: " + error.message);
      });
  }

  function loginUser() {
    const usuario = document.getElementById("txtUsuario").value;
    const clave = document.getElementById("txtClave").value;
    const formData = new FormData();
    formData.append("usuario", usuario);
    formData.append("clave", clave);

    fetch("../php/loginUser.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          //SESSION STORAGE
          sessionStorage.setItem("usuario", usuario);
          sessionStorage.setItem("token", data.token); // Asumiendo que el servidor devuelve un token

          // alert(data.message);
          backup.style.display = "block"; // Mostrar el botón de backup
          backupButton.style.display = "block"; // Mostrar el botón de backup
          loginButton.style.display = "none"; // Ocultar el botón de iniciar sesión
          logoutButton.style.display = "block"; // Mostrar el botón de cerrar sesión
          closeModal();
          welcome.textContent = `Bienvenido ${usuario}`;
          header.style.backgroundColor = "lightgreen"; // Cambiar el color de fondo del header
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        showAlert("Error al iniciar sesión: " + error.message);
      });
  }

  function logoutUser() {
    // Limpiar datos de sessionStorage
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("token");
    // Aquí se puede realizar cualquier limpieza necesaria, como eliminar datos del localStorage o cookies
    showAlert("Has cerrado sesión exitosamente.");
    welcome.innerHTML = "";
    header.style.backgroundColor = ""; // Restaurar el color de fondo del header
    // Redirigir al usuario a la página de inicio de sesión o recargar la página
    location.reload();
  }

  // Evento para abrir el modal al hacer clic en el botón inicial
  document.querySelector(".abrir-modal").addEventListener("click", function () {
    openModal(this.dataset.modalType);
  });

  createButton.addEventListener("click", function () {
    if (!validateForm()) return;

    const fullName =
      document.getElementById("validationDefault01").value +
      " " +
      document.getElementById("validationDefault02").value;
    const year = parseInt(
      document.getElementById("validationDefault03").value,
      10
    );
    const precio = parseFloat(
      document.getElementById("validationDefault04").value
    );
    const color = document.getElementById("validationDefault05").value;

    // Verificar las conversiones
    console.log("Year:", year, "Type:", typeof year);
    console.log("Precio:", precio, "Type:", typeof precio);

    addRowToTable(fullName, year, precio, color);
    showAlert("Coche añadido con éxito", "success");
    clearForm();
  });

  resultsTableBody.addEventListener("click", function (event) {
    const clickedRow = event.target.closest("tr"); // Encontrar la fila clicada

    // Deseleccionar otras filas y seleccionar la clicada
    resultsTableBody
      .querySelectorAll("tr")
      .forEach((row) => row.classList.remove("selected"));
    clickedRow.classList.add("selected");

    // Obtener datos de la fila y mostrar en textarea
    const cocheData = {
      fullName: clickedRow.cells[0].textContent,
      year: parseInt(clickedRow.cells[1].textContent, 10),
      precio: parseFloat(clickedRow.cells[2].textContent),
      color: clickedRow.cells[3].textContent,
    };
    selectedCocheTextarea.value = JSON.stringify(cocheData, null, 2); // Convertir a JSON con formato el null es para que no haya espacios y el 2 es para que haya 2 espacios
  });

  document.getElementById("random").addEventListener("click", function () {
    fetch("../php/getCoche.php") // Hacer una solicitud GET a la API con la ruta de la película "A New Hope"
      .then((response) => response.json()) // Analizar la respuesta JSON
      .then((coche) => {
        document.getElementById("validationDefault01").value = coche.marca;
        document.getElementById("validationDefault02").value = coche.modelo;
        document.getElementById("validationDefault03").value = coche.year;
        document.getElementById("validationDefault04").value = coche.precio;
        document.getElementById("validationDefault05").value = coche.color;
      })
      .catch((error) =>
        console.error("Error al obtener el coche aleatorio", error)
      ); // Manejar errores
  });

  document.getElementById("send").addEventListener("click", function () {
    // Obtener la fila seleccionada
    const selectedRow = document.querySelector("#results tbody tr.selected");

    if (!selectedRow) {
      showAlert("Por favor selecciona un coche");
      return;
    }

    // Obtener los datos del coche
    const fullName = selectedRow.cells[0].textContent;
    const [marca, modelo = ""] = fullName.split("|"); // Asegura que modelo tenga un valor
    const year = parseInt(selectedRow.cells[1].textContent, 10);
    const precio = parseFloat(selectedRow.cells[2].textContent);
    const color = selectedRow.cells[3].textContent;

    // Crear un objeto FormData para enviar los datos
    const formData = new FormData();
    formData.append("marca", marca);
    formData.append("modelo", modelo);
    formData.append("year", year);
    formData.append("precio", precio);
    formData.append("color", color);

    // Enviar la solicitud al servidor PHP
    fetch("../php/saveCoche.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          // Si la respuesta no es exitosa
          throw new Error("Error en la solicitud: " + response.statusText);
        }
        return response.text(); // Asumimos que el servidor devuelve JSON
      })
      .then((data) => {
        console.log(data); // Manejar la respuesta del servidor
        showAlert("coche guardado con éxito"); // Notificar al usuario
      })
      .catch((error) => {
        console.error("Error al guardar el coche:", error);
        showAlert("Error al guardar el coche: " + error.message); // Mostrar un mensaje de error amigable al usuario
      });
  });

  deleteButton.addEventListener("click", function () {
    const selectedRow = document.querySelector("#results tbody tr.selected");

    if (!selectedRow) {
      showAlert("Por favor selecciona un coche");
      return;
    }
    //Eliminamos solo el row de la tabla

    selectedRow.remove();
  });

  // Evento para cerrar sesión
  logoutButton.addEventListener("click", logoutUser); // Cerrar sesión

  //Esta función sustituye a las categorías de otros ejemplos, en este caso coches todos los cochess

  function cargarCoches() {
    selectCoche.textContent = ""; // limpiar opciones previas
    selectCoche.insertAdjacentHTML(
      "beforeend",
      `<option value="0">Seleccione un coche</option>`
    );
    fetch("../php/getAllCoches.php")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((coche) => {
          selectCoche.insertAdjacentHTML(
            "beforeend",
            `<option value="${coche.marca}|${coche.modelo}">${coche.marca} ${coche.modelo}</option>`
          );
        });
      })
      .catch((error) => console.error("Error al cargar los coches:", error));
  }
  //Cargar en la tabla el coche seleccionado discriminando por marca y modelo
  if (selectCoche) {
    cargarCoches();
    selectCoche.addEventListener("change", async () => {
      const selectedValue = selectCoche.value;
      if (selectedValue === "0") {
        return;
      }

      // Divide el valor seleccionado para obtener la marca y el modelo
      const [marca, modelo] = selectedValue.split("|");
      const response = await fetch(
        `../php/getCocheByName.php?marca=${marca}&modelo=${modelo}`
      );
      const coche = await response.json();
      if (coche) {
        resultadoElement.innerHTML = "";
        resultsTableBody.innerHTML = "";
        const fullName = `${coche.marca} ${coche.modelo}`;
        addRowToTable(fullName, coche.year, coche.precio, coche.color);
        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-3");
        card.className = "card";
        card.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">${fullName}</h5>
            <p class="card-text">Año: ${coche.year}</p>
            <p class="card-text">Precio: ${coche.precio}</p>
            <p class="card-text">Color: ${coche.color}</p>
              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal" data-coche-name="${fullName}">Ver detalles</button>
          </div>
        `;

        resultadoElement.appendChild(card);
      }
    });
  }

  //MOSTRAR LOS DETALLES DEL coche en el modal

  resultadoElement.addEventListener("click", async (event) => {
    if (event.target.classList.contains("btn-primary")) {
      const fullName = event.target.getAttribute("data-coche-name");
      //Dividir fullName en marca y modelo
      const [marca, modelo] = fullName.split(" ");

      console.log(fullName, marca, modelo);
      const response = await fetch(
        `../php/getCocheByName.php?marca=${marca}&modelo=${modelo}`
      );
      console.log(response);
      const coche = await response.json();

      if (coche && coche.year && coche.precio && coche.color) {
        const modalBody = document.querySelector("#modal .modal-body");
        modalBody.innerHTML = `
          <h5 class="modal-title">${fullName}</h5>
          <p>Año: ${coche.year}</p>
          <h6>Precio: ${coche.precio}</h6>
        `;

        btnFavoritos.dataset.marca = coche.marca;
        btnFavoritos.dataset.modelo = coche.modelo;
        btnFavoritos.dataset.year = coche.year;
        btnFavoritos.dataset.precio = coche.precio;
      }else {
        console.error("Error al cargar los detalles del coche");
      }
    }
    
  });

  //AÑADIR A FAVORITOS

  btnFavoritos.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.id === "btnFavoritos") {
      const{
        marca,
        modelo,
        year,
        precio
        
      } = event.target.dataset;
     

      let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
      if (favoritos.some((coche) => coche.marca === marca && coche.modelo === modelo)) {
        alert ("El coche ya está en favoritos");
        return;
      }
      favoritos.push({marca, modelo, year, precio});

      localStorage.setItem("favoritos", JSON.stringify(favoritos));
      showAlert("Coche añadido a favoritos", "success");
      cerrarModal();
    }else{
      console.error("Error al añadir el coche a favoritos");
      showAlert("Error al añadir el coche a favoritos", "danger");
    }

  });

  // BARRA DE BUSQUEDA DE COCHES

  searchButton.addEventListener("click", async () => {
    const searchValue = document.getElementById("search").value;
    console.log(searchValue);
    const response = await fetch(
      `../php/searchCoche.php?search=${searchValue}` //su propio php porque utiliza una query diferente en la que no entra ni marca ni modelo
    );
    console.log(response);

    const coches = await response.json();
    console.log(coches);

    resultsTableBody.innerHTML = "";
    if (coches.length === 0) {
      resultsTableBody.innerHTML =
        "<tr><td colspan='4'>No se encontraron resultados</td></tr>";
      return;
    }

    for (const coche of coches) {
      const row = resultsTableBody.insertRow();
      row.insertCell().textContent = `${coche.marca} ${coche.modelo}`;
      row.insertCell().textContent = coche.year;
      row.insertCell().textContent = coche.precio;
      row.insertCell().textContent = coche.color;
    }
  });

  //BOTON AÑADIR PRODUCTO
  addButton.addEventListener("click", function () {
    selectCoche.style.display = "none";
    document.getElementById("selectCat").style.display = "none";
    formularioProducto.style.display = "block";
    // Esto es para ocultar y mostrar el formulario de añadir producto únicamente
  }); // Fin de la función anónima que sirve como punto de entrada de JavaScript

  /**
   * CARRITO DE COMPRAS
   */

  //Función para añadir un producto al carrito
  const guardarCarrito = () => {
    const rows = Array.from(tablaCarrito.querySelectorAll("tr"));
    const carrito = rows.map((row) => {
      const columns = row.querySelectorAll("td");
      return {
        marca: columns[0].textContent,
        modelo: columns[1].textContent,
        año: columns[2].textContent,
        precio: columns[3].textContent,

      };
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  //Función para cargar los productos del carrito desde localStorage

  const cargarCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.forEach((coche) => {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${coche.marca}</td>
      <td>${coche.año}</td>
      <td>${coche.precio}</td>
      <td><button class="btn btn-danger btn-remove">X</button></td>
    `;
      tablaCarrito.appendChild(row);
    });
  };
  cargarCarrito();

  //Función para cerrar el modal
  const cerrarModal = () => {
    const modal = bootstrap.Modal.getInstance(document.getElementById("modal"));
    modal.hide();
  };

  btnAgregaraCarrito.addEventListener("click", () => {
    
    const marca = modalBody.querySelector("h5").textContent;
    const año = modalBody.querySelector("p").textContent;
    const precio = modalBody.querySelector("h6").textContent;
    // const cantidad = document.getElementById("cantidad").value;

    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${marca}</td>
    <td>${año}</td>
    <td>${precio}</td>
    <td><button class="btn btn-danger btn-remove">X</button></td>
  `;
    tablaCarrito.appendChild(row);
    guardarCarrito();
    showAlert("Producto añadido al carrito", "success");
    cerrarModal();

  });
  //Eliminar producto del carrito
  tablaCarrito.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-remove")) {
      event.target.closest("tr").remove();
      showAlert("Producto eliminado del carrito", "danger");
      guardarCarrito();
    }
  });

  //Función para vaciar el carrito
  botonVaciarCarrito.addEventListener("click", () => {
    tablaCarrito.innerHTML = "";
    showAlert("Carrito vaciado", "danger");
    guardarCarrito();
  });
  //COOKIES*************************************************************
  // Función para crear una cookie
  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  // Función para obtener una cookie
  function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(cname) === 0) {
        return c.substring(cname.length, c.length);
      }
    }
    return "";
  }
  // Verificar si la cookie de consentimiento existe
  if (getCookie("cookieConsent") !== "accepted") {
    cookieConsentContainer.style.display = "block";
  }

  // Manejar el clic en el botón de aceptar cookies
  acceptCookiesBtn.addEventListener("click", function () {
    setCookie("cookieConsent", "accepted", 30);
    cookieConsentContainer.style.display = "none";
  });

  //FIN COOKIES*************************************************************
  //backup  

  // Creamos un botón para el backup visible cuando el usuario inicie sesión

  const backupButton = document.createElement("button");  
  backupButton.textContent = "Backup";
  backupButton.className = "btn btn-primary";
  backupButton.classList.add("mt-3");
  const backup = document.getElementById("backup");
  backup.appendChild(backupButton);

  //Evento para guardar el backup y guardar pedidos
  // backupButton.addEventListener("click", () => {
  //   const rows = Array.from(tablaCarrito.querySelectorAll("tr"));
  //   const carrito = rows.map((row) => {
  //     const columns = row.querySelectorAll("td");
  //     return {
  //       marca: columns[0].textContent,
  //       año: columns[1].textContent,
  //       precio: columns[2].textContent,
  //     };
  //   });
  //   localStorage.setItem("backup", JSON.stringify(carrito));
  //   showAlert("Backup guardado con éxito", "success");
  // });

  function crearBackup() {
    //Queremos crear un archivo detexto de respando con los datos de los usuarios contenidos en
    //el directorio tmp/users.json

    //solo queremos los datos del archivo JSON

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../php/backup.php", true);
    xhr.send();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
      }
    };
  }

  backupButton.addEventListener("click", function (e){
    e.preventDefault();
    crearBackup();
    showAlert("Backup guardado con éxito", "success");
  });


});
