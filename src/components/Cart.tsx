import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Trash2, MinusCircle, PlusCircle, Send } from 'lucide-react';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useStore();
  const [email, setEmail] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.totalPrice * item.quantity,
    0
  );

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this to your backend
    // For now, we'll just show a success message
    console.log('Order submitted:', {
      email,
      cart,
      total
    });
    setOrderSubmitted(true);
    clearCart();
  };

  const renderCustomization = (type: string, value: any) => {
    if (type === 'customValues') {
      return Object.entries(value).map(([key, val]) => {
        if (key === 'color') {
          return (
            <div key={key} className="flex items-center gap-2">
              <span className="text-gray-300">Custom Color:</span>
              <div
                className="w-4 h-4 rounded-full border border-gray-600"
                style={{ backgroundColor: val }}
              />
            </div>
          );
        }
        if (key === 'keycapsColor') {
          return (
            <div key={key} className="flex items-center gap-2">
              <span className="text-gray-300">Keycaps Color:</span>
              <div
                className="w-4 h-4 rounded-full border border-gray-600"
                style={{ backgroundColor: val }}
              />
            </div>
          );
        }
        if (key === 'image') {
          return (
            <div key={key} className="flex items-center gap-2">
              <span className="text-gray-300">Custom Image:</span>
              <img
                src={val.url}
                alt="Custom design"
                className="w-8 h-8 object-cover rounded"
              />
            </div>
          );
        }
        return null;
      });
    }
    return <span className="text-gray-300">{`${type}: ${value}`}</span>;
  };

  if (orderSubmitted) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4 text-white">¡Gracias por tu orden!</h2>
        <p className="text-gray-300">Te enviaremos los detalles por email.</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4 text-white">Tu carrito está vacío</h2>
        <p className="text-gray-300">¡Comienza agregando productos personalizados!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Carrito de Compras</h2>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.product.id}
            className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center gap-4 border border-gray-700"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-white">{item.product.name}</h3>
              <div className="text-sm text-gray-400">
                {Object.entries(item.customizations).map(([type, value]) => (
                  <div key={type}>{renderCustomization(type, value)}</div>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, Math.max(1, item.quantity - 1))
                    }
                  >
                    <MinusCircle size={20} className="text-gray-400 hover:text-white" />
                  </button>
                  <span className="w-8 text-center text-white">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                  >
                    <PlusCircle size={20} className="text-gray-400 hover:text-white" />
                  </button>
                </div>
                <div className="flex-1 text-right text-white">
                  ${(item.totalPrice * item.quantity).toFixed(2)}
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
        <div className="text-2xl font-bold mb-6 text-white">
          Total: ${total.toFixed(2)}
        </div>
        <form onSubmit={handleSubmitOrder} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email para recibir los detalles del pedido
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="tu@email.com"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Send size={20} />
            Enviar Pedido
          </button>
        </form>
      </div>
    </div>
  );
};