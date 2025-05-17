import React, { useState, useEffect } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import MemeGallery from './components/MemeGallery';
import MemeEditor from './components/MemeEditor';
import { init } from './init';
import './App.css';

interface Template {
  id: string;
  url: string;
  name: string;
  tags: string[];
}

function App() {
  const [initialized, setInitialized] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Инициализируем SDK при загрузке приложения
  useEffect(() => {
    try {
      // Используем опцию debug для включения отладочной информации
      const isDev = process.env.NODE_ENV === 'development';
      const success = init({ 
        eruda: isDev, 
        debug: isDev 
      });
      
      if (success) {
        console.log('SDK initialized successfully');
        setInitialized(true);
      } else {
        setError('Не удалось инициализировать Telegram SDK');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
      console.error('Error initializing SDK:', err);
      setError(errorMessage);
    }
  }, []);

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
  };

  // Показываем ошибки если они есть
  if (error) {
    return (
      <div className="error">
        <h2>Ошибка</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Перезагрузить приложение
        </button>
      </div>
    );
  }

  // Показываем экран загрузки
  if (!initialized) {
    return (
      <div className="loading">
        <p>Загрузка приложения...</p>
      </div>
    );
  }

  return (
    <div className="app">
      {!selectedTemplate ? (
        <MemeGallery onSelect={handleTemplateSelect} />
      ) : (
        <MemeEditor
          template={selectedTemplate.url}
          onSave={(memeUrl) => {
            console.log('Meme saved:', memeUrl);
            setSelectedTemplate(null);
          }}
        />
      )}
    </div>
  );
}

export default App; 