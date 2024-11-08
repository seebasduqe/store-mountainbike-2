fetch("https://api-mountainbikeworld.onrender.com/api/bikes", {
  method: "GET",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwLCJlbWFpbCI6InMuZHVxdWVAdXRwLmVkdS5jbyIsImlhdCI6MTcyNzQ3MDkwOSwiZXhwIjoxNzQ0NzUwOTA5fQ.LquNxNAn0Go149_lyKDbMc10QE2J60K_OQTLXkG_b3w"
  }
})
  .then(response => response.json())
  .then(data => {

    const container = document.getElementById('products-grid');

    data.forEach(product => {

      console.log(product);

      const productDiv = `
            <div class="bg-gray-800 rounded-lg flex flex-col items-center justify-center w-full max-w-lg mx-auto"> 
              <img class="w-55 h-64 mx-auto rounded-lg mb-4 shadow-lg shadow-teal-500" src="../public/${product.imageUrl || 'default-image.png'}" alt="${product.title}">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-2">
                        <h2 class="block text-xl font-semibold text-center text-white">${product.title}</h2>
                        <p class="block text-gray-300 text-sm text-center">$${product.price.toLocaleString()}</p>
                    </div>
                    <p class="block font-sans text-sm antialiased font-normal leading-normal text-gray-300 opacity-75 sm:text-xs md:text-sm">
                        ${product.description}
                    </p>
                </div>
                <button class="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mx-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    <span class="mx-1">Al carrito</span>
                </button>
                <button onclick="deletePost(${product.id})" style="background-color: rgb(220 38 38 / 1)" class="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 2a1 1 0 011-1h12a1 1 0 011 1v1h2a1 1 0 110 2h-1v13a2 2 0 01-2 2H5a2 2 0 01-2-2V4H2a1 1 0 110-2h2V2zM5 4h10v13H5V4z" />
                    </svg>
                    <span class="mx-1">Eliminar</span>
                </button>
            </div>
        `;
      container.innerHTML += productDiv;
    })

    productDiv_new = `<div class="bg-gray-800 rounded-lg flex flex-col items-center justify-center w-full max-w-lg mx-auto">
          <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                  <h2 class="block text-xl font-semibold text-center text-white">Añadir nueva bisicleta</h2>
              </div>
          </div>
          <a href="registerBike.html" class="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
              <span class="mx-1">+</span>
          </a>
      </div>`;

      container.innerHTML += productDiv_new;

  });

function sendForm() {
  const title = document.getElementById('title').value;
  const value = document.getElementById('value').value;
  const image = document.getElementById('image').value;
  const description = document.getElementById('description').value;

  const body = {
    title: title,
    description: description,
    price: value,
    imageUrl: image
  }

  fetch("https://api-mountainbikeworld.onrender.com/api/bikes", {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .then(res => {
      console.log("respuesta de la api", res);
      window.location.reload();
    })
}


function deletePost(id) {
  console.log('entro');
  fetch(`https://api-mountainbikeworld.onrender.com/api/bikes/${id}`, {
    method: "DELETE",
    headers: {},
  })
    .then(res => res.json())
    .then(res => {
      console.log(
        "respuesta de la api", res
      )
      location.reload();
    })
}
