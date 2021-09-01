import React,{useState} from "react";


const ToDolists = (props) => {

    const [editInput, setEditInput] = useState(false);
    const [editInputValue, setEditInputValue] = useState(props.text);

    const handleEdit = () => {
        setEditInput(true);
    }

    const handleEditChange = (e) => {
        setEditInputValue(e.target.value);
    }

    const handleEditSubmit = (e) => {
        if(e.code == "Enter") {
            props.onEdit(props.id,editInputValue);
            setEditInput(false);
        }
        
    }
     
    return ( 
    <>
    <div className="todo_style">
    <i className="fas fa-trash" aria-hidden="true"
     onClick= {() => {
         props.onSelect(props.id);
     }}       
     />
    {editInput ? <input type="text" value={editInputValue} onChange={handleEditChange} onKeyPress={handleEditSubmit}/>: <li> {props.text}</li>} 
    {!editInput && <i onClick = {handleEdit} className="fas fa-edit"></i>}
    
    </div>
    </>
    );
};

export default ToDolists ;