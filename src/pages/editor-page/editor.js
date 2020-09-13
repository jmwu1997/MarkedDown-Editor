import React from 'react';
import { Input, message, Button } from 'antd';
import Hotkeys from 'react-hot-keys';
import './editor.css';
import axios from 'axios';
import UploadImg from './uploadimg';
import ListFile from './listfile';
import {BoldOutlined, ItalicOutlined,LinkOutlined,FileImageOutlined,OrderedListOutlined,UnorderedListOutlined} from '@ant-design/icons'


var list_on = false;
var order_list_on = false;
var order_list_count = 3;

function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
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
                message.success("File render successfully from backend!");
            }).catch((err) => {
                console.log(err);
                message.error("File render failed from backend!");
            });
    }

    openSide() {
        document.getElementById('myfiles').style.width = "15%";
        document.getElementById('myfiles').style.float = "left";
        document.getElementById('main').style.width = "80%";
        document.getElementById('main').style.float = "left";
        document.getElementById('myfiles').style.visibility = "visible";
    }
    closeSide() {
        document.getElementById('myfiles').style.width = "0";
        document.getElementById('myfiles').style.float = "left";
        document.getElementById('main').style.width = "100%";
        document.getElementById('main').style.float = "left";
        document.getElementById('myfiles').style.visibility = "collapse";
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
                message.success("Filename: " + that.state.filename + "\nis saved to user " + localStorage.getItem('username'));
                // that.props.history.push('/editor');
            }).catch((err) => {
                console.log(err);
                message.error("File create failed!");
            }
            );

    }

    // input-text
    boldSelection() {
        var inputtext = document.getElementById('input-text');
        if (window.getSelection().toString() === "") {
            // select nothing
            var str = "****";
            inputtext.setRangeText(str);
            inputtext.selectionStart += (str.length - 2);
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
        if (window.getSelection().toString() === "") {
            // select nothing
            var str = "**";
            inputtext.setRangeText(str);
            inputtext.selectionStart += (str.length - 1);
            inputtext.focus();
        } else {
            var str = "*" + window.getSelection().toString() + "*";
            inputtext.setRangeText(str);
            inputtext.selectionStart += str.length;
            inputtext.focus();
        }
    }

    linkSelection() {
        var inputtext = document.getElementById('input-text');
        if (window.getSelection().toString() === "") {
            // select nothing
            var str = "[Link]()";
            inputtext.setRangeText(str);
            inputtext.selectionStart += (str.length - 1);
            inputtext.focus();
        } else {
            var str = "[Link](" + window.getSelection().toString() + ")";
            inputtext.setRangeText(str);
            inputtext.selectionStart += str.length;
            inputtext.focus();
        }
    }

    imageSelection() {
        // console.log(window.getSelection().toString() === "");
        var inputtext = document.getElementById('input-text');
        if (window.getSelection().toString() === "" && document.getElementById("imgurl").innerText === "") {
            // select nothing
            var str = "![Image]()";
            inputtext.setRangeText(str);
            inputtext.selectionStart += (str.length - 1);
            inputtext.focus();
        }
        else if (window.getSelection().toString() === "" && document.getElementById("imgurl").innerText !== "") {
            var str = "![Image](" + document.getElementById("imgurl").innerText + ")";
            inputtext.setRangeText(str);
            inputtext.selectionStart += str.length;
            inputtext.focus();
        }
        else {
            var str = "![Image](" + window.getSelection().toString() + ")";
            inputtext.setRangeText(str);
            inputtext.selectionStart += str.length;
            inputtext.focus();
        }
    }

    headingSelection1() {
        var inputtext = document.getElementById('input-text');
        if (window.getSelection().toString() === "") {
            // select nothing
            var str = "# ";
            inputtext.setRangeText(str);
            inputtext.selectionStart += str.length;
            inputtext.focus();
        } else {
            var str = "# " + window.getSelection().toString();
            inputtext.setRangeText(str);
            inputtext.selectionStart += str.length;
            inputtext.focus();
        }
    }
    headingSelection2() {
        var inputtext = document.getElementById('input-text');
        if (window.getSelection().toString() === "") {
            // select nothing
            var str = "## ";
            inputtext.setRangeText(str);
            inputtext.selectionStart += str.length;
            inputtext.focus();
        } else {
            var str = "## " + window.getSelection().toString();
            inputtext.setRangeText(str);
            inputtext.selectionStart += str.length;
            inputtext.focus();
        }
    }
    headingSelection3() {
        var inputtext = document.getElementById('input-text');
        if (window.getSelection().toString() === "") {
            // select nothing
            var str = "### ";
            inputtext.setRangeText(str);
            inputtext.selectionStart += str.length;
            inputtext.focus();
        } else {
            var str = "### " + window.getSelection().toString();
            inputtext.setRangeText(str);
            inputtext.selectionStart += str.length;
            inputtext.focus();
        }
    }
    headingSelection4() {
        var inputtext = document.getElementById('input-text');
        if (window.getSelection().toString() === "") {
            // select nothing
            var str = "#### ";
            inputtext.setRangeText(str);
            inputtext.selectionStart += str.length;
            inputtext.focus();
        } else {
            var str = "#### " + window.getSelection().toString();
            inputtext.setRangeText(str);
            inputtext.selectionStart += str.length;
            inputtext.focus();
        }
    }

    orderlistSelection() {
        list_on = false;
        var list_count = 1;
        var inputtext = document.getElementById('input-text');
        if (window.getSelection().toString() === "") {
            // select nothing
            var str = list_count + ". ";
            inputtext.setRangeText(str);
            inputtext.selectionStart += str.length;
            inputtext.focus();
            list_count++;

        } else {
            var str = list_count + ". " + window.getSelection().toString();
            inputtext.setRangeText(str.replace(/[\r\n]/g, " "));
            inputtext.selectionStart += str.length;
            list_count++;
            str = "\n" + list_count + ". ";
            inputtext.setRangeText(str);
            inputtext.selectionStart += str.length;
            inputtext.focus();
        }
        console.log("list_on: " + order_list_on);
        order_list_on = true;
        console.log("list_on: " + order_list_on);
    }

    unorderlistSelection() {
        order_list_on = false;
        var inputtext = document.getElementById('input-text');
        if (window.getSelection().toString() === "") {
            // select nothing
            var str = "* ";
            inputtext.setRangeText(str);
            inputtext.selectionStart += str.length;
            inputtext.focus();
        } else {
            var str = "* " + window.getSelection().toString();
            inputtext.setRangeText(str.replace(/[\r\n]/g, " "));
            inputtext.selectionStart += str.length;
            str = "\n* ";
            inputtext.setRangeText(str);
            inputtext.selectionStart += str.length;
            inputtext.focus();
        }
        console.log("list_on: " + list_on);
        list_on = true;
        console.log("list_on: " + list_on);
    }

    unorderlistSelectionAutoGen() {
        var inputtext = document.getElementById('input-text');
        var str = "\n* ";
        inputtext.setRangeText(str);
        inputtext.selectionStart += str.length;
        inputtext.focus();
    }

    orderlistSelectionAutoGen() {
        var inputtext = document.getElementById('input-text');
        var str = "\n" + order_list_count + ". ";
        inputtext.setRangeText(str);
        inputtext.selectionStart += str.length;
        inputtext.focus();
        order_list_count++;
    }

    listStopHandler() {
        list_on = false;
        console.log("list_on: " + list_on);
        order_list_on = false;
        order_list_count = 3;
        console.log("order_list_on: " + order_list_on);
        console.log("order_list_count: " + order_list_count);
    }

    singleEnter() {
        var inputtext = document.getElementById('input-text');
        var str = "\n";
        inputtext.setRangeText(str);
        inputtext.selectionStart += str.length;
        inputtext.focus();
    }

    onKeyDown(keyName, e, handle) {
        if (keyName === 'enter') {
            if (order_list_on === true) {
                this.orderlistSelectionAutoGen();
                console.log("single enter order");
            } else if (list_on === true) {
                this.unorderlistSelectionAutoGen();
                console.log("single enter unorder");
            } else {
                this.singleEnter();
                console.log("single enter");
            }
        } else if (keyName === 'ctrl+b' || keyName === 'command+shift+b') {
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
        } else if (keyName === 'ctrl+enter' || keyName === 'shift+enter') {
            this.listStopHandler();
            console.log("Cancel list");
        }
        console.log(keyName);
        e.preventDefault();
    }

    test() {
        var input = this.state.text;
        var string = input.split("\n");
        var stringArray = new Array();
        for (var i = 0; i < string.length; i++) {

            while (string[i].indexOf("***", string[i].indexOf("***") + 1) > -1) {
                var stari1 = string[i].indexOf("***");
                var stari2 = string[i].indexOf("***", string[i].indexOf("***") + 1);
                if (stari1 >= 0 && stari2 >= 0) {
                    string[i] = string[i].substring(0, stari1) + string[i].substring(stari1 + 2, stari2 + 1) + string[i].substring(stari2 + 3, string[i].length);;
                    string[i] = setCharAt(string[i], stari1, "<i><b>");
                    string[i] = setCharAt(string[i], stari2+3, "</i></b>");
                    stari1 = -1; stari2 = -1;
                }

            }
            while (string[i].indexOf("**", string[i].indexOf("**") + 1) > -1) {
                var stari1 = string[i].indexOf("**");
                var stari2 = string[i].indexOf("**", string[i].indexOf("**") + 1);
                if (stari1 >= 0 && stari2 >= 0) {
                    string[i] = string[i].substring(0, stari1) + string[i].substring(stari1 + 1, stari2 + 1) + string[i].substring(stari2 + 2, string[i].length);;
                    string[i] = setCharAt(string[i], stari1, "<b>");
                    string[i] = setCharAt(string[i], stari2 + 1, "</b>");
                    stari1 = -1; stari2 = -1;
                }

            }

            //italic
            while (string[i].indexOf("*", string[i].indexOf("*") + 1) > -1) {
                var stari1 = string[i].indexOf("*");
                var stari2 = string[i].indexOf("*", string[i].indexOf("*") + 1);
                if (stari1 >= 0 && stari2 >= 0) {
                    string[i] = string[i].substring(0, stari1) + string[i].substring(stari1, stari2) + string[i].substring(stari2, string[i].length);;
                    string[i] = setCharAt(string[i], stari1, "<i>");
                    string[i] = setCharAt(string[i], stari2 + 2, "</i>");
                    stari1 = -1; stari2 = -1;
                }
            }
            //h4 tag
            while (string[i].indexOf("####") > -1) {
                string[i] = "<h5>" + string[i].substring(4, +string[i].length) + "</h5>";
            }
            //h3 tag
            while (string[i].indexOf("###") > -1) {
                string[i] = "<h4>" + string[i].substring(3, +string[i].length) + "</h4>";
            }
            //h2 tag
            while (string[i].indexOf("##") > -1) {
                string[i] = '<h2>' + string[i].substring(2, +string[i].length) + "</h2>";
            }
            //h1 tag
            while (string[i].indexOf("#") > -1) {
                string[i] = "<h1>" + string[i].substring(1, +string[i].length) + "</h1>";
            }
            //links tag
            while (string[i].indexOf("[Link](") > -1) {
                var stari1 = string[i].indexOf("[Link](");
                var stari2 = string[i].indexOf(")", string[i].indexOf(")"));
                if (stari1 >= 0) {
                    string[i] = string[i].substring(0, stari1) + '<a href="' + string[i].substring(stari1 + 7, stari2) + '">' + string[i].substring(stari1 + 7, stari2) + '</a>' + string[i].substring(stari2 + 1, string[i].length);
                    stari1 = -1;
                }
            }
            //image tag
            while (string[i].indexOf("![Image](") > -1) {
                var stari1 = string[i].indexOf("![Image](");
                var stari2 = string[i].indexOf(")", string[i].indexOf(")"));
                if (stari1 >= 0) {
                    string[i] = string[i].substring(0, stari1) + '<img src="' + string[i].substring(stari1 + 9, stari2) + '" width="30%">' + string[i].substring(stari2 + 1, string[i].length);
                    stari1 = -1;
                }
            }

            stringArray.push(string[i]);
            if (i != string.length - 1) {
                stringArray.push("<br>");
            }
        }
        var output = stringArray.toString();
        var result = output.replace(/,<br>,/g, "<br>");
        return { __html: result };
    };

    render() {
        return (
            <div>
                <div id="myfiles" style={{ width: "0", float: "left", visibility: "collapse" }}>
                    <Input id="icon2" type="button" value="X CLOSE" onClick={this.closeSide.bind(this)} />
                    <ListFile />
                </div>
                <div id="main" className="mainlayout" style={{ width: "100%", float: "left" }} onSubmit={this.onFinish} onChange={this.onChange}>
                    <div>
                        <Input id="icon2" type="button" style={{ width: "10%", background: "lightpurple", float:"left" }} value="☰ MY FILE" onClick={this.openSide.bind(this)} />
                        <Input id="filename" style={{width:"90%"}} class="filename" placeholder="Please Enter Document Title Here" type="text" id="title" name="filename" value={this.state.filename} />
                    </div>
                    <fieldset id="mainEditor">
                        <Hotkeys keyName="ctrl+b, ctrl+i, ctrl+l, ctrl+g, ctrl+s, ctrl+u, ctrl+o, 
                                  command+shift+b, command+shift+i, command+shift+l, command+shift+g,
                                  command+s, command+shift+u, command+shift+o"
                            onKeyDown={this.onKeyDown} filter={event => true}>
                            <form>
                                <div>
                                    <UploadImg />
                                    <ul className="nav-btn">
                                        <li><Button icon={<BoldOutlined/>} id="icon" type="button" value="" title="Bold - ctrl+b" onClick={this.boldSelection} /></li>
                                        <li><Button icon={<ItalicOutlined/>} id="icon" type="button" value="" title="Itatic - ctrl+i" onClick={this.italicSelection} /> </li>
                                        <li><Button icon={<LinkOutlined/>} id="icon" type="button" value="" title="Link - ctrl+l" onClick={this.linkSelection} /></li>
                                        <li><Button icon={<FileImageOutlined/>} id="icon" type="button" value="" title="Image - ctrl+g" onClick={this.imageSelection} /></li>
                                        <li class="nav-dropdown">
                                            <Input id="icon" type="button" value="H" />
                                            <div class="dropdown-content">
                                                <Input type="button" value="H1" onClick={this.headingSelection1} />
                                                <Input type="button" value="H2" onClick={this.headingSelection2} />
                                                <Input type="button" value="H3" onClick={this.headingSelection3} />
                                                <Input type="button" value="H4" onClick={this.headingSelection4} />
                                            </div>
                                        </li>
                                        <li><Button icon={<OrderedListOutlined/>} type="button" id="icon" value="" title="ctrl+o" onClick={this.orderlistSelection} /></li>
                                        <li><Button icon={<UnorderedListOutlined/>} type="button" id="icon" value="" title="ctrl+u" onClick={this.unorderlistSelection} /></li>
                                        <li><Input type="button" value="HTML" id="btn" onClick={this.onClick} /> </li>
                                        <li><Input type="submit" value="SAVE" id="btn" /></li>
                                    </ul>
                                </div>
                                <div className="leftSideTextBox">
                                    <h2>Markdown</h2>
                                    <fieldset>
                                        <textarea placeholder="Please Enter Document Here" id="input-text" name="text" value={this.state.text} cols={40} rows={10} />
                                    </fieldset>
                                </div>
                            </form>
                        </Hotkeys>
                        <div className="rightSideTextBox">
                            <h2>Preview</h2>
                            <fieldset>
                                <div id="preview" dangerouslySetInnerHTML={this.test()}></div>
                            </fieldset>
                        </div>

                    </fieldset>
                </div>
            </div>
        )
    };
};


export default Editor;
