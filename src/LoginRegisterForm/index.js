import React, { Component } from 'react'
import { Form, Button, Label, Header, Segment } from 'semantic-ui-react';

class LoginRegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            username: '',
            action: 'login'
        }
    }
    loginRegister = () => {
        if (this.state.action === 'login') {
            this.props.login({
                email: this.state.email,
                password: this.state.password
            })
        } else {
            this.props.register({
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
            })
        }
    }
    switchFrom = () => {
        if (this.state.action === 'login') {
            this.setState({
                action: 'register'
            })
        } else {
            this.setState({
                action: 'login'
            })
        }
    }
    handleChange = (e) => {
        // console.log('EditCoffeeModal: handleChange this is e\n', e);
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.loginRegister()
    }
    render() {
        return (
            <Segment inverted className="LoginRegisterForm">
         	<Form onSubmit={this.handleSubmit}>
         	{
         		this.state.action === 'register' ? 
         		<React.Fragment>
         		<h1>WELCOME TO KAFFA</h1>
         		<h3>THE ONLY SITE FOR REAL COFFEE LOVERS</h3>
         		<h4> Username:</h4>
         		<Form.Group widths="equal">
         		<Form.Input fluid 
         		type='text'
         		name='username'
         		value={this.state.username}
         		onChange={this.handleChange}
         		/>
         		</Form.Group>
         		</React.Fragment>
         		: null
         	}
         		<h1>WELCOME TO KAFFA</h1>
         		<h3>THE ONLY SITE FOR REAL COFFEE LOVERS</h3>
         		<h4> Email:</h4>
         		<Form.Group widths="equal">
         		<Form.Input fluid 
         		type='email'
         		name='email'
         		value={this.state.email}
         		onChange={this.handleChange}
         		/>
         		</Form.Group>
         		<React.Fragment>
         		<h4> Password:</h4>
         		<Form.Group widths="equal">
         		<Form.Input fluid 
         		type='text'
         		name='password'
         		value={this.state.password}
         		onChange={this.handleChange}
         		/>
         		</Form.Group>
         		</React.Fragment>
         		<Button type="Submit">{this.state.action === 'register' ? 'Register' : 'Log in'}</Button>
         		</Form>
         		{
         			this.state.action === 'register' ? 
         			<small>Already have an account? Log in <span onClick={this.switchForm}>here</span>!</small>
          :
          <small>Need an account? Sign up ! <span onClick={this.switchForm}>CLICK HERE!!! :-)</span></small>
         }	
         </Segment>
        )
    }
}

export default LoginRegisterForm