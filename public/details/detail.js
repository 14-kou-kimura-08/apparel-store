window.onload = async function () {
    const queryParams = new URLSearchParams(window.location.search);
    const productId = queryParams.get('id');

    try {
        // /api/products/:id に GET リクエストを送信し、定数responseに代入する
        const response = await fetch(`/api/products/${productId}`, {
            method: 'GET',
        });

        // 定数resuponseをJSON形式に変換し、定数dataに代入する
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        // HTMLでid属性がproduct-detailの要素を取得し、変数detailに代入する
        const detail = document.getElementById('product-detail');

        // 変数detailのinnerHTMLプロパティを空文字にする
        detail.innerHTML = '';

        // 変数detailのinnerHTMLプロパティにHTMLの文字列を追加する
        detail.innerHTML = `
            <img src="${data.product.rows[0].image_url}" alt="${data.product.rows[0].name}" class="product-image">
            <div class="product-info">
                <h1 class="product-name">${data.product.rows[0].name}</h1>
                <p class="product-price">${data.product.rows[0].price}円(税込)</p>
                <p class="product-description">${data.product.rows[0].description}</p>
            </div>
        `;

    } catch (error) {
        document.getElementById('errorMessage').textContent = error.message;
    }
};

document.getElementById('purchase-button').onclick = async function (event) {
    event.preventDefault();
    const queryParams = new URLSearchParams(window.location.search);
    const productId = queryParams.get('id');
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


