import React, { Component } from 'react';
import CoffeeContainer from './CoffeeContainer'
import LoginRegisterForm from './LoginRegisterForm'
import './App.css';

class App extends Component {
    constructor() {
        super()
        this.state = {
            loggedIn: false,
            loggedInUserEmail: null
        }
    }
    login = async (loggedInfo) => {
    	const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/login',{
    		method: 'POST',
    		credentials: 'include',
    		body: JSON.stringify(loggedInfo),
    		headers: {
    			'Content-Type': 'application/json'
    		}
    	})
    	const parsedLoginResponse = await response.json()
    	if(parsedLoginResponse.status.code = 200){
    		this.setState({
    			loggedIn: true,
    			loggedInUserEmail: parsedLoginResponse.data.email
    		})
    	} else {
    		console.log('Login Failed:\n', parsedLoginResponse);
    	}
    }
    register = async (registerInfo) => {
    	const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/register', {
    		method: 'POST',
    		credentials: 'include',
    		body: JSON.strignify(registerInfo),
    		headers:{
    			'Content-Type': 'application/json'
    		}
    	})
    	const parsedRegisterResponse = await response.json()
    	if(parsedRegisterResponse.status.code === 201){
    		this.setState({
    			loggedIn: true,
    			loggedInUserEmail: parsedRegisterResponse.data.email
    		})		
    	} else {
    		console.log('Register Failed');
    		console.log(parsedRegisterResponse);
    	}
    }
    render() {
        return (
            <div className="App">
            {
            	this.state.loggedIn ? <CoffeeContainer /> : <LoginRegisterForm login={this.login} register={this.register} />
            }
    	</div>
        );
    }

}
export default App;