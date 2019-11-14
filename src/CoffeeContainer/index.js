import React, { Component } from 'react';
import CoffeeList from '../CoffeeList';

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
    render() {
        return (
            <CoffeeList coffees = { this.state.coffees} />
        )
    }

}

export default CoffeeContainer