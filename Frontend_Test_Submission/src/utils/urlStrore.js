import { useState } from "react";
import { TextField, Button, Typography, Alert, Box } from "@mui/material";
import { saveURLMapping, isShortcodeAvailable } from "../utils/urlStore";
import logger from "../utils/logger";

function isValidShortcodeFormat(code) {
  return /^[a-zA-Z0-9]{4,10}$/.test(code);
}

export default function URLShortenerForm() {
  const [longUrl, setLongUrl] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [validity, setValidity] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const validateShortcode = () => {
    if (!shortcode) return true; // optional
    if (!isValidShortcodeFormat(shortcode)) {
      setError("Shortcode must be 4–10 alphanumeric characters.");
      return false;
    }
    if (!isShortcodeAvailable(shortcode)) {
      setError("Shortcode is already in use.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!longUrl.startsWith("http://") && !longUrl.startsWith("https://")) {
      setError("Please enter a valid URL (http:// or https://).");
      return;
    }

    if (!validateShortcode()) return;

    const minutes = parseInt(validity) || 30;
    const { success, shortCode, message } = saveURLMapping(longUrl, shortcode, minutes);

    if (success) {
      const generated = `${window.location.origin}/${shortCode}`;
      setShortUrl(generated);
      logger.info(`Short URL generated: ${generated}`);
    } else {
      setError(message);
      logger.error(message);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>URL Shortener</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          required
          label="Long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Custom Shortcode (optional)"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Validity in Minutes"
          type="number"
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Shorten URL
        </Button>
      </form>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {shortUrl && <Alert severity="success" sx={{ mt: 2 }}>Short URL: <a href={shortUrl}>{shortUrl}</a></Alert>}
    </Box>
  );
}
