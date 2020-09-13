import React from 'react';
import axios from 'axios';
import { Input, message } from 'antd';

class ListFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    };

    onList(event) {       
        if (document.getElementById("input-text").innerHTML !== "") {
            document.getElementById("input-text").innerHTML = event.target.title;
            axios.post('api/file/render', { text: event.target.title })
                .then(function (res) {
                    document.getElementById("preview").innerHTML = res.data;
                }).catch((err) => {
                    console.log(err);
                    message.error("Render file failed!");
                });
        }
        else {
            document.getElementById("input-text").innerText = event.target.title;
            axios.post('api/file/render', { text: event.target.title })
                .then(function (res) {
                    document.getElementById("preview").innerHTML = res.data;
                }).catch((err) => {
                    console.log(err);
                    message.error("Render file failed!");
                });
        }

    }

    async componentDidMount() {
        const that = this;
        axios.post(
            'api/file/list',
            { username: localStorage.getItem('username') })
            .then(function (res) {
                that.setState({ files: res.data })
            }).catch((err) => {
                console.log(err);
                message.error("List user file failed!");
            });
    }

    render() {
        if (!this.state.files.length) {
            return <div>Empty Files</div>
        }
        return (
            <div>
                {this.state.files.map(file => (
                    <Input id="file-btn" title={file.text} style={{ border: "none", textAlign: "left" }} type="button" value={file.filename} onClick={this.onList.bind(this)} />
                ))}
            </div>
        );
    }

}

export default ListFile;