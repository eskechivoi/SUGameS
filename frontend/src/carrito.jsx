import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from './cartProvider.jsx'
import PopUp from './popup.jsx'

function Confirm(props) {
    return (
        <>
            <h2>{props.popup.header}</h2>
            <p>{props.popup.text}</p>
        </>
    )
    
}

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

    const [ user, setUser ] = useState(defUser);
    const [ showPopUp, setShowPopUp ] = useState(false);
    const [ popUp, setPopup ] = useState(null)
    const [cart, setCart] = useContext(CartContext);

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevDatos) => ({
          ...prevDatos,
          [name]: value,
        }));
    };

    const validarDatos = (datos) => {
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const regexPhone = /^[0-9]{9}$/;
        const regexPostcode = /^[0-9]{5}$/;
        const regexTarjeta = /^[0-9]{4}[-][0-9]{4}[-][0-9]{4}[-][0-9]{4}$/;
        const regexCVV = /^[0-9]{3}$/;
        const regexCaducidad = /^[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/;
        if (datos.name === '' || datos.surname === '' || datos.address === '' || datos.country === '' || datos.state === '') {
            alert("Rellena todos los campos.")
            return false;
        }
        if (!regexEmail.test(datos.email)) {
            alert("El email no tiene el formato correcto.")
            return false;
        } 
        if (!regexPhone.test(datos.phoneNumber)) {
            alert("El número de teléfono no tiene el formato correcto.")
            return false;
        }
        if (!regexPostcode.test(datos.postcode)) {
            alert("El código postal no tiene el formato correcto.")
            return false;
        }
        if (!regexTarjeta.test(datos.numTarjeta)) {
            alert("El número de tarjeta no tiene el formato correcto.")
            return false;
        }
        if (!regexCVV.test(datos.cvv)) {
            alert("El cvv no tiene el formato correcto.")
            return false;
        }
        if (!regexCaducidad.test(datos.caducidad)) {
            alert("La fecha de caducidad no tiene el formato correcto.")
            return false;
        }
        return true;
    }

    const handleSummit = (event) => {
        event.preventDefault();
        if(validarDatos(user)) {
            fetch('/api/buy', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
            .then(async response => {
                const data = await response.json();
                setPopup(data)
                setShowPopUp(true)
            })
        } 
    }

    const handleConfirmPopup = (event) => {
        event.preventDefault();
        navigate("/")
    }

    useEffect(() => {
        const newTotal = cart.reduce((total, prod) => {
            if (prod.price < 0) {
                alert("Error en el precio de los productos.")
                navigate("/")
            }
            return total + parseFloat(prod.price);
        }, 0);
        setUser(prevUser => ({...prevUser, price: newTotal}));
        document.cookie = `transAuth=${btoa(newTotal)}; expires=Thu, 28 Mar 2024 12:00:00 UTC; path=/`;
      }, [cart]);

    return (
        <div className="d-flex flex-column w-100" style={{ minHeight: '100vh', background: '#6f42c1'}}>
            {showPopUp && <PopUp component={<Confirm popup={popUp}/>} button={popUp.button} onHandleClose={handleConfirmPopup}/>}
            <div className="container rounded bg-white mt-5">
                <div className="row justify-content-center">
                    <form className="col-md-4 order-md-1 order-2 order-sm-2 d-flex justify-content-center" onSubmit={handleSummit}>
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
                                <div className="col-md-12"><b>Total: </b>{user.price}€</div>            
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;