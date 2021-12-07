import React,{useState,useEffect} from 'react'
import "./style.css";
const getLocalData=(()=>{
    const lists=localStorage.getItem("mytodolist");
    if(lists){
        return JSON.parse(lists);
    } else {
    return [];
  }
});
const Todo = () => {
    const [myData, setMyData] = useState("");
    const [myItems, setMyItems] = useState(getLocalData());
    const [editItem,setEditItem] = useState("")
    const [toggle,setToggle] = useState(false)
    const addItems=()=>{
        if(!myData){
            alert("fill todo item ggg");
        }
        else if (myData && toggle) {
            setMyItems(
              myItems.map((curElem) => {
                if (curElem.id === editItem) {
                  return { ...curElem, name: myData};
                }
                return curElem;
              })
            );
      
            setMyData("");
            setEditItem(null);
            setToggle(false);}
        else{
            const newData={id:new Date().getTime().toString(),name:myData};
            setMyItems([...myItems,newData]);
            setMyData("");
        }
    };
    const deleteItem=(index)=>{
        const updatedItems=myItems.filter((currElem)=>{
            return currElem.id !==index;
        }
        )
        setMyItems(updatedItems)
    };
    const removeAll=()=>{
        setMyItems([])
    }; 
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(myItems));
      }, [myItems]);
    const editItems = (index) => {
        const item_todo_edited = myItems.find((curElem) => {
          return curElem.id === index;
        });
        setMyData(item_todo_edited.name);
        setEditItem(index);
        setToggle(true);
      };
    return (
        <>
        <div className="main-div">
            <div className="child-div">
                <figure>
                 <img src=".\Images\todo.svg" alt="todologo"></img>
                 <figcaption>Add your list here✌</figcaption>
                </figure>
                <div className="addItems">
                    <input type="text" placeholder="✍Add Item"value={myData} onChange={(event)=> setMyData(event.target.value)} className="form-control"></input>
                    {toggle ? (
                    <i className="far fa-edit add-btn" onClick={addItems}></i>
                    ) : (
                    <i className="fa fa-plus add-btn" onClick={addItems}></i>
                    )}
                
                </div>
                {/* show myItems*/}
                <div className="showItems">
                    {myItems.map((curElem) => {
                    return (
                        <div className="eachItem" key={curElem.id}>
                        <h3>{curElem.name}</h3>
                        <div className="todo-btn">
                            <i className="far fa-edit add-btn" onClick={()=>editItems(curElem.id)} ></i>
                            <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(curElem.id)} ></i>
                        </div>
                        </div>
                    );
                    })}
                </div>


                {/* remove all myItems*/}
                <div className="showItems">
                    <button className="btn effect04" data-sm-link-text="Remove" onClick={()=>removeAll()}><span>Check all myItems</span></button>
                </div>

            </div>
        </div>
        </>
    )
}

export default Todo
