interface StatusBoxProps {
  label: string;
  completed: boolean;
  icon: React.ReactNode;
}

export default function StatusBox({ label, completed, icon }: StatusBoxProps) {
  return (
    <div
      className={`p-2 px-3 rounded-lg border ${
        completed
          ? 'bg-violet-100 border-violet-300 text-violet-800'
          : 'bg-gray-100 border-gray-300 text-gray-500'
      } transition-colors duration-300 ease-in-out`}
    >
      <div className="flex items-center space-x-2 mb-2 stroke-1">
        {icon}
        <span className="font-semibold ">{label}</span>
      </div>
    </div>
  );
}
