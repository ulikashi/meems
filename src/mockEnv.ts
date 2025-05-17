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
            onClick: (_: () => void) => {},
            offClick: (_: () => void) => {},
          },
          BackButton: {
            isVisible: false,
            show: () => {},
            hide: () => {},
            onClick: (_: () => void) => {},
            offClick: (_: () => void) => {},
          },
          HapticFeedback: {
            impactOccurred: () => {},
            notificationOccurred: () => {},
            selectionChanged: () => {},
          },
          ready: () => {
            console.log("Telegram WebApp ready() function called - hiding loading placeholder");
          },
          expand: () => {},
          close: () => {},
          onEvent: (_eventName: string, _callback: () => void) => {},
          offEvent: (_eventName: string, _callback: () => void) => {},
          sendData: (_data: string) => {
            console.log("Sending data to Telegram:", _data);
          },
          openLink: (_url: string) => {
            window.open(_url, "_blank");
          },
          showPopup: (params: { message: string }, _callback?: () => void) => {
            alert(params.message || 'Popup');
            if (_callback) _callback();
          },
          showAlert: (message: string, _callback?: () => void) => {
            alert(message);
            if (_callback) _callback();
          },
          showConfirm: (message: string, _callback?: (result: boolean) => void) => {
            const result = confirm(message);
            if (_callback) _callback(result);
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
