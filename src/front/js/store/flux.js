const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			auth: false
		},
		actions: {
			login: (email, password) => {
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
				  
				fetch(process.env.BACKEND_URL + "/api/login", requestOptions)
					.then(response => {
						if(response.status == 200){
							setStore({ auth: true });
						}
						return response.text()
					})
					.then(result => console.log(result))
					.catch(error => console.log('error', error));
			},

			signup: (email, password) => {
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
					.then(response => {
						if(response.status == 200){
							setStore({ auth: true });
						}
						return response.text()
					})
					.then(result => console.log(result))
					.catch(error => console.log('error', error));
			},

			logout: () => {
				const store = getStore();
				setStore({ auth: false });
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			}
		}
	};
};

export default getState;
