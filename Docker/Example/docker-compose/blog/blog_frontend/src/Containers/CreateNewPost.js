import React from "react";
import {connect} from 'react-redux'
import {createPost} from '../Redux/actions'
import "antd/dist/antd.css";
import {Form, Input, message, Button} from 'antd';


class CreateNewPost extends React.Component {

    onFinish(values) {
        console.log(values);
        this.props.createPost(values,this.info())
    }

    info() {
        message.info('Post Created');
    };

    render() {
        const posts = this.props.posts
        console.log(posts)

        const layout = {
            labelCol: {span: 5},
            wrapperCol: {span: 12},
        };

        const validateMessages = {
            required: '${label} is required!',
            types: {
                email: '${label} is not validate email!',
                number: '${label} is not a validate number!',
            },
            number: {
                range: '${label} must be between ${min} and ${max}',
            },
        };

        return (
            <Form
                {...layout}
                name="nest-messages"
                onFinish={this.onFinish.bind(this)}
                validateMessages={validateMessages}>

                <Form.Item name='title' label="Title" rules={[{required: true}]}>
                    <Input/>
                </Form.Item>


                <Form.Item name='content' label="Content" rules={[{required: true}]}>
                    <Input.TextArea/>
                </Form.Item>

                <Form.Item wrapperCol={{...layout.wrapperCol}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const mapStateToProps = (state) => ({
    posts: state.posts
})

const mapDispatchToProps = {
    createPost
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewPost)
