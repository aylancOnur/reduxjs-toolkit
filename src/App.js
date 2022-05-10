import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Modal from "./components/modal";
import Tabs from "./layouts/tabs";
import ServiceStatus from "./pages/serviceStatus";
import Payment from "./pages/payment";

function App() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="bg-gradient-to-r from-cyan-800 to-slate-600 p-6 h-screen overflow-y-hidden">
      <Modal closeModal={closeModal} isOpen={isOpen} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Tabs openModal={openModal} />} />
          <Route path="/serviceStatus/:id" element={<ServiceStatus />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
