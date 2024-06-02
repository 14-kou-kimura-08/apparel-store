import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
    if (request.method === 'GET') {
        try {
            const products = await sql`SELECT * FROM products ORDER BY id DESC;`;
            return response.status(200).json({ products: products });
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    } else if (request.method === 'POST') {
        try {
            const { name, price, image_url, stock, description } = request.body;
            const product = await sql`
                INSERT INTO products (name, price, image_url, stock, description)
                VALUES (${name}, ${price}, ${image_url}, ${stock}, ${description})
                RETURNING *;
            `;
            return response.status(201).json({ product: product });
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    } else {
        response.setHeader('Allow', ['GET', 'POST']);
        return response.status(405).json({ error: `${request.method}メソッドは許可されていません` });
    }
}
