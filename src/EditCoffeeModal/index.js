import React, { Component } from 'react';
import { Button, Modal, Header, Form } from 'semantic-ui-react'

class EditCoffeeModal extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            origin: '',
            acidity: ''
        }
    }
    componentDidMount() {
        // console.log('EditCoffeeModal: componentDidMount HERE');
        this.setState(this.props.coffeeToEdit)
    }
    handleChange = (e) => {
        // console.log('EditCoffeeModal: handleChange this is e\n', e);
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        // console.log('EditCoffeeModal: handleSubmit this is e\n', e);
        e.preventDefault()
        this.props.updateCoffee(this.state)
    }
    render() {
        return (
            <Modal open={true} closeIcon={true} onClose={this.props.closeModal}>
			<Header>Edit Your Favorite Coffee:</Header>
				<Modal.Content>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group widths='equal'>
							<Form.Input label="name" type='text' name='name' value={this.state.name} onChange={this.handleChange}/>
							<Form.Input label="acidity" type='text' name='acidity' value={this.state.acidity} onChange={this.handleChange}/>
							<Form.Input label="origin" type='text' name='origin' value={this.state.origin} onChange={this.handleChange}/>
						</Form.Group>
					<Button color='black' type='submit'>Update Coffee</Button>
				</Form>
			</Modal.Content>	
		</Modal>
        )
    }
}

export default EditCoffeeModal