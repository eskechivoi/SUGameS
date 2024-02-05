import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from './cartProvider.jsx'

function Product(props) {
    return (
        <div className="col-md-12">
            <label><b>{props.product.name}</b> - {props.product.price}</label>
        </div>
    )
}

function Cart(props) {
    const defUser = {
        "name" : '',
        "surname" : '',
        "phoneNumber" : '',
        "address" : '',
        "postcode" : '',
        "email": '',
        "country" : '',
        "state": '',
        "numTarjeta" : '',
        "cvv" : '',
        "caducidad" : ''
    }

    const [ user, setUser ] = useState(defUser)
    const [cart, setCart] = useContext(CartContext);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevDatos) => ({
          ...prevDatos,
          [name]: value,
        }));
    };

    return (
        <div className="d-flex flex-column w-100" style={{ minHeight: '100vh', background: '#6f42c1'}}>
            <div className="container rounded bg-white mt-5">
                <div className="row justify-content-center">
                    <form className="col-md-4 order-md-1 order-2 order-sm-2 d-flex justify-content-center">
                            <div className="p-3 py-5">
                                <h4 className="text-right mb-3">Información de envío</h4>
                                <div className="row mt-2">
                                    <div className="col-md-6"><label className="labels">Nombre</label><input type="text" className="form-control" placeholder="Nombre" value={user.name} onChange={handleChange} name="name"/></div>
                                    <div className="col-md-6"><label className="labels">Apellidos</label><input type="text" className="form-control" placeholder="Apellidos" value={user.surname} onChange={handleChange} name="surname"/></div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12"><label className="labels">Número de teléfono</label><input type="text" className="form-control" placeholder="Número de teléfono" value={user.phoneNumber} onChange={handleChange} name="phoneNumber"/></div>
                                    <div className="col-md-12"><label className="labels">Dirección</label><input type="text" className="form-control" placeholder="Dirección" value={user.address} onChange={handleChange} name="address"/></div>
                                    <div className="col-md-12"><label className="labels">Código Postal</label><input type="text" className="form-control" placeholder="Código Postal" value={user.postcode} onChange={handleChange} name="postcode"/></div>
                                    <div className="col-md-12"><label className="labels">Correo</label><input type="email" className="form-control" placeholder="Correo" value={user.email} onChange={handleChange} name="email"/></div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6"><label className="labels">País</label><input type="text" className="form-control" placeholder="país" value={user.country} onChange={handleChange} name="country"/></div>
                                    <div className="col-md-6"><label className="labels">Localidad</label><input type="text" className="form-control" value={user.state} placeholder="Localidad" onChange={handleChange} name="state"/></div>
                                </div>
                                <h5 className="my-3">Información de pago</h5>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <label className="labels">Número de tarjeta</label>
                                        <input type="text" className="form-control" placeholder="0000-0000-0000-0000" value={user.numTarjeta} onChange={handleChange} name="numTarjeta"/>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6"><label className="labels">CVV</label><input type="text" className="form-control" placeholder="CVV" value={user.cvv} onChange={handleChange} name="cvv"/></div>
                                    <div className="col-md-6"><label className="labels">Caducidad</label><input type="text" className="form-control" placeholder="00/00/0000" value={user.caducidad} onChange={handleChange} name="caducidad"/></div>
                                </div>
                                <h5 className="my-3">Verificación de identidad</h5>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <label className="labels mb-2">Sube una fotografía de tu DNI para que podamos verificar que eres tú.</label>
                                        <input type="file" className="form-control" value={user.archivo} onChange={handleChange} name="archivo"/>
                                    </div>
                                </div>
                                <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="submit">Comprar</button></div>
                            </div>
                    </form>
                    <div className="col-md-4 order-md-2 order-1 order-sm-1 d-flex justify-content-left">
                            <div className="p-3 py-5">
                                <h4>Tus productos</h4>
                                {/* AQUÍ VAN LOS PRODUCTOS */}
                                {cart.map((prod, _) => 
                                    <Product product={prod}></Product>
                                )}   
                                <hr></hr>    
                                <div className="col-md-12"><b>Total: </b>{cart.reduce((total, prod) => total + parseFloat(prod.price), 0)}€</div>                    
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;