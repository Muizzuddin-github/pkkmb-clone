import mongoose from "mongoose";

const schemaDataDiri = mongoose.Schema({
  namaLengkap: {
    type: String,
    required: true,
  },
  tempatLahir: {
    type: String,
    required: true,
  },
  tanggalLahir: {
    type: String,
    required: true,
  },
  jenisKelamin: {
    type: String,
    required: true,
  },
  agama: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  noTelp: {
    type: String,
    required: true,
  },
  noWA: {
    type: String,
    required: true,
    unique: true,
  },
});

const schemaAlamat = mongoose.Schema({
  provinsi: {
    type: String,
    required: true,
  },
  kecamatan: {
    type: String,
    required: true,
  },
  detilAlamat: {
    type: String,
    required: true,
  },
  kabupaten: {
    type: String,
    required: true,
  },
  desa: {
    type: String,
    required: true,
  },
  rt: {
    type: String,
    required: true,
  },
  rw: {
    type: String,
    required: true,
  },
});

const schemaSekolah = mongoose.Schema({
  sekolahAsal: {
    type: String,
    required: true,
  },
  tahunLulus: {
    type: String,
    required: true,
  },
  jurusan: {
    type: String,
    required: true,
  },
  namaSekolah: {
    type: String,
    required: true,
  },
  nisn: {
    type: String,
    required: true,
    unique: true,
  },
});

const schemaDataTambahan = mongoose.Schema({
  ukuranKaos: {
    type: String,
    required: true,
  },
  ukuranAlmamater: {
    type: String,
    required: true,
  },
});

const schemaForm1 = mongoose.Schema({
  nik: {
    type: String,
    required: true,
    unique: true,
  },
  jalurPendaftaran: {
    type: String,
    required: true,
  },
  SumberForm: {
    type: Number,
    required: true,
  },
  
  dataDiri: schemaDataDiri,
  alamat: schemaAlamat,
  sekolah: schemaSekolah,
  dataTambahan: schemaDataTambahan,
});

const dataMahasiwa = mongoose.model("dataMahasiswa", schemaForm1, "dataMahasiswa");
export default dataMahasiwa;
