import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import UploadCSV from '../components/UploadCSV';

const Home = () => {
    const [users, setUsers] = useState([]);  // store user in this state
    const [totalUsers, setTotalUsers] = useState(); // store total users
    const [selectedUser, setSelectedUser] = useState([]); // store selected user
    const [pagination, setPagination] = useState(0); // set page
    const limit = 5;
    const totalPageNumber = Math.ceil(totalUsers / limit); // total page count
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // fetch users from api
        const fetchUsers = async () => {
            const response = await fetch(`http://localhost:5000/api/users?page=${pagination}&limit=${limit}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setTotalUsers(data.count)
            setUsers(data.users);
        }
        fetchUsers();
    }, [pagination, success]);

    // handle user selection
    const selectUser = (e) => {
        if (e.target.checked) {
            setSelectedUser([...selectedUser, e.target.id]);
        }
        else {
            const newEmail = selectedUser.filter(email => email !== e.target.id);
            setSelectedUser(newEmail);
        }
    }

    return (
        <div className='container'>
            <h2 className='text-center my-2'>Employee List</h2>
            {
                isLoading ? <h2>Loading</h2> : <>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <NavLink className='btn btn-success' to="/add-user">Add New Employee</NavLink>
                            <button type="button" className="btn btn-primary ms-0 ms-md-2 mt-1 mt-md-0" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Upload CSV
                            </button>
                        </div>
                        <NavLink className={`btn btn-primary ${selectedUser.length === 0 && "disabled"}`} to={`/send-mail/${selectedUser}`}>Send Mail</NavLink>
                    </div>
                    <UploadCSV setSuccess={setSuccess} setIsLoading={setIsLoading} />
                    <div className='overflow-scroll mt-2'>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Email Address</th>
                                    <th scope="col">Select</th>
                                </tr>
                            </thead>
                            {
                                users.length > 0 ? <tbody>
                                    {
                                        users.map((user, index) =>
                                            <tr key={user.id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{user.firstName}</td>
                                                <td>{user.lastName}</td>
                                                <td>{user.email}</td>
                                                <td><input type="checkbox" id={user.email} onChange={selectUser} /></td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                                    :
                                    <tbody>
                                        <tr>
                                            <th colSpan={5}>No Data Found</th>
                                        </tr>
                                    </tbody>
                            }
                        </table>
                    </div>

                    {
                        users.length > 0 &&

                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-end">
                                <li className={`page-item ${pagination === 0 && "disabled"}`}>
                                    <NavLink className="page-link" to="#" tabIndex="-1" aria-disabled="true" onClick={() => setPagination(pagination - 1)}>Previous</NavLink>
                                </li>
                                {

                                    [...Array(totalPageNumber).keys()].map(pageNum =>
                                        <li key={pageNum}
                                            className="page-item">
                                            <NavLink
                                                className="page-link"
                                                to="#"
                                                onClick={() => setPagination(pageNum)}>
                                                {pageNum + 1}
                                            </NavLink>
                                        </li>
                                    )
                                }
                                <li className={`page-item ${pagination === totalPageNumber - 1 && "disabled"}`}>
                                    <NavLink className="page-link" to="#" onClick={() => setPagination(pagination + 1)}>Next</NavLink>
                                </li>
                            </ul>
                        </nav>
                    }
                </>
            }

        </div>
    );
};

export default Home;