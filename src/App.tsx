import { useState } from "react";

function App() {
  const [state, setState] = useState(0);
  return (
    <div>
      <div>Test: {state}</div>
      <div>
        <button onClick={() => setState((prev) => prev + 1)}>plus</button>
        <button onClick={() => setState((prev) => prev - 1)}>minus</button>
      </div>
    </div>
  );
}

export default App;
