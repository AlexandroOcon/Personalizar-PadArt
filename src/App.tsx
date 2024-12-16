import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ShoppingCart, Keyboard } from 'lucide-react';
import { products } from './data/products';
import { ProductCard } from './components/ProductCard';
import { CustomizeProduct } from './components/CustomizeProduct';
import { Cart } from './components/Cart';
import { useStore } from './store/useStore';

function App() {
  const cart = useStore((state) => state.cart);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900">
        <nav className="bg-gray-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link
                  to="/"
                  className="flex items-center gap-2 font-bold text-xl text-white"
                >
                  <Keyboard className="text-blue-400" />
                  Padart
                </Link>
              </div>
              <div className="flex items-center">
                <Link
                  to="/cart"
                  className="flex items-center gap-2 text-gray-300 hover:text-white"
                >
                  <ShoppingCart />
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cart.length}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-4 text-white">
                      Periféricos Personalizados
                    </h1>
                    <p className="text-gray-400">
                      Personaliza tu setup gaming perfecto con nuestros
                      periféricos premium
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              }
            />
            <Route
              path="/customize/:productId"
              element={<CustomizeProduct />}
            />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
