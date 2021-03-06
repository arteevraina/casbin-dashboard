import React from 'react'
import { Form, Input, Button, Card } from 'antd';
import * as Backend from "../../../Backend";
import * as Setting from "../../../Setting";
import { Select } from 'antd';

const { Option } = Select;



class EditEnforcer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: props,
            enforcer: null,
            adapters: this.props.location.state[1].adapters,
            models: this.props.location.state[1].models,
        };
    }

    componentDidMount() {
        Backend.getEnforcer(this.props.match.params.id)
            .then((res) => {
                this.setState({
                    enforcer: res
                });
            },
            );
    }

    render() {
        const layout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 16,
            },
        };
        
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                }
            }
        }
        const onFinish = values => {
            Backend.deleteEnforcer(this.props.location.state[0])
            .then((res) => {
                this.setState({
                    enforcer: {
                        id: values.enforcer.id,
                        name: values.enforcer.name,
                        model: values.enforcer.model,
                        adapter: values.enforcer.adapter,
                    }
                })
                Backend.updateEnforcer(this.state.enforcer)
                .then((res) => {
                    Setting.showMessage("success", `Edit succeeded`);
                    this.props.history.push("/dashboard/home");
                })
                .catch(error => {
                    Setting.showMessage("error", `Edit failed: ${error}`);
                });
            })
        };
        return (
            <Card
                title="Edit Enforcers"
                extra={
                    <Button onClick={() => this.props.history.push("/dashboard/home")}>
                        Cancel
                    </Button>
                }
            >
                <Form {...layout} name="nest-messages" onFinish={onFinish}>
                    <Form.Item
                        name={['enforcer', 'id']}
                        label="Id"
                        rules={[
                            {
                                required: true,
                                message: 'The id is required!',
                            },
                        ]}
                        initialValue={this.props.location.state[0].id}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['enforcer', 'name']}
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: 'The name is required!',
                            }]
                        }
                        initialValue={this.props.location.state[0].name}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['enforcer', 'model']}
                        label="Model"
                        rules={[
                            {
                                required: true,
                                message: 'The model is required!',
                            }]
                        }
                        initialValue={this.props.location.state[0].model}
                    >
                        <Select style={{ width: '100%' }}>
                        {this.state.models.map(model => (<Option key={model.id}>{model.id}</Option>))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={['enforcer', 'adapter']}
                        label="Adapter"
                        rules={[
                            {
                                required: true,
                                message: 'The adapter is required!',
                            },
                        ]}
                        initialValue={this.props.location.state[0].adapter}
                    >
                        <Select style={{ width: '100%' }}>
                        {this.state.adapters.map(adapter => (<Option key={adapter.id}>{adapter.id}</Option>))}
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default EditEnforcer
