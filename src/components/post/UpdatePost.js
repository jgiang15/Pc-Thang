import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { updatePost, showPost } from '../../api/post'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class UpdatePosts extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      spec: false
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    const { user } = this.props
    showPost(user, id)
      .then((response) =>
        this.setState({
          title: response.data.post.title,
          description: response.data.post.description
        })
      )
      .catch(console.error)
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
    })

  onUpdatePost = (event) => {
    event.preventDefault()
    const id = this.props.match.params.id
    const { user, history } = this.props
    updatePost(this.state, user, id).then(() =>
      history.push('/posts/' + this.props.match.params.id)
    )
  }

  test = () => {
    this.setState({ spec: true })
  }

  render () {
    if (this.state.title === '') {
      return 'Loading...'
    }
    if (this.state.spec) {
      return (
        <Redirect
          to={'/posts/' + this.props.match.params.id + '/update/spec'}
        />
      )
    }
    return (
      <>
        <div className='row'>
          <div className='col-sm-10 col-md-8 mx-auto mt-5'>
            <h3>Update Post</h3>
            <Form onSubmit={this.onUpdatePost}>
              <Form.Group controlId='title'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  type='title'
                  name='title'
                  value={this.state.title}
                  placeholder='Enter title'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId='text'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name='description'
                  value={this.state.description}
                  type='description'
                  placeholder='description'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </Form>
          </div>
        </div>
        <Button variant='primary' onClick={this.test}>
          Specs
        </Button>
      </>
    )
  }
}

export default withRouter(UpdatePosts)
