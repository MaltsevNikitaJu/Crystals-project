import React, { useState, useEffect } from 'react';
import { Fab, useScrollTrigger, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Zoom in={visible}>
      <Fab
        size="medium"
        onClick={handleClick}
        sx={{ position: 'fixed', bottom: 16, right: 16, backgroundColor: '#D8C1B4'}}
        aria-label="scroll back to top"
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTopButton;
