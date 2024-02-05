import Header from './header'

function ErrorPage (props) {
    return (
        <>
            <Header />
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-light text-black" style={{borderRadius: '1rem'}}>
                            <div style={{margin: '50px'}}>
                                <h1>Error {props.code} - {props.name}</h1>
                                <p>{props.desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
)}

export default ErrorPage;