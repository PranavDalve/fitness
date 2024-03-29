import React, { useState, useEffect, useRef } from 'react'
import Diet from '../components/Diet/Diet'

import UserProfile from '../components/UserProfile/UserProfile';
import DevContext from '../context/Diets/DietContext';

import { useNavigate } from 'react-router-dom';

const DashBoard = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState({ id: "", ename: "", eemail: "" });
  useEffect(() => {
    if (localStorage.getItem('authtoken')) {
      getuser();
    } else {
      navigate('/login')
    }
    console.log(user);
  }, [])


  const UpdateUser = async (name) => {
    const response = await fetch('https://punegym.onrender.com/api/v1/updateprofile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authtoken': localStorage.getItem('authtoken')
      },
      body: JSON.stringify({ name })
    })
    const json = await response.json();
    let newuser = JSON.parse(JSON.stringify(json));
    newuser.name = name;
    setuser(newuser);
  }

  const getuser = async () => {
    const response = await fetch('https://punegym.onrender.com/api/v1/veryhelpful', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authtoken': localStorage.getItem('authtoken')
      },
    })
    const json = await response.json();
    console.log(json);
    setuser(json);
  }

  const updateuser = (currentuser) => {
    ref.current.click();
    setuser({ id: currentuser._id, ename: currentuser.name })
  }

  const handleclick = (e) => {
    UpdateUser(user.ename);
    refclose.current.click();
  }

  const onChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })
  }

  const ref = useRef(null);
  const refclose = useRef(null);


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
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="ename" name='ename' value={user.ename} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button className="btn btn-primary" onClick={handleclick} type="button">Update Note</button>
            </div>

          </div>
        </div>
      </div>
      
      <div>
        Hello {user.name} !!!
      </div>

      <div className='center'>
        <div class="col">
          <div class="card h-100">
            {<UserProfile key={user._id} user={user} updateuser={updateuser} />}
          </div>
        </div>
      </div>
    </>
  )
}

export default DashBoard