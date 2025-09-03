// frontend/pages/admin.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function AdminPanel() {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  // --- Estados para Gerenciamento ---
  const [vendedorNome, setVendedorNome] = useState('');
  const [vendedorEmail, setVendedorEmail] = useState('');
  const [vendedorSenha, setVendedorSenha] = useState('');

  const [timeNome, setTimeNome] = useState('');
  const [timeLink, setTimeLink] = useState('');
  const [timeEscudo, setTimeEscudo] = useState('');

  // Tenta pegar o token do localStorage ao carregar a página
  useEffect(() => {
    const storedToken = localStorage.getItem('admin-token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/admin/login`, { email, senha });
      const { token } = response.data;
      localStorage.setItem('admin-token', token); // Salva o token
      setToken(token);
      setError('');
    } catch (err) {
      setError('Email ou senha de admin inválidos.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    setToken(null);
  };

  const handleAddVendedor = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/admin/vendedores`,
        { nome: vendedorNome, email: vendedorEmail, senha: vendedorSenha },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Vendedor adicionado com sucesso!');
      setVendedorNome(''); setVendedorEmail(''); setVendedorSenha('');
    } catch (err) {
      alert('Erro ao adicionar vendedor.');
    }
  };

  const handleAddTime = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/admin/times`,
        { nome_time: timeNome, link_fotos: timeLink, url_escudo: timeEscudo },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Time adicionado com sucesso!');
      setTimeNome(''); setTimeLink(''); setTimeEscudo('');
    } catch (err) {
      alert('Erro ao adicionar time.');
    }
  };


  // --- Renderização ---
  if (!token) {
    return (
      // TELA DE LOGIN DO ADMIN
      <div style={styles.container}>
        <div style={styles.loginBox}>
          <h2>Painel do Admin - Login</h2>
          <form onSubmit={handleAdminLogin}>
            <input type="email" placeholder="Email do Admin" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input}/>
            <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required style={styles.input}/>
            {error && <p style={styles.error}>{error}</p>}
            <button type="submit" style={styles.button}>Entrar</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    // PAINEL DE GERENCIAMENTO
    <div style={styles.adminContainer}>
      <h1>Painel de Gerenciamento</h1>
      <button onClick={handleLogout} style={{...styles.button, backgroundColor: '#dc3545', width: 'auto'}}>Sair (Logout)</button>
      
      <div style={styles.section}>
        <h2>Adicionar Novo Vendedor</h2>
        <form onSubmit={handleAddVendedor} style={styles.form}>
          <input type="text" placeholder="Nome do Vendedor" value={vendedorNome} onChange={e => setVendedorNome(e.target.value)} style={styles.input} required />
          <input type="email" placeholder="Email do Vendedor" value={vendedorEmail} onChange={e => setVendedorEmail(e.target.value)} style={styles.input} required />
          <input type="text" placeholder="Senha Inicial" value={vendedorSenha} onChange={e => setVendedorSenha(e.target.value)} style={styles.input} required />
          <button type="submit" style={styles.button}>Adicionar Vendedor</button>
        </form>
      </div>

      <div style={styles.section}>
        <h2>Adicionar Novo Time ao Catálogo</h2>
        <form onSubmit={handleAddTime} style={styles.form}>
          <input type="text" placeholder="Nome do Time (Ex: Corinthians 23/24)" value={timeNome} onChange={e => setTimeNome(e.target.value)} style={styles.input} required />
          <input type="text" placeholder="ID do Álbum Google Photos" value={timeLink} onChange={e => setTimeLink(e.target.value)} style={styles.input} required />
          <input type="url" placeholder="URL da Imagem do Escudo (Opcional)" value={timeEscudo} onChange={e => setTimeEscudo(e.target.value)} style={styles.input} />
          <button type="submit" style={styles.button}>Adicionar Time</button>
        </form>
      </div>
    </div>
  );
}


// Estilos (reaproveitando e adicionando novos)
const styles = {
    // ... estilos da página de login ...
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' },
    loginBox: { padding: '40px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', textAlign: 'center', minWidth: '300px' },
    input: { width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' },
    button: { width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    error: { color: 'red', marginTop: '10px' },
    adminContainer: { padding: '2rem', maxWidth: '800px', margin: 'auto' },
    section: { backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', marginTop: '2rem' },
    form: { display: 'flex', flexDirection: 'column' }
};