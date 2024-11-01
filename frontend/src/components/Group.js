import React, { useState, useEffect } from 'react';

function Group(props) {
  // Define the user state at the component level
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {};
  });

  const handleJoinTeam = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/teams/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
    <div className="card m-2">
      <img src={props.imageUrl || "default-image-url.jpg"} alt="card-group-img" /> {/* Add a default image URL */}
      <h3>{props.teamName}</h3>
      <p>{props.desc}</p>
      <button onClick={handleJoinTeam}>Request to Join</button>
    </div>
  );
}

export default Group;
