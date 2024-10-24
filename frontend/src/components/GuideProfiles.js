import React, { useEffect, useState } from 'react';

function GuideProfiles() {
  const [Profile, setProfile] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch data from the API
    const fetchGuides = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/guides', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setProfile(data);
        console.log(data);
        
        setLoading(false); // Data successfully loaded
      } catch (err) {
        setError(err.message);
        setLoading(false); // Loading ends when error occurs
      }
    };

    fetchGuides();
  }, []);

  return (
    <>
      {Loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        Profile.map((e, i) => (
          <div key={i} className='row'>
          <div key={i} className=" col-1 card text-center w-75 m-3">
            <div className="img-avatar">
              <img
                src={e.GuideImg}
                style={{ borderRadius: '50%', width: '10vw' }}
                alt={`${e.firstName} ${e.lastName}`}
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">{e.firstName + " " + e.lastName}</h5>
              <p className="card-text">{e.
TouristPlaces}</p>
              <a href="/" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
          </div>
        ))
      )}
    </>
  );
}

export default GuideProfiles;
