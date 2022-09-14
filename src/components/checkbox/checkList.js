
import {  ListGroup } from 'react-bootstrap'

function CheckBox({ CheckList }) {


    return (
        <div>
            <ListGroup variant="flush">

                {CheckList?.map((checkItem, index) => (
                    <ListGroup.Item key={index}>
                        {checkItem}
                    </ListGroup.Item>

                ))}

            </ListGroup>

        </div>
    )
}

export default CheckBox