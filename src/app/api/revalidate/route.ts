import { revalidatePath } from 'next/cache'


const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*"  // You can restrict this to your domain

export async function OPTIONS() {
  console.log('CORS preflight request received')
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}

export async function POST(req: Request) {
  console.log('Revalidation request received')
  try {
    const path = `/${'in'}/books`
    revalidatePath(path)

    return new Response(`Revalidated: ${path}`, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      },
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return new Response('Error: ' + error, {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      },
    })
  }
}


// export async function POST(req: Request) {
//   try {
//     const { countryCode, handle, secret } = await req.json()

//     // Verify the secret for security
//     if (secret !== process.env.REVALIDATE_SECRET) {
//       return new Response('Unauthorized', { status: 401 })
//     }

//     // Construct the path for the specific book
//     const path = `/${countryCode}/books/${handle}`

//     // Revalidate only this book's page
//      revalidatePath(path)

//     return new Response(`Revalidated: ${path}`, { status: 200 })
//   } catch (error) {
//     return new Response('Error: ' + error, { status: 500 })
//   }
// }
