import React from 'react';
import axios from 'axios';
import FormData from 'form-data';
import { Input, Form, message} from 'antd';


class UploadImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: ""
    };
  }

  handleSubmit(e) {
    if (this.state.file === "") {
      message.warning("Please choose an image file first!");
    }
    else {
      let data = new FormData();
      data.append('file', this.state.file);

      axios.post('/api/file/uploadimg', data, {
      }).then(function (res) {
        document.getElementById("imgurl").innerHTML = res.data;
        message.success("Image Upload successfully! Please click on image tool below!");
      }).catch((err) => {
        console.log(err);
        message.error("Image upload failed.");
      });
    }
  }

  handleImageChange(e) {
    this.setState({
      file: e.target.files[0]
    });
  }

  render() {

    return (
      <div className="previewComponent">
        <Form>
          <Input
            name="file"
            className="fileInput"
            type="file"
            onChange={this.handleImageChange.bind(this)}
            style={{width:"50%",float:"left"}}
            id="icon2" />
          <Input
            style={{width:"50%",float:"left",fontSize:"17.5px"}}
            className="submitButton"
            type="button"
            onClick={this.handleSubmit.bind(this)}
            title="Countdown to 5!"
            value="URL Magic"
            id="icon2"
          />
        </Form>
        <div id="imgurl"></div>
      </div>
    )
  }
}

export default UploadImg;