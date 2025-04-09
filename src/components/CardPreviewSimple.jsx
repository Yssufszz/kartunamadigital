import styles from './CardPreviewSimple.module.css';
import { FaUser, FaBriefcase, FaUniversity, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function CardPreviewSimple({
  name,
  job,
  email,
  nohp,
  status,
  jenjang,
  jurusan,
  fakultas,
  universitas,
  perusahaan,
}) {
  if (!name && !email && !nohp) return null;

  return (
    <div className={styles.cardContainer}>
      <h3 className={styles.title}>Preview Kartu</h3>
      <div className={styles.cardInfo}>
        <div className={styles.infoRow}>
          <FaUser className={styles.icon} />
          <span>{name}</span>
        </div>

        {status === 'mahasiswa' ? (
          <>
            <div className={styles.infoRow}>
              <FaUniversity className={styles.icon} />
              <span>{jenjang} - {jurusan}</span>
            </div>
            <div className={styles.infoRow}>
              <FaUniversity className={styles.icon} />
              <span>{fakultas}, {universitas}</span>
            </div>
          </>
        ) : (
          <>
            <div className={styles.infoRow}>
              <FaBriefcase className={styles.icon} />
              <span>{job}</span>
            </div>
            <div className={styles.infoRow}>
              <FaUniversity className={styles.icon} />
              <span>{perusahaan}</span>
            </div>
          </>
        )}

        <div className={styles.infoRow}>
          <FaPhone className={styles.icon} />
          <span>{nohp}</span>
        </div>
        <div className={styles.infoRow}>
          <FaEnvelope className={styles.icon} />
          <span>{email}</span>
        </div>
      </div>
    </div>
  );
}
