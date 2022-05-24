import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { createPost } from '../../api/post'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreatePost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      id: ''
    }
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
    })

  onCreatePost = (event) => {
    event.preventDefault()

    const { msgAlert, user, history } = this.props

    createPost(this.state, user)
      .then((res) => this.setState({ id: res.data.post._id }))
      .then(() =>
        msgAlert({
          heading: 'Successfully Created A Post',
          message: 'success',
          variant: 'success'
        })
      )
      .then(() => history.push('/posts/' + this.state.id))
      .catch((error) => {
      // this.setState({ email: '', password: '', passwordConfirmation: '' })
        msgAlert({
          heading: 'Error',
          message: 'Error:' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { title, description } = this.state

    return (
      <div className='row'>
        <div className='col-sm-10 col-md-8 mx-auto mt-5'>
          <h3>Create A Post</h3>
          <Form onSubmit={this.onCreatePost}>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type='title'
                name='title'
                value={title}
                placeholder='Enter title'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId='text'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                name='description'
                value={description}
                type='text'
                placeholder='Enter description'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(CreatePost)
