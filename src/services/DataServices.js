import http from "@/http-common";

/* eslint-disable */
class DataService {
  getAll(){
    return http.get("/pm");
  }

  get(id){
    return http.get(`/pm/${id}`);
  }

  create(data){
    return http.post("/pm", data);
  }

  update(id,data){
    return http.put(`/pm/${id}`, data);
  }

  delete(id){
    return http.delete(`/pm/${id}`);
  }

  deleteAll(){
    return http.delete(`/pm`);
  }

  findByNama(nama){
    return http.get(`/pm?nama=${nama}`);
  }
}

export default new DataService();