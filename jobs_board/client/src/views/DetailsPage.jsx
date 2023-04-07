import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

// 1. get id from params
// 2. use the id to send API and display on laod (axios, useEffect)
// 3. variable change: useState

const DetailsPage = () => {
    const [job, setJob] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8000/api/jobs')
            .then(res => setJob(res.data))
            .catch(err => console.log(err))
    }, [id])

    const handleDelete = (e)=> {
        axios.delete(`http://localhost:8000/api/jobs/${id}`)
        .then(res=>navigate('/'))
        .catch(err => console.log(err));
    }

    return (
        <div>
            {
                job ?
                    <div>
                        <h2>Job Title: {job.title}</h2>
                        <h2>Company: {job.company}</h2>
                        <h2>Salary: {job.salary}</h2>
                        <h2>Remarks: {job.isRemote && "This is a remote position"}</h2>
                        <Link to={`/jobs/edit/${id}`}>Edit</Link> |
                        <Link to="/">Back</Link> |
                        <button type='button' className='btn btn-danger'
                    onClick={handleDelete}>Delete
                    </button>
                    </div> :
                    <h1>Loading...</h1>
            }
        </div>
    );
};

export default DetailsPage;
