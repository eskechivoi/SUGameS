import Header from './header'

function PopUp (props) {
    return (
        <>
            <Header />
            <div className="popup">
                <div className="popup-inner">
                    <div style={{margin: '50px'}}>
                        {props.component}
                        <div className="mt-5 text-center"><button className="btn btn-primary profile-button" onClick={props.onHandleClose}>{props.button}</button></div>
                    </div>
                </div>
            </div>
        </>
)}

export default PopUp;