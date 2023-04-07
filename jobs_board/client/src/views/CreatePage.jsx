import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// 1. form input: onChange  -- state
// 2. send API: axios
// 3. logic after create: navigate

const CreatePage = (props) => {
    // keep track of what is being typed via useState hook
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [salary, setSalary] = useState(70000);
    const [isRemote, setIsRemote] = useState(false);
    // Create an array to store errors from the API
    const [errors, setErrors] = useState([]);
    
    const navigate = useNavigate();
    // handler when the form is submitted
    const handleSubmit = (e) => {
        // prevent default behavior of the submit
        e.preventDefault();
        // Send a post request to our API to create an Author
        axios.post("http://localhost:8000/api/jobs", {
            title,
            company,
            salary,
            isRemote
        })
            .then((res) => {
                const createdJob = res.data
                navigate(`/jobs/${createdJob._id}`);
            }) // If successful, do something with the response.
            .catch((err) => {
                if (err.response && err.response.data) {
                    const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                    const errorArr = Object.keys(errorResponse).map(
                        (key) => errorResponse[key].message
                    ); // Get an array of error messages
                    // Set Errors
                    setErrors(errorArr);
                }
            });
    };

    return (
        <div className='card mt-5'>
            <form className='form' onSubmit={handleSubmit}>
                {errors.map((err, index) => (
                    <p className='text-danger' key={index}>{err}</p>
                ))}

                <div>
                    <label>Title: </label>
                    <input type="text" name='title' value={title} className='form-control'
                        onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Company: </label>
                    <input type="text" name='company' value={company} className='form-control'
                        onChange={(e) => setCompany(e.target.value)} />
                </div> 
                <div>
                    <label>Salary: </label>
                    <input type="number" name='salary' value={salary} className='form-control'
                        onChange={(e) => setSalary(e.target.value)} />
                </div>
                <div>
                    <label>is remote? </label>
                    <input type="checkbox" name='isRemote' checked={isRemote} 
                        onChange={(e) => setIsRemote(e.target.checked)} />
                </div>
                <p>
                    <button  type="submit" className='btn btn-primary'>Create Job</button> 
                </p>
                <span>  
                    <Link to='/' className='btn btn-secondary'>Cancel</Link> 
                </span>
            </form>
        </div>
    );
}

export default CreatePage;
