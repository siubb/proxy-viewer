import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [html, setHtml] = useState('');

  const fetchContent = async () => {
    const res = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`);
    const text = await res.text();
    setHtml(text);
  };

  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
        style={{ width: '300px' }}
      />
      <button onClick={fetchContent}>Fetch</button>
      <div style={{ marginTop: '20px' }}>
        <h2>Page HTML:</h2>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{html}</pre>
      </div>
    </div>
  );
}
