import { db } from '@vercel/postgres';
import { Customer } from '../lib/definitions';

const client = await db.connect();

async function insertCustomerData() {
    await client.sql `
    INSERT INTO customers (name, email, image_url) VALUES (
        'Cal Farrell', 'calfarrell7785@gmail.com', 'www.kissmyass.com'
    )
    on conflict(id) DO NOTHING;
    `;
}

export async function GET() {
    try {
        await client.sql`BEGIN`;
        await insertCustomerData();
        await client.sql`COMMIT`;

        return Response.json("Customer commit successful");
    }
    catch(error) {
        await client.sql`ROLLBACK`;
        return Response.json({error});
    }
}