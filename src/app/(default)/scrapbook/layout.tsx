import SideNav from './SideNav';

export default async function ScrapbookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full h-screen">
      <SideNav />
      <main className="flex-1">{children}</main>
    </div>
  );
}
