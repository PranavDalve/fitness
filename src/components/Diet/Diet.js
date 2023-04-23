import React, { useContext } from 'react'
import formatDistance from 'date-fns/formatDistance'
import './Diet.css'
import DietContext from '../../context/Diets/DietContext';
const Diet = (props) => {

    const { Diet, updateDiet } = props;
    const context = useContext(DietContext);
    const datestr = Diet.date;

    const str = formatDistance(
        new Date(datestr),
        new Date()
    );
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const datefinal = new Date(Diet.date).toLocaleString('en-US',options, {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric'
        });

    const {deleteDiet} = context;
    return (
        <div className="maindev">
            <div className="maindev card  text-center">
                <div className=" card-header   navbar-light na" >
                    {Diet.role}
                </div>
                <div class="card-body">
                    <h5 class="card-title ">{Diet.name}</h5>
                    <p class="card-text">{Diet.description}</p>
                    <h6>{Diet.email}</h6>
                   
                    <p>{Diet.day}</p>
                    <a href="/" class="btn btn-outline-dark">Let's make collabration</a>
                    <button className='btn btn-outline-dark'>Let's make collabration</button>
                </div>
                <div>
                  {props.flag &&   <i className="fa-solid fa-trash-can  mx-2" onClick={() => { deleteDiet(Diet._id); props.showAlert("Deleted Successfully","success") }}></i>}
                   {props.flag &&  <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateDiet(Diet); }}></i>}
                </div>
                
            </div>
        </div>
    )
}

export default Diet;



{/* <div class="card-footer text-muted">
                </div> */}
                    {/* {developer.date} */}
                    // {datefinal}
                    {/* {str} */}