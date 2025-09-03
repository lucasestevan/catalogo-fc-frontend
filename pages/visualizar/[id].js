// frontend/pages/visualizar/[id].js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function VisualizadorPage() {
  const router = useRouter();
  const { id } = router.query; // Pega o ID do time da URL
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) { // Garante que o ID já está disponível
      const response = await axios.get(`${API_URL}/visualizar/${id}`);
        .then(response => {
          setImageUrls(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Erro ao carregar imagens", error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p style={{textAlign: 'center'}}>A carregar imagens...</p>;

  return (
    <div style={{padding: '1rem'}}>
      <h1 style={{textAlign: 'center'}}>Visualizador de Camisas</h1>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem'}}>
        {imageUrls.map((url, index) => (
          <img 
            key={index} 
            src={`${url}=w1024`} // Pede uma imagem com largura de 1024px para melhor qualidade
            alt={`Camisa ${index + 1}`} 
            style={{width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}} 
          />
        ))}
      </div>
    </div>
  );
}