import React, { useState, useEffect } from 'react';

function Group(props) {
  // Define the user state at the component level
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {};
  });

  const handleJoinTeam = async () => {
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`http://localhost:4000/api/teams/join`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          userId: user.id,  // Use user ID from state
          teamId: props.teamId, // Use teamId from props
          // Optionally, you can add joinCode if needed
          // joinCode: props.joinCode 
        }),
      });

      const result = await response.json();
      if (response.ok) { // Check for success using .ok
        alert(`Successfully joined team!`);
        console.log(result); // Log response for debugging
      } else {
        alert('Failed to join team: ' + result.message);
      }
    } catch (error) {
      console.error('Error joining team:', error);
      alert('An error occurred while trying to join the team.');
    }
  };

  return (
    <div className="card m-1">
      <div className="card-body row ">
        <div className='col-4'>
              <h3>{props.teamName}</h3>
              <p>{props.desc}</p>

        </div>
        <div className='col-8'>
          {/* <img  src={props.imageUrl || "https://i.pinimg.com/564x/23/de/3d/23de3d0f665586c21b7976264e1b3676.jpg"} alt="card-group-img" style={{
            "object-fit": "cover",
            "width": "400px",
            "height": "100px"
          }} />  */}

        </div>

      </div>

      <button onClick={handleJoinTeam}>Request to Join</button>
    </div>
  );
}

export default Group;
