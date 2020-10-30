import axios from 'axios'

import { GET_PRODUCTS } from './types'


export const getProducts = () => dispatch => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/products`)
        .then(res=>{
            dispatch({
                type: GET_PRODUCTS,
                payload: res.data
            });
        }).catch(err => console.log(err));
};

