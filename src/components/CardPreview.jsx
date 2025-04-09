import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { FaUser, FaBriefcase, FaUniversity, FaPhone, FaEnvelope, FaBuilding, FaGraduationCap } from 'react-icons/fa';
import styles from './CardPreview.module.css';

export default function CardViewer() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') || 'kerja';
  const name = searchParams.get('name') || 'Tidak diketahui';
  const email = searchParams.get('email') || '-';
  const nohp = searchParams.get('nohp') || '-';

  const jenjang = searchParams.get('jenjang') || '-';
  const jurusan = searchParams.get('jurusan') || '-';
  const fakultas = searchParams.get('fakultas') || '-';
  const universitas = searchParams.get('universitas') || '-';

  const job = searchParams.get('job') || '-';
  const perusahaan = searchParams.get('perusahaan') || '-';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      alert('Link disalin ke clipboard!');
    } catch (err) {
      const input = document.createElement('input');
      input.value = link;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      alert('Link disalin ke clipboard!');
    }
  };  

  const link = window.location.href;

  return (
    <div className={styles.cardPreview}>
      <section className={styles.cardBox}>
        <h2 className={styles.title}>👤 Preview Kartu Nama</h2>
        <div className={styles.info}>
          <p><FaUser className={styles.icon} /> <strong>{name}</strong></p>
          {status === 'mahasiswa' ? (
            <>
              <p><FaGraduationCap className={styles.icon} /> {jenjang} - {jurusan}</p>
              <p><FaUniversity className={styles.icon} /> {fakultas} - {universitas}</p>
            </>
          ) : (
            <>
              <p><FaBriefcase className={styles.icon} /> {job}</p>
              <p><FaBuilding className={styles.icon} /> {perusahaan}</p>
            </>
          )}
          <p><FaPhone className={styles.icon} /> {nohp}</p>
          <p><FaEnvelope className={styles.icon} /> {email}</p>
        </div>
      </section>

      <section className={styles.qrContainer}>
        <h4>📱 QR Code</h4>
        <QRCodeCanvas value={link} size={180} />
        <p className={styles.scanNote}>Scan untuk akses cepat</p>
      </section>

      <section className={styles.nfcLink}>
        <h4>🔗 Link NFC</h4>
        <input type="text" value={link} readOnly />
        <button
          className={styles.copyBtn}
          onClick={handleCopy}
        >
          Salin Link
        </button>
      </section>
    </div>
  );
}
