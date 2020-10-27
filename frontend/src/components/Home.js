import React from 'react';
import { Link } from 'react-router-dom';

const home = () => (
    <div className='container'>
        <div className="jumbotron mt-5">
            <h1 className="display-4">Welcome to Product Recommender System!</h1>
            <Link className="btn btn-primary btn-lg" to="/product">See Products</Link>
        </div>
    </div>
);

export default home;