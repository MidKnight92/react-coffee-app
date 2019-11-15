import React, { Component } from 'react';
import CoffeeList from '../CoffeeList';
import CreateCoffee from '../CreateCoffeeForm';

class CoffeeContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coffees: []
        }
    }
    componentDidMount() {
        this.getCoffees();
    }
    getCoffees = async () => {
        try {
            const coffees = await fetch(process.env.REACT_APP_API_URL + '/api/v1/coffees/');
            const parsedCoffees = await coffees.json();
            console.log(parsedCoffees);
            this.setState({
                coffees: parsedCoffees.data
            })
        } catch (err) {
            console.log(err);
        }
    }
    addCoffee = async (e, coffeeFromTheForm) => {
        e.preventDefault();
        console.log(coffeeFromTheForm);
        try {
           const createdCoffeeResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/coffees/', {
                method: 'POST',
                body: JSON.stringify(coffeeFromTheForm),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
           const parsedCoffee = await createdCoffeeResponse.json();
           console.log(parsedCoffee);

           this.setState({coffees: [...this.state.coffees, parsedCoffee.data]})
        }
        catch (err) {
            console.log(err)
        }
    }
    render() {
        return (
            <React.Fragment>
                <CoffeeList coffees = { this.state.coffees} />
                <CreateCoffee addCoffee={this.addCoffee} />
            </React.Fragment>
        )
    }

}

export default CoffeeContainer