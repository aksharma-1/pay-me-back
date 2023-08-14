import React, { useEffect, useState } from "react";

function Localstr(){

    let[names, updateNames]= useState([]);
    let[name, updateName]= useState("");

    useEffect(()=>{
        localStorage.setItem('names',JSON.stringify(names));
    },[names]);
    
    return(
        <>
            {
                names.map((v,i)=>{
                    return(
                        <>
                        <div key={i}>{v}
                         <button onClick={()=>{
                            let t= localStorage.getItem('names');
                            t=JSON.parse(t);
                            t=t.filter((e)=>{
                                return e!==v;
                            });
                            updateNames(t);
                        }}>X</button>
                        <button onClick={()=>{
                            let t=localStorage.getItem("names");
                            t=JSON.parse(t);
                            t=t.filter((e)=>{
                                return e!==v;
                            });
                            updateNames(t);
                            updateName(v);
                        }}>E</button>
                        </div>
                        </>
                    )
                })}
                Enter Name<input type="text" name="name" value={name} onChange={(e)=>{
                    updateName(e.target.value);
                }}/>
                <button onClick={(e)=>{
                    let t=localStorage.getItem("names");
                    t=JSON.parse(t);
                    updateNames([...t, name]);
                }}>ADD</button>
        </>
    )
}

export default Localstr;