document.getElementById('create-product-form').onsubmit = async function (event) {
    event.preventDefault();

    const requestData = {
        name: document.getElementById('product-name').value,
        price: document.getElementById('product-price').value,
        image_url: document.getElementById('product-image').value,
        stock: document.getElementById('product-stock').value,
        description: document.getElementById('product-description').value,
    };

    try {
        const response = await fetch('/api/products/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        window.location.href = '/admin/products?created=true';
    } catch (error) {
        document.getElementById('errorMessage').textContent = error.message;
    }
}