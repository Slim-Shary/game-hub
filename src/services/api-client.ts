import axios from 'axios'

export default axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: '346a5eb12de540e290bd58da53c3519b',
  },
})
