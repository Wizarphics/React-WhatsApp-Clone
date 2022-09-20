import React, {useRef} from 'react'
import { Container, Form, Button} from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'

export default function Login({ onIdSubmit }) {
    const idRef = useRef()

    const handleSubmit = e => {
        e.preventDefault();

        onIdSubmit(idRef.current.value)
    }

    const createNewId = () => {
        onIdSubmit(uuidv4())
    }

  return (
    <Container className="align-items-center d-flex" style = { {height: "100vh"}} >
        <Form  onSubmit={handleSubmit} className='w-100'>
            <Form.Group className='mb-3'>
                <Form.Label>Enter your Id</Form.Label>
                <Form.Control type='text' name='id' ref={idRef} required></Form.Control>                
            </Form.Group>
            <Button type='submit' className='me-2'>Login</Button>
            <Button onClick={createNewId} variant='secondary'>Create A New Id</Button>
        </Form>
    </Container>
  )
}