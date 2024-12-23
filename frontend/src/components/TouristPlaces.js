import React, { useEffect, useState } from 'react';

const TouristPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    const token =localStorage.getItem('token'); 
    
    const fetchTouristPlaces = async () => {
      try {
          const response = await fetch('http://localhost:4000/api/touristPlace/India', {
              headers: {
                  'Authorization': token  // Send token directly without 'Bearer'
              }
          });
          if (!response.ok) {
              throw new Error('Failed to fetch');
          }
          const data = await response.json();
          
          console.log(data[0][0].places);
          setPlaces(data[0][0].places);
          setLoading(false);
      } catch (err) {
          setError(err.message);
          setLoading(false);
      }
  };
  
    fetchTouristPlaces();
  }, []);

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    <div>
      <h1>Tourist Places in India</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {places.map((element, index) => (
          <div className='shadow' key={index} style={{ margin: '20px', border: '1px solid #ccc', padding: '10px', width: '18vw' }}>
            <h2>{element.place}</h2>
            <img src={element.image} alt={element.place} style={{ width: '100%', height: 'auto' }} />
            <p>{element.description}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default TouristPlaces;
