import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import styles from './LoginForm.module.css';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  try {
    const success = await login(username, password);
    if (success) {
      navigate('/notes');
    } else {
      setError('Неверные учетные данные');
    }
  } catch (err) {
    console.error('Login error:', err); // Теперь err используется
    setError(
      err instanceof Error 
        ? `Ошибка: ${err.message}`
        : 'Произошла неизвестная ошибка'
    );
  } finally {
    setIsLoading(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className={styles.form} aria-label="Форма входа">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Логин"
        className={styles.input}
        required
        autoComplete="username"
        disabled={isLoading}
        aria-required="true"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
        className={styles.input}
        required
        autoComplete="current-password"
        disabled={isLoading}
        aria-required="true"
      />
      {error && <div className={styles.error} role="alert">{error}</div>}
      <button type="submit" disabled={isLoading} className={styles.button}>
        {isLoading ? 'Вход...' : 'Войти'}
      </button>
    </form>
  );
};