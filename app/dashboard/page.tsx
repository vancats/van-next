"use client";

import { useState } from "react";

export default function Page() {
  const [error, setError] = useState(false);
  const handleGetError = () => {
    setError(true);
  };
  return (
    <div>
      {error ? (
        <>Error()</>
      ) : (
        <button onClick={handleGetError}>Get Error</button>
      )}
    </div>
  );
}
