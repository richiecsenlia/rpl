const API_ENDPOINT = 'https://courageous-basbousa-3ef9e8.netlify.app/.netlify/functions/token';

export default async (request, context) => {
    let body = await request.json()
    console.log(body)
    console.log(body['harga'])
  try {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    return Response.json({ data });
  } catch (error) {
    console.log(error);
    return Response.json({ error: 'Failed fetching data' }, { status: 500 });
  }
};