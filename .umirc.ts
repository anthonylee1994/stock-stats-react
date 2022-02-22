import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    API_URL: 'https://stock-stats-rails.159.89.208.139.sslip.io',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  locale: {
    default: 'zh-HK',
    useLocalStorage: true,
    baseNavigator: false,
    title: false,
    antd: false,
  },
});
