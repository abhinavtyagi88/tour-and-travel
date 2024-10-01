import React from "react";
// import { Link } from 'react-router-dom'; 


const profile = () => {
  return (
    <>
     <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
      <div className="card p-4">
        <div className="image d-flex flex-column justify-content-center align-items-center">
          <button className="rounded-5">
            <img className="rounded-5"
              src="https://previews.123rf.com/images/kritchanut/kritchanut1407/kritchanut140700335/29898193-male-avatar-profile-picture-vector-icon.jpg"
              height="100"
              width="100"
              alt="Profile"
            />
          </button>
          <span className="name mt-3">Eleanor Pena</span>
          <span className="idd">@eleanorpena</span>
          <div className="d-flex flex-row justify-content-center align-items-center gap-2">
            <span className="idd1">Oxc4c16a645_b21a</span>
            <span>
              <i className="fa fa-copy"></i>
            </span>
          </div>
          <div className="d-flex flex-row justify-content-center align-items-center mt-3">
            <span className="number">
              1069 <span className="follow">Followers</span>
            </span>
          </div>
          <div className="d-flex mt-2">
            <button className="btn1 btn-dark">Edit Profile</button>
          </div>
          <div className="text mt-3">
            <span>
              Eleanor Pena is a creator of minimalistic x bold graphics and digital artwork.
              <br />
              <br />
              Artist/ Creative Director by Day #NFT minting@ with FND night.
            </span>
          </div>
          <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
            <span>
              <i className="fa fa-twitter"></i>
            </span>
            <span>
              <i className="fa fa-facebook-f"></i>
            </span>
            <span>
              <i className="fa fa-instagram"></i>
            </span>
            <span>
              <i className="fa fa-linkedin"></i>
            </span>
          </div>
          <div className="px-2 rounded mt-4 date">
            <span className="join">Joined May, 2021</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default profile                



