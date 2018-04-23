import Link from 'next/link'
import Nav from '../components/nav'
import request from 'superagent';
import React, {Component, Button} from 'react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import Dropzone from 'react-dropzone';


const CLOUDINARY_UPLOAD_PRESET = 'x2gliq49';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/react-cloudinary/upload';

export default class Upload extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
        uploadedFile: null,
        uploadedFileCloudinaryUrl: '',
        restaurant_name: '',
        photoLinks: [], 
        photoIds: {}, 
        rating: 0
    };
    this.setRestaurantName()
      // this.restaurants()
      
    }
  
    onImageDrop(files) {
      this.setState({
        uploadedFile: files[0]
      });

      // cloudinary.config({ 
      //   cloud_name: 'sample', 
      //   api_key: '874837483274837', 
      //   api_secret: 'a676b67565c6767a6767d6767f676fe1' 
      // });
      //  See Configuration options for more details and additional configuration methods.
      
      

      console.log(files[0])
      let upload = request.post(CLOUDINARY_UPLOAD_URL)
                       .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                       .field('file', files[0]);
  
      upload.end((err, response) => {
        if (err) { console.error(err); }
        if (response.body.secure_url !== '') {
          this.setState({
            uploadedFileCloudinaryUrl: response.body.secure_url
          });
        }
      });
    }
  

   checkin = async (user, location) => {
    let data = {
      location_id: this.props.url.query.id,
      user_id: 1
    }
    fetch("http://localhost:5000/checkin", {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), 
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${  sessionStorage.getItem('jwt')}`,
            })
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log(response) );

    if (this.state.rating) {
      this.submitReview()
      console.log("RATE ME BABY")
    }
    if (this.state.image_url) {
      this.submitPhotos()
    }

   }

   setRestaurantName = async (id) => {
    const res = await fetch("http://localhost:5000/restaurant/id/" + id, 
      {headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json',
        Authorization: `Bearer ${  sessionStorage.getItem('jwt')}`,
      },}) 
    const data = await res.json()
    this.setState({
        restaurant_name: data.restaurant.restaurant_name
    })
  }


  async submitPhotos() {
        const id = this.props.url.query.id
        console.log("photo")
        var data = {
            user_id: 1,
            restaurant_id: this.props.url.query.id, 
            image_url: this.state.uploadedFileCloudinaryUrl, 
        };
        

      fetch("http://localhost:5000/photos", {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), 
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${  sessionStorage.getItem('jwt')}`,
            })
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
  }


  // deletePhoto = (url) => {
  //   fetch("http://localhost:5000/photos/" + this.state.photoIds[url], {
  //           method: 'DELETE', // or 'PUT'
  //           headers: new Headers({
  //               'Content-Type': 'application/json', 
  //               Authorization: `Bearer ${  sessionStorage.getItem('jwt')}`
  //           })
  //       }).then(res => res.json())
  //       .catch(error => console.error('Error:', error))
  //       .then(response => console.log('Success:', response));
  // }
  
  componentDidMount() {
    this.setRestaurantName(this.props.url.query.id)
    console.log(this.props.url.query.id)
  }

  async handleChange(event) {
    await this.setState({rating: event.target.value});
  }

  submitReview() {
    // event.preventDefault();
    let data = {
      restaurant_id: this.props.url.query.id,
      user_id: 1,
      rating: parseInt(this.state.rating)
    }
    // alert('Your favorite flavor is: ' + this.state.value);
    fetch("http://localhost:5000/ratings", {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${  sessionStorage.getItem('jwt')}`
            })
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
  }


  render() {
    const ratings = [1, 2, 3, 4, 5];
    return (
      <div>
        <Nav />
        <h2> {"Get photos from " + this.state.restaurant_name} </h2> 

        {this.state.photoLinks.map( url => 
        <div key={url}> 
           {url + "  "} 
          <button onClick={() => this.deletePhoto(url)}>
          x
          </button>
        </div> 
      )}

        <h2> Upload a Photo (optional) </h2> 
         <form>
            <div className="FileUpload">
              <Dropzone
                onDrop={this.onImageDrop.bind(this)}
                multiple={false}
                accept="image/*">
                <div>Drop an image or click to select a file to upload.</div>
              </Dropzone>
            </div>
    
            <div>
              {this.state.uploadedFileCloudinaryUrl === '' ? null :
              <div>
                <p>{this.state.uploadedFile.name}</p>
                <img src={this.state.uploadedFileCloudinaryUrl} />
              </div>}
            </div>
          </form>

          

        {/* <button onClick= {this.submitPhotos.bind(this, this.props.url.query.id)}>
          Submit Photos
        </button> */}

    
        {/* <form onSubmit={this.checkin.bind(this)}>
        <label> */}
        <h2> Rate this Restaurant (optional) </h2> 
          <select value={this.state.rating} onChange={this.handleChange.bind(this)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        {/* </label>
        <p> </p> 
        <input type="submit" value="Check in!" />
      </form> */}

      <p> </p> 
       <button onClick= {this.checkin.bind(this)}>
          Check in!
        </button>

        

      </div>
    );
  }
}