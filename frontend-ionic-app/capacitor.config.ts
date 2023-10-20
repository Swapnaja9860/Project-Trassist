import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.trassist',
  appName: 'Trassist',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
