import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { showPopup } from '@telegram-apps/sdk-react';
import html2canvas from 'html2canvas';
import './MemeEditor.css';

interface MemeText {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
}

interface MemeEditorProps {
  template: string;
  onSave?: (meme: string) => void;
}

const MemeEditor: React.FC<MemeEditorProps> = ({ template, onSave }) => {
  const [texts, setTexts] = useState<MemeText[]>([]);
  const [currentColor, setCurrentColor] = useState('#ffffff');
  const editorRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  const addText = () => {
    setTexts([...texts, { id: nextId.current++, text: 'Текст', x: 50, y: 50, color: currentColor }]);
  };

  const updateText = (id: number, newText: string) => {
    setTexts(texts.map(t => t.id === id ? { ...t, text: newText } : t));
  };

  const handleDrag = (id: number, data: { x: number; y: number }) => {
    setTexts(texts.map(t => t.id === id ? { ...t, x: data.x, y: data.y } : t));
  };

  const saveMeme = async () => {
    if (!editorRef.current) return;

    const canvas = await html2canvas(editorRef.current);
    const memeUrl = canvas.toDataURL('image/png');

    try {
      await showPopup({
        title: 'Успех!',
        message: 'Мем успешно сохранен',
        buttons: [{ type: 'ok' }]
      });
      onSave?.(memeUrl);
    } catch (error) {
      console.error('Error saving meme:', error);
    }
  };

  return (
    <div className="meme-editor">
      <div className="controls">
        <button onClick={addText}>Добавить текст</button>
        <input
          type="color"
          value={currentColor}
          onChange={(e) => setCurrentColor(e.target.value)}
        />
        <button onClick={saveMeme}>Сохранить</button>
      </div>
      <div className="editor-container" ref={editorRef}>
        <img src={template} alt="Meme template" className="meme-template" />
        {texts.map((text) => (
          <Draggable
            key={text.id}
            position={{ x: text.x, y: text.y }}
            onDrag={(_, data) => handleDrag(text.id, data)}
          >
            <div className="meme-text" style={{ color: text.color }}>
              <input
                type="text"
                value={text.text}
                onChange={(e) => updateText(text.id, e.target.value)}
                style={{ color: text.color }}
              />
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default MemeEditor; 