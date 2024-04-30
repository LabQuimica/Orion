"use client"
import React, { useState, useEffect } from 'react';
import { AspectRatio, CssVarsProvider, Sheet, Typography} from "@mui/joy";

export default function ImgMantenimiento() {
  const lightModeImage = '/construccion.jpeg';
  const darkModeImage = '/construccion3.png';

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const matchDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(matchDarkMode);
  }, []);  
  const imageSrc = isDarkMode ? darkModeImage : lightModeImage;

  return (
    <CssVarsProvider>
      <div style={{ position: 'relative', textAlign: 'center' }}>
        <Sheet
          sx={{
            position: 'relative',
            width: '45%', 
            margin: '0 auto', 
            backgroundColor: 'transparent'
          }}
        >
          <img
            src={imageSrc}
            alt="Descripción"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </Sheet>
      </div>
    </CssVarsProvider>
  );
}
