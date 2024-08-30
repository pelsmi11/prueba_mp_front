import api from './config';

export const getFiscalRequest= (id) => api.get(`fiscals/${id}`);
export const createFiscalRequest = (data) => api.post('fiscals', data);
export const updateFiscalRequest = (id, data) => api.put(`fiscals/${id}`, data);

export const changePassword = (id, data)=> api.put(`users/${id}`, data);