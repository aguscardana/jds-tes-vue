import http from "@/http-common";

/* eslint-disable */
class DataService {
  getAll(){
    return http.get("/penerima_manfaat");
  }

  get(id){
    return http.get(`/penerima_manfaat/${id}`);
  }

  create(data){
    return http.post("/penerima_manfaat", data);
  }

  update(id,data){
    return http.put(`/penerima_manfaat/${id}`, data);
  }

  delete(id){
    return http.delete(`/penerima_manfaat/${id}`);
  }

  deleteAll(){
    return http.delete(`/penerima_manfaat`);
  }

  findByNama(nama){
    return http.get(`/penerima_manfaat?nama=${nama}`);
  }
}

export default new DataService();