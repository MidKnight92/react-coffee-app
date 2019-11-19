import React, { Component } from 'react';
import { Button, Modal, Header, Form } from 'semantic-ui-react'

function EditCoffeeModal(props) {
    return (
        <Modal open={props.open} closeIcon onClose={props.closeModal}>
            <Header>Edit Your Favorite Coffee:</Header>
                <Modal.Content>
                    <Form onSubmit={props.updateCoffee}>
                        <Form.Group widths='equal'>
                            <Form.Input label="name" type='text' name='name' value={props.coffeeToEdit.name} onChange={props.handleEditChange}/>
                            <Form.Input label="acidity" type='text' name='acidity' value={props.coffeeToEdit.acidity} onChange={props.handleEditChange}/>
                            <Form.Input label="origin" type='text' name='origin' value={props.coffeeToEdit.origin} onChange={props.handleEditChange}/>
                        </Form.Group>
                    <Button color='black' type='submit'>Update Coffee</Button>
                </Form>
            </Modal.Content>    
        </Modal>
    )
}

export default EditCoffeeModal