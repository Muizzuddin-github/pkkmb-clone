import { createObjectCsvStringifier } from "csv-writer";
import dataMahasiswa from "../models/model.js";
import PDFDocument from "pdfkit";
import Email from "../utility/email.js";
import checkLengthAlamat from "../utility/checkLengthAlamat.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getForm = async (req, res, next) => {
  try {
    res.status(200).json({ message: "ini form1" });
  } catch (err) {
    next(err);
  }
};

export const tambahForm = async (req, res, next) => {
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
        noTelp,
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
        noTelp,
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

    const url = `https://${req.hostname}/api/form/bukti-pendaftaran/${nik}`;
    const sendEmail = new Email({
      from: "POS",
      to: email,
      subject: "Bukti Pendaftaran Stikom PGRI Banyuwangi",
      html: `
        <img src="https://iili.io/JcymQv2.png" alt="stikompgribanyuwangi">
        <p style="font-size: 20px;">Hi!</p>
        <p  style="font-size: 20px;">download bukti pendaftaran <span style="color : #4053df;  font-weight: bold;"><a href="${url}" target="_blank">klik</a></span>.</p>
        <p style="font-size:20px; font-weight:bold; font-family:sans-serif; letter-spacing:2px;">
          Stikom PGRI Banyuwangi
        </p>`,
    });

    await sendEmail.send();

    res.status(200).send({ message: "pendaftaran berhasil" });
  } catch (error) {
    next(error);
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
        "no telephone": mahasiswas[i].dataDiri.noTelp,
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
        { id: "no telephone", title: "No Telp" },
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
    const doc = new PDFDocument();

    doc.page.margins = { top: 50, left: 50, bottom: 50, right: 50 };
    doc.image(path.resolve(__dirname, "../../public/logo.jpeg"), 100, 15, {
      width: 80,
    });

    doc
      .font("Times-Bold")
      .fontSize(12)
      .text("PPLP PT – PGRI BANYUWANGI", 190, 25)
      .fontSize(18)
      .text("Stikom PGRI Banyuwangi | ", 190, 40, { continued: true })
      .fontSize(10)
      .font("Times-Roman")
      .text("www.stikombanyuwangi.ac.id", null, 50, { underline: true });

    doc
      .fontSize(12)
      .text(
        "Jl. Jend. A. Yani No. 80 Telp. (0333) 417902 Banyuwangi 68416",
        null,
        65
      );

    doc
      .moveTo(50, doc.y + 20)
      .lineTo(550, doc.y + 20)
      .stroke();

    doc
      .font("Times-Bold")
      .fontSize(12)
      .text("Pendaftaran Mahasiswa Baru Periode 2024-2025", 50, 120);

    doc
      .font("Times-Roman")
      .fontSize(11)
      .text("Jalur Pendaftaran", 50, 150, { continued: true })
      .fontSize(12)
      .text(data.jalurPendaftaran, 80, null, { continued: true })
      .fontSize(11)
      .text("Tipe pendaftaran", 180, null, { continued: true })
      .fontSize(12)
      .text(data.SumberForm, 200);

    doc.strokeColor("gray");
    doc.lineWidth(0.5);
    doc
      .moveTo(50, doc.y + 10)
      .lineTo(550, doc.y + 10)
      .stroke();
    doc.font("Times-Bold").fontSize(12).text("Data Diri", 50, 180);

    doc
      .font("Times-Roman")
      .fontSize(11)
      .text("NIK", 120, null, { continued: true })
      .fontSize(12)
      .text(data.nik, 140, null);

    doc
      .font("Times-Roman")
      .fontSize(11)
      .text("Nama Lengkap", 72, 215, { continued: true })
      .fontSize(12)
      .text(data?.dataDiri?.namaLengkap, 92);

    doc
      .font("Times-Roman")
      .fontSize(11)
      .text("Tempat Lahir", 79, 235, { continued: true })
      .fontSize(12)
      .text("banyuwangi", 100, null);

    doc
      .font("Times-Roman")
      .fontSize(11)
      .text("Jenis Kelamin", 76, 255, { continued: true })
      .fontSize(12)
      .text(data?.dataDiri?.jenisKelamin, 97, null);

    doc
      .font("Times-Roman")
      .fontSize(11)
      .text("Agama", 106, 275, { continued: true })
      .fontSize(12)
      .text(data?.dataDiri?.agama, 128, null)
      .moveDown(0.5);

    doc
      .font("Times-Roman")
      .fontSize(11)
      .text("No Tepl", 106, null, { continued: true })
      .fontSize(12)
      .text(data?.dataDiri?.noTelp, 125, null)
      .moveDown(0.5);

    doc
      .font("Times-Roman")
      .fontSize(11)
      .text("No. Whatsapp", 76, null, { continued: true })
      .fontSize(12)
      .text(data?.dataDiri?.noWA, 98, null)
      .moveDown(0.5);

    doc
      .font("Times-Roman")
      .fontSize(11)
      .text("Email", 112, null, { continued: true })
      .fontSize(12)
      .text(data?.dataDiri?.email, 135, null);

    doc.strokeColor("gray");
    doc.lineWidth(0.5);
    doc
      .moveTo(50, doc.y + 10)
      .lineTo(550, doc.y + 10)
      .stroke();
    doc.font("Times-Bold").fontSize(12).text("Alamat", 50, 365).moveDown(0.5);

    doc
      .font("Times-Roman")
      .fontSize(11)
      .text("Provinsi", 102, null, { continued: true })
      .fontSize(12)
      .text(data?.alamat?.provinsi, 123, null);

    doc
      .fontSize(11)
      .text("Kabupaten", 345, 390, { continued: true })
      .fontSize(12)
      .text(data?.alamat?.kabupaten, 363, null)
      .moveDown(0.5);

    doc
      .moveUp(0.5)
      .font("Times-Roman")
      .fontSize(11)
      .text("Kecamatan", 90, null, { continued: true })
      .fontSize(12)
      .text(data?.alamat?.kecamatan, 110, null);

    doc
      .fontSize(11)
      .text("Desa", 370, 410, { continued: true })
      .fontSize(12)
      .text(data?.alamat?.desa, 390, null)
      .moveDown(0.5);

    doc
      .moveUp(0.5)
      .fontSize(11)
      .text("Rt/Rw", 110, null, { continued: true })
      .fontSize(12)
      .text(`${data?.alamat?.rt}/${data?.alamat?.rw}`, 130, null)
      .moveDown(1);

    const alamattext = data?.alamat?.detilAlamat;
    const result = checkLengthAlamat(alamattext);

    doc
      .moveUp(0.5)
      .font("Times-Roman")
      .fontSize(11)
      .text("Alamat", 105, null, { continued: true })
      .fontSize(12)
      .text(result, 127, null, { lineGap: 5 });

    doc.strokeColor("gray");
    doc.lineWidth(0.5);
    doc
      .moveTo(50, doc.y + 5)
      .lineTo(550, doc.y + 5)
      .stroke();
    doc
      .moveUp(-1)
      .font("Times-Bold")
      .fontSize(12)
      .text("Sekolah", 50, null)
      .moveDown(0.8);

    doc
      .font("Times-Roman")
      .fontSize(11)
      .text("Sekolah Asal", 80, null, { continued: true })
      .fontSize(12)
      .text(data?.sekolah?.sekolahAsal, 102)
      .moveDown(0.5);

    doc
      .fontSize(11)
      .text("Jurusan", 105, null, { continued: true })
      .fontSize(12)
      .text(data?.sekolah?.jurusan, 127, null)
      .moveDown(0.5);

    doc
      .fontSize(11)
      .text("Tahun Lulus", 83, null, { continued: true })
      .fontSize(12)
      .text(data?.sekolah?.tahunLulus, 106, null)
      .moveDown(0.5);

    doc
      .fontSize(11)
      .text("Nama Sekolah Asal", 53, null, { continued: true })
      .fontSize(12)
      .text(data?.sekolah?.namaSekolah, 74, null)
      .moveDown(0.5);

    doc
      .fontSize(11)
      .text("NISN", 115, null, { continued: true })
      .fontSize(12)
      .text(data?.sekolah?.nisn, 135, null)
      .moveDown(0.5);

    doc.strokeColor("gray");
    doc.lineWidth(0.5);
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc
      .moveUp(-0.5)
      .font("Times-Bold")
      .fontSize(12)
      .text("Data Tambahan", 50, null)
      .moveDown(0.8);

    doc
      .font("Times-Roman")
      .fontSize(11)
      .text("Ukuran Kos", 88, null, { continued: true })
      .fontSize(12)
      .text(data?.dataTambahan?.ukuranKaos, 110, null)
      .moveDown(0.5);

    doc
      .font("Times-Roman")
      .fontSize(11)
      .text("Ukuran Alamamater", 52, null, { continued: true })
      .fontSize(12)
      .text(data?.dataTambahan?.ukuranKaos, 73, null)
      .moveDown(2);

    doc
      .font("Times-Bold")
      .fontSize(11)
      .text(
        "Bank Mandiri : 143-002-006-0008 atas nama STIKOM PGRI BANYUWANGI",
        140,
        null
      );

    res.setHeader("Content-Type", "application/pdf");
    res.attachment("bukti-pembayaran.pdf");
    doc.pipe(res);
    doc.end();
  } catch (err) {
    next(err);
  }
};
