import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SocketProvider } from "./providers/SocketProvider";
import Room from "./pages/Room";
import Home from "./pages/Home";

function App() {
  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/session" element={<Room />} />
          <Route path="/session/:sessionId" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
}

export default App;
