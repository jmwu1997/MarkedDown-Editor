import React from 'react'
import './login.css';
import { Form, Input, Button, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: ''
        };
        this.onFinish = this.onFinish.bind(this);
    }

    onFinish(values) {
        console.log(values);
        const that = this;
        axios.post('api/user/login', values)
            .then(function (res) {
                that.props.parentMethod(res.data.token,res.data.username);
                console.log(res.data);
                message.success("Welcome to Markdown Editor!")
            }).catch((err) => {
                message.error("Login failed, please check your username and password.");
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
                        name="sign-in"
                        className="sign-in"
                        // initialValues={{
                        //     remember: true,
                        // }}
                        onFinish={this.onFinish}
                    >
                        <h3>sign in</h3>
                        <Form.Item
                            value={this.state.username}
                            name="username"
                            className="info"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Username"
                                id="username"
                            // onChange={this.handleChange}
                            />
                        </Form.Item>
                        <Form.Item
                            value={this.state.password}
                            name="password"
                            className="info"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                id="password"
                            // onChange={this.handleChange}
                            />
                        </Form.Item>
                        {/* <Form.Item name="remember" valuePropName="checked" className="checkbox">
                            <Checkbox>
                                Remember me
                                    </Checkbox>
                        </Form.Item> */}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button"
                            >
                                sign in
                                    </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;