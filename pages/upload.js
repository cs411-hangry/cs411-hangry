import Link from 'next/link';
import Nav from '../components/nav';
import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'bmzjbxoq';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/react-cloudinary/upload';

export default class Upload extends Component {

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

      console.log(this.state.uploadedFileCloudinaryUrl);
    }
  
    render() {
      return (
        <div> 
              <Nav />
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
          </div>
      );
    };
  }
  