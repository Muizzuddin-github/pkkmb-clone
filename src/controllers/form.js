import { createObjectCsvStringifier } from "csv-writer";
import dataMahasiswa from "../models/model.js";
import puppeteer from "puppeteer";
import html from "../utility/html.js";
import Email from "../utility/email.js";

export const getForm = async (req, res, next) => {
  try {
    res.status(200).json({ message: "ini form1" });
  } catch (err) {
    next(err);
  }
};

export const tambahForm = async (req, res) => {
  try {
    const {
      nik,
      jalurPendaftaran,
      SumberForm,
      dataDiri: {
        namaLengkap,
        tempatLahir,
        tanggalLahir,
        jenisKelamin,
        agama,
        email,
        noWA,
      },
      alamat: { provinsi, kecamatan, detilAlamat, kabupaten, desa, rt, rw },
      sekolah: { sekolahAsal, tahunLulus, jurusan, namaSekolah, nisn },
      dataTambahan: { ukuranKaos, ukuranAlmamater },
    } = req.body;

    const formData = new dataMahasiswa({
      nik,
      jalurPendaftaran,
      SumberForm,
      dataDiri: {
        namaLengkap,
        tempatLahir,
        tanggalLahir,
        jenisKelamin,
        agama,
        email,
        noWA,
      },
      alamat: {
        provinsi,
        kecamatan,
        detilAlamat,
        kabupaten,
        desa,
        rt,
        rw,
      },
      sekolah: {
        sekolahAsal,
        tahunLulus,
        jurusan,
        namaSekolah,
        nisn,
      },
      dataTambahan: {
        ukuranKaos,
        ukuranAlmamater,
      },
    });

    await formData.save();

    const url = `${req.protocol}://${req.hostname}/api/form/bukti-pendaftaran/${nik}`;

    const sendEmail = new Email({
      from: "POS",
      to: email,
      subject: "Bukti Pendaftaran Stikom PGRI Banyuwangi",
      html: `
        <img src="https://iili.io/JcymQv2.png" alt="stikompgribanyuwangi">
        <p style="font-size: 20px;">Hi!</p>
        <p  style="font-size: 20px;">download bukti pendaftaran <span style="color : #4053df;  font-weight: bold;">${url}</span>.</p>
        <p style="font-size:20px; font-weight:bold; font-family:sans-serif; letter-spacing:2px;">
          Stikom PGRI Banyuwangi
        </p>`,
    });

    await sendEmail.send();

    res.status(200).send({ message: "Upload Success dan periksa email anda" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const downloadForm = async (req, res, next) => {
  try {
    const mahasiswas = await dataMahasiswa.find();

    const data = [];
    for (let i = 0; i < mahasiswas.length; i++) {
      data.push({
        id: i + 1,
        nik: mahasiswas[i].nik,
        "jalur pendaftaran": mahasiswas[i].jalurPendaftaran,
        "sumber form": mahasiswas[i].SumberForm,
        "nama lengkap": mahasiswas[i].dataDiri.namaLengkap,
        "tempat lahir": mahasiswas[i].dataDiri.tempatLahir,
        "jenis kelamin": mahasiswas[i].dataDiri.jenisKelamin,
        agama: mahasiswas[i].dataDiri.agama,
        email: mahasiswas[i].dataDiri.email,
        "no wa": mahasiswas[i].dataDiri.noWA,
        provinsi: mahasiswas[i].alamat.provinsi,
        kecamatan: mahasiswas[i].alamat.kecamatan,
        "detil alamat": mahasiswas[i].alamat.detilAlamat,
        kabupaten: mahasiswas[i].alamat.kabupaten,
        desa: mahasiswas[i].alamat.desa,
        rt: mahasiswas[i].alamat.rt,
        rw: mahasiswas[i].alamat.rw,
        "sekolah asal": mahasiswas[i].sekolah.sekolahAsal,
        "nama sekolah": mahasiswas[i].sekolah.namaSekolah,
        "tahun lulus": mahasiswas[i].sekolah.tahunLulus,
        jurusan: mahasiswas[i].sekolah.jurusan,
        nisn: mahasiswas[i].sekolah.nisn,
        "ukuran kaos": mahasiswas[i].dataTambahan.ukuranKaos,
        "ukuran almamater": mahasiswas[i].dataTambahan.ukuranAlmamater,
      });
    }

    // Menulis objek ke CSV
    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: "id", title: "ID" },
        { id: "nik", title: "NIK" },
        { id: "jalur pendaftaran", title: "Jalur Pendaftaran" },
        { id: "sumber form", title: "Sumber Form" },
        { id: "nama lengkap", title: "Nama Lengkap" },
        { id: "tempat lahir", title: "Templat Lahir" },
        { id: "jenis kelamin", title: "Jenis Kelamin" },
        { id: "agama", title: "Agama" },
        { id: "email", title: "Email" },
        { id: "no wa", title: "No WA" },
        { id: "provinsi", title: "Provinsi" },
        { id: "kecamatan", title: "Kecamatan" },
        { id: "detil alamat", title: "Detil Alamat" },
        { id: "kabupaten", title: "Kabupaten" },
        { id: "desa", title: "Desa" },
        { id: "rt", title: "RT" },
        { id: "rw", title: "RW" },
        { id: "sekolah asal", title: "Sekolah Asal" },
        { id: "nama sekolah", title: "Nama Sekolah" },
        { id: "tahun lulus", title: "Tahun Lulus" },
        { id: "jurusan", title: "Jurusan" },
        { id: "nisn", title: "NISN" },
        { id: "ukuran kaos", title: "Ukuran Kaos" },
        { id: "ukuran almamater", title: "Ukuran Almamater" },
      ],
    });
    const csvData =
      csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(data);

    res.header("Content-Type", "text/csv");
    res.attachment("data.csv");
    res.status(200).send(csvData);
  } catch (err) {
    next(err);
  }
};

export const getBuktiPendaftaran = async (req, res, next) => {
  try {
    const data = await dataMahasiswa.findOne({ nik: req.params.nik });
    if (!data) {
      return res.status(404).json({ message: "data not found" });
    }
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.setContent(html);
    const pdfBuffer = await page.pdf();

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.attachment("data.pdf");
    res.send(pdfBuffer);
  } catch (err) {
    next(err);
  }
};
