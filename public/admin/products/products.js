window.onload = async function () {
    try {
        // /api/products/list に GET リクエストを送信し、定数responseに代入する
        const response = await fetch('/api/products/list', {
            method: 'GET',
        });

        // 定数resuponseをJSON形式に変換し、定数dataに代入する
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        // HTMLでid属性がproductsの要素を取得し、変数productsに代入する
        const products = document.getElementById('products');

        // 変数productsのinnerHTMLプロパティを空文字にする
        products.innerHTML = '';

        // 定数dataのproductsプロパティのrowsプロパティの要素数分繰り返す
        data.products.rows.forEach(product => {
            // 変数rowにHTMLの文字列を代入する
            const row = `
                <tr>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td><img src="${product.image_url}" width="100" height="100"></td>
                    <td>${product.stock}</td>
                    <td><a href="/admin/products/edit?id=${product.id}" class="edit-button">編集</a></td>
                </tr>`;
            
            // 変数productsのinnerHTMLプロパティに変数rowを追加する
            products.innerHTML += row;
        });
    } catch (error) {
        document.getElementById('errorMessage').textContent = error.message;
    }
};
