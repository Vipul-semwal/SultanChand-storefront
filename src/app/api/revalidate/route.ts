import { revalidatePath } from 'next/cache'

export async function POST(req: Request) {
  try {
    const { countryCode, handle, secret } = await req.json()

    // Verify the secret for security
    if (secret !== process.env.REVALIDATE_SECRET) {
      return new Response('Unauthorized', { status: 401 })
    }

    // Construct the path for the specific book
    const path = `/${countryCode}/books/${handle}`

    // Revalidate only this book's page
     revalidatePath(path)

    return new Response(`Revalidated: ${path}`, { status: 200 })
  } catch (error) {
    return new Response('Error: ' + error, { status: 500 })
  }
}
