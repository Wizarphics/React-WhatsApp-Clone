import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../context/ContactsProvider'

export default function NewContactModal({ closeModal }) {

  const idRef = useRef()
  const nameRef = useRef()
  const { createContact } = useContacts()

  const handleSubmit = e => {
    e.preventDefault();

    createContact(idRef.current.value, nameRef.current.value)
    closeModal();
  };

  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Id</Form.Label>
            <Form.Control type='text' ref={idRef} required></Form.Control>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' ref={nameRef} required></Form.Control>
          </Form.Group>
          <Button type='submit'>Create</Button>
        </Form>
      </Modal.Body>
    </>
  )
}