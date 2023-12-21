<template id="comment-form">
    <div class="posts">
        <div class="container mt-8">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">
                            Form Penerima Manfaat
                        </div>
                        <div class="card-body">
                            <form @submit="onSubmit" class="row g-3">
                                <div class="form-group">
                                    <label class="form-label">Nama</label>
                                    <input type="text" class="form-control" v-model.trim="form.nama"
                                    :state="validateState('nama')" :class="v$.form.nama.$error ? 'is-invalid' : ''">
                                    <div v-for="error of v$.form.nama.$errors" class="invalid-feedback" :key="error.$uid">
                                        {{ error.$message }}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Nomor Induk Kependudukan (NIK)</label>
                                    <input type="number" class="form-control" v-model.number="form.nik"
                                    :state="validateState('nik')" :class="v$.form.nik.$error ? 'is-invalid' : ''">
                                    <div v-for="error of v$.form.nik.$errors" class="invalid-feedback" :key="error.$uid">
                                        {{ error.$message }}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Nomor Kartu Keluarga (KK)</label>
                                    <input type="number" class="form-control" v-model.number="form.nomor_kk"
                                        :state="validateState('nomor_kk')"
                                        :class="v$.form.nomor_kk.$error ? 'is-invalid' : ''">
                                    <div v-for="error of v$.form.nomor_kk.$errors" class="invalid-feedback"
                                        :key="error.$uid">
                                        {{ error.$message }}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Foto KTP</label>
                                    <input type="file" id="image_ktp" ref="image_ktp" 
                                    :state="validateState('image_ktp')"
                                        :class="v$.form.image_ktp.$error ? 'is-invalid' : ''" multiple accept="image/*"
                                        class="form-control">
                                    <div v-for="error of v$.form.image_ktp.$errors" class="invalid-feedback"
                                        :key="error.$uid">
                                        {{ error.$message }}
                                    </div>
                                    <p v-if="sizeImageKTP" style="color: red; font-size:small">File image maksimal 2MB,
                                        format JPG/JPEG/PNG/BMP</p>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Foto Kartu Keluarga</label>
                                    <input type="file" id="image_kk" ref="image_kk"
                                        :state="validateState('image_kk')"
                                        :class="v$.form.image_kk.$error ? 'is-invalid' : ''" multiple accept="image/*"
                                        class="form-control">
                                    <div v-for="error of v$.form.image_kk.$errors" class="invalid-feedback"
                                        :key="error.$uid">
                                        {{ error.$message }}
                                    </div>
                                    <p v-if="sizeImageKK" style="color: red; font-size:small">File image maksimal 2MB,
                                        format JPG/JPEG/PNG/BMP</p>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Umur</label>
                                    <input type="number" step="1" class="form-control" v-model.number="form.umur"
                                    :state="validateState('umur')" :class="v$.form.umur.$error ? 'is-invalid' : ''">
                                    <div v-for="error of v$.form.umur.$errors" class="invalid-feedback" :key="error.$uid">
                                        {{ error.$message }}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Jenis Kelamin</label>
                                    <select v-model.trim="form.jenis_kelamin" class="form-control"
                                    :state="validateState('jenis_kelamin')"
                                        :class="v$.form.jenis_kelamin.$error ? 'is-invalid' : ''">
                                        <option v-for="(option, index) in options" :key="index" :value="option.value">
                                            {{ option.label }}
                                        </option>
                                    </select>
                                    <div v-for="error of v$.form.jenis_kelamin.$errors" class="invalid-feedback"
                                        :key="error.$uid">
                                        {{ error.$message }}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Provinsi</label>
                                    <!-- <div class="flex justify-content-center">
                                        <Dropdown v-model.trim="form.provinsi" editable :options="listProvinsi"
                                            @input="setTouched('provinsi')"
                                            :class="v$.form.provinsi.$error ? 'is-invalid' : ''"
                                            placeholder="Pilih provinsi" class="w-full md:w-12rem"
                                            style="width: -webkit-fill-available;" />
                                    </div>
                                    test {{ info }}
                                    <div v-for="error of v$.form.provinsi.$errors" class="invalid-feedback"
                                        :key="error.$uid">
                                        {{ error.$message }}
                                    </div> -->
                            
                                    <select v-model="form.provinsi" 
                                    @change="onChangeProvinsi" 
                                    class="form-control"
                                    :state="validateState('provinsi')"
                                    :class="v$.form.provinsi.$error ? 'is-invalid' : ''">
                                        <option value="">Pilih</option>
                                        <option
                                        v-for="(p, index) in listProvinsi"
                                            :value="p.id"
                                            :key="index"
                                        >
                                        {{ p.name }}
                                        </option>
                                    </select>
                                    <div v-for="error of v$.form.provinsi.$errors" class="invalid-feedback"
                                        :key="error.$uid">
                                        {{ error.$message }}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Kab/Kota</label>
                                    <select v-model.trim="form.kabupaten_kota" 
                                    @change="onChangeKabupatenKota" 
                                    class="form-control"
                                    :state="validateState('kabupaten_kota')"
                                    :class="v$.form.kabupaten_kota.$error ? 'is-invalid' : ''">
                                        <option value="">Pilih</option>
                                        <option
                                        v-for="(k, index) in listkabupatenKota"
                                            :value="k.id"
                                            :key="index"
                                        >
                                        {{ k.name }}
                                        </option>
                                    </select>
                                    <div v-for="error of v$.form.kabupaten_kota.$errors" class="invalid-feedback"
                                        :key="error.$uid">
                                        {{ error.$message }}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Kecamatan</label>
                                    <select v-model.trim="form.kecamatan" 
                                    @change="onChangeKecamatan" 
                                    class="form-control"
                                    :state="validateState('kecamatan')"
                                    :class="v$.form.kecamatan.$error ? 'is-invalid' : ''">
                                        <option value="">Pilih</option>
                                        <option
                                        v-for="(k, index) in listKecamatan"
                                            :value="k.id"
                                            :key="index"
                                        >
                                        {{ k.name }}
                                        </option>
                                    </select>
                                    <div v-for="error of v$.form.kecamatan.$errors" class="invalid-feedback"
                                        :key="error.$uid">
                                        {{ error.$message }}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Kelurahan/Desa</label>
                                    <select v-model.trim="form.kelurahan_desa"
                                    class="form-control"
                                    :state="validateState('kelurahan_desa')"
                                    :class="v$.form.kelurahan_desa.$error ? 'is-invalid' : ''">
                                        <option value="">Pilih</option>
                                        <option
                                        v-for="(k, index) in listKelurahanDesa"
                                            :value="k.id"
                                            :key="index"
                                        >
                                        {{ k.name }}
                                        </option>
                                    </select>
                                    <div v-for="error of v$.form.kelurahan_desa.$errors" class="invalid-feedback"
                                        :key="error.$uid">
                                        {{ error.$message }}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Alamat</label>
                                    <input type="text" class="form-control" v-model.trim="form.alamat"
                                    :state="validateState('alamat')" :class="v$.form.alamat.$error ? 'is-invalid' : ''">
                                    <div v-for="error of v$.form.alamat.$errors" class="invalid-feedback" :key="error.$uid">
                                        {{ error.$message }}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">RT</label>
                                    <input type="text" class="form-control" v-model.trim="form.rt"
                                    :state="validateState('rt')" :class="v$.form.rt.$error ? 'is-invalid' : ''">
                                    <div v-for="error of v$.form.rt.$errors" class="invalid-feedback" :key="error.$uid">
                                        {{ error.$message }}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">RW</label>
                                    <input type="text" class="form-control" v-model.trim="form.rw"
                                    :state="validateState('rw')" :class="v$.form.rw.$error ? 'is-invalid' : ''">
                                    <div v-for="error of v$.form.rw.$errors" class="invalid-feedback" :key="error.$uid">
                                        {{ error.$message }}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Penghasilan sebelum pandemi (Rp)</label>
                                    <input type="text" class="form-control" v-model.trim="form.revenue_before"
                                    @input="handleInputRevenueBefore"
                                    :state="validateState('revenue_before')" :class="v$.form.revenue_before.$error ? 'is-invalid' : ''">
                                    <div v-for="error of v$.form.revenue_before.$errors" class="invalid-feedback" :key="error.$uid">
                                        {{ error.$message }}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Penghasilan sesudah pandemi (Rp)</label>
                                    <input type="text" class="form-control" v-model.trim="form.revenue_after"
                                    @input="handleInputRevenueAfter"
                                    :state="validateState('revenue_after')" :class="v$.form.revenue_after.$error ? 'is-invalid' : ''">
                                    <div v-for="error of v$.form.revenue_after.$errors" class="invalid-feedback" :key="error.$uid">
                                        {{ error.$message }}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Alasan membutuhkan bantuan</label>
                                    <textarea class="form-control" v-model.trim="form.alasan_penerima_manfaat"
                                    :state="validateState('alasan_penerima_manfaat')" :class="v$.form.alasan_penerima_manfaat.$error ? 'is-invalid' : ''"></textarea>
                                    <div v-for="error of v$.form.alasan_penerima_manfaat.$errors" class="invalid-feedback" :key="error.$uid">
                                        {{ error.$message }}
                                    </div>
                                </div>
                                <div class="form-check" style="margin-top: 3%;">
                                <input class="form-check-input" type="checkbox" v-model="approval" id="flexCheckDefault">
                                <label class="form-check-label" for="flexCheckDefault">
                                    Saya menyatakan bahwa data yang diisikan adalah benar dan siap mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam data tersebut.
                                </label>
                                </div>
                                <div class="form-group">
                                    <button class="btn btn-primary" type="submit">Simpan</button>
                                    <button type="reset" class="btn btn-md btn-danger">Reset</button>
                                </div>                           
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
// import { ref, onMounted } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, maxLength, numeric, helpers, minValue } from '@vuelidate/validators';
// import { Dropdown } from 'primevue/dropdown';
import "primevue/resources/themes/lara-light-green/theme.css";
import "primevue/resources/primevue.min.css";


export default {
    name: 'App',
    setup() {
        return {
            v$: useVuelidate()
        }
    },
    data() {
        return {
            form: {
                nama: '',
                nik: null,
                nomor_kk: null,
                image_ktp: '',
                image_kk: '',
                umur: null,
                jenis_kelamin: '',
                provinsi: '',
                kabupaten_kota: '',
                kecamatan: '',
                kelurahan_desa: '',
                alamat: '',
                rt: '',
                rw: '',
                revenue_before: null,
                revenue_after: null,
                alasan_penerima_manfaat: '',
                approval: null,
            },
            listProvinsi: [],
            listkabupatenKota: [],
            listKecamatan: [],
            listKelurahanDesa: [],
            
            sizeImageKTP: false,
            sizeImageKK: false,
            options: [
                { value: '', label: 'Pilih' },
                { value: 'pria', label: 'Pria' },
                { value: 'wanita', label: 'Wanita' }
            ],
        }
    },
    created() {
        this.loadProvinsi()
    },
    validations() {
        return {
            form: {
                nama: {
                    required: helpers.withMessage('Nama harus diisi!', required)
                },
                nik: {
                    required: helpers.withMessage('NIK harus diisi!', required),
                    maxLength: helpers.withMessage('Maksimal 16 digit!', maxLength(16))
                },
                nomor_kk: {
                    required: helpers.withMessage('KK harus diisi!', required),
                },
                image_ktp: {
                    required: helpers.withMessage('KTP harus diisi!, format JPG/JPEG/PNG/BMP', required),
                },
                image_kk: {
                    required: helpers.withMessage('KK harus diisi!, format JPG/JPEG/PNG/BMP', required),
                },
                umur: {
                    required: helpers.withMessage('Umur harus diisi!', required),
                    numeric,
                    minValue: helpers.withMessage('Umur minimal 25 tahun', minValue(25))
                },
                jenis_kelamin: {
                    required: helpers.withMessage('Jenis Kelamin harus diisi!', required)
                },
                provinsi: {
                    required: helpers.withMessage('Provinsi harus diisi!', required)
                },
                kabupaten_kota: {
                    required: helpers.withMessage('Kabupaten/Kota harus diisi!', required)
                },
                kecamatan: {
                    required: helpers.withMessage('Kecamatan harus diisi!', required)
                },
                kelurahan_desa: {
                    required: helpers.withMessage('Kelurahan/Desa harus diisi!', required)
                },
                alamat: {
                    required: helpers.withMessage('Alamat harus diisi!', required),
                    maxLength: helpers.withMessage('Maksimal 255 karakter', maxLength(255))
                },
                rt: {
                    required: helpers.withMessage('Rt harus diisi!', required)
                },
                rw: {
                    required: helpers.withMessage('Rw harus diisi!', required)
                },
                revenue_before: {
                    required: helpers.withMessage('Penghasilan sebelum pandemi harus diisi!', required)
                },
                revenue_after: {
                    required: helpers.withMessage('Penghasilan sesudah pandemi harus diisi!', required)
                },
                alasan_penerima_manfaat: {
                    required: helpers.withMessage('Alasan membutuhkan bantuan harus diisi!', required)
                },
            },
        }
    },
    methods: {
         convertToRupiah(angka, prefix) {
            const number_string = angka.replace(/[^,\d]/g, "").toString();
            const split = number_string.split(",");
            const sisa = split[0].length % 3;
            let rupiah = split[0].substr(0, sisa);
            const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

            if (ribuan) {
            const separator = sisa ? "." : "";
            rupiah += separator + ribuan.join(".");
            }

            rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
            return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
        },
        handleInputRevenueBefore() {
            this.form.revenue_before = this.convertToRupiah(this.form.revenue_before);
        },
        handleInputRevenueAfter() {
            this.form.revenue_after = this.convertToRupiah(this.form.revenue_after);
        },
        validateState(name) {
            const { $dirty, $error } = this.v$.form[name];
            return $dirty ? !$error : null;
        },
        loadProvinsi() {
            axios
                .get("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json", {
                    headers: {
                        Accept: "application/json",
                    },
                })
                .then((res) => {
                    this.listProvinsi = res.data;
                });
        },
        onChangeProvinsi() {    
            if (this.form.provinsi === '') {
                this.form.kabupaten_kota = '';
                this.listkabupatenKota = [];
                this.form.kecamatan = '';
                this.listKecamatan = [];
                this.form.kelurahan_desa = '';
                this.listKelurahanDesa = [];
            }

            if (this.form.provinsi !== '') {
                this.listkabupatenKota = [];
                this.form.kabupaten_kota = '';
                this.form.kecamatan = '';
                this.listKecamatan = [];
                this.form.kelurahan_desa = '';
                this.listKelurahanDesa = [];

                axios
                .get("https://www.emsifa.com/api-wilayah-indonesia/api/regencies/"+ this.form.provinsi +".json", {
                    headers: {
                        Accept: "application/json",
                    },
                })
                .then((res) => {
                    this.listkabupatenKota = res.data;
                });
            }
        },
        onChangeKabupatenKota() {
            if (this.form.kabupaten_kota === '') {
                this.form.kecamatan = '';
                this.listKecamatan = [];
            }

            if (this.form.kabupaten_kota !== '') {
                this.form.kecamatan = '';
                this.listKecamatan = [];
                this.form.kelurahan_desa = '';
                this.listKelurahanDesa = [];
                axios
                .get("https://www.emsifa.com/api-wilayah-indonesia/api/districts/"+ this.form.kabupaten_kota +".json", {
                    headers: {
                        Accept: "application/json",
                    },
                })
                .then((res) => {
                    this.listKecamatan = res.data;
                });
            }
        },
        onChangeKecamatan() {
            if (this.form.kecamatan === '') {
                this.form.kelurahan_desa = '';
                this.listKelurahanDesa = [];
            }

            if (this.form.kecamatan !== '') {
                this.form.kelurahan_desa = '';
                this.listKelurahanDesa = [];
                axios
                .get("https://www.emsifa.com/api-wilayah-indonesia/api/villages/"+ this.form.kecamatan +".json", {
                    headers: {
                        Accept: "application/json",
                    },
                })
                .then((res) => {
                    this.listKelurahanDesa = res.data;
                });
            }
        },
        async onSubmit(event) {
            event.preventDefault();
            const fileKTP = this.$refs.image_ktp.files[0];
            const fileKK = this.$refs.image_kk.files[0];
            //this.setTouched('all');

            this.v$.form.$touch();
            if (this.v$.form.$anyError) {
                return;
            }

            if (fileKTP !== undefined) {
                const element = document.getElementById('image_ktp');
                element.classList.remove('is-invalid');
                if (fileKTP.size > 2 * 1024 * 1024) {
                    this.sizeImageKTP = true;
                    return;
                }
            } else {
                const element = document.getElementById('image_ktp');
                element.classList.add('is-invalid');
            }

            if (fileKK !== undefined) {
                const element = document.getElementById('image_kk');
                element.classList.remove('is-invalid');
                if (fileKK.size > 2 * 1024 * 1024) {
                    this.sizeImageKK = true;
                    return;
                }
            } else {
                const element = document.getElementById('image_kk');
                element.classList.add('is-invalid');
            }

            this.sizeImageKTP = false;
            this.sizeImageKK = false;
            if (!this.v$.$invalid) {
                axios.post('http://localhost:8000/posts', this.post)
                    .then((response) => {
                        this.$router.push({
                            name: 'posts'
                        });
                        console.log(response.data.data);
                    }).catch(error => {
                        this.validation = error.response.data.data;
                    });
            }
        },
        // setTouched(theModel) {
        //     if (theModel == 'nama' || theModel == 'all') { this.v$.form.nama.$touch() }
        //     if (theModel == 'nik' || theModel == 'all') { this.v$.form.nik.$touch() }
        //     if (theModel == 'nomor_kk' || theModel == 'all') { this.v$.form.nomor_kk.$touch() }
        //     if (theModel == 'image_ktp' || theModel == 'all') { this.v$.form.image_ktp.$touch() }
        //     if (theModel == 'image_kk' || theModel == 'all') { this.v$.form.image_kk.$touch() }
        //     if (theModel == 'umur' || theModel == 'all') { this.v$.form.umur.$touch() }
        //     //if (theModel == 'jenis_kelamin') { this.v$.form.jenis_kelamin.$touch() }
        //     // if (theModel == 'provinsi' || theModel == 'all') { this.v$.provinsi.$touch() }
        //     // if (theModel == 'kabupaten_kota' || theModel == 'all') { this.v$.kabupaten_kota.$touch() }
        // },
    }
}
</script>