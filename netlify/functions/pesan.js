const API_ENDPOINT = 'https://courageous-basbousa-3ef9e8.netlify.app/.netlify/functions/token';

export default async (request, context) => {
    let body = await request.json()
    let sum = 0
    for(let i = 0;i<body['harga'].length();i++){
        sum = sum + body['harga'][i]
    }
    console.log(body)
    console.log(body['harga'])
    console.log(API_ENDPOINT+"?totalHarga="+sum)
  try {
    const response = await fetch(API_ENDPOINT+"?totalHarga="+sum);
    const data = await response.json();
    return Response.json({ data });
  } catch (error) {
    console.log(error);
    return Response.json({ error: 'Failed fetching data' }, { status: 500 });
  }
};