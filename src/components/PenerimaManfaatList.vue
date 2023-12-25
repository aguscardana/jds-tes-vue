
<template>
  <div class="posts">
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              Data Penerima Manfaat (Bansos)
            </div>
            <div class="card-body">
              <router-link :class="['btn btn-md btn-success mb-2']" to="/add-penerima-manfaat">Tambah</router-link>
              <hr>

              <div class="table-responsive mt-2">
                <table class="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>Nama</th>
                      <th>NIK</th>
                      <th>Umur</th>
                      <th>Jenis Kelamin</th>
                      <th>Alamat</th>
                      <th>Penghasilan sebelum covid</th>
                      <th>Penghasilan sesudah covid</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="post in penerimaManfaats" :key="post.id">
                      <td>{{ post.nama }}</td>
                      <td>{{ post.nik }}</td>
                      <td>{{ post.umur }}</td>
                      <td>{{ post.jenis_kelamin }}</td>
                      <td>{{ post.alamat }}</td>
                      <td>{{ post.revenue_before }}</td>
                      <td>{{ post.revenue_after }}</td>
                      <!-- <td class="text-center">
                        <router-link :to="{ penerima_manfaat : 'edit', params: { penerima_manfaat : post.id } }"
                          class="btn btn-sm btn-primary mr-2">Edit</router-link>
                        <button @click.prevent="PostDelete(post.id)" class="btn btn-sm btn-danger">Hapus</button>
                      </td> -->
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import DataService from "../services/DataServices";
import axios from 'axios'
export default ({
  name: "penerima-manfaat-list",
  data() {
    return {
      penerimaManfaats: [],
      nama: "",
      headers: [
        { text: "Nama", align: "start", sortable: false, value: "nama" },
        { text: "NIK", value: "nik", sortable: false },
        { text: "Umur", value: "umur", sortable: false },
        { text: "Jenis Kelamin", value: "jenis_kelamin", sortable: false },
        { text: "Alamat", value: "alamat", sortable: false },
        { text: "Penghasilan sebelum covid", value: "revenue_before", sortable: false },
        { text: "Penghasilan sesudah covid", value: "revenue_after", sortable: false },
      ],
    };
  },
  methods: {
    retrievePenerimaManfaat() {
      DataService.getAll()
        .then((response) => {
          this.penerimaManfaats = response.data.map(this.getDisplayPenerimaManfaat);
          //console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async fetchApi() {
      return axios.get('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json',{
          headers: {
              Accept: "application/json",
          }
      })
      .then(response => { return response.data});
    },

    getDisplayPenerimaManfaat(pm) {
        return {
          id: pm.id,
          nama: pm.nama.length > 30 ? pm.nama.substr(0, 30) + "..." : pm.nama,
          nik: pm.nik,
          umur: pm.umur,
          jenis_kelamin: pm.jenis_kelamin,
          alamat: pm.alamat,
          revenue_before: "Rp. " + pm.revenue_before,
          revenue_after: "Rp. " + pm.revenue_after,
        }
    },
  },
  mounted() {
    this.retrievePenerimaManfaat();
    this.fetchApi(); 
  },
});
</script>
  
<style>
.list {
  max-width: 750px;
}
</style>