import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import Group from "../components/Group";
import "./Home.css";

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

Modal.setAppElement('#root');

function Home() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [addImage, setAddImage] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {};
  });

  // Modal functions
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Handle creating a team
  const handleCreateTeam = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!user || !user.id) {
        alert("User is not logged in.");
        return;
    }

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
          image_url: addImage,
          createdBy: user.id,
          privacy,
        }),
      });

      const result = await response.json();
      if (response.status === 201) {
        alert(`Team created successfully! Join code: ${result.joinCode}`);
        setIsOpen(false);
        setTeamName('');
        setTeamDescription('');
        setAddImage('');
      } else {
        alert('Failed to create team: ' + result.message);
      }
    } catch (error) {
      console.error('Error creating team:', error);
      alert('An error occurred while creating the team.');
    }
  };

  // Handle joining a team
  const handleJoinTeam = async () => {
    const token = localStorage.getItem("token");
    if (!joinCode) {
      alert('Please enter a join code.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/teams/join', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          userId: user.id,  // User ID
          joinCode, // Join code entered by the user
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Successfully joined the team!');
        console.log(result);
      } else {
        alert('Failed to join team: ' + result.message);
      }
    } catch (error) {
      console.error('Error joining team:', error);
      alert('An error occurred while trying to join the team.');
    }
  };

  // Fetch groups on component mount
  useEffect(() => {
    const fetchTouristGroups = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/teams');
        if (!response.ok) {
          throw new Error('Failed to fetch groups');
        }
        const data = await response.json();
        setGroups(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTouristGroups();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="container" style={{ width: "85vw", height: "90vh" }}>
        <div className="row flex justify-content-between">
          {/* Team Join Section */}
          <div className="col-4 m-2 d-grid bg-secondary rounded-2" style={{ height: "44vh" }}>
            <input
              type="text"
              name="JoinCode"
              className="row rounded-2 m-2"
              placeholder="Enter Join Code"
              style={{ width: "22vw" }}
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)} 
            />
            <button className="btn btn-primary btn-sm m-1" onClick={openModal}>
              Create
            </button>
            <button className="btn btn-primary btn-sm m-1" onClick={handleJoinTeam}>
              Join
            </button>
          </div>

          {/* Displaying Groups */}
          <div className="col-7 bg-secondary m-3">
            <h3>Groups</h3>
            <div className="d-flex row justify-content-center p-2">
              {groups.map(group => (
                <Group key={group._id} teamName={group.teamName} desc={group.description} teamId={group._id} createdBy={user.id} />
              ))}
            </div>
          </div>
        </div>

        {/* Create Team Modal */}
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
          <h2>Create Team</h2>
          <form onSubmit={handleCreateTeam}>
            <div className="mb-1">
              <label htmlFor="teamName" className="form-label">Team Name:</label>
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
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("upload_preset", "your_upload_preset"); // Replace with your preset
                    fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
                      method: "POST",
                      body: formData,
                    })
                    .then(res => res.json())
                    .then(data => setAddImage(data.secure_url))
                    .catch(err => alert("Image upload failed"));
                  }
                }}
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
              <button type="submit" className="btn btn-success">Create Team</button>
              <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default Home;
