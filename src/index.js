import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './components/layout';
import { Footer } from './components/layout';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact'
import ProductList from './pages/admin/products/ProductList';
import CreateProduct from './pages/admin/products/CreateProducts';
import EditProduct from './pages/admin/products/EditProduct';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/admin/products" element={<ProductList />} />
      <Route path="/admin/products/create" element={<CreateProduct />} />
      <Route path="/admin/products/edit/:id" element={<EditProduct />} />

    </Routes>
    <Footer />
    </BrowserRouter>

  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
