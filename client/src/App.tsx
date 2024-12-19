import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SocketProvider } from "./providers/SocketProvider";
import Home from "./pages/home";
import Room from "./pages/room";

function App() {
  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room" element={<Room />} />
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
}

export default App;
