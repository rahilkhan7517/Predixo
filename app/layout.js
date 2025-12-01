export const metadata = {
  title: "Predixo",
  description: "Your AI Forecasting Assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
