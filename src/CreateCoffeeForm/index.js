import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

class CreateCoffee extends Component {
	constructor(){
		super();
		this.state = {
			name: '',
			acidity: '',
			origin: ''
		}
	}
	handleChange = (e) => {
		this.setState({[e.currentTarget.name]: e.currentTarget.value})
	}
	render(){
		return(
			<Segment inverted>
			<h4>Add Your Favorite Coffee:</h4>
				<Form inverted onSubmit={(e) => this.props.addCoffee(e, this.state)}>
					<Form.Group widths='equal'>
						<Form.Input fluid label="name" type='text' name='name' value={this.state.name} onChange={this.handleChange}/>
						<Form.Input fluid label="acidity" type='text' name='acidity' value={this.state.acidity} onChange={this.handleChange}/>
						<Form.Input fluid label="origin" type='text' name='origin' value={this.state.origin} onChange={this.handleChange}/>
					</Form.Group>
					<Button type='submit'>Submit</Button>
				</Form>
			</Segment>
		)
	}
}

export default CreateCoffee