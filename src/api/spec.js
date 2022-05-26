import apiUrl from '../apiConfig'
import axios from 'axios'

export const createSpec = (user, postId, motherboard, gpu, ram, powerSupply, cpu, storage) => {
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

export const updateSpec = (user, postId, specId, motherboard, gpu, ram, powerSupply, cpu, storage) => {
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

export const deleteSpec = (user, postId, specId) => {
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
