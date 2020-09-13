import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import './about.css';


class About extends Component {
    render() {
        return (
            <div class="mainText">
            <Row gutter={16}>
                <Col span={8}>
                    <Card class="about-content"title="What is Markdown?" bordered={false}>
                    Markdown is a plain text formatting syntax aimed at making writing for the internet easier. The philosophy behind Markdown is that plain text documents should be readable without tags mussing everything up, but there should still be ways to add text modifiers like lists, bold, italics, etc. It is an alternative to WYSIWYG (what you see is what you get) editors, which use rich text that later gets converted to proper HTML.
                    </Card>
                </Col>
                <Col span={8}>
                    <Card class="about-content" title="Live preview with Scroll Sync" bordered={false}>
                    Scroll Sync feature accurately binds the scrollbars of the editor panel and the preview panel to ensure that you always keep an eye on the output while writing.
                    </Card>
                </Col>
                <Col span={8}>
                    <Card class = "about-content" title="Smart Layout" bordered={false}>
                    Whether you write, you review, you comment… Markdown's layout provides you with the flexibility you need, without sacrifice.
                    <p className ="keyshort">Keyboard shortcuts Tips:</p>
                    <div class="about-list">
                        <ul>
                            <li>Save: ctrl+s, command+s</li>
                            <li>Bold: ctrl+b, command+shift+b</li>
                            <li>Italic: ctrl+i, command+shift+i</li>
                            <li>Link: ctrl+l, command+shift+l</li>
                            <li>Image: ctrl+g, command+shift+g</li>
                            <li>Ordered List: ctrl+o, command+shift+o</li>
                            <li>Unordered List: ctrl+u, command+shift+u</li>
                            <li>Cancel List: ctrl+enter, shift+enter</li>
                        </ul>
                    </div>
                    </Card>
                </Col>
            </Row>
            </div>
        );
    }
}

export default About;