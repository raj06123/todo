import React, { useState,useEffect } from 'react';
import ToDolists from "./ToDolists";

const App = () => {

 const [inputList, setInputList] = useState("");
 const [Items, setItems] = useState(JSON.parse(localStorage.getItem("items")));

 const itemEvent = (event) => {
  setInputList(event.target.value);
 };

  const listOfItems = async () => {
    if(Items === null) {
      setItems([inputList]);
      setInputList("");
    }
    else {
      await setItems ((oldItems) => {
      return [...oldItems, inputList];
      });
      localStorage.setItem("items",JSON.stringify([...Items,inputList]));
      setInputList("");
    }
  };
  
  const onKeyPress = (e) => {
    if(e.code == "Enter") {
      listOfItems();
    }
  }

  const deleteitems = async (id) => {
    console.log("deleted");

    await setItems((oldItems) => {
      return oldItems.filter((arrElem, index) => {
       return index !== id;
      });
    });

    localStorage.setItem("items",JSON.stringify([Items.filter((arrElem, index) => {
      return index !== id;
    })]));

  };

  const editItem = (id, editValue) => {

    setItems((oldItems) => {
      return oldItems.map((arrElem, index) => {
       if(index === id) {
         return editValue;
       }
       return arrElem;
      });
    });

    localStorage.setItem("items",JSON.stringify([Items.map((arrElem, index) => {
      if(index === id) {
        return editValue;
      }
      return arrElem;
     })]));
  }

  

  return (
    <>
      <div className="main_div">
        <div className="center_div">
        <br/>
        <h1> TODO List </h1>
        <input type="text" placeholder="Add a Items"
          value={inputList}
          onKeyPress={onKeyPress}
          onChange={itemEvent} /> 
        <button onClick={listOfItems}> + </button>

        <ol>
          {/* <li> {inputList} </li> */}

          {Items && Items.map((itemval, index) => {
           return <ToDolists
           key={index}
           id={index}
           text={itemval}
             onSelect={deleteitems}
             onEdit = {editItem}
           />;
          })}

        </ol>
        </div>
      </div>
    </>
  );
};

export default App;