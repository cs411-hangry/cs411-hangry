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
        uploadedFileCloudinaryUrl: ''
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
    
  async photos(id) {
    const res = await fetch("http://localhost:5000/restaurant/id/" + id) // Call the fetch function passing the url of the API as a parameter
    const data = await res.json()
    console.log(data)
    
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
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
  }

  


  render() {
    return (
      <div>
        <Nav />
        <button onClick= {this.photos.bind(this, this.props.url.query.id)}>
          Get Photos
        </button>

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
