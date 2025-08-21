import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    TextField,
    CircularProgress,
    Alert
} from '@mui/material';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8000/api/products/${id}/`);
            setProduct(response.data);
        } catch (error) {
            setError('Failed to load product');
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        try {
            const result = await addToCart(product.id, quantity);
            if (result.success) {
                setSuccessMessage('Product added to cart successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    if (!product) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography>Product not found</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="400"
                            image={product.image_url || 'https://via.placeholder.com/400'}
                            alt={product.name}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h4" gutterBottom>
                                {product.name}
                            </Typography>
                            <Typography variant="h6" color="primary" gutterBottom>
                                ${product.price}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {product.description}
                            </Typography>
                            {product.category && (
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Category: {product.category.name}
                                </Typography>
                            )}

                            {successMessage && (
                                <Alert severity="success" sx={{ mb: 2 }}>
                                    {successMessage}
                                </Alert>
                            )}

                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 3 }}>
                                <TextField
                                    type="number"
                                    label="Quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    inputProps={{ min: 1 }}
                                    sx={{ width: 100 }}
                                />
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={handleAddToCart}
                                >
                                    Add to Cart
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductDetail;
