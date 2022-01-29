import axios from 'axios';
import React, { useState } from 'react';

const UploadCSV = ({ setSuccess, setIsLoading }) => {

    const [file, setFile] = useState(); // store file in this state

    const saveFile = (e) => { // save file to state
        setFile(e.target.files[0]);
    }

    // upload csv file to api
    const uploadCSVFile = (e) => {
        setSuccess(false);
        e.preventDefault(); // prevent default behavior of form submit
        setIsLoading(true);

        const formData = new FormData();   // create new form data
        formData.append("file", file);

        // send file to api
        const upload = async () => {
            await axios.post('http://localhost:5000/api/users/upload', formData)
                .then(res => {
                    if (res.data) { // if data is returned
                        alert(res.data.message);
                        setSuccess(true);
                    }
                })
                .catch(err => { // if error
                    alert(err.message);
                })
                .finally(() => setIsLoading(false))
        }

        upload(); // call upload function

    }
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Upload CSV File</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={uploadCSVFile} >
                        <div className="modal-body">
                            <input type="file" className='form-control' name='files' accept='.csv' onChange={saveFile} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Upload</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default UploadCSV;