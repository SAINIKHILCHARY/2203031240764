import React, { useState } from "react";

function URLShortenerForm() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!url.startsWith("http")) {
      alert("Please include https:// or http:// in your URL.");
      return;
    }

    const code = Math.random().toString(36).substring(2, 7);
    localStorage.setItem(code, url);
    setShortUrl(`${window.location.origin}/${code}`);
  };

  return (
    <div className="card">
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a full URL (e.g. https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <br />
        <button type="submit">Shorten</button>
      </form>
      {shortUrl && (
        <p>
          Shortened URL:{" "}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}

export default URLShortenerForm;
