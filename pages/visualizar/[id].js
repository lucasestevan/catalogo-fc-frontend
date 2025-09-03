import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function VisualizarTime() {
  const router = useRouter();
  const { id } = router.query;
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      async function fetchImages() {
        try {
          const response = await axios.get(`${API_URL}/api/visualizar/${id}`);
          setImageUrls(response.data);
        } catch (err) {
          setError('Não foi possível carregar as imagens do time.');
        } finally {
          setLoading(false);
        }
      }
      fetchImages();
    }
  }, [id]);

  if (loading) return <p style={styles.message}>Carregando imagens...</p>;
  if (error) return <p style={styles.errorMessage}>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Imagens do Time</h1>
      <div style={styles.grid}>
        {imageUrls.map((url, index) => (
          <div key={index} style={styles.imageWrapper}>
            <img src={url} alt={`Imagem ${index + 1}`} style={styles.image} />
          </div>
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
  imageWrapper: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
    display: 'block',
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
