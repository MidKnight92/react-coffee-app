import React from 'react';
import { List, Segment } from 'semantic-ui-react';

function CoffeeList(props) {
    const coffee = props.coffees.map((coffee) => {
        return (
            <Segment inverted key={coffee.id}>
	            <List divided inverted relaxed>
		        	<List.Item>
		        		<List.Content>
			        	<List.Header>{coffee.name}</List.Header>
			        	From: {coffee.origin}
			        	Acidity: {coffee.acidity}
			        </List.Content>	
		        	</List.Item>
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