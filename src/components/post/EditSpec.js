import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {
  createSpec,
  deleteSpec,
  updateSpec
} from '../../api/spec'
import { showPost } from '../../api/post'

class EditSpecs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      postId: '',
      amt: 0,
      spec: []
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    const { user } = this.props
    showPost(user, id)
      .then((response) =>
        this.setState({
          postId: response.data.post._id,
          title: response.data.post.title,
          description: response.data.post.description,
          spec: response.data.post.spec
        })
      )
      .then(() => this.setState({ amt: this.state.spec.length }))
      .then(() => {
        for (let i = 1; i < this.state.amt + 1; i++) {
          const specId = this.state.spec[i - 1]._id
          const motherboard = this.state.spec[i - 1].motherboard
          const gpu = this.state.spec[i - 1].gpu
          const ram = this.state.spec[i - 1].ram
          const powersupply = this.state.spec[i - 1].powersupply
          const cpu = this.state.spec[i - 1].cpu
          const storage = this.state[i - 1].storage
          // if (specId === undefined) specId = ''
          // if (value === undefined) value = ''
          this.setState({
            ['spec' + i + 'key']: specId,
            ['spec' + i + 'motherboard']: motherboard,
            ['spec' + i + 'gpu']: gpu,
            ['spec' + i + 'ram']: ram,
            ['spec' + i + 'powersupply']: powersupply,
            ['spec' + i + 'cpu']: cpu,
            ['spec' + i + 'storage']: storage
          })
        }
      })
      .catch(console.error)
  }

  onShowPost = () => {
    const id = this.props.match.params.id
    const { user } = this.props
    showPost(user, id)
      .then((response) =>
        this.setState({ spec: response.data.post.spec })
      )
      .then(() => {
        for (let i = 1; i < this.state.spec.length + 1; i++) {
          const specId = this.state.spec[i - 1]._id
          const motherboard = this.state.spec[i - 1].motherboard
          const gpu = this.state.spec[i - 1].gpu
          const ram = this.state.spec[i - 1].ram
          const powersupply = this.state.spec[i - 1].powersupply
          const cpu = this.state.spec[i - 1].cpu
          const storage = this.state[i - 1].storage
          // if (qId === undefined) qId = ''
          // if (value === undefined) value = ''
          this.setState({
            ['spec' + i + 'key']: specId,
            ['spec' + i + 'motherboard']: motherboard,
            ['spec' + i + 'gpu']: gpu,
            ['spec' + i + 'ram']: ram,
            ['spec' + i + 'powersupply']: powersupply,
            ['spec' + i + 'cpu']: cpu,
            ['spec' + i + 'storage']: storage
          })
        }
      })
      .catch(console.error)
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
    })

  onSubmit = (event) => {
    event.preventDefault()
    for (let i = 1; i < this.state.amt + 1; i++) {
      const { user, history } = this.props
      const specId = this.state['spec' + i + 'key']
      const motherboard = this.state['spec' + i + 'motherboard']
      const gpu = this.state['spec' + i + 'gpu']
      const ram = this.state['spec' + i + 'ram']
      const powersupply = this.state['spec' + i + 'powersupply']
      const cpu = this.state['spec' + i + 'cpu']
      const storage = this.state['spec' + i + 'storage']
      if (specId === undefined) {
        createSpec(user, this.state.postId, motherboard, gpu, ram, powersupply, cpu, storage)
        // .then(() => this.onShowPost())
        // .then(() => this.setJSX())
          .then(() => history.push('/posts/' + this.state.postId))
          .catch(() => console.error)
      } else {
        updateSpec(user, this.state.postId, specId, motherboard, gpu, ram, powersupply, cpu, storage)
        // .then(() => this.onShowSurvey())
        // .then(() => this.setJSX())
          .then(() => history.push('/posts/' + this.state.postId))
          .catch(() => console.error)
      }
    }
  }

  deleteDynamic = (event) => {
    const num = event.target.getAttribute('data-num')
    const specId = event.target.getAttribute('data-id')
    const { postId, amt } = this.state
    const { user } = this.props
    if (specId === null || postId === '') {
      for (let i = num; i < amt; i++) {
        const r = parseInt(i) + 1
        if (this.state['spec' + r] === undefined) {
          this.setState({ ['spec' + i]: '' })
        }
        this.setState({ ['spec' + i]: this.state['spec' + r] })
      }
      this.setState({ amt: this.state.amt - 1, ['spec' + amt]: null })
      this.setJSX()
      return
    }
    deleteSpec(postId, specId, user)
      .then(() => this.onShowSpec())
      .then(() => {
        for (let i = num; i < amt; i++) {
          const r = parseInt(i) + 1
          if (this.state['spec' + r] === undefined) {
            this.setState({ ['spec' + i]: '' })
          }
          this.setState({
            ['spec' + i]: this.state['spec' + r],
            ['spec' + i + 'key']: this.state['spec' + r + 'key']
          })
        }
        this.setState({
          amt: this.state.amt - 1,
          ['spec' + amt]: undefined,
          ['spec' + amt + 'key']: undefined
        })
      })
      .then(() => this.setJSX())
      .catch(() => console.error)
  }

  addSpec = () => {
    this.setState({ amt: this.state.amt + 1 })
    this.setJSX()
  }

  setJSX = () => {
    const specJSX = []
    for (let i = 1; i < this.state.amt + 1; i++) {
      specJSX.push(
        <div key={i}>
          <Form.Group>
            <Form.Label>Motherboard</Form.Label>
            <Form.Control
              required
              type='text'
              value={this.state['spec' + i + 'motherboard'] || ''}
              name={'spec' + i + 'motherboard'}
              placeholder='Enter Motherboard'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>GPU</Form.Label>
            <Form.Control
              required
              type='text'
              value={this.state['spec' + i + 'gpu'] || ''}
              name={'spec' + i + 'gpu'}
              placeholder='Enter GPU'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>RAM</Form.Label>
            <Form.Control
              required
              type='text'
              value={this.state['spec' + i + 'ram'] || ''}
              name={'spec' + i + 'ram'}
              placeholder='Enter RAM'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>PowerSupply</Form.Label>
            <Form.Control
              required
              type='text'
              value={this.state['spec' + i + 'powersupply'] || ''}
              name={'spec' + i + 'powersupply'}
              placeholder='Enter PowerSupply'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>CPU</Form.Label>
            <Form.Control
              required
              type='text'
              value={this.state['spec' + i + 'cpu'] || ''}
              name={'spec' + i + 'cpu'}
              placeholder='Enter CPU'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Storage</Form.Label>
            <Form.Control
              required
              type='text'
              value={this.state['spec' + i + 'storage'] || ''}
              name={'spec' + i + 'storage'}
              placeholder='Enter Storage'
              onChange={this.handleChange}
            />
          </Form.Group>
          {/* <Form.Group controlId={'answer' + i}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              name='text'
              type='text'
              placeholder='Short Answer Question'
            />
          </Form.Group> */}
          <Button
            variant='primary'
            type='button'
            onClick={this.deleteDynamic}
            data-num={i}
            data-id={this.state['spec' + i + 'key']}>
            Delete
          </Button>
        </div>
      )
    }
    return specJSX
  }

  render () {
    const specJSX = this.setJSX()
    const { title } = this.state
    if (title === '') {
      return 'Loading ...'
    }
    return (
      <>
        <h4>{this.state.title}</h4>
        <p>Description: {this.state.description}</p>
        <Button variant='primary' onClick={this.addSpec}>
          Add Spec
        </Button>
        <Form onSubmit={this.onSubmit}>
          {specJSX}
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </>
    )
  }
}

export default withRouter(EditSpecs)
