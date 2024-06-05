import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
    const { query: { id } } = request;

    if (request.method === 'GET') {
        try {
            // sql関数を使って、productsテーブルからidが一致する商品を取得し、変数productに代入する
            // 使用するSQL文は「SELECT * FROM products WHERE id = ${id};」
            const product = await sql`SELECT * FROM products WHERE id = ${id};`;

            // 変数productのrowsプロパティの要素数が1の場合、ステータスコード200でJSON形式のレスポンスを返す
            // JSON形式のレスポンスの中身は{ product: product }とする
            // それ以外の場合、ステータスコード404でJSON形式のレスポンスを返す
            // JSON形式のレスポンスの中身は{ error: "商品が見つかりませんでした" }とする
            if (product.rows.length === 1) {
                return response.status(200).json({ product: product });
            } else {
                return response.status(404).json({ error: "商品が見つかりませんでした" });
            }
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    } else if (request.method === 'PUT') {
        // Day2で実装します
    } else if (request.method === 'DELETE') {
        // Day2で実装します
    } else {
        response.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return response.status(405).json({ error: `${request.method}メソッドは許可されていません` });
    }
}
