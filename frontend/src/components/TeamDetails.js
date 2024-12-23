import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

function TeamDetails() {

    // const { teamId } = useParams();
    // console.log("Team ID from URL:", teamId);
    // console.log("NOTHING");
 const teamId = "676960a0df9a375577a93e5c"
 console.log("Team ID from URL:", teamId);
 
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("Current route:", window.location.pathname);

  useEffect(() => {
    // Fetch team details from backend API
  console.log(teamId);
   

    const fetchTeamDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/teams/${teamId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch team details.');
        }
        const data = await response.json();
        console.log(data);
        
        setTeamData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTeamDetails();
  }, [teamId]);

  if (loading) return <p>Loading team details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h1>Team Details</h1>
      {teamData ? (
        <div>
          <h2>{teamData.name}</h2>
          <p><strong>Location:</strong> {teamData.location}</p>
          <p><strong>Founded:</strong> {teamData.founded}</p>
          <p><strong>Manager:</strong> {teamData.manager}</p>
          <p><strong>Description:</strong> {teamData.description}</p>
        </div>
      ) : (
        <p>Team details not available.</p>
      )}
    </div>
  );
}

export default TeamDetails;
