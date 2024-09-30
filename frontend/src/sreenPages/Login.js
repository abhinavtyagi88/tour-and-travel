import React, { useState } from "react";

const LoginPage = () => {
  // State to store email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log( data );

      
      if (response.ok) {
        // Handle successful login
        console.log("Login successful", data);
        // Redirect or show success message
      } else {
        // Handle login error
        setErrorMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row no-gutter">
        {/* The image half */}
        <div className="col-md-6 d-none d-md-flex bg-image"></div>

        {/* The content half */}
        <div className="col-md-6 bg-light">
          <div className="login d-flex align-items-center py-5">
            {/* Demo content */}
            <div className="container">
              <div className="row">
                <div className="col-lg-10 col-xl-7 mx-auto">
                  <h3 className="display-4">Split page!</h3>
                  <p className="text-muted mb-4">
                    Create a login split page using Bootstrap 4.
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <input
                        id="inputEmail"
                        type="email"
                        placeholder="Email address"
                        required
                        autoFocus
                        className="form-control rounded-pill border-0 shadow-sm px-4"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Handle email input
                      />
                    </div>
                    <div className="form-group mb-3">
                      <input
                        id="inputPassword"
                        type="password"
                        placeholder="Password"
                        required
                        className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Handle password input
                      />
                    </div>
                    <div className="custom-control custom-checkbox mb-3">
                      <input
                        id="customCheck1"
                        type="checkbox"
                        defaultChecked
                        className="custom-control-input"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheck1"
                      >
                        Remember password
                      </label>
                    </div>
                    {errorMessage && (
                      <div className="alert alert-danger">{errorMessage}</div>
                    )}
                    <button
                      type="submit"
                      className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                    >
                      Sign in
                    </button>
                    <div className="text-center d-flex justify-content-between mt-4">
                      <p>
                        Snippet by{" "}
                        <a
                          href="https://bootstrapious.com/snippets"
                          className="font-italic text-muted"
                        >
                          <u>Bootstrapious</u>
                        </a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* End */}
          </div>
        </div>
        {/* End */}
      </div>
    </div>
  );
};

export default LoginPage;
