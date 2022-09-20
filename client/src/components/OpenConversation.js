import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button, Navbar, Container } from 'react-bootstrap'
import { useConversations } from '../context/ConversationsProvider'


export default function OpenConversation() {
    const [text, setText] = useState('')
    const setRef = useCallback(node => {
        if (node) {
            node.scrollIntoView({ smooth: true })
        }
    }, [])
    const { sendMessage, selectedConversation } = useConversations()

    const handleSubmit = (e) => {
        e.preventDefault()

        sendMessage(
            selectedConversation.recipients.map(
                r => r.id
            ),
            text
        )

        setText('')
    }

    return (
        <div className='d-flex flex-column flex-grow-1'>
            <Navbar bg="primary" variant='dark'>
                <Container>
                    <Navbar.Brand href="#home">WhatsApp Clone</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Created by: <a href="https://wizarphics.com">Me</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <p className="text-center text-warning btn btn-link w-100 py-2 small">End to end encryted conversation between {selectedConversation.recipients.map(r =>r.name).join(', ')}</p>
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column my-3 align-items-start justify-content-end px-3">
                    {selectedConversation.messages.map((message, index) => {
                        const lastMessage = selectedConversation.messages.length - 1 === index
                        return (
                            <div
                                ref={lastMessage ? setRef : null}
                                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
                                key={index}
                            >
                                <div
                                    className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}
                                >
                                    {message.text}
                                </div>
                                <div
                                    className={`text-muted small
                                ${message.fromMe ? 'text-end' : ''}
                                `}>
                                    {message.fromMe ? 'You' : message.senderName}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='m-2'>
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            value={text}
                            onChange={e => setText(e.target.value)}
                            style={{ height: "50px", resize: "none" }}
                        />
                        <Button type="submit">Send</Button>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}
