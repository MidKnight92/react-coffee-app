import React, { Component } from 'react';
import CoffeeList from '../CoffeeList';
import CreateCoffee from '../CreateCoffeeForm';
import EditCoffeeModal from '../EditCoffeeModal'

class CoffeeContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coffees: [],
            editModalOpen: false,
            coffeeToEdit: {
                name: '',
                creator: '',
                acidity: '',
                origin: '',
                id: ''
            }
        }
    }
    componentDidMount() {
        this.getCoffees();
    }
    getCoffees = async () => {
        try {
            const coffees = await fetch(process.env.REACT_APP_API_URL + '/api/v1/coffees/', {
                credentials: 'include'
            });
            const parsedCoffees = await coffees.json();
            // console.log(parsedCoffees);
            this.setState({
                coffees: parsedCoffees.data
            })
        } catch (err) {
            console.log(err);
        }
    }
    deleteCoffee = async (id) => {
        // console.log(id);
        const deleteCoffeeResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/coffees/' + id, {
            method: 'DELETE',
            credentials: 'include'
        });
        const deleteCoffeeParsed = await deleteCoffeeResponse.json();
        // console.log(deleteCoffeeParsed);
        this.setState({
            coffees: this.state.coffees.filter((coffee) => coffee.id !== id) })
    }
    addCoffee = async (e, coffeeFromTheForm) => {
        e.preventDefault();
        // console.log(coffeeFromTheForm);
        try {
           const createdCoffeeResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/coffees/', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(coffeeFromTheForm),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
           const parsedCoffee = await createdCoffeeResponse.json();
           // console.log(parsedCoffee);

           this.setState({coffees: [...this.state.coffees, parsedCoffee.data]})
        }
        catch (err) {
            console.log(err)
        }
    }
    editCoffee = (idOfCoffeeToEdit) => {
        const coffeeToEdit = this.state.coffees.find(coffee => coffee.id === idOfCoffeeToEdit)
        // console.log('We are currently editing --> ', coffee.name);
        this.setState({
            editModalOpen: true,
            coffeeToEdit: {
                ...coffeeToEdit
            }
        })
    }
    handleEditChange = (event) => {
        this.setState({
            coffeeToEdit: {
                ...this.state.coffeeToEdit,
                [event.target.name]: event.target.value
            }
        })
    }
    updateCoffee = async (newCoffeeInfo) => {
        newCoffeeInfo.preventDefault()
        // console.log('This is updateCoffee with our newCoffeeInfo:\n', newCoffeeInfo);
        try {
             const url = process.env.REACT_APP_API_URL + '/api/v1/coffees/' + this.state.coffeeToEdit.id

             const updateResponse = await fetch(url, {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify(this.state.coffeeToEdit),
                headers: {
                    'Content-Type': 'application/json'
                }
        })
        const updateResponseParsed = await updateResponse.json()

        const newCoffeeArrayWithUpdate = this.state.coffees.map((coffee) => {
            if (coffee.id === updateResponseParsed.data.id){
              coffee = updateResponseParsed.data  
            }
            return coffee
        })
        this.setState({
            coffees: newCoffeeArrayWithUpdate
        })
        this.closeModal()
    }
        catch (err) {
            console.log(err)
        }
    }
    closeModal = () => {
        this.setState({
            editModalOpen: false
        })
    }
    render() {
        return (
            <React.Fragment>
                <CoffeeList 
                coffees={this.state.coffees} 
                deleteCoffee={this.deleteCoffee} 
                editCoffee={this.editCoffee} 
                />
                <CreateCoffee addCoffee={this.addCoffee} />
              <EditCoffeeModal
                open={this.state.editModalOpen}
                updateCoffee={this.updateCoffee}
                coffeeToEdit={this.state.coffeeToEdit}
                closeModal={this.closeModal}
                handleEditChange={this.handleEditChange}
                />
            </React.Fragment>
        )
    }

}

export default CoffeeContainer