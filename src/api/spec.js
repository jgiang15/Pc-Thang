import apiUrl from '../apiConfig'
import axios from 'axios'

export const createSpec = (motherboard, gpu, ram, powerSupply, cpu, storage, postId, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/specs/',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      spec: {
        motherboard: motherboard,
        gpu: gpu,
        ram: ram,
        powerSupply: powerSupply,
        cpu: cpu,
        storage: storage,
        postId: postId,
        owner: user._id
      }
    }
  })
}

export const updateSpec = (motherboard, gpu, ram, powerSupply, cpu, storage, postId, specId, user) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/specs/' + specId,
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      spec: {
        motherboard: motherboard,
        gpu: gpu,
        ram: ram,
        powerSupply: powerSupply,
        cpu: cpu,
        storage: storage,
        postId: postId,
        owner: user._id
      }
    }
  })
}

export const deleteSpec = (postId, specId, user) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/specs/' + specId,
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      spec: {
        postId: postId
      }
    }
  })
}
