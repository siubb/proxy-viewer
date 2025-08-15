import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [html, setHtml] = useState('');
  const [error, setError] = useState('');

  const fetchContent = async () => {
    setError('');
    setHtml('');
    try {
      const res = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`);
      if (!res.ok) {
        const errData = await res.json();
        setError(errData.error || 'Failed to fetch content');
        return;
      }
      const text = await res.text();
      setHtml(text);
    } catch (e) {
      setError('Network error or invalid URL');
    }
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
        {error ? (
          <pre style={{ color: 'red' }}>{error}</pre>
        ) : (
          <pre style={{ whiteSpace: 'pre-wrap' }}>{html}</pre>
        )}
      </div>
    </div>
  );
}