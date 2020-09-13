import React from 'react'
import { Form, Input, Button, message } from 'antd';
import {Link} from 'react-router-dom';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.onFinish = this.onFinish.bind(this);
    }

    onFinish(values) {
        console.log(values);
        const that = this;
        axios.post('api/user/register',values)
            .then(function (res)  {
                console.log(res.data);
                // localStorage.setItem("token",res.data);
                message.success('Sign up successfully. Please sign in now!');
                that.props.history.push("/login");
            }).catch((err)=>{
                message.error('Username existed already!');
                console.log(err);
            });
    }

    layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }


    render() {
        return (
            <div style={{ display: 'flex' }}>
                <div style={{ width: 450, margin: 'auto' }}>
                    <Form
                        {...this.layout}
                        name="sign-up"
                        className="sign-up"
                        onFinish={this.onFinish}
                    >
                        <h3>sign up</h3>
                        <Form.Item
                            value={this.state.username}
                            name="username"
                            className="info"
                            rules={[
                                {
                                    required: true,
                                    message: 'Username must be at least 6 characters long',
                                    min: 6,
                                    max: 255,
                                }
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Username"
                            />
                        </Form.Item>
                        <Form.Item
                            value={this.state.password}
                            name="password"
                            className="info"
                            rules={[
                                {
                                    required: true,
                                    message: 'Password must be at least 6 characters long',
                                    min: 6,
                                    max: 1024
                                }
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item
                            value={this.state.email}
                            name="email"
                            className="info"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input a valid email',
                                    type: "email",
                                    min: 6,
                                    max: 255
                                }
                            ]}
                        >
                            <Input
                                prefix={<MailOutlined className="site-form-item-icon" />}
                                type="email"
                                placeholder="Email"
                            />
                        </Form.Item>
                        <Form.Item>
                            <p>Already have an account?  <Link to='/login'>Sign in</Link></p>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" 
                            >
                                sign up
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }

}


export default Register;