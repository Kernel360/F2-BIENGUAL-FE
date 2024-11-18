export function LoadingPanel({ title }: { title: string }) {
  return <div className="panel">로딩 중: {title}...</div>;
}

export function ErrorPanel({ title }: { title: string }) {
  return <div className="panel text-red-500">오류 발생: {title}</div>;
}

export function EmptyPanel({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="panel text-gray-500">
      <h1>{title}</h1>
      {message}
    </div>
  );
}
