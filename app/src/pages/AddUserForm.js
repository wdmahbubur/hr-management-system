import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUserForm = () => {
    const [user, setUser] = useState({}); // store user in this state
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleInput = (e) => {  // set data in user state object
        const field = e.target.id;
        const value = e.target.value;
        const newUser = { ...user };
        newUser[field] = value;
        setUser(newUser);
    }

    const submitUser = (e) => {
        e.preventDefault();  // prevent default behavior of form submit
        setIsLoading(true);

        // send user to api
        const sendUser = async () => {
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            if (data.user) {
                alert(data.message)
                setIsLoading(false)
                navigate("/")
            }
        }
        sendUser();
    }
    return (
        <div className='container'>
            <h3 className="text-center mt-2">Add New Employee</h3>
            <form className="w-75 mx-auto" onSubmit={submitUser}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName" placeholder="Enter Your First Name" required onChange={handleInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="lastName" placeholder="Enter Your Last Name" required onChange={handleInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter Your Email Address" required onChange={handleInput} />
                </div>
                <button className={`btn btn-success ${isLoading && "disabled"}`}>Submit</button>
            </form>
        </div>
    );
};

export default AddUserForm;