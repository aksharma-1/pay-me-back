import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import './App.css';

function App() {

  const [data, updateData]= useState({type:'', friend:'', name:'', date:'', currency:'', amount:''});
  const [expenseData, setExpenseData] = useState([]);

  useEffect(()=>{
    localStorage.setItem('expense',JSON.stringify(expenseData));
  },[expenseData]);

  function inputHandler(e){
      const newData = {...data,[e.target.name]:e.target.value};
      updateData(newData);
  }

  return (
    <>
      <h2 className="title">Pay Me Back</h2>
      <div className="container">

        <div className="input-group">
          <div className="input-col">
            <label htmlFor="type">Type</label>
            <select id="type" className="input" name="type" value={data.type} onChange={inputHandler}>
              <option>--choose one</option>
              <option value="cash">Cash</option>
              <option value="UPI">UPI</option>
            </select>
          </div>
          <div className="input-col">
            <label htmlFor="frnd">Add friend</label> 
            <input type="text" id="frnd" className="input" name="friend" value={data.friend} onChange={inputHandler}/>
          </div>
        </div>

        <div className="input-group">
          <div className="input-col">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" className="input" name="name" value={data.name} onChange={inputHandler}/>
          </div>
          <div className="input-col">
            <label htmlFor="date">Date</label>
            <input type="date" id="date" className="input" name="date" value={data.date} onChange={inputHandler}/>
          </div>
        </div>

        <div className="input-group">
          <div className="input-col">
            <label htmlFor="currency">Currency</label>
            <select id="currency" className="input" name="currency" value={data.currency} onChange={inputHandler}>
              <option>--choose one</option>
              <option value="USD">USD</option>
              <option value="RS">RS</option>
            </select>
          </div>
          <div className="input-col">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" className="input" name="amount" value={data.amount} onChange={inputHandler}/>
          </div>
        </div>

        <button className="submit" onClick={(e)=>{
          let t = localStorage.getItem('expense');
          t=JSON.parse(t);
          const newExpense = { ...data, id: Date.now() }; // Add a unique ID
          setExpenseData([...t, newExpense]);

          updateData({type:'', friend:'', name:'', date:'', currency:'', amount:''}); //It will clear all fields

        }}>Add Expense</button>


      </div>

      {/* TABLE DATA  */}
      <table className="table">
        <thead className="thead">
          <tr>
            <th>Type</th>
            <th>Friend</th>
            <th>Name</th>
            <th>Date</th>
            <th>Currency</th>
            <th>Amount</th>
            <th className="update">Delete</th>
            <th className="update">Update</th>
          </tr>
        </thead>

        <tbody>
          {
            expenseData.map((v,i)=>{
              return(
                <>
                  <tr  key={i}>
                    <td>{v.type}</td>
                    <td>{v.friend}</td>
                    <td>{v.name}</td>
                    <td>{v.date}</td>
                    <td>{v.currency}</td>
                    <td>{v.amount}</td>
                    <td>
                      <FontAwesomeIcon icon={faTrash} size="lg" className="delete"
                        onClick={() => {
                          let t = localStorage.getItem('expense');
                          t = JSON.parse(t);
                          t = t.filter((e) => e.id !== v.id); // Compare using the ID property
                          setExpenseData(t);
                        }}
                      />
                  </td>


                    <td>
                      <FontAwesomeIcon icon={faPencilAlt} size="lg" className="edit"
                      onClick={()=>{
                        let t = localStorage.getItem('expense');
                        t = JSON.parse(t);
                        t = t.filter((e) => e.id !== v.id);
                        setExpenseData(t);
                        updateData(v);
                      }}
                    /></td>
                  </tr>
                </>
              )
            })
          }
        </tbody>
      </table>
    </>
  );
}

export default App;
