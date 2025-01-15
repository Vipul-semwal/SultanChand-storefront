
// so ican access the categoires from client side
import { listCategories } from '@lib/data/categories';

export async function GET(req: Request) {
  try {
    const categories = await listCategories();
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch categories' }), { status: 500 });
  }
}
