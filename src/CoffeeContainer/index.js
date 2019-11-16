import React, { Component } from 'react';
import CoffeeList from '../CoffeeList';
import CreateCoffee from '../CreateCoffeeForm';
import EditCoffeeModal from '../EditCoffeeModal'

class CoffeeContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coffees: [],
            idOfCoffeeToEdit: -1
        }
    }
    componentDidMount() {
        this.getCoffees();
    }
    getCoffees = async () => {
        try {
            const coffees = await fetch(process.env.REACT_APP_API_URL + '/api/v1/coffees/');
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
            method: 'DELETE'
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
        const coffee = this.state.coffees.find(coffee => coffee.id === idOfCoffeeToEdit)
        // console.log('We are currently editing --> ', coffee.name);
        this.setState({
            idOfCoffeeToEdit: idOfCoffeeToEdit
        })
    }
    updateCoffee = async (newCoffeeInfo) => {
        // console.log('This is updateCoffee with our newCoffeeInfo:\n', newCoffeeInfo);
        try {
             const url = process.env.REACT_APP_API_URL + '/api/v1/coffees/' + this.state.idOfCoffeeToEdit

             const updateResponse = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(newCoffeeInfo),
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
            idOfCoffeeToEdit: -1
        })
    }
    render() {
        return (
            <React.Fragment>
                <CoffeeList coffees = {this.state.coffees} deleteCoffee={this.deleteCoffee} editCoffee={this.editCoffee} />
                <CreateCoffee addCoffee={this.addCoffee} />
                {
                    this.state.idOfCoffeeToEdit !== -1 ? <EditCoffeeModal updateCoffee={this.updateCoffee} editCoffee={this.state.coffees.find(coffee => coffee.id === this.state.idOfCoffeeToEdit)} closeModal={this.closeModal}/> : null
                }
            </React.Fragment>
        )
    }

}

export default CoffeeContainer