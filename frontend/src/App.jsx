import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './cartProvider.jsx'
import './css/App.css'
import './css/styles.css'
import Confirmacion from './confirmacion.jsx'
import Cart from './carrito.jsx'
import Shop from './shop.jsx'
import { PedidoProvider } from './pedidoProvider.jsx'

function App() {
  return (
    <CartProvider>
      <PedidoProvider>
        <Routes>
          <Route path="/" element={<Shop/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/confirmacion" element={<Confirmacion/>}/>
        </Routes>
      </PedidoProvider>
    </CartProvider>
  )
}

export default App
