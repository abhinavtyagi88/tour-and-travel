import React, { useState } from "react";
import axios from "axios";

const Profile = () => {
  const getUserFromLS = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  const [preview, setPreview] = useState("");
  const [user, setUser] = useState(getUserFromLS());

  // const userID = localStorage.getItem
  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!preview) return;
  
    try {
      const res = await axios.put("http://localhost:4000/api/profileImg", {
        userId: user.id,
        image_url: preview,
      });
  
      console.log(res);
      if (res.data.imageUrl) {
        // Update local state and localStorage with new image URL
        const updatedUser = { ...user, img: res.data.imageUrl };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser)); // Update localStorage
      }
    } catch (error) {
      console.error("Error in client:", error);
      alert("Failed to upload the image. Please try again.");
    }
  };
  


  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("Result", reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
      <div className="card p-4">
        <div className="image d-flex flex-column justify-content-center align-items-center">
          <img
            className="rounded-5"
            src={
              preview ||
              user.img ||
              "https://previews.123rf.com/images/kritchanut/kritchanut1407/kritchanut140700335/29898193-male-avatar-profile-picture-vector-icon.jpg"
            }
            height="100"
            width="100"
            alt="Profile"
          />
          <span className="name mt-3">{user.firstName + " " + user.lastName}</span>
          <span className="idd">{user.email}</span>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-3"
          />
          <button className="btn btn-dark mt-2" onClick={handleImageUpload}>
            Upload New Profile Picture
          </button>

          <div className="text mt-3">
            <span>
              {user.firstName} is a travel enthusiast exploring new destinations.
            </span>
          </div>
          <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
            <span>
              <i className="fa fa-twitter" title="Twitter"></i>
            </span>
            <span>
              <i className="fa fa-facebook-f" title="Facebook"></i>
            </span>
            <span>
              <i className="fa fa-instagram" title="Instagram"></i>
            </span>
            <span>
              <i className="fa fa-linkedin" title="LinkedIn"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
