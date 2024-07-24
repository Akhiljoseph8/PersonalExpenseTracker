import React, { useState,useContext } from 'react'
import { createContext } from 'react'

export const addExpenseResponseContext=createContext()
export const editExpenseResponseContext = createContext()
export const deleteExpenseResponseContext = createContext()


function ContextShare({children}) {
    const [addResponse,setAddResponse] = useState("")
    const [editResponse,setEditResponse] = useState("")
    const [deleteResponse,setDeleteResponse] = useState("")
  return (
    <>
    <addExpenseResponseContext.Provider value={{addResponse,setAddResponse}}>
        <editExpenseResponseContext.Provider value={{editResponse,setEditResponse}}>
          <deleteExpenseResponseContext.Provider value={{deleteResponse,setDeleteResponse}}>
            {children}
          </deleteExpenseResponseContext.Provider>
        </editExpenseResponseContext.Provider>
    </addExpenseResponseContext.Provider>
    </>
  )
}

export default ContextShare