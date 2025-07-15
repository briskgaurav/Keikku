"use client"
import { useState, useEffect } from 'react';

const UseTablet = (minBreakpoint = 760, maxBreakpoint = 1025) => {
  const [isTablet, setIsTablet] = useState(
    globalThis.innerWidth >= minBreakpoint && globalThis.innerWidth <= maxBreakpoint
  );

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(
        globalThis.innerWidth >= minBreakpoint && globalThis.innerWidth <= maxBreakpoint
      );
    };

    globalThis.addEventListener('resize', handleResize);
    return () => globalThis.removeEventListener('resize', handleResize);
  }, [minBreakpoint, maxBreakpoint]);

  return isTablet;
};

export default UseTablet;