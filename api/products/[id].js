import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
    const { query: { id } } = request;

    if (request.method === 'GET') {
        const product = await sql`SELECT * FROM products WHERE id = ${id};`;

        if (product.rows.length === 1) {
            return response.status(200).json({ product: product });
        } else {
            return response.status(404).json({ error: "商品が見つかりませんでした" });
        }
    } else {
        response.setHeader('Allow', ['GET']);
        return response.status(405).json({ error: `${request.method}メソッドは許可されていません` });
    }
}
