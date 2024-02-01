const html = `

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            font-size: 16px;
            width: 85%;
            line-height: 20px;
            margin: 0 auto;
        }

        h1{
            font-size: 24px;
        }

        h2{
            font-size: 19px;
        }

        h3{
            font-size: 16px;
        }

        h1,h2,h3,p{
            margin: 0;
        }

        section{
            margin-bottom: 40px;
        }

        header{
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 35px;
        }

        .heading h1 span{
            font-weight: 500;
            font-size: 16px;
            border-bottom: 2px solid black;
        }

        .tanggal-nomor{
            display: flex;
            justify-content: space-between;
        }

        .waktu-pelaksanaan{
            margin: 25px 0 25px 80px;
        }

        .tanda-tangan{
            margin-left: 60%;
            text-align: center;
        }

        .jabatan{
            margin-bottom: 65px;
        }
    </style>
</head>
<body>
    <header>
        <div class="logo">           
            <img src="https://getasanbersinar.files.wordpress.com/2016/02/logo-kabupaten-semarang-jawa-tengah.png" width="50" height="70">
        </div>
        <div class="heading">
            <h3>PPLP PT – PGRI BANYUWANGI</h3>
            <h1>STIKOM PGRI BANYUWANGI | <span>www.stikombanyuwangi.ac.id</span></h1>
            <h2 style="font-weight: 500;">Jl. Jend. A. Yani No. 80 Telp. (0333) 417902 Banyuwangi – 68416</h2>
        </div>
    </header>
    <hr>
    <main>
        <section class="tanggal-nomor">
            <div class="nomor">
                <p>Nomor    : 79/Prodi.TI/D-8/STIKOM PGRI/I/2024</p>
                <p>Lampiran : -</p>
                <p>Perihal  : <strong>Undangan</strong></p>
            </div>
            <div class="tanggal">Banyuwangi, 30 Januari 2024</div>
        </section>
        <section>
            <div class="tujuan">
                <p>Kepada Yth.</p>
                <h3>Mahasiswa/i Technopreneurship</h3>
                <h3>STIKOM PGRI Banyuwangi</h3>
                <p>Di</p>
                <h3 style="margin-left: 17px;">Tempat</h3>
            </div>
        </section>
        <section class="isi">
            <p>Dengan Hormat,</p>
            <p>Sehubungan dengan pelaksanaan kegiatan Technopreneurship Mahasiswa STIKOM PGRI Banyuwangi semester Ganjil tahun 2023/2024 di CV. Juna Network Indonesia, maka dengan ini mengundang mahasiswa/i Technopreneursip dalam penilaian akhir semester yang akan dilaksanakan pada:</p>
            <div class="waktu-pelaksanaan">
                <p>Hari / Tanggal : Kamis, 01 Februari 2024</p>
                <p>Pukul : 08.00 WIB – Selesai</p>
                <p>Tempat : Ruang Seminar</p>
                <p>Acara : <strong>Sidang Mahasiswa Technopreneurship</strong></p>
            </div>
            <p>Demikian undangan ini kami sampaikan, mengingat pentingnya acara kami harapkan hadir tepat pada waktu yang telah ditentukan. Atas perhatian dan kerjasamanya kami sampaikan terima kasih.</p>
        </section>
        <section class="tanda-tangan">
            <p class="jabatan">Ka. Prodi T</p>
            <h3><u>Pelsri Ramadar N.S., M.Kom</u></h3>
            <p>NIKP. 073072.040684.77</p>
        </section>
    </main>

</body>
</html>

`;

export default html;
