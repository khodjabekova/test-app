import React from 'react'
import axios from 'axios'

class AddNewReview extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            rate: '',
            text: '',
            productId: ''
        }
        this.handleChangeRate = this.handleChangeRate.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeRate(event){
        this.setState({rate: event.target.value})
    }

    handleChangeText(event){
        this.setState({text: event.target.value})
    }

    handleSubmit(event){
        event.preventDefault();
        const obj = {
            rate: this.state.rate,
            text: this.state.text
        }
        console.log("addnewreview", this.props.productId)
        axios.post(`${process.env.REACT_APP_API_URL}/api/reviews/${this.props.productId}`, obj)
        .then(res=>{
            console.log("OK")
        })

        this.setState({
            rate: '',
            text: '',
        })
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.rate} onChange={this.handleChangeRate}/>
                <input type="text" value={this.state.text} onChange={this.handleChangeText}/>
                <input type="submit" value="Submit"></input>
            </form>
        );
    }
}

export default AddNewReview