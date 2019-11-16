import React from 'react';
import { List, Segment, Button } from 'semantic-ui-react'

function CoffeeList(props) {
    const coffee = props.coffees.map((coffee) => {
        return (
            <Segment inverted key={coffee.id}>
	            <List divided inverted relaxed>
		        	<List.Item>
		        		<List.Content>
			        	<List.Header>{coffee.name}</List.Header> 
			        	<List.Item className='origin'>From: {coffee.origin} </List.Item> 
			        	<List.Item className='acidity'>Acidity: {coffee.acidity} </List.Item>
			        </List.Content>	
		        	</List.Item>
                    <Button onClick={() => props.deleteCoffee(coffee.id)}>Delete Coffee Selection</Button>
                    <Button onClick={() => props.editCoffee(coffee.id)}>Edit Coffee Selection</Button>
	        	</List>
        	</Segment>
        )
    })
    return (
        <div>
    		{coffee}
    	</div>
    )
}

export default CoffeeList