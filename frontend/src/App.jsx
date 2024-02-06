import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './cartProvider.jsx'
import './css/App.css'
import './css/styles.css'
import Cart from './carrito.jsx'
import Shop from './shop.jsx'

function App() {
  return (
    <CartProvider>
        <Routes>
          <Route path="/" element={<Shop/>}/>
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
    </CartProvider>
  )
}

export default App
