import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as ConfigurationsStore from '../store/Configurations';
import { useState } from 'react';

// TODO: 
class ConfigModal extends React.PureComponent<{
    closeModal, modal: boolean, actionType,
    id, type, name, value, applicationName, isActive, ensureDataFetched
}, {
    modal: boolean, type: string, closeModal: any, id: number,
    name: string, value: string, applicationName: string, isActive: boolean
}
    >   {
    // This method is called when the component is first added to the document  
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            modal: false,
            type: this.props.type,
            name: this.props.name,
            value: this.props.value,
            applicationName: this.props.applicationName,
            isActive: this.props.isActive,
            closeModal: "",
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
    }

    public componentDidUpdate() {
        if (this.props.id !== this.state.id) {
            this.setState({
                id: this.props.id,
                modal: false,
                type: this.props.type,
                name: this.props.name,
                value: this.props.value,
                applicationName: this.props.applicationName,
                isActive: this.props.isActive,
                closeModal: "",
            });
        }
    }

    handleCheckBox = (event: any) => {
        this.setState({ ...this.state, isActive: !this.state.isActive });
    }
    handleChange = (event: any) => {
        const { target: { name, value } } = event;
        this.setState({ ...this.state, [name]: value });
    }

    onSubmit(e: any) {
        e.preventDefault();
        this.submit();
    }
    submit() {
        switch (this.props.actionType) {
            case "ADD_NEW_ITEM":
                fetch(`configuration/add`, {
                    method: 'POST',
                    body: JSON.stringify({
                        id: this.state.id,
                        type: this.state.type,
                        name: this.state.name, value: this.state.value,
                        applicationName: this.state.applicationName, isActive: this.state.isActive
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(data => {
                        this.props.closeModal();
                        if (data.status === 200) {
                            alert("İşlem başarılı");
                            this.props.ensureDataFetched(true);
                        }
                        else {
                            alert("İşlem başarısız");
                        }
                    });
                break;
            case "DELETE_ITEM":
                fetch(`configuration/delete`, {
                    method: 'POST',
                    body: JSON.stringify({
                        id: this.state.id,
                        type: this.state.type,
                        name: this.state.name, value: this.state.value,
                        applicationName: this.state.applicationName, isActive: this.state.isActive
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(data => {
                        this.props.closeModal();
                        if (data.status === 200) {
                            alert("İşlem başarılı");
                            this.props.ensureDataFetched(true);
                        }
                        else {
                            alert("İşlem başarısız");
                        }
                    });
                break;
            case "EDIT_ITEM":
                fetch(`configuration/edit`, {
                    method: 'POST',
                    body: JSON.stringify({
                        id: this.state.id,
                        type: this.state.type,
                        name: this.state.name, value: this.state.value,
                        applicationName: this.state.applicationName, isActive: this.state.isActive
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(data => {
                        this.props.closeModal();
                        if (data.status === 200) {
                            alert("İşlem başarılı");
                            this.props.ensureDataFetched(true);
                        }
                        else {
                            alert("İşlem başarısız");
                        }
                    });
                break;
            default:
        }
    }
    public render() {
        const {
            modal,
            closeModal,
            actionType
        } = this.props;

        const {
            isActive,
            applicationName,
            name,
            type,
            value
        } = this.state;
        return (
            <React.Fragment>
                <Modal isOpen={modal} toggle={closeModal}>
                    <ModalHeader toggle={closeModal}>
                        {
                            actionType === 'ADD_NEW_ITEM' ?
                                <h5>Add New Item </h5> :
                                actionType === 'DELETE_ITEM' ?
                                    <h5>Delete Existing Item </h5> :
                                    actionType === 'EDIT_ITEM' ?
                                        <h5>Edit Existing Item </h5> : ''
                        }
                    </ModalHeader>
                    <ModalBody>
                        {
                            actionType !== 'DELETE_ITEM' &&
                            <Form onSubmit={this.onSubmit} id="form">
                                <FormGroup>
                                    <Label for="applicationName">Application Name</Label>
                                    <Input type="text" name="applicationName" onChange={this.handleChange} id="applicationName" placeholder="" required value={applicationName} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="type">Select</Label>
                                    <Input type="select" name="type" id="type" required onChange={this.handleChange} value={type}>
                                        <option value="" disabled>Please Select Type</option>
                                        <option>Boolean</option>
                                        <option>String</option>
                                        <option>Datetime</option>
                                        <option>Integer</option>
                                        <option>Long</option>
                                        <option>Decimal</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input type="text" name="name" id="name" placeholder="" required onChange={this.handleChange} value={name} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="value">Value</Label>
                                    <Input type="text" name="value" id="value" onChange={this.handleChange} value={value} />
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" name="isActive" onChange={this.handleCheckBox} checked={isActive} />{' '}
                                        Is Active
                                </Label>
                                </FormGroup>
                            </Form>
                        }

                    </ModalBody>
                    <ModalFooter>
                        {
                            actionType !== 'DELETE_ITEM' ?
                                <Button color="primary" form='form'>Submit</Button>
                                :
                                <Button color="primary" onClick={this.submit}>Submit</Button>
                        }
                        {' '}
                        <Button color="secondary" onClick={closeModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment >
        );
    }



}
export default ConfigModal;
//export default connect(
//    (state: ApplicationState) => state.configurations, // Selects which state properties are merged into the component's props

//    ConfigurationsStore.actionCreators // Selects which action creators are merged into the component's props 
//)(ConfigModal as any);
