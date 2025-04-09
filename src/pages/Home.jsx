import { useState, useEffect } from 'react';
import CardPreviewSimple from '../components/CardPreviewSimple';
import QRGenerator from '../components/QRGenerator';
import styles from './Home.module.css';

export default function Home() {
  const [status, setStatus] = useState('mahasiswa');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nohp, setNohp] = useState('');

  const [jenjang, setJenjang] = useState('');
  const [jurusan, setJurusan] = useState('');
  const [fakultas, setFakultas] = useState('');
  const [universitas, setUniversitas] = useState('');

  const [job, setJob] = useState('');
  const [perusahaan, setPerusahaan] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cardData'));
    if (saved) {
      setStatus(saved.status || 'mahasiswa');
      setName(saved.name || '');
      setEmail(saved.email || '');
      setNohp(saved.nohp || '');
      setJenjang(saved.jenjang || '');
      setJurusan(saved.jurusan || '');
      setFakultas(saved.fakultas || '');
      setUniversitas(saved.universitas || '');
      setJob(saved.job || '');
      setPerusahaan(saved.perusahaan || '');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'cardData',
      JSON.stringify({
        status,
        name,
        email,
        nohp,
        jenjang,
        jurusan,
        fakultas,
        universitas,
        job,
        perusahaan,
      })
    );
  }, [status, name, email, nohp, jenjang, jurusan, fakultas, universitas, job, perusahaan]);

  const baseUrl = 'https://kartunamadigital.vercel.app';

  const previewUrl =
    status === 'mahasiswa'
      ? `${baseUrl}/card?status=mahasiswa&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&nohp=${encodeURIComponent(nohp)}&jenjang=${encodeURIComponent(jenjang)}&jurusan=${encodeURIComponent(jurusan)}&fakultas=${encodeURIComponent(fakultas)}&universitas=${encodeURIComponent(universitas)}`
      : `${baseUrl}/card?status=kerja&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&nohp=${encodeURIComponent(nohp)}&job=${encodeURIComponent(job)}&perusahaan=${encodeURIComponent(perusahaan)}`;
  
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Kartu Nama Digital</h1>
        <p>Simpan identitasmu dalam bentuk digital & scan QR atau NFC untuk akses cepat.</p>
      </header>

      <section className={styles.section}>
        <center><h2>1. Masukkan Informasi</h2></center>

        <form className={styles.form}>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="mahasiswa">Mahasiswa</option>
            <option value="kerja">Sudah Kerja</option>
          </select>

          <label>Nama:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

          {status === 'mahasiswa' ? (
            <>
              <label>Jenjang Pendidikan:</label>
              <input type="text" value={jenjang} onChange={(e) => setJenjang(e.target.value)} />

              <label>Jurusan:</label>
              <input type="text" value={jurusan} onChange={(e) => setJurusan(e.target.value)} />

              <label>Fakultas:</label>
              <input type="text" value={fakultas} onChange={(e) => setFakultas(e.target.value)} />

              <label>Nama Universitas:</label>
              <input type="text" value={universitas} onChange={(e) => setUniversitas(e.target.value)} />
            </>
          ) : (
            <>
              <label>Jabatan:</label>
              <input type="text" value={job} onChange={(e) => setJob(e.target.value)} />

              <label>Nama Perusahaan:</label>
              <input type="text" value={perusahaan} onChange={(e) => setPerusahaan(e.target.value)} />
            </>
          )}

          <label>Nomor HP:</label>
          <input type="text" value={nohp} onChange={(e) => setNohp(e.target.value)} />

          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </form>

        <button
          className={styles.resetButton}
          onClick={() => {
            setStatus('mahasiswa');
            setName('');
            setEmail('');
            setNohp('');
            setJenjang('');
            setJurusan('');
            setFakultas('');
            setUniversitas('');
            setJob('');
            setPerusahaan('');
            localStorage.removeItem('cardData');
          }}
        >
          Reset Form
        </button>
      </section>

      <section className={styles.section}>
        <center><h2>2. Preview Kartu</h2></center>
        <CardPreviewSimple
          name={name}
          job={job}
          email={email}
          nohp={nohp}
          status={status}
          jenjang={jenjang}
          jurusan={jurusan}
          fakultas={fakultas}
          universitas={universitas}
          perusahaan={perusahaan}
        />
      </section>

      <section className={styles.section}>
        <center><h2>3. QR Code</h2></center>
        <QRGenerator url={previewUrl} />
      </section>
    </div>
  );
}
