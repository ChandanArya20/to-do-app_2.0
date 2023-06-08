import todo from '../images/todo.svg'
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from 'react';

//getting data from local storage
const getLocalItems=()=>{
    let items=localStorage.getItem('items');
    if(items)
        return JSON.parse(items)
    else
        return []
}
function TodoApp(){

    //states
    const [inputData,setInputData]=useState('')
    const[items,setItems]=useState(getLocalItems())
    const[placeHolder,setPlaceHolder]=useState('✍️add items...')

    const addItem=()=>{
        console.log(inputData);
        if(!inputData){

        }else{
            setItems([...items,inputData])
            setInputData('')
        }
    }
    const deleteItem=(index)=>{
        const filteredArray=items.filter((item,i)=>index!==i)
        setItems(filteredArray)
    }

    //adding data to local storage
    useEffect(()=>{
        localStorage.setItem('items',JSON.stringify(items))
    },[items])

    return(
        <>
        <div className="todoApp">
            <div className='heading'>
                <img src={todo} alt='Ram'/>              
                <h3>Add You List Here✌️</h3>
            </div>
            <div className='inputContainer'>
                <input type='text' placeholder={placeHolder} value={inputData}
                    onChange={event=>setInputData(event.target.value)}
                    onClick={()=>setPlaceHolder('')}
                    onBlur={()=>setPlaceHolder('✍️add items...')}/>
                <div className='inputIcon-container'>
                    <FaPlus className='inputIcon' onClick={addItem}/>
                </div>                    
            </div>
            <div className='item-container'>
            {
                items.map((ele,index)=>(
                    <div className='item' key={index}>
                        <h4>{ele}</h4>
                        <RiDeleteBin6Line className='delete-icon' onClick={()=>deleteItem(index)}/>                    
                    </div>
                ))
            }
           </div>
            {
                items.length > 1 ? (
                    <div className='deleteAllBtn'>
                        <button className='' onClick={()=>setItems([])}>Delete All</button>
                    </div>  
                ) : null                                                    
            }
        </div>
        </>
    )
}

export default TodoApp