import React from "react";
import axios from "axios";
// eslint-disable-next-line
import{ firebase } from "../../firebase/index";
import './Choice.css';
import {Col, Container, Row} from '../Grid/index';
// import {Card} from '../Choice/Card';
class Choiceone extends React.Component {

   state = {
      array_of_places: [],
      place_id: [],
      detailedArray: [],
      places_review: []
      // eslint-disable-next-line
    }
  
  
  
  api_call_function () {
    const food_input = "restaurants";
    const location_input = "berkeley";
    const api_key = "AIzaSyA7KHhrTUzj_S8Vo1hiPjVMsZKdXKfzpv4";
    axios.get("https://cors-anywhere.herokuapp.com/" + "https://maps.googleapis.com/maps/api/place/textsearch/json?query=+"+food_input+"+in+"+location_input+"+&key="+api_key)
    .then(res => {
      const array_of_places = res.data.results;
      const places_id = array_of_places.map(place => place.place_id);
      this.setState({array_of_places: array_of_places});
      this.api_places_details(places_id);
    });
  }

  api_places_details(places_id) {
    const api_key = "AIzaSyA7KHhrTUzj_S8Vo1hiPjVMsZKdXKfzpv4";
    const place_holder = []; 
    // console.log(places_id);
    places_id.forEach(element => {
      axios.get("https://cors-anywhere.herokuapp.com/"+"https://maps.googleapis.com/maps/api/place/details/json?placeid="+element+"&fields=photo,name,rating,price_level,formatted_address,id,formatted_phone_number,scope,type,opening_hours,website,review&key="+api_key)
      .then(res => {
        console.log(res)
        place_holder.push(res.data.result)
        this.setState({detailedArray: place_holder});
        })
      })
      
    };

  componentDidMount() {
    this.api_call_function();
  }

  render() {
    const api_key = "AIzaSyA7KHhrTUzj_S8Vo1hiPjVMsZKdXKfzpv4";
    return (
      <div>
      <h1> Hello People Of The Internet!</h1>
      {this.state.detailedArray.length ? (
            <div>
                {this.state.detailedArray.map(chicken => (
                  <Container> 
      <Row >
          {this.state.detailedArray.map(place=>(
      <Col size="3">
           <div className="card wholecard" style={{width: '18rem', height: '30rem'}}>
            <img className="card-img-top" style={{width: '18rem', height: '30rem'}} src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${api_key}`} alt="Restaurant" />
            <div className="card-body">
              <h5 className="card-title">{place.name}</h5>
              <p className="card-text text-center">Rating: {place.rating}</p>
              <p className="card-text text-center">price: {place.price_level}</p>
              <p className="card-text text-center">address: {place.formatted_address}</p>
              <p className="card-text text-center">Phone: {place.formatted_phone_number}</p>
              <p className="card-text text-center">reviews: {place.reviews[0].text}</p>
              <p className="card-text text-center">Price Level: {place.price_level}</p>
              <a href="should be a 1" className="btn btn-success">Yes</a>
              <a href="should be a 0" className="btn btn-danger">No</a>
            </div>
          </div>
        </Col>
      ))}
       </Row>
        </Container>
                    
                    
                    
                  
                ))}
            </div>
              
            ) : (
              <h3>No Results to Display</h3>
            )}
     </div>
    )     
    };
}

export default Choiceone;