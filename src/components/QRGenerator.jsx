import { useEffect, useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import styles from './QRGenerator.module.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function QRGenerator({ url }) {
  const [shortUrl, setShortUrl] = useState('');
  const qrRef = useRef(null);

  useEffect(() => {
    async function shortenUrl() {
      try {
        const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
        const tiny = await res.text();
        setShortUrl(tiny);
      } catch (err) {
        console.error('Gagal memendekkan URL:', err);
      }
    }

    if (url) shortenUrl();
  }, [url]);

  const downloadQRImage = async () => {
    const canvas = await html2canvas(qrRef.current);
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'qr-profilecard.png';
    link.click();
  };

  const downloadPDF = async () => {
    const canvas = await html2canvas(qrRef.current);
    const image = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    pdf.setFontSize(14);
    pdf.text('Scan QR Code di bawah untuk akses cepat:', 10, 10);
    pdf.addImage(image, 'PNG', 10, 20, 80, 80);
    pdf.text(`Short Link: ${shortUrl}`, 10, 110);
    pdf.save('kartu-qrcode.pdf');
  };

  return (
    <div className={styles.qrWrapper}>
      {shortUrl ? (
        <>
          <div ref={qrRef} className={styles.qrBox}>
            <QRCode value={shortUrl} size={200} />
          </div>
          <div className={styles.buttonRow}>
            <button onClick={downloadQRImage}>Download PNG</button>
            <button onClick={downloadPDF}>Download PDF</button>
          </div>
        </>
      ) : (
        <p>Loading QR...</p>
      )}
    </div>
  );
}
