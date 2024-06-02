window.onload = async function () {
    try {
        const response = await fetch('/api/products/list', {
            method: 'GET',
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        const products = document.getElementById('products');
        products.innerHTML = '';

        data.products.rows.forEach(product => {
            const row = `
                <a href="/details?id=${product.id}" class="product-card">
                    <img src="${product.image_url}" alt="${product.name}">
                    <div class="product-info">
                        <h2>${product.name}</h2>
                        <p>${product.price}円(税込)</p>
                    </div>
                </a>`;
            products.innerHTML += row;
        });
    } catch (error) {
        document.getElementById('errorMessage').textContent = error.message;
    }
};
