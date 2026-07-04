import React ,{useState} from "react";
import noteContext from "./noteContext";

const NoteState = (props) =>{

  const  notesInitial= [
  {
    "_id": "6a48c17b28aa2b7c498dc413",
    "user": "6a48ba0673b37cffe758e4db",
    "title": "my note",
    "description": "This is my first note",
    "tag": "first",
    "date": "2026-07-04T08:16:59.183Z",
    "__v": 0
  },
  {
    "_id": "6a48c1b128aa2b7c498dc414",
    "user": "6a48ba0673b37cffe758e4db",
    "title": "my note 2",
    "description": "This is my second note",
    "tag": "second",
    "date": "2026-07-04T08:17:53.043Z",
    "__v": 0
  }
]
   const [ notes, setnotes]= useState(notesInitial);
    return(

        <noteContext.Provider value = {{notes}}>
             {props.children}
        </noteContext.Provider>
    )
}


export default NoteState;