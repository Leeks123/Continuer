import { useState, useEffect } from 'react';

function getWindowWidth() {
  const { innerWidth: width } = window;
  return width;
}
function getWindowHeight() {
    const { innerHeight: height } = window;
    return height;
}

function useWindowWidth():number {
    const [windowWidth, setWindowWidth] = useState<number>(getWindowWidth());

  useEffect(() => {
    function handleResize() {
      setWindowWidth(getWindowWidth());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
}

function useWindowHeight():number {
    const [windowHeight, setWindowHeight] = useState<number>(getWindowHeight());

  useEffect(() => {
    function handleResize() {
      setWindowHeight(getWindowHeight());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowHeight;
}

export { useWindowWidth, useWindowHeight}