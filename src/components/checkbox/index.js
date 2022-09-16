import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import {
  FaPlus,
  FaRegTrashAlt,
} from "react-icons/fa";
import { customAlertTimer, deleteOneItem } from "../../utils/HelperFunctions";


const CheckBox = ({ handleClose, multipleChoices=[{name:''}], setMultipleChoices }) => {


 const inputData = multipleChoices?.map((input => input))
console.log(multipleChoices);
  const [inputFields, setInputFields] = useState(inputData)
  
  
  const [isDeleted, setIsDeleted] = useState(false);
  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  }

  const addNewFields = () => {
    let newfield = { name: '' }
    setInputFields([...inputFields, newfield])
  }


  const deleteField = (index, e) => {
    inputFields[index][e.target.name] = e.target.value;
    deleteOneItem(inputFields, index);
    customAlertTimer(setIsDeleted);
  }
  

  const submit = () => {
    setMultipleChoices(inputFields);
    handleClose();
  }

  return (
    <div>
      {isDeleted ? <Alert variant="success"> Successfully Deleted</Alert> : ''}

      <>
        <form id="checkOptions">
          {inputFields.map((input, index) => {
            return (
              <div className="row" key={index}>

                <div className="col-12">
                  <div className="d-flex flex-fill ">

                    <input type="text"
                      id="vehicle1"
                      name="name"
                      className="text-center flex-fill form-control prop-field m-1"
                      placeholder=" Answer"
                      value={input.name}
                      onChange={event => handleFormChange(index, event)} />
                    <div className="input-group-btn">

                      <Button type="button" className="btn btn-danger m-1" onClick={(event) => deleteField(index, event)}> <FaRegTrashAlt /></Button>

                    </div>

                  </div>
                </div>

              </div>

            )
          })}

        </form>

        <div >
          <div className="input-group-btn ">
            <button onClick={addNewFields} className="btn btn-secondary "> <FaPlus />Answer</button>
          </div>
          <Button onClick={submit}
            className="flex-fill form-control prop-field p-3 shadow-lg mb-5 rounded"
            data-toggle="tooltip"
            data-placement="top"
            title="Save list of checkoptions"
            variant="primary"> Save</Button>


        </div>

      </>
    </div>
  )
}

export default CheckBox