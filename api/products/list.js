import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
    if (request.method === 'GET') {
        try {
            const products = await sql`SELECT * FROM products ORDER BY id DESC;`;
            return response.status(200).json({ products: products });
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    } else {
        response.setHeader('Allow', ['GET']);
        return response.status(405).json({ error: `${request.method}メソッドは許可されていません` });
    }
}
