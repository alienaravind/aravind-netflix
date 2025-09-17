import { createRoot } from "react-dom/client";
import Body from "./components/Body";

const App = () => {
  return (
    <div>
      <Body />
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
