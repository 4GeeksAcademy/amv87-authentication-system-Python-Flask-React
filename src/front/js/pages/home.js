import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Homepic from "../../img/home.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Hello!!</h1>
			<br></br>
			<img src={Homepic} className="img-fluid rounded mb-4" alt="..."></img>
			<p>Welcome.</p>
			<p>Please sign up or create a new user.</p>
		</div>
	);
};
