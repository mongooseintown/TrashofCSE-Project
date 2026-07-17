import React from 'react';
import { Wrench } from 'lucide-react';

const Home = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#000000',
      color: '#ffffff',
      fontFamily: 'Inter, sans-serif',
      textAlign: 'center',
      padding: '20px'
    }}>
      <Wrench size={64} style={{ marginBottom: '20px', color: '#ff5b22' }} />
      <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', letterSpacing: '-0.5px' }}>Under Construction</h1>
      <p style={{ fontSize: '1.2rem', color: '#aaaaaa', maxWidth: '500px' }}>
        We are working on bringing something new and creative. Check back soon!
      </p>
    </div>
  );
};

export default Home;
