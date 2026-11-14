"use client";

import { createContext, useContext, useState } from "react";
import SupernovaLoader from "./SupernovaLoader";

const LoaderContext = createContext({ isLoaded: false });

export const useAppLoader = () => useContext(LoaderContext);

const AppLoaderWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoaderContext.Provider value={{ isLoaded: !isLoading }}>
      {isLoading && (
        <SupernovaLoader onComplete={() => setIsLoading(false)} />
      )}
      <div style={{ opacity: isLoading ? 0.3 : 1, transition: "opacity 0.6s ease" }}>
        {children}
      </div>
    </LoaderContext.Provider>
  );
};

export default AppLoaderWrapper;
