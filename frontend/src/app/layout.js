import './globals.css';
import Providers from './providers';

export const metadata = {
  title: 'Data Analytics Platform',
  description: 'Upload and analyze your CSV data',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}