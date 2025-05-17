// Сначала подключаем стили Telegram UI
import '@telegram-apps/telegram-ui/dist/styles.css';
import './index.css';

// Импортируем мок-окружение для разработки перед любым другим кодом
import './mockEnv.ts';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Глобальная обработка ошибок чтобы не показывать белый экран при сбоях
const handleGlobalError = (error: Error) => {
  console.error('Глобальная ошибка приложения:', error);
  
  // Если у нас еще нет элемента для отображения ошибки, создаем его
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; color: #ff3b30;">
        <h2>Что-то пошло не так</h2>
        <p>Произошла ошибка при загрузке приложения</p>
        <pre style="text-align: left; background: #f2f2f7; padding: 10px; overflow: auto;">${error.message}</pre>
        <button onclick="location.reload()" style="padding: 8px 16px; background: #2481cc; color: white; border: none; border-radius: 8px; margin-top: 20px;">
          Перезагрузить
        </button>
      </div>
    `;
  }
};

try {
  // Инициализируем рендеринг приложения
  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  handleGlobalError(error as Error);
}

// Глобальный обработчик необработанных ошибок
window.addEventListener('error', (event) => {
  event.preventDefault();
  handleGlobalError(event.error);
});
