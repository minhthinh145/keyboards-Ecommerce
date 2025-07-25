import { use, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import { FeaturedProducts } from './components/FeaturedProducts.jsx';
import { ThemeProvider } from './contexts/Themecontext.jsx';
import { Catogories } from './components/Categories.jsx';
import { Footer } from './components/Footer.jsx';
import { ProductsDetails } from './pages/ProductDetails.jsx';
import { Products } from './pages/Products.jsx';
import './index.css';
import { Signin } from './pages/SignIn.jsx';
import { Outlet } from 'react-router-dom';
import { SignUp } from './pages/SignUp.jsx';
import { ToastProvider } from './contexts/ToastContext.jsx';
import { UserProfile } from './pages/UserProfile.jsx';
import { ErrorPages } from './pages/404Error.jsx';
import { Loading } from './pages/Loading.jsx';
import { OtpPopup } from './components/form/PasswordComponent/OtpPopup.jsx';
import { CartComponent } from './components/Cart/CartComponent.jsx';
import { CartPage } from './pages/CartPage.jsx';
import { PaymentPage } from './pages/Payment.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { fetchProfile } from './redux/slice/authSlice.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      dispatch(fetchProfile(accessToken)); // Lấy thông tin người dùng sau khi đăng nhập
    }
  }, [dispatch]);
  const products = [
    {
      id: 1,
      name: 'Mechanical RGB Keyboard',
      price: 159.99,
      image: 'https://images.unsplash.com/photo-1563191911-e65f8655ebf9',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Wireless Gaming Keyboard',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1595225476474-87563907a212',
      rating: 4.3,
    },
    {
      id: 3,
      name: 'Ergonomic Professional Keyboard',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1563191911-e65f8655ebf9',
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Compact 60% Keyboard',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1595225476474-87563907a212',
      rating: 4.2,
    },
  ];

  const categories = [
    { name: 'Mechanical', icon: '⌨️' },
    { name: 'Gaming', icon: '🎮' },
    { name: 'Wireless', icon: '📡' },
    { name: 'Ergonomic', icon: '🔋' },
  ];
  const toggleDarkMode = () => {
    console.log('Dark mode toggled');
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <>
      <ToastProvider>
        <Router>
          <ThemeProvider>
            <Routes>
              {/* Layout có Header/Footer */}
              <Route
                element={
                  <div
                    className={`min-h-screen ${
                      isDarkMode ? 'dark' : ''
                    } bg-white dark:bg-gray-900 transition-colors dark:text-white duration-300`}
                  >
                    <Header
                      isDarkMode={isDarkMode}
                      toggleDarkMode={toggleDarkMode}
                      isMenuOpen={isMenuOpen}
                      setIsMenuOpen={setIsMenuOpen}
                      cartCount={cartCount}
                    />
                    <Outlet />
                    <Footer />
                  </div>
                }
              >
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
                <Route path="/product/:id" element={<ProductsDetails />} />
                <Route path="/products" element={<Products />} />
                <Route path="/userprofile" element={<UserProfile />} />
                <Route path="/404" element={<ErrorPages />} />
                <Route path="/otp" element={<OtpPopup />} />
                <Route path="/cart" element={<CartPage />} />

                {/* Fallback */}
              </Route>
              {/* Layout KHÔNG có Header/Footer */}
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/loading" element={<Loading />} />
              <Route path="/payment/:orderId" element={<PaymentPage />} />
              <Route path="/payment" element={<PaymentPage />} />{' '}
            </Routes>
          </ThemeProvider>
        </Router>
      </ToastProvider>
    </>
  );
}

export default App;
