import express from "express";
import {
  downloadForm,
  getBuktiPendaftaran,
  getForm,
  tambahForm,
} from "../controllers/form.js";

const form = express.Router();

form.get("/api/lihat-form", getForm);
form.get("/api/download", downloadForm);
form.get("/api/tambah-data", tambahForm);
form.get("/api/form/bukti-pendaftaran/:nik", getBuktiPendaftaran);

export default form;
