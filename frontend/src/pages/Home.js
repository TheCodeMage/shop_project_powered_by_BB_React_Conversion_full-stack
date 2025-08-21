import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Welcome to E-Commerce Store
            </Typography>
            <Typography variant="body1" gutterBottom>
                Browse our products and shop with confidence.
            </Typography>
            <Box sx={{ mt: 3 }}>
                <Button variant="contained" component={Link} to="/shop">
                    Shop Now
                </Button>
            </Box>
        </Box>
    );
};

export default Home;
