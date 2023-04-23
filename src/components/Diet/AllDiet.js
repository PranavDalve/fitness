import React, { useContext, useEffect, useRef, useState } from 'react'
import DietContext from '../../context/Diets/DietContext';
import Diet from './Diet';
import './AllDiets.css'
import { useNavigate } from 'react-router-dom';

const Alldevelopers = (props) => {
  const context = useContext(DietContext);

  const ref = useRef(null);
  const refclose = useRef(null);

  const navigate = useNavigate();
  const { getdiet, diets, updatediet } = context;
  const [diet, setdiet] = useState({ id: "", eename: "", eecontact: "", eedescr: "", date: "" });
  const [flag,setflag] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('authtoken')) {
      getdiet();
    }
    else {
      navigate('/login')
    }
  }, [])

  const updateDiet = (curdiet) => {
    ref.current.click();
    setdiet({ id: curdiet._id, eename: curdiet.name, eecontact: curdiet.contactNum , eedescr: curdiet.description })
  }
  const handleclick = (e) => {
    updatediet(diet.id, diet.eemail, diet.eecontact, diet.eedescr);
    refclose.current.click();
    props.showAlert("")
  }
  const onchange = (e) => {
    setdiet({ ...diet, [e.target.name]: e.target.value });
  }
  return (
    <>
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
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="eemail" name='eemail' aria-describedby="emailHelp" value={diet.eemail} onChange={onchange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="eedescr" name='eedescr' value={diet.eedescr} onChange={onchange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Github</label>
                  <input type="text" className="form-control" id="egithub" name='egithub' value={diet.egithub} onChange={onchange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleclick} type="button" className="btn btn-primary">Update Dev</button>
            </div>
          </div>
        </div>
      </div>

      <div><h1 className="namee">All Diets</h1></div>
      <div className="container mx-2">
        {diets.length === 0 && "No Developers to Display 🥺🥺🥺"}
      </div>
      {diets.map((diet) => {
        return <Diet key={diet._id} diet={diet} updateDev={updatediet} flag = {flag}/>
      })}
    </>
  )
}

export default Alldevelopers