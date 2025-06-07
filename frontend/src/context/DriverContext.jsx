import { createContext, useState, useContext } from "react";

export const DriverContextData = createContext();
// This is the context for driver data, which can be used to manage driver state across the application.


const DriverContext = ({ children }) => { 
    const [driver, setDriver] = useState(null);

    const[isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(null);

    const value = {
        driver, setDriver, isLoading, setIsLoading, error, setError
    }

    return (
        <DriverContextData.Provider value={value}>
            {children}
        </DriverContextData.Provider>
    );
}

export default DriverContext;