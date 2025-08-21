import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/cart/', {
                withCredentials: true
            });
            setCartItems(response.data.results || response.data);
            setCartCount(response.data.results ? response.data.results.length : response.data.length);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        try {
            const response = await axios.post('http://localhost:8000/api/cart/', {
                product_id: productId,
                quantity: quantity
            }, {
                withCredentials: true
            });

            await fetchCartItems();
            return { success: true };
        } catch (error) {
            console.error('Error adding to cart:', error);
            return { success: false, message: 'Failed to add item to cart' };
        }
    };

    const updateCartItem = async (itemId, quantity) => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/cart/${itemId}/`, {
                quantity: quantity
            }, {
                withCredentials: true
            });

            await fetchCartItems();
            return { success: true };
        } catch (error) {
            console.error('Error updating cart item:', error);
            return { success: false, message: 'Failed to update cart item' };
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            await axios.delete(`http://localhost:8000/api/cart/${itemId}/`, {
                withCredentials: true
            });

            await fetchCartItems();
            return { success: true };
        } catch (error) {
            console.error('Error removing from cart:', error);
            return { success: false, message: 'Failed to remove item from cart' };
        }
    };

    const clearCart = async () => {
        try {
            await axios.post('http://localhost:8000/api/cart/checkout/', {}, {
                withCredentials: true
            });

            setCartItems([]);
            setCartCount(0);
            return { success: true };
        } catch (error) {
            console.error('Error clearing cart:', error);
            return { success: false, message: 'Failed to clear cart' };
        }
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.total_price || 0), 0);
    };

    const value = {
        cartItems,
        cartCount,
        loading,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        getTotalPrice,
        fetchCartItems
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
