import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userService from './services/user'
import Header from './header.jsx'

function Register (props) {
  const navigate = useNavigate()
  const [user, setUser] = useState({ email: '', password: '' });
  const [alert, setAlert] = useState({ show: false, text: ''});
  
  const login = event => {
    event.preventDefault() // To not reload the page
    userService.register(user).then(response => {
        navigate('/login');
    }).catch(error => {
      console.log(error)
      if (error.response && error.response.status === 401)
        setAlert({show: true, text: 'There is already an account with these credentials.'})
    })
  }

  const handlePasswordChange = (event) => setUser({email: user.email, password: event.target.value})

  const handleEmailChange = (event) => setUser({email: event.target.value, password: user.password})

  return (
    <>
      <Header />
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-light text-black" style={{borderRadius: '1rem'}}>
                <div className="card-body p-5 text-center">

                  <form className="mb-md-5 mt-md-4 pb-5" onSubmit={login}>

                    <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                    <p className="text-black-50 mb-5">Enter your account credentials</p>

                    <div className="form-outline form-black mb-4">
                      <input type="email" id="typeEmailX" className="form-control form-control-lg" value={user.email} onChange={handleEmailChange}/>
                      <label className="form-label" htmlFor="typeEmailX">Email</label>
                    </div>

                    <div className="form-outline form-black mb-4">
                      <input type="password" id="typePasswordX" className="form-control form-control-lg" value={user.password} onChange={handlePasswordChange}/>
                      <label className="form-label" htmlFor="typePasswordX">Password</label>
                    </div>

                    <div className="alert alert-danger" role="alert" style={{display: alert.show ? 'block' : 'none' }}>{alert.text}</div>

                    <button className="btn btn-outline-dark btn-lg px-5" type="submit">Register</button>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
)}

export default Register;
