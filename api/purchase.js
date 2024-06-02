import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
    if (request.method === 'POST') {
        const { productId, quantity } = request.body;

        try {
            await sql`BEGIN`;

            const updateStocksResult = await sql`
                UPDATE products 
                SET stock = stock - ${quantity} 
                WHERE id = ${productId}
                RETURNING stock;
            `;

            // TODO: 演習で使うので削除する
            if (updateStocksResult.rows.length === 0 || updateStocksResult.rows[0].stock < 0) {
                throw new Error('在庫が不足しています');
            }

            const addOrderResult = await sql`
                INSERT INTO orders (product_id, quantity, order_date) 
                VALUES (${productId}, ${quantity}, NOW()) 
                RETURNING *;
            `;

            await sql`COMMIT`;

            return response.status(201).json({ order: addOrderResult.rows[0] });
        } catch (error) {
            await sql`ROLLBACK;`
            return response.status(500).json({ error: error.message });
        }
    } else {
        response.setHeader('Allow', ['POST']);
        return response.status(405).json({ error: `${request.method}メソッドは許可されていません` });
    }
}
