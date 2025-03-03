import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("Hi Archana"); // Default message
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `jsDelivr_url`;
    script.async = true;

    script.onload = () => {
      console.log("Script detected!");
      setScriptLoaded(true);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== "https://cdn-test-five.vercel.app") return;

      if (event.data.type === "DATA_RESPONSE") {
        console.log("Iframe received data:", event.data.message);
        setMessage(scriptLoaded ? event.data.message : "Hi Archana");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [scriptLoaded]);

  const requestDataFromParent = () => {
    console.log("Iframe requesting data from parent...");
    window.parent.postMessage({ type: "REQUEST_DATA" }, "https://cdn-test-five.vercel.app");
  };

  return (
    <div className="iframe-container">
      <div className="iframe-card">
        <p className="success-message">{message}</p>
        <button onClick={requestDataFromParent} className="btn">
          Request Data from Parent
        </button>
      </div>
    </div>
  );
}

export default App;
