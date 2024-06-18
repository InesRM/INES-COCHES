window.addEventListener("load", function () {

    function cargarFavoritos() {
      const favoritosElement = document.querySelector("#favoritos");
      if (favoritosElement) {
        const favoritos = JSON.parse(localStorage.getItem("favoritos")) || []; //Si no hay nada en el localstorage, se crea un array vacío
        favoritos.forEach((coche) => {
          if (coche) {
            const fullName = `${coche.marca} ${coche.modelo}`;
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
            <div class="card" style="width: 38rem;">
            <div class="card-body">
                  <h5 class="card-title">${fullName}</h5>
                  <p class="card-text">${coche.year}</p>
                  <p class="card-text">${coche.precio}</p>
                   <button class="btn btn-danger" data-coche-marca="${fullName}">Eliminar favorito</button>
          </div>
      </div>
      `;
            favoritosElement.appendChild(card);
          }
        });
      }
    }
    cargarFavoritos();
  
      function eliminarFavorito(fullName) {
          const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
          const nuevoArray = favoritos.filter((coche) => `${coche.marca} ${coche.modelo}` !== fullName);
          localStorage.setItem("favoritos", JSON.stringify(nuevoArray));
          location.reload();
      }
  
      document.addEventListener("click", (event) => {
          if (event.target.tagName === "BUTTON") {
              const fullName = event.target.getAttribute("data-coche-marca");
              eliminarFavorito(fullName);
          }
      });
  });
  