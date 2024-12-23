import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Group(props) {
  // Define the user state at the component level
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {};
  });

  // Handle the join team action
  const handleJoinTeam = async () => {
    const token = localStorage.getItem("token");
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

  // Handle the delete team action
  const handleDeleteTeam = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:4000/api/team/${props.teamId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      });

      const result = await response.json();
      if (response.ok) { // Check for success using .ok
        alert(`Team deleted successfully!`);
        console.log(result); // Log response for debugging
      } else {
        alert('Failed to delete team: ' + result.message);
      }
    } catch (error) {
      console.error('Error deleting team:', error);
      alert('An error occurred while trying to delete the team.');
    }
  };

  // Log user and createdBy props to verify the condition
  console.log('User ID:', user.id);
  console.log('Created By:', props.createdBy);

  return (
    <div className="card m-1">
      <div className="card-body row">
        <div className='col-4'>
          
         <Link to={`/teams/${props.teamId}`}>
            <h3>{props.teamName}</h3>
         </Link>
          
          <p>{props.desc}</p>
        </div>
        <div className='col-8'>
          {/* Optional: Add an image here if needed */}
        </div>
      </div>

      <button onClick={handleJoinTeam}>Request to Join</button>

      {/* Only show the delete button if the user is the creator of the team */}
      {user.id === props.createdBy ? (
        <button onClick={handleDeleteTeam}>Delete Team</button>
      ) : (
        <p>You are not authorized to delete this team.</p>
      )}
    </div>
  );
}

export default Group;
