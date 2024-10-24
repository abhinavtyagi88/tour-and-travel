import React, { useState } from 'react';

function GuideForm() {
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
    aadhar: '',
    TouristPlaces: '',
    ChargesperDay: '',
    ChargesperHour: '',
    Services: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/guides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create guide');
      }

      const data = await response.json();
      console.log('Guide created successfully:', data);
      // Handle successful form submission (e.g., reset form, navigate, etc.)
    } catch (error) {
      console.error('Error creating guide:', error);
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
      aadhar: '',
      TouristPlaces: '',
      ChargesperDay: '',
      ChargesperHour: '',
      Services: ''
    });
  };

  return (
    <div className="container">
      <h3 className="mb-4">Guide Registration Form</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="form-control"
            placeholder="First Name"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="form-control"
            placeholder="Last Name"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Email"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Password"
            required
          />
        </div>

        <div className="mb-3">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control"
            placeholder="Address"
            required
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="form-control"
              placeholder="State"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="form-control"
              placeholder="City"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="form-control"
            placeholder="Pincode"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="aadhar"
            value={formData.aadhar}
            onChange={handleChange}
            className="form-control"
            placeholder="Aadhar"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="TouristPlaces"
            value={formData.TouristPlaces}
            onChange={handleChange}
            className="form-control"
            placeholder="Tourist Places (optional)"
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              type="number"
              name="ChargesperDay"
              value={formData.ChargesperDay}
              onChange={handleChange}
              className="form-control"
              placeholder="Charges per Day"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              type="number"
              name="ChargesperHour"
              value={formData.ChargesperHour}
              onChange={handleChange}
              className="form-control"
              placeholder="Charges per Hour"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="Services"
            value={formData.Services}
            onChange={handleChange}
            className="form-control"
            placeholder="Services Provided"
            required
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="button" onClick={handleReset} className="btn btn-secondary">
            Reset
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default GuideForm;
