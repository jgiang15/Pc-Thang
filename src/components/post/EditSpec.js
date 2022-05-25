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

class EditSpec extends Component {
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
	      createSpec(title, 'short answer', this.state.sId, user)
	        .then(() => this.onShowSurvey())
	        .then(() => this.setJSX())
	        .then(() => history.push('/surveys/' + this.state.sId))
	        .catch(() => console.error)
	    } else {
	      updateQuestion(title, 'short answer', this.state.sId, qId, user)
	        .then(() => this.onShowSurvey())
	        .then(() => this.setJSX())
	        .then(() => history.push('/surveys/' + this.state.sId))
	        .catch(() => console.error)
	    }
	  }
	}

	deleteDynamic = (event) => {
	  const num = event.target.getAttribute('data-num')
	  const qId = event.target.getAttribute('data-id')
	  const { sId, amt } = this.state
	  const { user } = this.props
	  if (qId === null || qId === '') {
	    for (let i = num; i < amt; i++) {
	      const r = parseInt(i) + 1
	      if (this.state['question' + r] === undefined) {
	        this.setState({ ['question' + i]: '' })
	      }
	      this.setState({ ['question' + i]: this.state['question' + r] })
	    }
	    this.setState({ amt: this.state.amt - 1, ['question' + amt]: null })
	    this.setJSX()
	    return
	  }
	  deleteQuestion(sId, qId, user)
	    .then(() => this.onShowSurvey())
	    .then(() => {
	      for (let i = num; i < amt; i++) {
	        const r = parseInt(i) + 1
	        if (this.state['question' + r] === undefined) {
	          this.setState({ ['question' + i]: '' })
	        }
	        this.setState({
	          ['question' + i]: this.state['question' + r],
	          ['question' + i + 'key']: this.state['question' + r + 'key']
	        })
	      }
	      this.setState({
	        amt: this.state.amt - 1,
	        ['question' + amt]: undefined,
	        ['question' + amt + 'key']: undefined
	      })
	    })
	    .then(() => this.setJSX())
	    .catch(() => console.error)
	}

	addQuestion = () => {
	  this.setState({ amt: this.state.amt + 1 })
	  this.setJSX()
	}

	setJSX = () => {
	  const questionJSX = []
	  for (let i = 1; i < this.state.amt + 1; i++) {
	    questionJSX.push(
	      <>
	        <Form.Group controlId={this.state['question' + i + 'key']}>
	          <Form.Label>Question</Form.Label>
	          <Form.Control
	            required
	            maxLength='300'
	            type='question'
	            value={this.state['question' + i]}
	            name={'question' + i}
	            placeholder='Enter question'
	            onChange={this.handleChange}
	          />
	        </Form.Group>
	        <Form.Group controlId={'answer' + i}>
	          <Form.Label>Description</Form.Label>
	          <Form.Control
	            disabled
	            name='text'
	            type='text'
	            placeholder='Short Answer Question'
	          />
	        </Form.Group>
	        <Button
	          variant='primary'
	          type='button'
	          onClick={this.deleteDynamic}
	          data-num={i}
	          data-id={this.state['question' + i + 'key']}>
						Delete
	        </Button>
	      </>
	    )
	  }
	  return questionJSX
	}

	render () {
	  const questionJSX = this.setJSX()
	  const { title } = this.state
	  if (title === '') {
	    return 'Loading ...'
	  }
	  return (
	    <>
	      <h4>{this.state.title}</h4>
	      <p>Description: {this.state.text}</p>
	      <Button variant='primary' onClick={this.addQuestion}>
					Add Question
	      </Button>
	      <Form onSubmit={this.onSubmit}>
	        {questionJSX}
	        <Button variant='primary' type='submit'>
						Submit
	        </Button>
	      </Form>
	    </>
	  )
	}
}

export default withRouter(EditQuestions)
