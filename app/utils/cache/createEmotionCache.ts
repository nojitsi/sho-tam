import createCache from '@emotion/cache';

export const createEmotionCache = (key = 'styles') => createCache({ key });

