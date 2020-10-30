import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Reviews from './Reviews';
import AddReview from './AddReview';
import { Route, Switch, Link } from 'react-router-dom';
import AddNewReview from './AddNewReview';


const ProductDetail = (props) => {
    const [product, setProduct] = useState({});

    useEffect(() => {

        const pk = props.match.params.id;

        const fetchData = async () => {
            try {
                //const res = await axios.get('http://localhost:8000/api/products/'+pk);
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${pk}`);
                //const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/`, {params:{pk: props.id}});
                setProduct(res.data);
            }
            catch (err) {

            }
        }

        fetchData();

    }, [props.match.params.id]);

  
    const createProduct = () => {
        return {__html: product.text};
    };

    

    return (
        <div className='container mt-3'>
            <h1 className='display-2'>{product.title}</h1>
            <div className='mt-5 mb-5' dangerouslySetInnerHTML={createProduct()} />
            <div>{product.id}</div>
            <hr />
            
            <AddNewReview productId={product.id}/>
            <Reviews productId={product.id}/>
           
        </div>
    );
}

export default ProductDetail;