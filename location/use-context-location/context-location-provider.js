
import  { createContext, useState, useEffect, useContext } from 'react';

const AuthLocationContext  = createContext();


const ContextLocationProvider = ({ children }) => {

  
  return (
    <>
    <AuthLocationContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthLocationContext.Provider>
    </>
  )
}

const useLocationProvider = () => {
    return useContext(AuthLocationContext);
  };


export {  ContextLocationProvider, useLocationProvider }
