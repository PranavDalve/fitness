import React, { useContext, useState } from "react";
import axios from 'axios';

import DevContext from "./DietContext";
const host = process.env.HOST;

const DietState = (props) => {

    const Dietintial = [];
    const [diets, setdiets] = useState([]);
    const [mydiets, setmydiets] = useState([]);

    // function to fetch all the developers from the database.
    const getdiet = async () => {
        const response = await fetch('https://punegym.onrender.com/api/v1/getalldiet', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authtoken': localStorage.getItem('authtoken')
            }
        })
        const json = await response.json();
        console.log(json);
        setdiets(json);
    }
    // add developer
    const adddiet = async (name, email, contactNum, description) => {
        const response = await fetch(`https://punegym.onrender.com/api/v1/adddiet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authtoken': localStorage.getItem('authtoken')

            },
            body: JSON.stringify({ name, email, contactNum, description })
        })
        const diet = await response.json();
        console.log("Adding a  developer profile. ");
        setdiets(diets.concat(diet));
        props.showAlert("Added Successfully","success");

    }
    // delete developer
    const deletediet = async (id) => {
        const response = await fetch(`https://punegym.onrender.com/api/v1/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authtoken': localStorage.getItem('authtoken')
            },
        });
        const json = await response.json();
        console.log(json);
        const newdiet = diets.filter((diet) => { return diet._id !== id });
        setdiets(newdiet);
        props.showAlert("Deleted Successfully","danger");
    }
    // update developer
    const updatediet = async (id,name,email,contactNum,description) => {
        const response = await fetch(`https://punegym.onrender.com/api/v1/updateprofile/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authtoken': localStorage.getItem('authtoken')
            },
            body:JSON.stringify({name,email,contactNum,description})
        })
        const json = await response.json();
        let newdiets = JSON.parse(JSON.stringify(diets));
        for(let index=0;index<newdiets.length;index++){
            const element = newdiets[index];
            if(element._id===id){
                newdiets[index].name =name;
                newdiets[index].email = email;
                newdiets[index].contactNum = contactNum;
                newdiets[index].description = description;
    
                break;
            }
        }
        setdiets(newdiets);
        props.showAlert("Updated Successfully","success");
    }












    // Routes handling for the requirements entity. 
    const reqintial = [];
    const [reqs, setreqs] = useState(reqintial)
    // const getreq = async () => {
    //     const response = await fetch('https://punegym.onrender.com/api/v1/getallrequire', {
    //         // const response = await fetch('http://localhost:5000/api/v1/getallrequire', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'authtoken': localStorage.getItem('authtoken')
    //         }
    //     })
    //     const json = await response.json();
    //     console.log(json);
    //     setreqs(json);
    // }

    // const addrequire = async (Title, Technologies, description, deadline, email, contactNum) => {
    //     const response = await fetch(`https://punegym.onrender.com/api/v1/addrequire`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'authtoken': localStorage.getItem('authtoken')

    //         },
    //         body: JSON.stringify({ Title, Technologies, description, deadline, email, contactNum })
    //     })
    //     const req = await response.json();
    //     console.log("Adding a  Requirement profile");
    //     setreqs(reqs.concat(req));
    // }
    // const UpdateReq = async (id, Title, Technologies, description, deadline, email, contactNum) => {

    //     const response = await fetch(`https://punegym.onrender.com/api/v1/updatereq/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'authtoken': localStorage.getItem('authtoken')
    //         },
    //         body: JSON.stringify({ Title, Technologies, description, deadline, email, contactNum })
    //     })
    //     const json = await response.json();
    //     let newreq = JSON.parse(JSON.stringify(json));

    //     for (let index = 0; index < newreq.length; index++) {
    //         const element = newreq[index];
    //         if (element._id === id) {
    //             newreq[index].Title = Title;
    //             newreq[index.description] = description;
    //             newreq[index.deadline] = deadline;
    //             newreq[index.email] = email;
    //             newreq[index.contactNum] = contactNum;
    //             break;
    //         }
    //         setreqs(newreq);
    //     }
    // }















    
    // myrequirements : 
    // const deletereq = async(id)=>{
    //     const response = await fetch(`https://punegym.onrender.com/api/v1/deletereq/${id}`,{
    //       method: 'DELETE',
    //       headers: {
    //           'Content-Type': 'application/json',
    //           'authtoken': localStorage.getItem('authtoken')
    //       }
          
    //     })
    //     const json = await response.json();
    //     console.log(json);
    //     const newmyreq = reqs.filter((req)=>{return req._id!==id});
    //     setreqs(newmyreq)
    //     setmyreqs(newmyreq)
    //     // props.showAlert("Deleted Successfully","success");
    //   }


      //get my requirements ; 
//       const getmyreq = async () => {
//         const response = await fetch('https://punegym.onrender.com/api/v1/getmyreq', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'authtoken': localStorage.getItem('authtoken')
//           }
//         })
//         const json = await response.json();
//         console.log(json);
//         setmyreqs(json);
//       }
//       // update my requirements. 
//     const updatemyreq = async (id, Title, Technologies, description, deadline, email, contactNum) => {
//     // localhost:5000/api/v1/updatereq/6360c04378854a0264692e1d
//     const response = await fetch(`https://punegym.onrender.com/api/v1/updatereq/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'authtoken': localStorage.getItem('authtoken')
//       },
//       body: JSON.stringify({ Title, Technologies, description, deadline, email, contactNum })
//     })
//     const json = await response.json();
//     let newmyreq = JSON.parse(JSON.stringify(json));
//     for (let index = 0; index < newmyreq.length; index++) {
//       const element = newmyreq[index];
//       if (element._id === id) {
//         newmyreq[index].Title = Title;
//         newmyreq[index].Technologies = Technologies;
//         newmyreq[index].description = description;
//         newmyreq[index].deadline = deadline;
//         newmyreq[index].email = email;
//         newmyreq[index].contactNum = contactNum;
//       }
//     }
//     setmyreqs(reqs);
//   }

  
    return (
        <div>
            <DevContext.Provider value={{getdiet , diets, adddiet,deletediet,updatediet}}>
                {props.children}
            </DevContext.Provider>
        </div>
    )
}


export default DietState;