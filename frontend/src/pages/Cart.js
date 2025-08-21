import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Typography as Text,
    Divider,
    CircularProgress,
    Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
    const { cartItems, cartCount, loading, removeFromCart, clearCart, getTotalPrice } = useCart();

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (cartItems.length === 0) {
        return (
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Your Cart is Empty
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Add some products to your cart to see them here.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Shopping Cart ({cartCount} items)
            </Typography>

            <Grid container spacing={3}>
                {cartItems.map((item) => (
                    <Grid item xs={12} key={item.id}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} sm={2}>
                                        <CardMedia
                                            component="img"
                                            height="80"
                                            image={item.product.image_url || 'https://via.placeholder.com/80'}
                                            alt={item.product.name}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="h6">
                                            {item.product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            ${item.product.price}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Typography variant="body2">
                                            Quantity: {item.quantity}
                                        </Typography>
                                        <Typography variant="body2">
                                            Total: ${item.total_price || 0}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <IconButton
                                            color="error"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>
                    Total: ${getTotalPrice()}
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={clearCart}
                    sx={{ mr: 2 }}
                >
                    Clear Cart
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => alert('Proceed to checkout')}
                >
                    Proceed to Checkout
                </Button>
            </Box>
        </Box>
    );
};

export default Cart;
