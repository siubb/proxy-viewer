import { useState } from 'react';

export default function Home() {
  const [inputUrl, setInputUrl] = useState('');
  const [proxyUrl, setProxyUrl] = useState('');

  const handleLoad = () => {
    if (!inputUrl.startsWith('http')) {
      alert('Please enter a valid URL');
      return;
    }
    setProxyUrl(`/api/proxy?url=${encodeURIComponent(inputUrl)}`);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🔗 Proxy Viewer</h1>
      <input
        type="text"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        placeholder="Enter URL to load"
        style={{ width: '60%', padding: '0.5rem' }}
      />
      <button onClick={handleLoad} style={{ marginLeft: '1rem' }}>
        Load
      </button>

      {proxyUrl && (
        <iframe
          src={proxyUrl}
          style={{ marginTop: '2rem', width: '100%', height: '600px', border: '1px solid #ccc' }}
        />
      )}
    </div>
  );
}
