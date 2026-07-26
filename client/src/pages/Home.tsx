import { useEffect, useState } from "react";

function Home() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://127.0.0.1:8000")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      });
  }, []);

  return (
    <main>
      <h1>{message}</h1>
    </main>
  );
}

export default Home;