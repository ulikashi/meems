import {
  backButton,
  init as initSDK,
  miniApp,
  bindThemeParamsCssVars,
  viewport,
  bindViewportCssVars,
  retrieveLaunchParams
} from '@telegram-apps/sdk-react';

export interface InitOptions {
  eruda?: boolean;
  debug?: boolean;
}

/**
 * Инициализирует SDK и необходимые компоненты Telegram Mini App
 */
export function init(options: InitOptions = {}): boolean {
  try {
    if (options.debug) {
      console.log('Initializing Telegram SDK with options:', options);
    }

    // Проверяем наличие глобального объекта Telegram
    if (typeof window !== 'undefined' && !window.Telegram) {
      console.warn('window.Telegram не найден. Проверьте, что вы находитесь в среде Telegram или что мок-окружение загружено правильно.');
    }

    // Initialize SDK
    initSDK();
    if (options.debug) console.log('SDK initialized');

    // Монтируем miniApp компонент, но не вызываем ready пока
    try {
      miniApp.mount();
      if (options.debug) console.log('Mini app mounted');
    } catch (error) {
      console.error('Ошибка монтирования mini app:', error);
    }
    
    // Initialize viewport
    try {
      viewport.mount();
      bindViewportCssVars();
      if (options.debug) console.log('Viewport initialized');
    } catch (error) {
      console.error('Ошибка инициализации viewport:', error);
    }

    // Initialize theme
    try {
      bindThemeParamsCssVars();
      if (options.debug) console.log('Theme initialized');
    } catch (error) {
      console.error('Ошибка инициализации темы:', error);
    }

    // Initialize back button
    try {
      backButton.mount();
      if (options.debug) console.log('Back button initialized');
    } catch (error) {
      console.error('Ошибка инициализации кнопки "Назад":', error);
    }

    // Apply theme variables
    try {
      const themeParams = retrieveLaunchParams().themeParams || {};
      if (Object.keys(themeParams).length > 0) {
        if (options.debug) console.log('Theme params:', themeParams);
        
        // Apply CSS variables
        const cssThemeParams = themeParams as Record<string, string>;
        Object.entries(cssThemeParams).forEach(([key, value]) => {
          if (typeof value === 'string' && value.startsWith('#')) {
            document.documentElement.style.setProperty(`--tg-theme-${key}`, value);
          }
        });
        
        if (options.debug) console.log('Theme variables applied to CSS');
      } else {
        console.warn('Theme params are empty or undefined');
      }
    } catch (error) {
      console.error('Ошибка применения темы:', error);
    }

    // Теперь сигнализируем что приложение готово к отображению
    try {
      // Проверяем доступность метода ready() согласно современным API Telegram
      if (miniApp.ready && typeof miniApp.ready === 'function') {
        miniApp.ready();
        if (options.debug) console.log('miniApp.ready() called successfully');
      } else {
        console.warn('miniApp.ready is not available, skipping ready call');
      }
    } catch (error) {
      console.error('Ошибка вызова miniApp.ready():', error);
    }

    // Initialize debug tools if needed
    if (options.eruda) {
      import('eruda').then(({ default: eruda }) => {
        eruda.init();
        if (options.debug) console.log('Eruda initialized for debugging');
      }).catch(error => {
        console.error('Ошибка инициализации Eruda:', error);
      });
    }

    console.log('Telegram SDK initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize Telegram SDK:', error);
    return false;
  }
}