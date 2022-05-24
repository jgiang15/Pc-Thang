import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { showPost, deletePost } from '../../api/post'
import Button from 'react-bootstrap/Button'

class Post extends Component {
  constructor (props) {
    super(props)
    this.state = {
      post: null,
      // takeSurvey: false,
      seePosts: false
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    const { user } = this.props
    showPost(user, id)
      .then((response) => this.setState({ post: response.data.post }))
      .catch(console.error)
  }

  deleteClick = () => {
    const id = this.props.match.params.id
    const { user, history } = this.props
    deletePost(user, id)
      .then(() => history.push('/posts'))
      .catch(console.error)
  }

  updateClick = () => {
    const { history } = this.props
    history.push('/posts/' + this.props.match.params.id + '/update')
  }

  // takeSurvey = () => {
  //   this.setState({ takeSurvey: true })
  // }

  seePosts = () => {
    this.setState({ seeResponses: true })
  }

  render () {
    const { post, seePosts } = this.state
    const { user } = this.props
    if (post === null) {
      return 'Loading...'
    }
    let specJSX
    if (post.spec.length === 0) {
      specJSX = 'Add Some Specs to Your PC'
    } else {
      specJSX = post.spec.map((spec) => (
        <li key={spec._id}>{spec.title}</li>
      ))
    }
    let buttonJSX
    if (post.owner === user._id) {
      buttonJSX = (
        <>
          <Button variant='primary' onClick={this.deleteClick}>
            Delete Post
          </Button>
          <Button variant='primary' onClick={this.updateClick}>
            Update Post
          </Button>
          <Button variant='primary' onClick={this.seePosts}>
            See Posts
          </Button>
        </>
      )
    } else {
      buttonJSX = (
        <Button variant='primary' onClick={this.seePosts}>
          See Posts
        </Button>
      )
    }
    // if (takeSurvey) {
    //   return <Redirect to={'/surveys/' + survey._id + '/take-survey'} />
    // }
    if (seePosts) {
      return <Redirect to={'/posts/'} />
    }
    if (post.description === '') {
      return (
        <>
          <h4>Posts</h4>
          <h5>{this.state.post.title}</h5>
          <h5>Here Are The Specs</h5>
          <ul>{specJSX}</ul>
          {buttonJSX}
        </>
      )
    }
    return (
      <>
        <h4>Posts</h4>
        <h5>{this.state.post.title}</h5>
        <p>Description: {this.state.post.description}</p>
        <h5>Here Are All The Specs</h5>
        <ul>{specJSX}</ul>
        {buttonJSX}
      </>
    )
  }
}

export default withRouter(Post)
