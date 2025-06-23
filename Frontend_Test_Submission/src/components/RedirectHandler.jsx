import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function RedirectHandler() {
  const { shortcode } = useParams();

  useEffect(() => {
    const storedUrl = localStorage.getItem(shortcode);

    if (storedUrl) {
      window.location.href = storedUrl; // ✅ actual redirect
    } else {
      alert("Shortcode not found or expired.");
    }
  }, [shortcode]);

  return <p>Redirecting...</p>;
}

export default RedirectHandler;
