import React from 'react';
import { Container, Typography, Paper, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const IndexPage = () => {
  return (
    <Container maxWidth="lg" className="min-h-screen pt-12">
      <Box className="relative overflow-hidden">

        <div className="bg-cover bg-center h-[500px] relative before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r from-purple-500 to-pink-500 before:opacity-60" style={{ backgroundImage: 'url(/path-to-hero-image.jpg)' }}>
          <div className="flex flex-col justify-center items-center h-full relative z-10 text-center text-white">
            <Typography variant="h3" component="h1" className="mb-3">
              Embrace Your Fitness Journey
            </Typography>
            <Typography variant="h6" className="mb-3 px-2">
              Join to track and improve your health and fitness.
            </Typography>
            <Link to="/register" className="mt-4">
              <Button variant="contained" color="secondary" className="bg-gradient-to-r from-green-400 to-blue-500">
                Get Started
              </Button>
            </Link>
            <Link to="/login" className="mt-2">
              <Button variant="contained" color="secondary" className="bg-gradient-to-r from-green-400 to-blue-500">
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </Box>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        {featureData.map((feature, index) => (
          <Paper key={index} className="p-4 hover:scale-105 transition-transform duration-300">
            <Typography variant="h5" component="h3" className="font-bold mb-2">
              {feature.title}
            </Typography>
            <Typography variant="body1">
              {feature.description}
            </Typography>
          </Paper>
        ))}
      </div>

    </Container>
  );
};

const featureData = [
  {
    title: 'Nutrition Tracking',
    description: 'Log your meals and track calories and nutrients to meet your health goals.'
  },
  {
    title: 'Activity Monitoring',
    description: 'Record your daily activities and workouts to monitor your progress.'
  },
  {
    title: 'Progress Visualization',
    description: 'See your achievements with interactive charts and set new fitness goals.'
  }
];

export default IndexPage;
