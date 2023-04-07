import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    const [jobslist, setJobList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/jobs`)
            .then(res => {
                setJobList(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    const handleDelete =(deleteId)=>{
        axios.delete(`http://localhost:8000/api/jobs/${deleteId}`)
        .then(res=>{
            const filteredList = jobslist.filter((eachJob)=>eachJob._id !== deleteId)
            setJobList(filteredList)
        })
        .catch(err=>console.log(err))
    }

    return (
        <div>
            <p><Link to='/jobs/new'>Create new Jobs</Link></p>

            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Company</th>
                        <th>Salary</th>
                        <th>Remote</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        jobslist.map((eachJob, idx) => (
                            <tr key={idx}>
                                <td> <Link to={`/jobs/${eachJob}`}>{eachJob.title}</Link></td>
                                <td>{eachJob.company}</td>
                                <td>{eachJob.salary}</td>
                                <td>{eachJob.isRemote?"Yes":"No"}</td>
                                <td> <Link to={`/jobs/edit/${eachJob}`} className='btn btn-success'>Edit</Link> </td>
                                <td>
                                <button className='btn btn-danger' onClick={()=>handleDelete(eachJob._id)}>Delete</button>
                                
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default DashboardPage;
