import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

function Signup(){
const [form,setForm]=useState({});
const history=useHistory();

const onTextChange=(e)=>{
const copy = {...form};
copy[e.target.name]=e.target.value;
setForm(copy);
   }
   const onFormSubmit=async e=>{
       e.preventDefault();
       axios.post('/api/account/signup',form);
       history.push('/login');
   }
    return (
        <div className="row">
            <div className="col-md-6 offset-md-3 card card-body bg-light">
                <h3>Sign up for a new account</h3>
                <form onSubmit={onFormSubmit}>
                    <input onChange={onTextChange} value={form.firstName} type="text" name="firstName" placeholder="First Name" className="form-control" />
                    <br />
                    <input onChange={onTextChange} value={form.lastName} type="text" name="lastName" placeholder="Last Name" className="form-control" />
                    <br />
                    <input onChange={onTextChange} value={form.email} type="text" name="email" placeholder="Email" className="form-control" />
                    <br />
                    <input onChange={onTextChange} value={form.password} type="password" name="password" placeholder="Password" className="form-control" />
                    <br />
                    <button className="btn btn-primary">Signup</button>
                </form>
            </div>
        </div>
    );
}
export default Signup;