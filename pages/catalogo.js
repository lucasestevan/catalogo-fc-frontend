// frontend/pages/catalogo.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link'; // Importa o componente Link

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Catalogo() {
  const [times, setTimes] = useState([]); // Espera uma lista (array) simples
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTimes() {
      try {
        const response = await axios.get(`${API_URL}/times`);
        setTimes(response.data);
      } catch (err) {
        setError('Não foi possível carregar o catálogo. Tente novamente mais tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTimes();
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Carregando catálogo...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '1rem' }}>
      <h1 style={{ textAlign: 'center' }}>Catálogo de Camisas</h1>
      <p style={{ textAlign: 'center' }}>Clique em um time para ver os modelos disponíveis.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
        
        {/* Mapeia sobre a lista simples de times */}
        {times.map((time) => (
  <Link 
    key={time.id} 
    href={`/visualizar/${time.id}`} 
    style={styles.timeButton} // O style da tag <a> vem para aqui
  >
    {/* O conteúdo que estava dentro da tag <a> agora fica diretamente dentro do <Link> */}
    {time.url_escudo && <img src={time.url_escudo} alt={`Escudo do ${time.nome_time}`} style={styles.escudo} />}
    <span style={{ marginTop: '0.5rem' }}>{time.nome_time}</span>
  </Link>
))}
      </div>
    </div>
  );
}

const styles = {
  timeButton: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '1rem', border: '1px solid #ccc', borderRadius: '8px',
    textDecoration: 'none', color: 'black', minWidth: '150px',
    textAlign: 'center', backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    cursor: 'pointer'
  },
  escudo: {
    width: '50px', height: '50px', objectFit: 'contain'
  }
};