import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

// 1. get id from params
// 2. use the id to send API and display on load (axios, useEffect)
// 3. variable change: useState

const EditPage = () => {
    // keep track of what is being typed via useState hook
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [salary, setSalary] = useState(70000);
    const [isRemote, setIsRemote] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/jobs/' + id)
            .then(res => {
                setTitle(res.data.title);
                setCompany(res.data.company);
                setSalary(res.data.salary);
                setIsRemote(res.data.isRemote);
            })
            .catch(err => console.log(err));
    }, [id]);


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/jobs/' + id, { title, company, salary, isRemote })
            .then(() => {
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (e) => {
        axios.delete('http://localhost:8000/api/jobs/')
            .then(res => navigate('/'))
            .catch(err => console.log(err));
    }

    return (
        <div>
            <form className='form' onSubmit={handleSubmit}>
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
                    <button type="submit" className='btn btn-primary'>Edit Job</button>
                </p>
                <span>
                    <Link to='/' className='btn btn-secondary'>Cancel</Link>
                    <button type='button' className='btn btn-danger'
                        onClick={handleDelete}>Delete
                    </button>
                </span>
            </form>
        </div>
    );
};

export default EditPage;

