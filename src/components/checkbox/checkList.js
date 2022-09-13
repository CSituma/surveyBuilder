
const CheckList = ({ checkList }) => {
    console.log(checkList);
    
        return (
            <div>
                {checkList.map((checkItem,index) => (
                    <div key={index}>
    
                        <input type="checkbox" id={checkItem}  name={checkItem} value={checkItem} />
                        <label htmlFor={checkItem}> {checkItem}</label>
                    </div>
    
                ))}
    
            </div>
        )
    }
    
    export default CheckList