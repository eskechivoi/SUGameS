import Header from './header'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { PedidoContext } from './pedidoProvider'

function Confirmacion (props) {
    const [pedido, setPedido] = useContext(PedidoContext);
    const navigate = useNavigate();
    
    const onHandleReturn = (event) => {
        event.preventDefault();
        navigate('/')
    }

    return (
        <>
            <Header />
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-light text-black" style={{borderRadius: '1rem'}}>
                            <div style={{margin: '50px'}}>
                                <h2>¡Enhorabuena, {pedido.nombre}! Tu pedido se ha confirmado</h2>
                                <p>Recibirás un correo a la dirección {pedido.email} cuando tu pedido esté en camino.</p>
                                <div className="mt-5 text-center"><button className="btn btn-primary profile-button" onClick={onHandleReturn}>Volver a la tienda</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
)}

export default Confirmacion;