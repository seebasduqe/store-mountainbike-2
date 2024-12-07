const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('product_id');

const host = 'http://localhost:5000' //'https://api-mountainbikeworld.onrender.com';
fetch(`${host}/api/bikes/${productId}`, {
    method: "GET",
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwLCJlbWFpbCI6InMuZHVxdWVAdXRwLmVkdS5jbyIsImlhdCI6MTcyNzQ3MDkwOSwiZXhwIjoxNzQ0NzUwOTA5fQ.LquNxNAn0Go149_lyKDbMc10QE2J60K_OQTLXkG_b3w"
    }
})
    .then(response => response.json())
    .then(data => {
        document.getElementById('title').value = data.title;
        document.getElementById('value').value = data.price;
        document.getElementById('image').value = data.imageUrl;
        document.getElementById('description').value = data.description;
    }
    );


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

    
    fetch(`${host}/api/bikes/${productId}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(res => {
            console.log("respuesta de la api", res);
            window.location.href = "http://127.0.0.1:5500/src/html/bikes.html";
        })
}