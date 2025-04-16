import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
import NavbarComponent from "./components/Navbar";
import TableView from "./views/TableView";
import CardView from "./views/CardView";

function App() {
  return (
    <HeroUIProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-950">
          <NavbarComponent />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<TableView />} />
              <Route path="/cards" element={<CardView />} />
            </Routes>
          </main>
        </div>
      </Router>
    </HeroUIProvider>
  );
}

export default App;
