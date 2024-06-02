window.onload = async function () {
    const queryParams = new URLSearchParams(window.location.search);
    const isCreated = queryParams.get('created');
    const isDeleted = queryParams.get('deleted');
    if (isCreated) {
        document.getElementById('message').textContent = '新規作成できました';
    }

    if (isDeleted) {
        document.getElementById('message').textContent = '削除しました';
    }

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
                <tr>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td><img src="${product.image_url}" width="100" height="100"></td>
                    <td>${product.stock}</td>
                    <td><a href="/admin/products/edit?id=${product.id}" class="edit-button">編集</a></td>
                </tr>`;
            products.innerHTML += row;
        });
    } catch (error) {
        document.getElementById('errorMessage').textContent = error.message;
    }
};
