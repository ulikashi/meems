// Мокирование Telegram Mini App API для локальной разработки

const setupMockEnvironment = async () => {
  try {
    // Добавляем глобальный объект Telegram для отладки в браузере
    if (typeof window !== 'undefined' && !window.Telegram) {
      const themeParams = {
        bg_color: '#ffffff',
        text_color: '#000000',
        hint_color: '#999999',
        link_color: '#2481cc',
        button_color: '#2481cc',
        button_text_color: '#ffffff',
        accent_text_color: '#2481cc',
        destructive_text_color: '#ff3b30',
        header_bg_color: '#ffffff',
        secondary_bg_color: '#f2f2f7',
        section_bg_color: '#ffffff',
        section_header_text_color: '#6d6d72',
        subtitle_text_color: '#8e8e93'
      };
      
      window.Telegram = {
        WebApp: {
          initData: '',
          initDataUnsafe: {
            user: {
              id: 123456789,
              first_name: "User",
              last_name: "",
              username: "testuser",
              language_code: "ru"
            },
            auth_date: Math.floor(Date.now() / 1000),
            hash: "mock_hash"
          },
          colorScheme: 'light',
          themeParams: themeParams,
          platform: 'web',
          version: '6.0',
          viewportHeight: window.innerHeight,
          viewportStableHeight: window.innerHeight,
          isExpanded: true,
          MainButton: {
            text: '',
            color: '#2481cc',
            textColor: '#ffffff',
            isVisible: false,
            isActive: true,
            isProgressVisible: false,
            setText: () => {},
            show: () => {},
            hide: () => {},
            enable: () => {},
            disable: () => {},
            onClick: (callback) => {},
            offClick: (callback) => {},
          },
          BackButton: {
            isVisible: false,
            show: () => {},
            hide: () => {},
            onClick: (callback) => {},
            offClick: (callback) => {},
          },
          HapticFeedback: {
            impactOccurred: () => {},
            notificationOccurred: () => {},
            selectionChanged: () => {},
          },
          ready: () => {
            console.log("Telegram WebApp is ready");
          },
          expand: () => {},
          close: () => {},
          onEvent: (eventName, callback) => {},
          offEvent: (eventName, callback) => {},
          sendData: (data) => {
            console.log("Sending data to Telegram:", data);
          },
          openLink: (url) => {
            window.open(url, "_blank");
          },
          showPopup: (params, callback) => {
            alert(params.message || 'Popup');
            if (callback) callback();
          },
          showAlert: (message, callback) => {
            alert(message);
            if (callback) callback();
          },
          showConfirm: (message, callback) => {
            const result = confirm(message);
            if (callback) callback(result);
          },
        }
      };
      
      console.info(
        '✅ Telegram WebApp API успешно эмулирован для локальной разработки'
      );
    }
  } catch (error) {
    console.error('❌ Ошибка при мокировании Telegram WebApp API:', error);
  }
};

// Выполняем настройку мока только в режиме разработки
if (process.env.NODE_ENV === 'development') {
  setupMockEnvironment();
}

// Для TypeScript
declare global {
  interface Window {
    Telegram?: {
      WebApp: any;
    };
  }
}

export {};
