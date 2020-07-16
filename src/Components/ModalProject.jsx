import React, { Component} from 'react'
import { Form, Button, Table, Modal } from 'react-bootstrap'


export default class ModalProject extends Component {
    state = {
        projects : [],
        data : [],
        showModal : this.props.showModal,
          
     
      
    }
    handleClose=() =>{
        this.setState({ showModal : false})
     }
 
    render(){
        console.log(this.props.show)
        return (
            <>
            <Modal show={this.props.showModal}>
            <Modal.Header closeButton>
              <Modal.Title>Project info</Modal.Title>
            </Modal.Header>

            
            <Modal.Body>
            
            </Modal.Body>
       
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary">
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          </>
        )
    }
}