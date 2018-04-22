import Link from 'next/link'
import Nav from '../components/nav'
import request from 'superagent';
import React, {Component, Button} from 'react';
import Dropzone from 'react-dropzone';


const CLOUDINARY_UPLOAD_PRESET = 'bmzjbxoq';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/react-cloudinary/upload';

export default class Restaurant extends Component {

    state = {
        uploadedFile: null,
        uploadedFileCloudinaryUrl: '',
        restaurant_name: '',
        photoLinks: [], 
        photoIds: {}
    };
  
    onImageDrop(files) {
      this.setState({
        uploadedFile: files[0]
      });

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

  async getPhotos(id) {
    const res = await fetch("http://localhost:5000/photos/restaurant/" + id, 
    {headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${  sessionStorage.getItem('jwt')}`,
    },})
    const data = await res.json()
    const photoLinks = data.photos.map(photo =>  photo.photo_path )
    const photoIds = data.photos.reduce( (p,c) => (p[c.photo_path] = c.photo_id) && p, {})
    this.setState({
        photoLinks, 
        photoIds
    })
  }

  async submitPhotos(id) {
        var data = {
            user_id: this.props.url.query.id % 10,
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


  deletePhoto = (url) => {
    fetch("http://localhost:5000/photos/" + this.state.photoIds[url], {
            method: 'DELETE', // or 'PUT'
            headers: new Headers({
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${  sessionStorage.getItem('jwt')}`
            })
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
  }
  
  componentDidMount() {
    this.setRestaurantName(this.props.url.query.id)
  }


  render() {
    return (
      <div>
        <Nav />
        <h2> {"Get photos from " + this.state.restaurant_name} </h2> 
        <button onClick= {this.getPhotos.bind(this, this.props.url.query.id)}>
          Get Photos
        </button>

        {this.state.photoLinks.map( url => 
        <div key={url}> 
           {url + "  "} 
          <button onClick={() => this.deletePhoto(url)}>
          x
          </button>
        </div> 
      )}

        <h2> Upload a Photo </h2> 
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

        <button onClick= {this.submitPhotos.bind(this, this.props.url.query.id)}>
          Submit Photos
        </button>

      </div>
    );
  }
}
