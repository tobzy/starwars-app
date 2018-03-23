import axios from 'axios';
import { clientConfig } from '../config/httpConfig.js'

let axiosClient = axios.create(clientConfig);

export {axiosClient};
