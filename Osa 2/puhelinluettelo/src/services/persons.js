import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request
        .then(response =>  {
            return { data: response.data, message: 'Contact added', success: true }
     })
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request
        .then(response =>  {
            return {data: response.data, message: 'Contact updated', success: true }
         })
        .catch(error => {
             console.log('error', error)
             return {data: response.data, message: 'Contact not found', success: false }
        })
}

const deletion= (id) => {
    const request =axios.delete(`${baseUrl}/${id}`)
    return request
        .then(response =>  {
            return { message: 'Number deleted', success: true }
        })
        .catch(error => {
            console.log('error', error)
            return { message: 'Contact not found', success: false }
        })
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update, 
  deletion: deletion

}