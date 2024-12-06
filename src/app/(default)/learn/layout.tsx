// app/learn/layout.tsx

export default async function LearnPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full mx-auto px-6">
      <main className="flex-1">{children}</main>
    </div>
  );
}
