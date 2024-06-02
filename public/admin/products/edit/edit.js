// ページが完全に読み込まれた後に実行される関数
window.onload = async function() {
    // URLパラメータから商品IDを取得する
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    try {
        const response = await fetch(`/api/products/${productId}`, {
            method: 'GET',
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        const product = data.product.rows[0];

        // フォームにデータを設定する
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-image').value = product.image_url;
        document.getElementById('product-stock').value = product.stock;
        document.getElementById('product-description').value = product.description;
    } catch (error) {
        document.getElementById('errorMessage').textContent = error.message;
    }
};

document.getElementById('edit-product-form').onsubmit = async function (event) {
    event.preventDefault();
    document.getElementById('message').textContent = '';

    // URLからクエリパラメータを取得する
    const queryParams = new URLSearchParams(window.location.search);
    const productId = queryParams.get('id'); // 'id'パラメータを取得

    const requestData = {
        name: document.getElementById('product-name').value,
        price: document.getElementById('product-price').value,
        image_url: document.getElementById('product-image').value,
        stock: document.getElementById('product-stock').value,
        description: document.getElementById('product-description').value,
    };

    try {
        const response = await fetch(`/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        document.getElementById('message').textContent = '更新できました';
    } catch (error) {
        document.getElementById('errorMessage').textContent = error.message;
    }
};

document.getElementById('delete-button').onclick = async function () {
    // URLからクエリパラメータを取得する
    const queryParams = new URLSearchParams(window.location.search);
    const productId = queryParams.get('id'); // 'id'パラメータを取得

    try {
        const response = await fetch(`/api/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        window.location.href = '/admin/products?deleted=true';
    } catch (error) {
        document.getElementById('errorMessage').textContent = error.message;
    }
}