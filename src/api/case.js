import api from './config';

export const getCasesRequest= () => api.get('cases');
export const getCaseRequest= (id) => api.get(`cases/${id}`);
export const createCaseRequest = (data) => api.post('cases', data);
export const updateCaseRequest = (id, data) => api.put(`cases/${id}`, data);
export const deleteCaseRequest = (id) => api.delete(`cases/${id}`);

