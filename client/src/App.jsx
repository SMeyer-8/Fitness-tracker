import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [healthMessage, setHealthMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function checkAPIHealth() {
      try {
        const response = await fetch("/api/health");
        const result = await response.json();
        setHealthMessage(result);
      } catch (error) {
        setError(error);
      }
    }
    checkAPIHealth();
  }, []);

  return (
    <>
    {error && <p>{JSON.stringify(error, null, 2)}</p>} 
    {healthMessage && <p>{healthMessage}</p>}
    </>;
  );
}

export default App;
