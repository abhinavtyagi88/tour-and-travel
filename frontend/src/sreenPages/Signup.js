import React, { useState } from 'react';

function  SignUp() {

  const myStyle = {
    padding: "0px",  
    backgroundColor: "lightblue", 
  };
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
    < >
    
    <div style={myStyle}>
      <div className="overflow-hidden" >
        <center><h1>TOUR & TRAVEL</h1>
        <div className=" container h-100  border border-danger" >
          <div className="col">
            <div className="my-2">
              <div className="row g-0">
                <div className="col-xl-6 d-none d-xl-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                    alt="Sample"
                    style={{
                      // margin:"10vw",
                      height:'90vh',
                      borderRadius:'1vh'
                    }}
                  />
                </div>
                <div className="col-xl-6">
                  <div className="card-body p-md-5 text-black">

                    <form onSubmit={handleSubmit}>
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

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="Email"
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="Password"
                        />
                      </div>

                      <div className="mb-4">
                        <h6 className="mb-3">Gender:</h6>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="female"
                            onChange={handleChange}
                            checked={formData.gender === 'female'}
                          />
                          <p className="form-check-label fw-normal">Female</p>
                        </div>
                      
                         <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="male"
                            onChange={handleChange}
                            checked={formData.gender === 'male'}
                          />
                          <p className="form-check-label fw-normal">Male</p>
                        </div>
                      
                         <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="other"
                            onChange={handleChange}
                            checked={formData.gender === 'other'}
                          />
                          <p className="form-check-label fw-normal">Other</p>
                        </div>
                       </div>


                      <div className="form-outline mb-4">
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="Address"
                        />
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="form-select"
                          >
                            <option value="">Select State</option>
                            <option value="State 1">State 1</option>
                            <option value="State 2">State 2</option>
                          </select>
                        </div>
                        <div className="col-md-6 mb-4">
                          <select
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="form-select"
                          >
                            <option value="">Select City</option>
                            <option value="City 1">City 1</option>
                            <option value="City 2">City 2</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="Pincode"
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          name="preferredDestinations"
                          value={formData.preferredDestinations}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="Preferred Travel Destinations"
                        />
                      </div>

                      <div className="form-outline mb-4">
                      <select
    name="travelFrequency"
    value={formData.travelFrequency}
    onChange={handleChange}
    className="form-select"
  >
    <option value="">Select Travel Frequency</option>
    <option value="Daily">Daily</option>
    <option value="Weekly">Weekly</option>
    <option value="Monthly">Monthly</option>
    <option value="Yearly">Yearly</option>
    <option value="Occasionally">Occasionally</option>
                      </select>
                      </div>



                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="Budget (e.g., $1000)"
                        />
                      </div>

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
      </div>
    </>
  );
}

export default  SignUp;


