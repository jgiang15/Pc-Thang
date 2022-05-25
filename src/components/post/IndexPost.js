import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { indexPosts } from '../../api/post'
import Button from 'react-bootstrap/Button'

class IndexPosts extends Component {
  constructor (props) {
    super(props)
    this.state = {
      posts: null,
      show: false,
      owned: false
    }
  }

  viewAllPosts = () => {
    const { msgAlert, user } = this.props
    indexPosts(user)
      .then((res) =>
        res.data.posts.filter(
          (post) => post.owner !== this.props.user._id
        )
      )
      .then((res) => this.setState({ posts: res, show: true, owned: false }))
      .then(() =>
        msgAlert({
          heading: 'Successfully Indexed Posts',
          message: 'success',
          variant: 'success'
        })
      )
      .catch((error) => {
        msgAlert({
          heading: 'Error',
          message: 'Error:' + error.message,
          variant: 'danger'
        })
      })
  }

  viewYourPosts = () => {
    const { msgAlert, user } = this.props
    indexPosts(user)
      .then((res) =>
        res.data.posts.filter(
          (post) => post.owner === this.props.user._id
        )
      )
      .then((res) => this.setState({ posts: res, show: true, owned: true }))
      .then(() =>
        msgAlert({
          heading: 'Successfully Indexed Posts',
          message: 'success',
          variant: 'success'
        })
      )
      .catch((error) => {
        msgAlert({
          heading: 'Error',
          message: 'Error:' + error.message,
          variant: 'danger'
        })
      })
  }

  goBack = () => {
    this.setState({ show: false })
  }

  render () {
    const { posts, show, owned } = this.state
    let titleJSX
    if (owned) {
      titleJSX = <h3>Your Posts</h3>
    } else {
      titleJSX = <h3>All Posts</h3>
    }
    if (show) {
      if (posts === null) {
        return 'Loading...'
      } else {
        return (
          <div className='row'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5'>
              {titleJSX}
              {posts.map((post) => {
                // add filter to show only posts by owner
                return (
                  <li id={post._id} key={post._id}>
                    <Link to={'/posts/' + post._id}>{post.title}</Link>
                  </li>
                )
              })}
              <Button variant='primary' onClick={this.goBack}>
                Back
              </Button>
            </div>
          </div>
        )
      }
    }

    return (
      <>
        <Button variant='primary' onClick={this.viewAllPosts}>
          View All Posts
        </Button>{' '}
        <br />
        <Button onClick={this.viewYourPosts}>View Your Posts</Button>
      </>
    )
  }
}

export default withRouter(IndexPosts)
