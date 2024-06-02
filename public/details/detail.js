window.onload = async function () {
    const queryParams = new URLSearchParams(window.location.search);
    const productId = queryParams.get('id');

    try {
        const response = await fetch(`/api/products/${productId}`, {
            method: 'GET',
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        const detail = document.getElementById('product-detail');
        detail.innerHTML = `
            <img src="${data.product.rows[0].image_url}" alt="${data.product.rows[0].name}" class="product-image">
            <div class="product-info">
                <h1 class="product-name">${data.product.rows[0].name}</h1>
                <p class="product-price">${data.product.rows[0].price}円(税込)</p>
                <div class="button-container">
                    <button id="purchase-button">購入する</button>
                </div>
                <p class="product-description">${data.product.rows[0].description}</p>
            </div>
        `;

        purchase(productId);
    } catch (error) {
        document.getElementById('errorMessage').textContent = error.message;
    }
};

function purchase(productId) {
    document.getElementById('purchase-button').onclick = async function (event) {
        event.preventDefault();
        const quantity = 1;

        try {
            const response = await fetch('/api/purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, quantity })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error);
            }

            window.location.href = '/thanks';
        } catch (error) {
            document.getElementById('errorMessage').textContent = error;
        }
    };
}


