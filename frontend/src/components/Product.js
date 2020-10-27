import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Product = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                //const  res  = await axios.get('http://localhost:8000/api/products/');
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
                setProducts(res.data);
            }
            catch (err) {
            }
        }

        fetchProduct();
    }, []);

   const getProduct = () => {
        let list = [];

        products.map(prod => {
            return list.push(
                <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col-auto d-none d-lg-block">
                        <img width="200" height="250" src={prod.image} alt='' />
                    </div>
                    <div className="col p-4 d-flex flex-column position-static">
                        <h3 className="mb-0">{prod.title}</h3>
                        <p className="card-text mb-auto">{prod.text}</p>
                        <Link to={`/product/${prod.id}`} className="stretched-link">Continue reading</Link>
                    </div> 
                </div>
            );
        });

        return list;
    };

    return (
        <div className="container mt-3">
            {getProduct()}
        </div>
    );

};

export default Product;