import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Signup = () => {
	const { store, actions } = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function sendData(e){
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                    "email":email,
                    "password":password
                }
            )
          };
          
          fetch(process.env.BACKEND_URL + "/api/users", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

	return (
		<div className="container mt-5">
            <div className="col-md-6">
                <form>
                    <div className="mb-3">
                        <label htmlFor="emailInput" className="form-label">Email address</label>
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordInput" className="form-label">Password</label>
                        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" id="passwordInput" />
                    </div>
                    <Link to="/private">
                        <button onClick={sendData} type="submit" className="btn btn-primary">Submit</button>
					</Link>
                </form>
            </div>
		</div>
	);
};
