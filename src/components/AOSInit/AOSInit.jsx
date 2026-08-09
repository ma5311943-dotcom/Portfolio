"use client";

import { useEffect } from "react";
import AOS from "aos";

const AOSInit = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      offset: 100,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });
  }, []);

  return null;
};

export default AOSInit;
