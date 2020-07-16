import React, { Component } from 'react';
import { Form, Button, Table, Modal } from 'react-bootstrap'
import ModalProject from './ModalProject'


class Students extends Component {
    constructor(props){
        super(props)
        this.state={
            data : [],
            projects: [],
            show: false,
            Mshow: false,
        
             student : {
              name: '',
              surname: '',
              email: '',
              dateofbirth: '',
            
             submitted: false,
        }
    }
 
  }

    componentDidMount = async () => {
      const resp = await fetch('http://localhost:3456/users')
      const result =  await resp.json()
      //console.log(result)
      this.setState({
        data : result
      })
      console.log("props from student", this.props.match)
    }

    onChangeStudent =event => {
      console.log(event.target.name, event.target.value)
      this.setState({
        ...this.state,
        student: {
          ...this.state.student,
          [event.target.name] : event.target.value
        }
        
      })
    }

    onChange = (event) => {
      console.log(event.target.name, event.target.value)
      this.setState({
          student: {
            ...this.state.student,
            [event.target.name] : event.target.value
          }
          
      })
  }

    saveStudeent = async (event) =>{
      event.preventDefault()
       this.setState({ submitted: true})
      const data =  {
        name: this.state.student.name,
        surname: this.state.student.surname,
        email: this.state.student.email,
        dateofbirth : this.state.student.dateofbirth,
      
    }
      const resp = await fetch('http://localhost:3456/users', {
        method: 'POST',
        body: JSON.stringify(data ),
        headers: {
            'Content-Type' : 'application/json'
        }
      })
      if(resp.ok) {
        alert('New student added')
      }
      //console.log(resp)
    }
    delItem = async (id) => {
      // event.preventDefault()
      
      const resp = await fetch('http://localhost:3456/users/' + id, {
        method: 'DELETE',
       
      })
      if(resp.ok){
        alert("deleted")
      }
    }
   handleClose() {
      this.setState({ show: false})
   }
   openAndEdit = async (id) => {
  
    const student = this.state.data.find(student => student._id === id)
    this.setState({
      show: true,
      student: student
      // data : result
    })
   }
    
   
   
   editItem = async (id) => {
      const udatedData =  {
        _id: id,
        name: this.state.student.name,
        surname: this.state.student.surname,
        email: this.state.student.email,
        dateofbirth : this.state.student.dateofbirth,
    
    }
      // this.setState({  data: udatedData  })
      // event.preventDefault()
      const resp = await fetch('http://localhost:3456/users/' +  id, {
        method: 'PUT',
        body: JSON.stringify(udatedData ),
        headers: {
            'Content-Type' : 'application/json'
        }
      })
      //find the element into this.state.data
      const oldStudent = this.state.data.find(x => x._id === id)
      const index = this.state.data.indexOf(oldStudent)
      const students = this.state.data
      students[index] =udatedData
      //replace it and update the state
      this.setState({
        data: students, 
        show: false
      })
    }
  
    openProject  = async (id) => {
        const resp = await fetch('http://localhost:3456/users/' + id )
        const result =  await resp.json()
        //console.log(result)
        this.setState({
          projects : result,
          Mshow: true
        })
        console.log(result)
      
      }
   
  render() {
    console.log(this.state.projects)
    // console.log("props from student", this.props)
    return (
      <>
         <div className='container mt-5'>
           <h5><i>Add new user</i></h5>
         <Form className='mt-4 formSub' onSubmit={this.saveStudeent}>
         <Form.Group>
           <Form.Label>Name</Form.Label>
           <Form.Control name='name' onChange={this.onChange} value={this.state.student.name} type="text" placeholder="Enter name" />
         </Form.Group>
   
         <Form.Group>
           <Form.Label>Surname</Form.Label>
           <Form.Control name='surname' onChange={this.onChange} value={this.state.student.surname} type="text" placeholder="Enter surname" />
         </Form.Group>
   
         <Form.Group>
           <Form.Label>Email</Form.Label>
           <Form.Control name='email' onChange={this.onChange} value={this.state.student.email} type="email" placeholder="Enter email" />
           <Form.Text className="text-muted">
             We'll never share your email with anyone else.
           </Form.Text>
         </Form.Group>
   
         <Form.Group>
           <Form.Label>Date of Birth</Form.Label>
           
           <Form.Control  name='dateofbirth' onChange={this.onChange} value={this.state.student.dateofbirth} type="date" />
         </Form.Group>
   
         
       
         <Button variant="danger" type="submit">
           Submit
         </Button>
       </Form>

       <Table striped bordered hover className='mt-5'>
      
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Surname</th>
      <th>Email</th>
      <th>Date of Birth</th>
    
      
    </tr>


   
       
       { this.state.data.map((item, i) => {
          

       return (
         <>
          <tr>
        <td>{i+1}</td>
        <td>{item.name}</td>
        <td>{item.surname}</td>
        <td>{item.email}</td>
        <td>{item.dateofbirth}</td>
        
        <td><Button variant='danger' onClick={() => this.delItem(item._id)}>Remove</Button></td>
        <td><Button variant='success' onClick={() => this.openAndEdit(item._id)}>Edit</Button></td>
        <td><Button variant='dark' onClick={() => this.openProject(item._id)}>Project</Button></td>
        </tr>
        <Modal show={this.state.show} >
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Form className='mt-4 formSub' onSubmit={this.saveStudeent}>
         <Form.Group>
           <Form.Label>Name</Form.Label>
           <Form.Control name='name' onChange={this.onChangeStudent} value={this.state.student.name} type="text" placeholder="Enter name" />
         </Form.Group>
   
         <Form.Group>
           <Form.Label>Surname</Form.Label>
           <Form.Control name='surname' onChange={this.onChangeStudent} value={this.state.student.surname} type="text" placeholder="Enter surname" />
         </Form.Group>
   
         <Form.Group>
           <Form.Label>Email</Form.Label>
           <Form.Control name='email' onChange={this.onChangeStudent} value={this.state.student.email} type="email" placeholder="Enter email" />
           <Form.Text className="text-muted">
             We'll never share your email with anyone else.
           </Form.Text>
         </Form.Group>
   
         <Form.Group>
           <Form.Label>Date of Birth</Form.Label>
           {this.state.student.dateofbirth.split('T')[0]}
           <Form.Control name='dateofbirth' onChange={this.onChangeStudent} value={this.state.student.dateofbirth.split('T')[0]} type="date" />
         </Form.Group>
   
        
       
        
       </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.handleClose() }>
            Close
          </Button>
          <Button variant="primary" onClick={() => this.editItem(item._id)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <ModalProject show={this.state.projects} showModal={this.state.Mshow} />
        </>
        
  )
       }
     )
      }

  
</Table>
       </div>
      
      </>
     );
  }
 
}

export default Students;
