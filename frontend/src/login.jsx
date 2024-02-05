import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import userService from './services/user'
import Header from './header.jsx'

function Login (props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', password: '' });
  const [alert, setAlert] = useState({ show: false, text: ''});

  const login = event => {
    event.preventDefault() // To not reload the page
    userService.login(user).then(response => {
      // recibimos el token de autorización si todo ha ido bien
      // lo guardamos en el objeto user
      props.setUserToken(response.data.token)
      props.setNum(response.data.num)
      navigate('/profile'); // Al recargar la página, profile ya tiene el userToken.
    }).catch(error => {
      console.log(error)
      if (error.response && error.response.status === 401)
        setAlert({show: true, text: 'Email or password is not correct.'})
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

                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-black-50 mb-5">Please enter your login and password!</p>

                    <div className="form-outline form-black mb-4">
                      <input type="email" id="typeEmailX" className="form-control form-control-lg" value={user.email} onChange={handleEmailChange}/>
                      <label className="form-label" htmlFor="typeEmailX">Email</label>
                    </div>

                    <div className="form-outline form-black mb-4">
                      <input type="password" id="typePasswordX" className="form-control form-control-lg" value={user.password} onChange={handlePasswordChange}/>
                      <label className="form-label" htmlFor="typePasswordX">Password</label>
                    </div>

                    <div className="alert alert-danger" role="alert" style={{display: alert.show ? 'block' : 'none' }}>{alert.text}</div>

                    <p className="small mb-5 pb-lg-2"><a className="text-black-50" href="#!">Forgot password?</a></p>

                    <button className="btn btn-outline-dark btn-lg px-5" type="submit">Login</button>

                  </form>

                  <div>
                    <p className="mb-0">Don't have an account? <a href="/register" className="text-black-50 fw-bold">Sign Up</a>
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
)}

export default Login;
