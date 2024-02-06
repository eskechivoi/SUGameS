import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from './cartProvider.jsx'
import PopUp from './popup.jsx';
import React from 'react';
import NavbarSugus from './navbar.jsx';
import totkImg from './img/zeldatotk.png'
import octopathImg from './img/octopath.png'
import eldenImg from './img/eldenring.png'
import 'bootstrap-icons/font/bootstrap-icons.css';


const prods = [
    {
        "name" : "Octopath Traveler II",
        "price" : "30€",
        "image" : octopathImg,
        "numStars" : 4
    },{
        "name" : "Zelda Tears of the Kingdom",
        "price" : "40€",
        "previous" : "60€",
        "image" : totkImg,
        "numStars" : 5
    },{
        "name" : "Elden Ring",
        "price" : "60€",
        "image" : eldenImg,
        "numStars" : 5
    }
]

function Sale(props) {
    return (
        <div className="col mb-5" onClick={props.onClick}>
            <div className="card h-100" style={{cursor: 'pointer'}}>
                {/* Sale badge */}
                <div className="badge bg-dark text-white position-absolute" style={{top: '0.5rem', right: '0.5rem'}}>Sale</div>
                {/* Product image */}
                <img className="card-img-top" src={props.product.image} alt="..." />
                {/* Product details */}
                <div className="card-body p-4">
                    <div className="text-center">
                        {/* Product name */}
                        <h5 className="fw-bolder">{props.product.name}</h5>
                        {/* Product reviews */}
                        <div className="d-flex justify-content-center small text-warning mb-2">
                            {Array(props.product.numStars).fill().map((_, i) => <div key={i} className="bi-star-fill"></div>)}
                        </div>
                        {/* Product price */}
                        <span className="text-muted text-decoration-line-through">{props.product.previous}</span> {props.product.price}
                    </div>
                </div>
                {/* Product actions */}
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                        <button 
                            className="btn btn-outline-dark mt-auto" 
                            onClick={(event) => {
                                event.stopPropagation();
                                props.onAddToCart(props.product);
                            }}
                        >
                            {props.product.inCart ? 'Quitar del carrito' : 'Añadir al carrito'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


function Product(props) {
    return (
        <div className="col mb-5" onClick={props.onClick}>
            <div className="card h-100" style={{cursor: 'pointer'}}>
                {/* Product image */}
                <img className="card-img-top" src={props.product.image} alt="..." />
                {/* Product details */} 
                <div className="card-body p-4">
                    <div className="text-center">
                        {/* Product name */}
                        <h5 className="fw-bolder">{props.product.name}</h5>
                        {/* Product reviews */}
                        <div className="d-flex justify-content-center small text-warning mb-2">
                            {Array(props.product.numStars).fill().map((_, i) => <div key={i} className="bi-star-fill"></div>)}
                        </div>
                        {/* Product price */}
                        {props.product.price}
                    </div>
                </div>
                {/* Product actions */}
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                        <button 
                            className="btn btn-outline-dark mt-auto" 
                            onClick={(event) => {
                                event.stopPropagation();
                                props.onAddToCart(props.product);
                            }}
                        >
                            {props.product.inCart ? 'Quitar del carrito' : 'Añadir al carrito'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Comment (props) {
    return (
        <div className="card h-100">
                <img className="card-img-top" src={props.comment.image} alt="..." />
                <div className="card-body p-4">
                    <h5 className="fw-bolder">{props.comment.game}</h5>
                    <p>{props.comment.text}</p>
                </div>
        </div>
    )
}

function Game (props) {
    const blankComment = {
        "game" : props.game.name,
        "text" : '',
        "image": ''
    }
    const [ comment, setComment ] = useState(blankComment)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setComment((prevDatos) => ({
          ...prevDatos,
          [name]: value,
        }));
    };

    const handleSummit = (event) => {
        event.preventDefault();
        fetch('/api/comment/' + props.game.name, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        })
        .then(async response => {
            if (response.ok) alert("Comentario publicado correctamente.")
            else alert("No se ha podido publicar el comentario.")
        })
    }

    return (
        <div style={{maxHeight: '65vh', overflow: 'auto'}}>
            <div>
                <img className="card-img-top" src={props.game.image} alt="..." />
                <div className="card-body p-4">
                    <div className="text-center">
                        <h5 className="fw-bolder">{props.game.name}</h5>            
                    </div>
                </div>
            </div>
            <hr></hr>
            <h4>Publica un comentario sobre el juego</h4>
            <form onSubmit={handleSummit}>
                <div className='mt-3'>
                    <div className="col-md-12">
                        <label className="labels">Comentario</label>
                        <textarea type="text" className="form-control" placeholder="Tu comentario..." value={comment.text} onChange={handleChange} name="text"/>
                    </div>
                    <div className="col-md-12">
                        <label className="labels mb-2">Sube una captura del juego <i>(opcional)</i></label>
                        <input type="file" className="form-control" value={comment.image} onChange={handleChange} name="image"/>
                    </div>
                    <div className="mt-3 text-center"><button className="btn btn-primary profile-button" type="submit">Publicar</button></div>
                </div>
            </form>
            <hr/>
            <h4 className='text-center'>Comentarios</h4>
            {props.comments.map((comment, i) => (
                <>
                    <Comment key={i} comment={comment}/>
                    <hr/>
                </>
            ))}
        </div>
    )
}

function Shop(props) {
    const [ numItems, setNumItems ] = useState(0)
    const [ cart, setCart ] = useContext(CartContext);
    const [ selProd, setSelProd ] = useState(null)
    const [ comments, setComments ] = useState([])
    const navigate = useNavigate();

    // Vacía el carrito al recargar la tienda (para el reto es suficiente)
    useEffect(() => {
        for (let prod of cart) prod.inCart = false
        setCart([])
    }, []);

    const handleAddToCart = (product) => {
        console.log(product);
        if (!product.inCart) {
            setNumItems(numItems + 1)
            product.inCart = true
            setCart([...cart, product])
        } else {
            setNumItems(numItems - 1)
            product.inCart = false
            setCart(cart.filter(item => item.name !== product.name))
        }
    }
    

    const handleClickOnCart = (event) => {
        event.preventDefault();
        navigate('/cart')
    }

    const handleClosePopup = (_) => setSelProd(null)

    const handleProductClick = (event, prod) => {
        event.preventDefault();
        fetch('/api/comment/' + prod.name, {
            method: 'GET'
        })
        .then(async response => {
            const data = await response.json();
            if (response.ok) setComments(data)
            else alert(data.error)
        })
        setSelProd(prod);
    }

    return(
        <>
            <NavbarSugus numItems={numItems} onHandleClick={handleClickOnCart}/>
            <header className="bg-dark py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">SUGameS</h1>
                        <p className="lead fw-normal text-white-50 mb-0">La página de compra de videojuegos de confianza.</p>
                    </div>
                </div>
            </header>
            <section className="py-5" style={{background: '#ffffff'}}>
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {/* AQUÍ VAN LOS PRODUCTOS */}
                        {prods.map((prod, index) => 
                            prod.previous ? 
                            <Sale key={index} product={prod} onAddToCart={handleAddToCart} onClick={(event) => handleProductClick(event, prod)}/> 
                            : 
                            <Product key={index} product={prod} onAddToCart={handleAddToCart} onClick={(event) => handleProductClick(event, prod)}/>
                        )}
                    </div>
                </div>
            </section>
            <footer className="py-5 bg-dark">
                <div className="container"><p className="m-0 text-center text-white">Copyright &copy; SUGUS 2024</p></div>
            </footer>
            {selProd !== null && <PopUp component={<Game game={selProd} comments={comments}/>} button={"Cerrar"} onHandleClose={handleClosePopup}/>}
        </>
    )
}

export default Shop;