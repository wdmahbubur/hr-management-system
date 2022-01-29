import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SendMail = () => {
    const [emailContent, setEmailContent] = useState({}); // store subject and body
    const [isLoading, setIsLoading] = useState(false);
    const { email } = useParams(); // get selected user email from url
    const navigate = useNavigate();

    const handleInput = (e) => { // set data in emailContent state object
        const field = e.target.id;
        const value = e.target.value;
        const email = { ...emailContent };
        email[field] = value;
        setEmailContent(email);
    }

    const sendEmail = async (e) => { // send email 
        e.preventDefault();  // prevent default behavior of form submit
        setIsLoading(true);

        const response = await fetch('http://localhost:5000/api/users/send-mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, ...emailContent })
        });
        const data = await response.json();

        if (data.message) {
            setIsLoading(false)
            alert(data.message)
            navigate("/")
        }
        if (data.error) {
            setIsLoading(false)
            console.error(data.error);
            alert("Mail not sent, something wrong. Try again later!")
        }
    }

    return (
        <div className='container'>
            <h3 className="text-center mt-2">Send Email</h3>
            <form className="w-75 mx-auto" onSubmit={sendEmail}>
                <div className="mb-3">
                    <label htmlFor="userEmail" className="form-label">To</label>
                    <input type="text" className="form-control" id="userEmail" defaultValue={email} disabled />
                </div>
                <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input type="text" className="form-control" id="subject" placeholder="Subject" required onChange={handleInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="body" className="form-label">Message</label>
                    <textarea rows={3} className="form-control" id="body" placeholder="Message" required onChange={handleInput} />
                </div>
                <button className={`btn btn-success ${isLoading && "disabled"}`}>Submit</button>
                {isLoading && <h6>Mail Sending...Please wait!</h6>}
            </form>
        </div>
    );
};

export default SendMail;