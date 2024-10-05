import React, { useEffect } from 'react';
import './HomePage.css'
import Navbar from '../components/Navbar';


function Home() {
  

  return (
    <>
      <Navbar/>
      <div className='row'>
        <div className='col-3'>
          <div className='user-card'>
            <div className='bg-dark'>Bg-image</div>
            <div className='bg-light user-profile d-flex justify-content-center ' id='#profile-picture'>
              <img src='https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1727913600&semt=ais_hybrid' height={100}/>
            </div>
            
              <div className='b d-flex justify-content-center'>UserName</div>
              <div className='b d-flex justify-content-center'>Bio</div>

              <div className=''>
              <h6>Visited-places</h6>
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li>...</li>

                </ul>

              </div>

              


          </div>
        </div>
        <div className='col-6'>
          <div className='bg-warning'>
            <div className=''>
              <h3>Write post</h3>
              <textarea className='form-control' id='exampleFormControlTextarea1' rows='3'></textarea>

            </div>
            <div className='post '>
              <div className='col -2 bg-secondary rounded-3'>
                <div className='row p-2' >
                  <img  className='col-2 profile' src='https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1727913600&semt=ais_hybrid' height={80} width={100}/>
                  <div className='col-10 p-1'>
                    <h6 className='fs-6 post-profile-text'>Name</h6>
                    <h6 className='fs-6 post-profile-text'>bio</h6>
                  </div>


                  </div>
                <div className='desc p-1'>Description</div>
                <img className='post-img' src='https://imageplaceholder.net/356x200/eeeeee/ffffff?tag=Summer+beach'/>

                <div className='row d-flex justify-content-around post-reaction'>
                <button className='badge col-3 bg-dark '>like</button>
                <button className='badge col-3 bg-dark'>like</button>
                <button className='badge col-3 bg-dark'>like</button>

                
              </div>
              </div>
              
              

            </div>
            
          </div>
        </div>        
        <div className='col-1'></div>
        <div className='col-2'>right</div>
      </div>
    </>
  )
}

export default Home
