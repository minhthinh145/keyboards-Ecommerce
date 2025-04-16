
import { useState } from 'react';
import"./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Header} from "./components/Header.jsx";
import { Hero } from "./components/Hero.jsx";
import { FeaturedProducts } from './components/FeaturedProducts.jsx';
import { ThemeProvider } from "./contexts/Themecontext.jsx";
import { Catogories } from './components/Categories.jsx';
import { Footer } from './components/Footer.jsx';
import { ProductsDetails } from "./components/pages/ProductDetails.jsx";
import { Products } from "./components/pages/Products.jsx";
import "./index.css";
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const products = [
    {
      id: 1,
      name: "Mechanical RGB Keyboard",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1563191911-e65f8655ebf9",
      rating: 4.5
    },
    {
      id: 2,
      name: "Wireless Gaming Keyboard",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1595225476474-87563907a212",
      rating: 4.3
    },
    {
      id: 3,
      name: "Ergonomic Professional Keyboard",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1563191911-e65f8655ebf9",
      rating: 4.7
    },
    {
      id: 4,
      name: "Compact 60% Keyboard",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1595225476474-87563907a212",
      rating: 4.2
    }
  ];

  const categories = [
    { name: "Mechanical", icon: "⌨️" },
    { name: "Gaming", icon: "🎮" },
    { name: "Wireless", icon: "📡" },
    { name: "Ergonomic", icon: "🔋" }
  ];
  const toggleDarkMode = () => {
    console.log("Dark mode toggled");
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return <>
  <Router>
    <ThemeProvider>
       <div className={`min-h-screen ${isDarkMode ? "dark" : ""} bg-white dark:bg-gray-900 transition-colors dark:text-white duration-300`}>
        <Header
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen}
          cartCount={cartCount}
        />
        
        <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <FeaturedProducts products={products} />
                  <Catogories categories={categories} />
                </>
              }
            />
            <Route path="/product" element={<ProductsDetails />} 
            />
            <Route path="/products" element={<Products />} />
            
          </Routes>
      </div>
      <Footer />
      </ThemeProvider>
    </Router>
  </>;
}

export default App
