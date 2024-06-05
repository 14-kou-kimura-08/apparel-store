import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
    if (request.method === 'GET') {
        try {
            // sql関数を使って、productsテーブルから全ての商品を取得し、変数productsに代入する
            // 使用するSQL文は「SELECT * FROM products ORDER BY id DESC;」
            const products = await sql`SELECT * FROM products ORDER BY id DESC;`;

            // ステータスコード200でJSON形式のレスポンスを返す
            // JSON形式のレスポンスの中身は{ products: products }とする
            return response.status(200).json({ products: products });
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    } else if (request.method === 'POST') {
        // Day2で実装します
    } else {
        response.setHeader('Allow', ['GET', 'POST']);
        return response.status(405).json({ error: `${request.method}メソッドは許可されていません` });
    }
}
