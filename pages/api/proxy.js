import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) return res.status(400).send('Missing URL');

  try {
    const response = await fetch(url);
    const contentType = response.headers.get('content-type');
    const body = await response.text();

    res.setHeader('Content-Type', contentType);
    res.status(200).send(body);
  } catch (error) {
    res.status(500).send('Error fetching URL');
  }
}
