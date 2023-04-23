import React, { useState, useEffect, useRef, useContext } from 'react'
import Diet from './Diet';
import { useNavigate } from 'react-router-dom';
import './mydiet.css'
const MyProfiles = (props) => {

    const ref = useRef(null);
    const refclose = useRef(null);
    const navigate = useNavigate();

    const [diets, setdiets] = useState([]);
    const [diet, setdiet] = useState({ id: "",eename:"", eemail: "", eeday: "", eedescr: ""});
    const [flag,setflag] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('authtoken')) {
          getprofile();
        }
        else {
          navigate('/login')
        }
      }, [])
    //   const [dev, setdev] = useState({ id: "",eename:"", eemail: "",erole:"", eecontact: "", eedescr: "", egithub: "", elink: "",eresumelink:"",eachievements:"" });
    const updateDiet = (curdiet) => { 
        ref.current.click();
        setdiet({ id: curdiet._id,  eename:curdiet.name , eemail: curdiet.email,eeday: curdiet.day, eedescr: curdiet.description })
    }
    const handleclick = (e) => {
        updateDiet(diet.id, diet.eename,diet.eemail, diet.eeday, diet.eedescr);
        refclose.current.click();
        props.showAlert("Updated Successfully","success");
    }
    const onchange = (e) => {
        setdiet({ ...diet, [e.target.name]: e.target.value });
    }
    const getprofile = async () => {
        const response = await fetch('https://punegym.onrender.com/api/v1/fetchuserprofile', {
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
    const updatediet = async (id, name, email, day, description) => {
        const response = await fetch(`https://punegym.onrender.com/api/v1/updateprofile/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authtoken': localStorage.getItem('authtoken')
            },
            body: JSON.stringify({ name, email, day, description})
        })
        const json = await response.json();
        let newdiets = JSON.parse(JSON.stringify(diets));
        for (let index = 0; index < newdiets.length; index++) {
            const element = newdiets[index];
            if (element._id === id) {
                newdiets[index].name = name;
                newdiets[index].email = email;
                newdiets[index].day = day;
                newdiets[index].description = description;
                break;
            }
        }
        setdiets(newdiets);
    }
    return (
        <div>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form className='my-3'>

                                {/* name */}
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="ename" name='ename' value={diet.eename} onChange={onchange} />
                                </div>
                                {/* email  */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="eemail" name='eemail' aria-describedby="emailHelp" value={diet.eemail} onChange={onchange} minLength={5} required />
                                </div>
                                
                                {/* role */}
                                
                                {/* Contact num */}
                                <div className="mb-3">
                                    <label htmlFor="contactNum" className="form-label">Day</label>
                                    <input type="text" className="form-control" id="eday" name='eday' value={diet.eeday} onChange={onchange} />
                                </div>
                                {/* description  */}
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="eedescr" name='eedescr' value={diet.eedescr} onChange={onchange} minLength={5} required />
                                </div>
    

                                
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleclick} type="button" className="btn btn-primary">Update Diet</button>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className='namee'>My Diet </h1>
            {
                diets.map((diet) => {
                    return <Diet key={diet._id} developer={diet}  updatediet={updatediet} flag = {flag}/>
                })
            }
        </div>
    )
}

export default MyProfiles











// const deletedev = async (id) => {
//     const response = await fetch(`https://developerrvit.onrender.com/api/v1/delete/${id}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//             'authtoken': localStorage.getItem('authtoken')
//         },
//     });
//     const json = await response.json();
//     console.log(json);
//     const newdev = devs.filter((dev) => { return dev._id !== id });
//     setdevs(devs);
// }




// const updateprofile = async(id,name,email,role,contactNum,description,github,linkedin,resumelink,achievements)=>{
//     const response = await fetch('https://developerrvit.onrender.com/api/v1/updateprofile',{
//         method:'PUT' ,
//         headers: {
//             'Content-Type': 'application/json',
//             'authtoken': localStorage.getItem('authtoken')
//         },
//         body:JSON.stringify({name,email,role,contactNum,description,github,linkedin,resumelink,achievements})
//     })
//     const json = await response.json();
//     let newdev = json.parse(json.stringify(profile));
//     for(let index =0;index<newdev.length;index++){
//         const element = newdev[index];
//         if(element._id===id){
//             newdev[index].name = name;
//             newdev[index].email = email;
//             newdev[index].role = role;
//             newdev[index].contactNum = contactNum;
//             newdev[index].description = description;
//             newdev[index].github = github;
//             newdev[index].linkedin = linkedin;
//             newdev[index].resumelink = resumelink;
//             newdev[index].achievements = achievements;
//         }
//     }
//     setprofile(profile);
// }


// const deleteprofile = async (id) => {
//     const response = await fetch(`https://developerrvit.onrender.com/api/v1/delete/${id}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//             'authtoken': localStorage.getItem('authtoken')
//         },
//     })
//     const json = await response.json();
//     console.log(json);
//     const newdev = profile.filter((dev) => { return dev._id !== id });
//     setprofile(newdev);
// }