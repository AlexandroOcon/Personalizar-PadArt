import axios from 'axios';
import { CartItem } from '../types';

const MERCADO_PAGO_PUBLIC_KEY = import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY;
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const createPreference = async (items: CartItem[]) => {
  try {
    const response = await axios.post(`${API_URL}/create-preference`, {
      items: items.map(item => ({
        title: item.product.name,
        unit_price: item.totalPrice,
        quantity: item.quantity,
        currency_id: 'ARS',
        description: JSON.stringify(item.customizations)
      }))
    });
    
    return response.data.preferenceId;
  } catch (error) {
    console.error('Error creating preference:', error);
    throw error;
  }
};