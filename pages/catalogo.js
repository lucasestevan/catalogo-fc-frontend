import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Catalogo() {
  const [times, setTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTimes() {
      try {
        const response = await axios.get(`${API_URL}/api/times`);
        setTimes(response.data);
      } catch (err) {
        setError('Não foi possível carregar o catálogo. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }
    fetchTimes();
  }, []);

  if (loading) return <p style={styles.message}>Carregando catálogo...</p>;
  if (error) return <p style={styles.errorMessage}>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Catálogo de Times</h1>
      <div style={styles.grid}>
        {times.map((time) => (
          <Link key={time.id} href={`/visualizar/${time.id}`} passHref style={styles.card}>
            <div style={styles.cardContent}>
              {time.url_escudo && (
                <img src={time.url_escudo} alt={`Escudo do ${time.nome_time}`} style={styles.shieldImage} />
              )}
              <h2 style={styles.cardTitle}>{time.nome_time}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    justifyContent: 'center',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    textDecoration: 'none',
    color: '#333',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  shieldImage: {
    width: '100px',
    height: '100px',
    objectFit: 'contain',
    marginBottom: '15px',
  },
  cardTitle: {
    fontSize: '1.2em',
    textAlign: 'center',
    margin: '0',
  },
  message: {
    textAlign: 'center',
    fontSize: '1.2em',
    color: '#555',
  },
  errorMessage: {
    textAlign: 'center',
    fontSize: '1.2em',
    color: 'red',
  },
};
