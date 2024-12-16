export default function Layout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        {children}
        {modal}
      </body>
    </html>
  );
}
