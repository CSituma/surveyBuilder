
const InputFormTypes = ({ formType, choices }) => {


  return (
    <div>
      {formType === "Yes/No" ? (
        <div>
          <input type="radio" id="html" name="fav_language" value="HTML" />
          <label htmlFor="html">YES</label>
          <br />
          <input type="radio" id="css" name="fav_language" value="CSS" />
          <label htmlFor="css">NO</label>
        </div>
      ) : formType === "Text" ? (
        <>
          <div className="Text">
            <div className="col-lg-12">
              <div className="input-group input-group-lg">
                <input type="text" className="form-control input-lg" id="search-church"
                  placeholder=""
                  required />
              </div>
            </div>
          </div>

        </>
      ) :
        formType === "Number" ? (
          <>
            <div className="row">
              <div className="col-lg-12">
                <div className="input-group input-group-lg">
                  <input type="number" className="form-control input-lg" id="search-church"
                    placeholder=""
                    required />
                </div>
              </div>
            </div>

          </>
        ) :
          formType === "MultipleChoice" ? (
            <>
              {choices.map((choice, index) => (
                <div className="form-check" key={index}>
                  <input className="form-check-input" type="checkbox" value={choice.name} id="flexCheckDefault" />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    {choice.name}
                  </label>
                </div>
              ))}
            </>
          ) : (
            ""
          )}
    </div>
  )
}

export default InputFormTypes