'use client'
import Image from "next/image";
import Head from "next/head";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Container, AppBar, Toolbar, Typography, Button, Box, Grid } from "@mui/material";

export default function Home() {

  const handleSubmit = async (plan) => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plan }),
    });

    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <Container maxWidth="lg">
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      <AppBar position="static" sx={{ backgroundColor: '#004d00' }}> {/* Dark green */}
        <Toolbar>
          <Typography variant="h6" color="inherit">Flashcard SaaS</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <SignedOut>
            <Button color="inherit" href="/sign-in" sx={{ '&:hover': { backgroundColor: '#003d00' } }}>
              Login
            </Button>
            <Button color="inherit" href="/sign-up" sx={{ ml: 2, '&:hover': { backgroundColor: '#003d00' } }}>
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: "center", my: 6 }}>
        <Typography variant="h2" gutterBottom>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
          The easiest way to make flashcards from your text
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ 
            mt: 2, 
            backgroundColor: '#004d00', 
            '&:hover': { backgroundColor: '#003d00' } 
          }} 
          href="/generate" // Updated href
        >
          Get Started
        </Button>
      </Box>

      <Box sx={{ my: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 4,
                border: "1px solid",
                borderColor: "#d0d0d0", // Light grey
                borderRadius: 2,
                backgroundColor: '#f5f5f5', // Light grey background
                boxShadow: 2,
                minHeight: '200px', // Ensure all boxes are the same height
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Easy Text Input
              </Typography>
              <Typography>
                Simply input your text and let our software do the rest. Creating flashcards has never been easier.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 4,
                border: "1px solid",
                borderColor: "#d0d0d0", // Light grey
                borderRadius: 2,
                backgroundColor: '#f5f5f5', // Light grey background
                boxShadow: 2,
                minHeight: '200px', // Ensure all boxes are the same height
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Smart Flashcards
              </Typography>
              <Typography>
                Our AI intelligently breaks down your text into concise flashcards, perfect for studying.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 4,
                border: "1px solid",
                borderColor: "#d0d0d0", // Light grey
                borderRadius: 2,
                backgroundColor: '#f5f5f5', // Light grey background
                boxShadow: 2,
                minHeight: '200px', // Ensure all boxes are the same height
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Accessible Anywhere
              </Typography>
              <Typography>
                Access your flashcards from any device, at any time. Study on the go with ease.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Pricing
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 4,
                border: "1px solid",
                borderColor: "#d0d0d0", // Light grey
                borderRadius: 2,
                backgroundColor: '#f5f5f5', // Light grey background
                boxShadow: 2,
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Basic
              </Typography>
              <Typography variant="h6" gutterBottom>
                $5 / month
              </Typography>
              <Typography sx={{ mb: 2 }}>
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, backgroundColor: '#004d00', '&:hover': { backgroundColor: '#003d00' } }} // Dark green
                onClick={() => handleSubmit('basic')}
              >
                Choose Basic
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 4,
                border: "1px solid",
                borderColor: "#d0d0d0", // Light grey
                borderRadius: 2,
                backgroundColor: '#f5f5f5', // Light grey background
                boxShadow: 2,
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Pro
              </Typography>
              <Typography variant="h6" gutterBottom>
                $10 / month
              </Typography>
              <Typography sx={{ mb: 2 }}>
                Unlimited flashcards and storage, with priority support.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, backgroundColor: '#004d00', '&:hover': { backgroundColor: '#003d00' } }} // Dark green
                onClick={() => handleSubmit('pro')}
              >
                Choose Pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
