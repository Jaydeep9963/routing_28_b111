import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemDetails from "./ItemDetail";
import ItemList from "./ItemList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/item/:itemId" element={<ItemDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
