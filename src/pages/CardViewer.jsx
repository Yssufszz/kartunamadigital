import { useSearchParams } from 'react-router-dom';
import CardPreview from '../components/CardPreview';

export default function CardViewer() {
  const [searchParams] = useSearchParams();

  const name = searchParams.get('name');
  const job = searchParams.get('job');
  const email = searchParams.get('email');

  return (
    <div style={{ padding: '20px' }}>
      <CardPreview name={name} job={job} email={email} />
    </div>
  );
}
