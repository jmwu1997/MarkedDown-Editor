import React from 'react';
import { Input } from 'antd';
import Hotkeys from 'react-hot-keys';
import './editor.css';
import axios from 'axios';
import {BoldOutlined} from '@ant-design/icons';
import ReactDOM from 'react-dom';


var list_count = 1;
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}
class Editor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filename: '',
            text: ''
        };
        this.onFinish = this.onFinish.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onClick(event) {
        const that = this;
        axios.post(
            'api/file/render',
            { text: that.state.text })
            .then(function (res) {
                console.log(res.data);
                document.getElementById("preview").innerHTML = res.data;
            }).catch((err) => {
                console.log(err);
                alert("file render failed");
            });
    }

    onFinish(event) {
        const that = this;
        axios.post(
            'api/file/create',
            {
                username: localStorage.getItem('username'),
                filename: that.state.filename,
                text: that.state.text
            })
            .then(function (res) {
                console.log(res.data);
                // that.props.history.push('/editor');
                // alert("Filename: " + that.state.filename + "\nText: " + that.state.text + "\n is saved!")
            }).catch((err) => {
                console.log(err);
                alert("file create failed");
            }
            );
        event.preventDefault();

    }

    // input-text
    boldSelection() {
        var inputtext = document.getElementById('input-text');
        if (window.getSelection().toString() === "") {
            // select nothing
            var str = "**strong text**";
            inputtext.setRangeText(str);
            inputtext.selectionStart += (str.length);
            inputtext.focus();
        } else {
            var str = "**" + window.getSelection().toString() + "**";
            inputtext.setRangeText(str);
            inputtext.selectionStart += str.length;
            inputtext.focus();
        }
        // }
    }

    italicSelection() {
        var inputtext = document.getElementById('input-text');
        let input = window.getSelection();
        if (window.getSelection) {
            if (input === "") {
                // select nothing
                var str = "**";
                inputtext.setRangeText(str);
                inputtext.selectionStart += (str.length - 1);
                inputtext.focus();
            } else {
                var str = "*" + input + "*";
                inputtext.setRangeText(str);
                inputtext.selectionStart += str.length;
                inputtext.focus();
            }
        }
    }

    linkSelection() {
        var inputtext = document.getElementById('input-text');
        let input = window.getSelection();
        if (window.getSelection) {
            if (input === "") {
                // select nothing
                var str = "[Link]()";
                inputtext.setRangeText(str);
                inputtext.selectionStart += (str.length - 1);
                inputtext.focus();
            } else {
                var str = "[Link](" + input + ")";
                inputtext.setRangeText(str);
                inputtext.selectionStart += str.length;
                inputtext.focus();
            }
        }
    }

    imageSelection() {
        var inputtext = document.getElementById('input-text');
        let input = window.getSelection();
        if (window.getSelection) {
            if (input === "") {
                // select nothing
                var str = "![Image]()";
                inputtext.setRangeText(str);
                inputtext.selectionStart += (str.length - 1);
                inputtext.focus();
            } else {
                var str = "![Image](" + input + ")";
                inputtext.setRangeText(str);
                inputtext.selectionStart += str.length;
                inputtext.focus();
            }
        }
    }
    headingSelection1() {
        var inputtext = document.getElementById('input-text');
        let input = window.getSelection();
        if (window.getSelection) {
            if (input === "") {
                // select nothing
                var str = "# Heading";
                inputtext.setRangeText(str);
                inputtext.selectionStart += str.length;
                inputtext.focus();
            } else {
                var str = "# " + input;
                inputtext.setRangeText(str);
                inputtext.selectionStart += str.length;
                inputtext.focus();
            }
        }
    }
    headingSelection2() {
        var inputtext = document.getElementById('input-text');
        let input = window.getSelection();
        if (window.getSelection) {
            if (input === "") {
                // select nothing
                var str = "## Heading";
                inputtext.setRangeText(str);
                inputtext.selectionStart += str.length;
                inputtext.focus();
            } else {
                var str = "## " + input;
                inputtext.setRangeText(str);
                inputtext.selectionStart += str.length;
                inputtext.focus();
            }
        }
    }
    headingSelection3() {
        var inputtext = document.getElementById('input-text');
        let input = window.getSelection();
        if (window.getSelection) {
            if (input === "") {
                // select nothing
                var str = "### Heading";
                inputtext.setRangeText(str);
                inputtext.selectionStart += str.length;
                inputtext.focus();
            } else {
                var str = "### " + input;
                inputtext.setRangeText(str);
                inputtext.selectionStart += str.length;
                inputtext.focus();
            }
        }
    }
    headingSelection4() {
        var inputtext = document.getElementById('input-text');
        let input = window.getSelection();
        if (window.getSelection) {
            if (input === "") {
                // select nothing
                var str = "#### Heading";
                inputtext.setRangeText(str);
                inputtext.selectionStart += str.length;
                inputtext.focus();
            } else {
                var str = "#### " + input;
                inputtext.setRangeText(str);
                inputtext.selectionStart += str.length;
                inputtext.focus();
            }
        }
    }

    orderlistSelection() {
        var inputtext = document.getElementById('input-text');
        let input = window.getSelection();
        if (window.getSelection) {
            if (input === "") {
                // select nothing
                var str = list_count + ". ";
                inputtext.setRangeText(str);
                inputtext.selectionStart += str.length;
                inputtext.focus();
                list_count++;
            } else {
                var str = list_count + ". " + input;
                inputtext.setRangeText(str.replace(/[\r\n]/g, " "));
                inputtext.selectionStart += str.length;
                inputtext.focus();
                list_count++;

            }

        }
    }

    unorderlistSelection() {
        var inputtext = document.getElementById('input-text');
        let input = window.getSelection();
        if (window.getSelection) {
            if (input === "") {
                // select nothing
                var str = "* ";
                inputtext.setRangeText(str);
                inputtext.selectionStart += str.length;
                inputtext.focus();
            } else {
                var str = "* " + input;
                inputtext.setRangeText(str.replace(/[\r\n]/g, " "));
                inputtext.selectionStart += str.length;
                inputtext.focus();
            }
        }

    }

    onKeyDown(keyName, e, handle) {
        if (keyName === 'ctrl+b' || keyName === 'command+shift+b') {
            this.boldSelection();
        } else if (keyName === 'ctrl+i' || keyName === 'command+shift+i') {
            this.italicSelection();
        } else if (keyName === 'ctrl+l' || keyName === 'command+shift+l') {
            this.linkSelection();
        } else if (keyName === 'ctrl+g' || keyName === 'command+shift+g') {
            this.imageSelection();
        } else if (keyName === 'ctrl+s' || keyName === 'command+s') {
            this.onFinish();
        } else if (keyName === 'ctrl+u' || keyName === 'command+shift+u') {
            this.unorderlistSelection();
        } else if (keyName === 'ctrl+o' || keyName === 'command+shift+o') {
            this.orderlistSelection();
        }
        console.log(keyName);
        e.preventDefault();
    }
    test() {
        var input = this.state.text;
        //var string = input.replace(/\n/g, ' <br> ');
        //string=string.split(/\s+/); //space and newline
        var string=input.split("\n");
        var stringArray = new Array();
        for(var i =0; i < string.length; i++){
            while(string[i].indexOf("**",string[i].indexOf("**")+1)>-1){
                var stari1=string[i].indexOf("**");
                var stari2=string[i].indexOf("**",string[i].indexOf("**")+1);
                if (stari1>=0 && stari2>=0){
                    string[i]=string[i].substring(0,stari1)+string[i].substring(stari1+1, stari2+1)+string[i].substring(stari2+2, string[i].length);;
                    string[i]=setCharAt(string[i],stari1,"<b>");
                    string[i]=setCharAt(string[i],stari2+1,"</b>");
                    stari1=-1; stari2=-1;
                }
                
            }

            //italic
            while(string[i].indexOf("*",string[i].indexOf("*")+1)>-1){
                var stari1=string[i].indexOf("*");
                var stari2=string[i].indexOf("*",string[i].indexOf("*")+1);
                if (stari1>=0 && stari2>=0){
                    string[i]=string[i].substring(0,stari1)+string[i].substring(stari1, stari2)+string[i].substring(stari2, string[i].length);;
                    string[i]=setCharAt(string[i],stari1,"<i>");
                    string[i]=setCharAt(string[i],stari2+2,"</i>");
                    stari1=-1; stari2=-1;
                }  
            }
            //h4 tag
            while(string[i].indexOf("####")>-1){
                string[i]="<h5>"+string[i].substring(4, +string[i].length)+"</h5>";
            }
            //h3 tag
            while(string[i].indexOf("###")>-1){
                    string[i]="<h4>"+string[i].substring(3, +string[i].length)+"</h4>";
            }
            //h2 tag
            while(string[i].indexOf("##")>-1){
                    string[i]='<h2>'+string[i].substring(2, +string[i].length)+"</h2>";
            }
            //h1 tag
            while(string[i].indexOf("#")>-1){
                    string[i]="<h1>"+string[i].substring(1, +string[i].length)+"</h1>";
            }
            //links tag
            while(string[i].indexOf("[Link](")>-1){
                var stari1=string[i].indexOf("[Link](");
                var stari2=string[i].indexOf(")",string[i].indexOf(")"));
                if (stari1>=0){
                    string[i]=string[i].substring(0,stari1)+'<a href="'+string[i].substring(stari1+7,stari2)+'">'+string[i].substring(stari1+7,stari2)+'</a>'+string[i].substring(stari2+1,string[i].length);
                    stari1=-1;
                }  
            }
            //image tag
            while(string[i].indexOf("![Image](")>-1){
                var stari1=string[i].indexOf("![Image](");
                var stari2=string[i].indexOf(")",string[i].indexOf(")"));
                if (stari1>=0){
                    string[i]=string[i].substring(0,stari1)+'<img src="'+string[i].substring(stari1+9,stari2)+'">'+string[i].substring(stari2+1,string[i].length);
                    stari1=-1;
                }  
            }
           
            stringArray.push(string[i]);
            if(i != string.length-1){
                stringArray.push("<br>");
            }
        }
        var output=stringArray.toString();
        var result = output.replace(",<br>,", "<br>");
        console.log(result);
        return {__html: result};
    };


    render() {
        return (
            <div className="mainlayout" onSubmit={this.onFinish} onChange={this.onChange}>
                <div className="title" id="title">
                    <Input className="filename" placeholder="Please Enter Document Title Here" type="text" id="title" name="filename" value={this.state.filename} />
                </div>
                <div className="mainTextBox" id="mainTextBox">
                    <div className="leftSideTextBox">
                        <Hotkeys
                            keyName="ctrl+b, ctrl+i, ctrl+l, ctrl+g, ctrl+s, ctrl+u, ctrl+o, 
                                    command+shift+b, command+shift+i, command+shift+l, command+shift+g,
                                    command+s, command+shift+u, command+shift+o"
                            onKeyDown={this.onKeyDown}
                            filter={event => true}
                        >
                            <fieldset>

                                <form>
                                    <Input type="submit" value="SAVE" className="save-button" />
                                    <Input type="button" value="HTML" className="save-button" onClick={this.onClick} />

                                    <div className="navToolBar" >
                                        <ul className="nav-btn">
                                            <li>
                                                <Input className="bold-nav" type="button" value="Bold" title="Bold - ctrl+b" onClick={this.boldSelection} icon={<BoldOutlined />}/>
                                            </li>
                                            <li>
                                                <Input className="italic-nav" type="button" value="Itatic" title="Itatic - ctrl+i" onClick={this.italicSelection} />
                                            </li>
                                            <li>
                                                <Input className="link-nav" type="button" value="Link" title="Link - ctrl+l" onClick={this.linkSelection} />
                                            </li>
                                            <li>
                                                <Input className="image-nav" type="button" value="Image" title="Image - ctrl+g" onClick={this.imageSelection} />
                                            </li>
                                            <li class="nav-dropdown">
                                                <Input className="head-dropdown" type="button" value="Heading" />
                                                <div class="dropdown-content">
                                                    <Input type="button" value="H1" onClick={this.headingSelection1} />
                                                    <Input type="button" value="H2" onClick={this.headingSelection2} />
                                                    <Input type="button" value="H3" onClick={this.headingSelection3} />
                                                    <Input type="button" value="H4" onClick={this.headingSelection4} />
                                                </div>
                                            </li>
                                            <li class="nav-dropdown">
                                                <Input className="list-dropdown" type="button" value="List" />
                                                <div class="dropdown-content">
                                                    <Input type="button" value="Ordered List" title="ctrl+o" onClick={this.orderlistSelection} />
                                                    <Input type="button" value="Unordered List" title="ctrl+u" onClick={this.unorderlistSelection} />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>


                                    <h2>Markdown</h2>
                                    <textarea
                                        placeholder="Please Enter Document Here"
                                        id="input-text"
                                        name="text"
                                        value={this.state.text}
                                        cols={40}
                                        rows={10}
                                    />
                                </form>
                            </fieldset>
                        </Hotkeys>
                    </div>
                    <div className="preview">
                        <fieldset>
                            <h2>Preview</h2>
                            <div dangerouslySetInnerHTML={this.test()} />
                        </fieldset>
                    </div>
                </div>
            </div>
        );
    }
}



export default Editor;