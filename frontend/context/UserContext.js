import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [refreshVehicles, setRefreshVehicles] = useState(false); 

    return (
        <UserContext.Provider value={{ user, setUser, refreshVehicles, setRefreshVehicles }}>
            {children}
        </UserContext.Provider>
    );
};