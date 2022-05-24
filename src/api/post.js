import apiUrl from '../apiConfig'
import axios from 'axios'

export const createPost = (post, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/posts/',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      post: {
        title: post.title,
        description: post.description
      }
    }
  })
}

export const indexPosts = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/posts/',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const showPost = (user, id) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/posts/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const deletePost = (user, id) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/posts/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const updatePost = (post, user, id) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/posts/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      post: {
        title: post.title,
        description: post.description
      }
    }
  })
}
