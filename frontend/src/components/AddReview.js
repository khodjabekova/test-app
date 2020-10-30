import React, { useState, useEffect } from 'react';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import axios from 'axios';


class AddReview extends React.Component {

    constructor(props) {
        super(props);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeRate = this.handleChangeRate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log("constructor", this.props)
        this.state = {
            reviewList: [],
            productId: this.props.productId,
            text: '',
            rate: '',
            isLoading: true
        }


    }

    handleChangeText(e) {
        this.setState({ text: e.target.value });
    }

    handleChangeRate(e) {
        this.setState({ rate: e.target.value });
    }

    getReviews() {
        console.log("get reviews", this.state.productId)
        axios.get(`${process.env.REACT_APP_API_URL}/api/reviews/${this.state.productId}/`)
        //axios.get(`${process.env.REACT_APP_API_URL}/api/reviews/${prodId}/`)
            .then(res => {
                this.setState({
                   reviewList: res.data,
                    isLoading: false
                });
            })

    }

    componentDidMount() {

        //this.getReviews();

    }

    handleSubmit(e) {
        e.preventDefault();
        const obj = {
            rate: this.state.rate,
            text: this.state.text,
        };
        console.log("add review", this.state.productId)
        axios.post(`${process.env.REACT_APP_API_URL}/api/reviews/${this.state.productId}`, obj)
            .then(res => {
                ToastsStore.success('Successfully Saved!');
                this.getReviews();
            });

        this.setState({
            rate: '',
            text: '',
        })
    }


    render() {
        const { isLoading, reviewList } = this.state;

        return (
            <div>
                <h3>Review</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input onChange={this.handleChangeRate} placeholder="Rate" />
                    </div>
                    <div className="form-group">

                        <input onChange={this.handleChangeText} placeholder="Review" />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit" >
                            Submit
                    </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddReview