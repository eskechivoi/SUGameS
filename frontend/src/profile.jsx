import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import userService from './services/user'
import Header from './header'
import ErrorPage from './error'

function Profile (props) {
    const [ modfUser, setUser ] = useState(null)
    const [ pagHtml, setPag ] = useState([])
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevDatos) => ({
          ...prevDatos,
          [name]: value,
        }));
    };

    const update = event => {
        event.preventDefault() // To not reload the page
        userService.update(modfUser).then(() => {
            console.log('200 ok')
            navigate('/login'); 
        }).catch(error => {
          console.log(error)
          if (error.response && error.response.status === 400)
            setPag(<ErrorPage code={400} name={'Client Error'} desc={'Password is not long enough or email is not properly formed.'}/>)
        })
      }

    useEffect(() => {
        if (modfUser == null){
            userService.getProfileData(props.userToken, props.userNum).then(response => {
                if (response.status === 200){
                    const user = response.data
                    delete user.password
                    setUser(user)   
                } else if (response.status === 401){
                    setPag(<ErrorPage code={401} name={'Unauthorised'} desc={'You must login before accessing your profile page.'}/>)
                }
            }).catch(error => {
                if (error.response && error.response.status === 403)
                    setPag(<ErrorPage code={401} name={'Unauthorised'} desc={'You must login before accessing your profile page.'}/>)
                else{
                    console.log(error)
                    setPag(<ErrorPage code={500} name={'Server Error'} desc={'Can not communicate with server.'}/>)
                }
            })
        } else {
        setPag(
            <>
                <Header />
                <div className="container rounded bg-white mt-5">
                    <div className="row">
                        <form className="d-flex" onSubmit={update}>
                            <div className="col-md-3 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" /><span className="font-weight-bold">{modfUser.name || 'Add a name'}</span><span className="text-black-50">{modfUser.email || ''}</span><span> </span></div>
                            </div>
                            <div className="col-md-5 border-right">
                                <div className="p-3 py-5">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="text-right">Profile Settings</h4>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-6"><label className="labels">Name</label><input type="text" className="form-control" placeholder="first name" value={modfUser.name || ''} onChange={handleChange} name="name"/></div>
                                        <div className="col-md-6"><label className="labels">Surname</label><input type="text" className="form-control" placeholder="surname" value={modfUser.surname || ''} onChange={handleChange} name="surname"/></div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12"><label className="labels">Mobile Number</label><input type="text" className="form-control" placeholder="enter phone number" value={modfUser.phoneNumber || ''} onChange={handleChange} name="phoneNumber"/></div>
                                        <div className="col-md-12"><label className="labels">Address Line</label><input type="text" className="form-control" placeholder="enter address line" value={modfUser.address || ''} onChange={handleChange} name="address"/></div>
                                        <div className="col-md-12"><label className="labels">Postcode</label><input type="text" className="form-control" placeholder="enter postcode" value={modfUser.postcode || ''} onChange={handleChange} name="postcode"/></div>
                                        <div className="col-md-12"><label className="labels">Email</label><input type="email" className="form-control" placeholder="enter email" value={modfUser.email || ''} onChange={handleChange} name="email"/></div>
                                        <div className="col-md-12"><label className="labels">Password</label><input type="password" className="form-control" placeholder="new password" value={modfUser.password || ''} onChange={handleChange} name="password"/></div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control" placeholder="country" value={modfUser.country || ''} onChange={handleChange} name="country"/></div>
                                        <div className="col-md-6"><label className="labels">State/Region</label><input type="text" className="form-control" value={modfUser.region || ''} placeholder="state" onChange={handleChange} name="region"/></div>
                                    </div>
                                    <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="submit">Save Profile</button></div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="p-3 py-5">
                                    <div className="d-flex justify-content-between align-items-center experience"><span>Edit Experience</span><span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Experience</span></div>
                                    <div className="col-md-12"><label className="labels">Education</label><input type="text" className="form-control" placeholder="education" value={modfUser.education || ''} onChange={handleChange} name="education"/></div>
                                    <div className="col-md-12"><label className="labels">Experience in Designing</label><input type="text" className="form-control" placeholder="experience" value={modfUser.experience || ''} onChange={handleChange} name="experience"/></div>
                                    <div className="col-md-12"><label className="labels">Additional Details</label><input type="text" className="form-control" placeholder="additional details" value={modfUser.additionalDetails || ''} onChange={handleChange} name="additionalDetails"/></div>                               
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
            )}
    }, [modfUser]);
    return pagHtml;
}

export default Profile;
