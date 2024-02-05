import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from './cartProvider.jsx'
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
        "price" : "60€",
        "discount" : "40€",
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
        <div className="col mb-5">
            <div className="card h-100">
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
                        <span className="text-muted text-decoration-line-through">{props.product.price}</span> {props.product.discount}
                    </div>
                </div>
                {/* Product actions */}
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                        <button 
                            className="btn btn-outline-dark mt-auto" 
                            onClick={() => props.onAddToCart(props.product)}
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
        <div className="col mb-5">
            <div className="card h-100">
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
                            onClick={() => props.onAddToCart(props.product)}
                        >
                            {props.product.inCart ? 'Quitar del carrito' : 'Añadir al carrito'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Shop(props) {
    const [ numItems, setNumItems ] = useState(0)
    const [ cart, setCart ] = useContext(CartContext);
    const navigate = useNavigate();

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
                            prod.discount ? 
                            <Sale key={index} product={prod} onAddToCart={handleAddToCart}/> 
                            : 
                            <Product key={index} product={prod} onAddToCart={handleAddToCart}/>
                        )}
                    </div>
                </div>
            </section>
            <footer className="py-5 bg-dark">
                <div className="container"><p className="m-0 text-center text-white">Copyright &copy; SUGUS 2024</p></div>
            </footer>
        </>
    )
}

export default Shop;