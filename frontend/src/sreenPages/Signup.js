import React, { useState } from 'react';

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    dob: '',
    address: '',
    state: '',
    city: '',
    pincode: '',
    preferredDestinations: '',
    travelFrequency: '',
    budget: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);

    // Send POST request to signup API
    try {
      const response = await fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Convert formData to JSON string
      });

      const data = await response.json();
      if (response.ok) {
        console.log('User created successfully:', data);
        // Optionally redirect or do something after successful signup
      } else {
        console.error('Error creating user:', data);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      gender: '',
      dob: '',
      address: '',
      state: '',
      city: '',
      pincode: '',
      preferredDestinations: '',
      travelFrequency: '',
      budget: '',
    });
  };

  return (
    <>
      <div className="overflow-hidden ">
        <center>
          <h1>TOUR & TRAVEL</h1>
          <div className="row d-flex justify-content-center align-items-center h-100 container border border-danger">
            <div className="col">
              <div className="my-4">
                <div className="row g-0">
                  <div className="col-xl-6 d-none d-xl-block">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                      alt="Sample"
                      style={{
                        margin: "10vw",
                        height: '90vh',
                        borderRadius: '1vh'
                      }}
                    />
                  </div>
                  <div className="col-xl-6">
                    <div className="card-body p-md-5 text-black">
                      <form onSubmit={handleSubmit}>
                        {/* Your existing form fields go here */}
                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="form-control form-control-lg"
                                placeholder="First Name"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="form-control form-control-lg"
                                placeholder="Last Name"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Other form fields continue... */}

                        <div className="d-flex justify-content-end pt-3">
                          <button
                            type="button"
                            onClick={handleReset}
                            className="btn btn-light btn-lg"
                          >
                            Reset all
                          </button>
                          <button
                            type="submit"
                            className="btn btn-warning btn-lg ms-2"
                          >
                            Submit form
                          </button>
                        </div>
                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </center>
      </div>
    </>
  );
}

export default SignUp;
