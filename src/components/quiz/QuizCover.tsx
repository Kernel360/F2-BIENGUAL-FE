interface QuizCoverProps {
  width?: string;
  height?: string;
  startColor: string;
  endColor: string;
  shadow?: string;
  text: string;
  textColor: string;
  button?: React.ReactNode;
}

export default function QuizCover({
  height,
  width,
  startColor,
  endColor,
  shadow,
  text,
  textColor,
  button,
}: QuizCoverProps) {
  return (
    <div
      className={`relative ${width || 'w-full'}  ${height || 'h-[400px]'} overflow-hidden rounded-lg ${shadow || 'shadow-lg'} `}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${startColor} ${endColor} flex flex-col items-center justify-center p-8 transition-opacity duration-500 opacity-100`}
      >
        <h3
          className={`text-lg font-bold text-center mb-8 whitespace-pre-line leading-relaxed  ${textColor}`}
        >
          {text}
        </h3>
        {button}
      </div>
    </div>
  );
}
