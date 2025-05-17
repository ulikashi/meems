import React, { useState } from 'react';
import { Section, Cell, List } from '@telegram-apps/telegram-ui';
import './MemeGallery.css';

interface Template {
  id: string;
  url: string;
  name: string;
  tags: string[];
}

// Используем только гарантированно работающие URL-адреса изображений
const templates: Template[] = [
  {
    id: '1',
    url: 'https://i.imgur.com/NyiSNIc.jpg',
    name: 'Drake Hotline Bling',
    tags: ['drake', 'choice', 'comparison']
  },
  {
    id: '2',
    url: 'https://i.imgur.com/Xlx98ik.jpg',
    name: 'Two Buttons',
    tags: ['choice', 'buttons', 'decision']
  },
  {
    id: '3',
    url: 'https://i.imgur.com/aeKBuaL.jpg',
    name: 'Distracted Boyfriend',
    tags: ['boyfriend', 'distracted', 'jealousy']
  },
  {
    id: '4',
    url: 'https://i.imgur.com/uBMCZVA.jpg',
    name: 'Expanding Brain',
    tags: ['brain', 'expand', 'mind']
  },
  {
    id: '5',
    url: 'https://i.imgur.com/yHoUQW0.jpg',
    name: 'Waiting Skeleton',
    tags: ['skeleton', 'waiting', 'patience']
  }
];

interface MemeGalleryProps {
  onSelect: (template: Template) => void;
}

const MemeGallery: React.FC<MemeGalleryProps> = ({ onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="meme-gallery">
      <Section>
        <Cell>
          <input
            type="search"
            placeholder="Поиск шаблона..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </Cell>
      </Section>

      <List>
        {filteredTemplates.map((template) => (
          <Cell
            key={template.id}
            onClick={() => onSelect(template)}
            after="Выбрать"
          >
            <div className="template-preview">
              <img src={template.url} alt={template.name} />
              <div className="template-info">
                <h3>{template.name}</h3>
                <div className="template-tags">
                  {template.tags.map(tag => (
                    <span key={tag} className="tag">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </Cell>
        ))}
      </List>
    </div>
  );
};

export default MemeGallery; 