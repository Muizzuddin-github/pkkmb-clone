import { createObjectCsvStringifier } from "csv-writer";
import dataMahasiswa from "../models/model.js";
// import puppeteer from "puppeteer";
import html from "../utility/html.js";
import Email from "../utility/email.js";
import PDFDocument from "pdfkit";
import path from "path";
import { fileURLToPath } from "url";
import checkLengthAlamat from "../utility/checkLengthAlamat.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getForm = async (req, res, next) => {
  try {
    res.status(200).json({ message: "ini form1" });
  } catch (err) {
    next(err);
  }
};

export const tambahForm = async (req, res) => {
  try {
    console.log(__dirname);
    const doc = new PDFDocument();
    doc.image(path.resolve(__dirname, "../../public/download.jpeg"), 100, 15, {
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

    doc.moveTo(50, 100).lineTo(550, 100).stroke();

    doc
      .font("Times-Bold")
      .fontSize(12)
      .text("Pendaftaran Mahasiswa Baru Periode 2024-2025", 50, 120);

    doc
      .font("Times-Roman")
      .fontSize(11)
      .text("Jalur Pendaftaran", 50, 150, { continued: true })
      .fontSize(12)
      .text("S1 Reguler Pagi", 80, null);

    doc.strokeColor("gray");
    doc.lineWidth(0.5);
    doc.moveTo(50, 170).lineTo(550, 170).stroke();
    doc.font("Times-Bold").fontSize(12).text("Data Diri", 50, 180);

    doc
      .font("Times-Roman")
      .fontSize(11)
      .text("NIK", 120, null, { continued: true })
      .fontSize(12)
      .text("8942930894", 140, null);

    doc
      .font("Times-Roman")
      .fontSize(11)
      .text("Nama Lengkap", 72, 215, { continued: true })
      .fontSize(12)
      .text("hasankuy", 92);

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
      .text("laki laki", 97, null);

    doc
      .font("Times-Roman")
      .fontSize(11)
      .text("Agama", 106, 275, { continued: true })
      .fontSize(12)
      .text("islam", 128, null);

    doc
      .font("Times-Roman")
      .fontSize(11)
      .text("No. Whatsapp", 76, 295, { continued: true })
      .fontSize(12)
      .text("123456789012", 95, null);

    doc
      .font("Times-Roman")
      .fontSize(11)
      .text("Email", 112, 315, { continued: true })
      .fontSize(12)
      .text("example@gmail.com", 132, null);

    doc.strokeColor("gray");
    doc.lineWidth(0.5);
    doc.moveTo(50, 335).lineTo(550, 335).stroke();
    doc.font("Times-Bold").fontSize(12).text("Alamat", 50, 345);

    doc
      .font("Times-Roman")
      .fontSize(11)
      .text("Provinsi", 102, 360, { continued: true })
      .fontSize(12)
      .text("jawa timur", 123, 360, { continued: true })
      .fontSize(11)
      .text("Kabupaten", 250, 360, { continued: true })
      .fontSize(12)
      .text("Banyuwangi", 270, null);

    doc
      .font("Times-Roman")
      .fontSize(11)
      .text("Kecamatan", 90, 380, { continued: true })
      .fontSize(12)
      .text("tegaldlimo", 110, 380, { continued: true })
      .fontSize(11)
      .text("Desa", 263, 380, { continued: true })
      .fontSize(12)
      .text("Wringinpitu", 283, null);

    const alamattext =
      "dasdsadasdasdsdasdadsadasadasakdlaskdlaskdldasdasdsadsadasdsadsaddasdsadasdsadsadsddsadasdsaddsadasddsadaasdasdasdasdasdsadasdasdasdasdasdsadasdasdasdasdasdasdasdasdaasdasdasdasdasdasdsdasdasdadasdas dsdadasdsd asdasdas asdasdas asdasdas sadasskadk";
    doc
      .font("Times-Roman")
      .fontSize(11)
      .text("Alamat", 105, 400, { continued: true })
      .fontSize(12)
      .text(checkLengthAlamat(alamattext), 127, 400, { lineGap: 5 });

    doc
      .fontSize(11)
      .text("Desa", 363, 400, { continued: true })
      .fontSize(12)
      .text("Wringinpitu", 383, null);

    res.setHeader("Content-Type", "application/pdf");
    doc.pipe(res);
    doc.end();

    // res.attachment("data.pdf");
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
