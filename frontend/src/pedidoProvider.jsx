import React, { createContext, useState } from 'react';

export const PedidoContext = createContext();

export const PedidoProvider = ({ children }) => {
    const [ pedido, setPedido ] = useState([]);

    return (
        <PedidoContext.Provider value={[pedido, setPedido]}>
            {children}
        </PedidoContext.Provider>
    )
}