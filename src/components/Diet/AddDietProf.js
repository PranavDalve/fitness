import React, { useContext, useState , useEffect } from 'react'
import DietContext from '../../context/Diets/DietContext'
import './AddDietProf.css'
import { useNavigate } from 'react-router-dom';

const AddProf = (props) => {

    const navigate = useNavigate();
    
    useEffect(() => {
        if (localStorage.getItem('authtoken')) {
        }
        else {
          navigate('/login')
        }
      }, [])
    
    const context = useContext(DietContext);
    const { adddiet } = context;
    const [Diet, SetDiet] = useState({ name: "", email: "",  day: "", description: ""});

    const handleclick = (e) => {
        e.preventDefault();
        adddiet(Diet.name, Diet.email, Diet.day, Diet.description);
        SetDiet({ name: "", email: "", day: "", description: "" })
        props.showAlert("Added successfully", "success");
    }
    const onchange = (e) => {
        SetDiet({ ...Diet, [e.target.name]: e.target.value })
    }
    // add the Dieteloper
    return (
        <div>
            <div className='my-3 f'>
                <h1 className='namee'>Add Your Dieteloper Profile</h1>
                <form className='my-3 f'>
                    <div className="my-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" value={Diet.name} onChange={onchange} minLength={5} required />
                    </div>
                    <div className="my-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={Diet.email} onChange={onchange} minLength={5} required />
                    </div>
                    <div className="my-3">
                        <label htmlFor="contactNum" className="form-label">Day</label>
                        <input type="text" className="form-control" id="day" name='day' value={Diet.day} onChange={onchange} minLength={5} required />
                    </div>
                    <div className="my-3">
                        <label htmlFor="contactNum" className="form-label">description</label>
                        <input type="text" className="form-control" id="description" name='description' value={Diet.description} onChange={onchange} minLength={5} required />
                    </div>
                    {/* <button onClick={handleclick},>Add My Dieteloper Profile</button> */}
                    <button type="button" onClick={handleclick} class="btn btn-outline-success">Add My Dieteloper Profile</button>

                </form>
            </div>
        </div>
    )
}

export default AddProf