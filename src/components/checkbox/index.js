import { useState } from "react";
import {
  FaPlus,
  FaRegTrashAlt,
} from "react-icons/fa";

import CheckList from "./checkList";

const CheckBox = () => {
  const [inputFields, setInputFields] = useState([
    { name: '' }
  ])

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  }
  const addNewFields = () => {
    let newfield = { name: '' }

    setInputFields([...inputFields, newfield])
  }


  const submit = (e) => {
    e.preventDefault();
  }

  return (
    <div>

      <>

        <form onsubmit={submit}>
          {inputFields.map((input, index) => {
            return (
              <div className="row" key={index}>
                <CheckList checkList={[input?.name]} />
                <div className="col-12">
                  <div className="d-flex flex-fill ">

                    <input type="text"
                      id="vehicle1"
                      name="name"
                      className="text-center flex-fill form-control prop-field"
                      placeholder=" Type Choices e.g- Short Coffee"
                      value={input.name}
                      onChange={event => handleFormChange(index, event)} />
                    <div className="input-group-btn">
                    
                        <button type="submit" className="btn btn-danger"> <FaRegTrashAlt /></button>
                      

                    </div>

                  </div>
                </div>

              </div>

            )
          })}


        </form>
        <div >
          <div className="input-group-btn">
            <button onClick={addNewFields} className="btn btn-primary"> <FaPlus />Add Choices</button>
          </div>

        </div>

      </>
    </div>
  )
}

export default CheckBox