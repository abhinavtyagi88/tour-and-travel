import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import "./Home.css";
import Group from "../components/Group";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    height: '60vh',
    overflow: 'hidden',
  },
};

Modal.setAppElement('#root');  // Adjust to your root element ID

function Home(props) {

  const getUserFromLS = () => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    
    try {
      return user ? JSON.parse(user) : {};
    } catch (error) {
      console.error("Invalid user data in localStorage:", error);
      return {};
    }
  };

  const green = "#28a745";

  const [modalIsOpen, setIsOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [addImage, setAddImage] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // Handle image change and upload to Cloudinary
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "your_upload_preset");  // Replace with your Cloudinary preset

      try {
        const response = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        setAddImage(data.secure_url); // Store the secure URL for API request
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Image upload failed.");
      }
    }
  };

  // Handle create team form submission
  const handleCreateTeam = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");  // Ensure token is fetched
    try {
      const response = await fetch('http://localhost:4000/api/team', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token  
        },
        body: JSON.stringify({
          teamName,
          description: teamDescription,
          image_url: addImage,  // Send the image URL to backend
          createdBy: props.id,  // Replace with actual user ID
          privacy,
        }),
      });

      const result = await response.json();
      if (response.status === 201) {
        alert(`Team created successfully! Join code: ${result.joinCode}`);
        console.log(result);
      } else {
        alert('Failed to create team: ' + result.message);
      }

      setIsOpen(false);
      setTeamName('');
      setTeamDescription('');
      setAddImage('');
    } catch (error) {
      console.error('Error creating team:', error);
      alert('An error occurred while creating the team.');
    }
  };

  // Handle join team functionality
  const handleJoinTeam = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch('http://localhost:4000/api/teams/join', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          userId: props.id,  // Replace with actual user ID
          joinCode, // Use joinCode directly
        }),
      });

      const result = await response.json();
      if (response.status === 200) {
        alert(`Successfully joined team!`);
        console.log(result);
      } else {
        alert('Failed to join team: ' + result.message);
      }
    } catch (error) {
      console.error('Error joining team:', error);
      alert('An error occurred while trying to join the team.');
    }
  };

  // Shuffle groups array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const fetchTouristGroups = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/teams');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setGroups(shuffleArray(data)); // Shuffle and set fetched groups
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTouristGroups();
  }, []); // Fetch data only once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="container" style={{ width: "85vw", height: "90vh" }}>
        <div className="row flex justify-content-between">
          <div
            className="col-4 m-2 d-grid bg-secondary rounded-2"
            style={{ height: "44vh" }}
          >
            <br />
            <input
              type="text"
              name="JoinCode"
              className="row rounded-2 m-2"
              placeholder="Enter Join Code"
              style={{ width: "22vw" }}
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}  // Set the join code for joining
            />
            <br />
            <div className="row m-1 rounded-2">
              <button
              className="btn btn-primary btn-sm m-1"
                onClick={openModal}
                aria-label="Create a new group"
              >
                Create
              </button>
              <button
              className="btn btn-primary btn-sm m-1"
                onClick={handleJoinTeam}
                aria-label="Join a group"
              >
                Join
              </button>
         </div>

          </div>

          <div className="col-7 bg-secondary m-3">
            <h3 className="text-center">Groups</h3>
            <div className="d-flex row justify-content-center p-2">
              {groups.map(group => (
                <Group key={group._id} teamName={group.teamName} desc={group.description} teamId={group._id} />
              ))}
            </div>
          </div>
        </div>

        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
          <h2 className="text-center">Create Group</h2>
          <form onSubmit={handleCreateTeam} className="p-3">
            <div className="mb-1">
              <label htmlFor="teamName" className="form-label">Group Name:</label>
              <input
                type="text"
                id="teamName"
                className="form-control"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
              />
            </div>

            <div className="mb-1">
              <label htmlFor="addImage" className="form-label">Add Image:</label>
              <input
                type="file"
                id="addImage"
                accept="image/*"
                className="form-control"
                onChange={handleImageChange}  // Ensure this triggers the image upload
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="teamDescription" className="form-label">Description:</label>
              <textarea
                id="teamDescription"
                className="form-control"
                value={teamDescription}
                onChange={(e) => setTeamDescription(e.target.value)}
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="privacy" className="form-label">Privacy:</label>
              <select
                id="privacy"
                className="form-select"
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value)}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-success">Create Group</button>
              <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default Home;
