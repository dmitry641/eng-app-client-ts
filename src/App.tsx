import React from "react";
import { AppComponent } from "./components/app/AppComponent";

const App: React.FC = () => {
  const app = { loading: false }; // FIXME

  return (
    <div>
      <AppComponent loading={app.loading} />
    </div>
  );
};

export default App;
