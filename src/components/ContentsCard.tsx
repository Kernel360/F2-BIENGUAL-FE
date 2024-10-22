import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { formatViewCount } from '@/lib/utils';

interface CardDataProps {
  id: number;
  thumbnailUrl: string;
  category: string;
  title: string;
  views: number;
}

function ContentsCard({ card }: { card: CardDataProps }) {
  return (
    <Card className="rounded-xl overflow-hidden shadow-mille">
      <AspectRatio ratio={16 / 9}>
        <img
          src={card.thumbnailUrl}
          alt={card.title}
          className="object-cover"
        />
      </AspectRatio>
      <div className="p-4">
        <Badge className="rounded">{card.category}</Badge>
        <CardDescription className="mt-1 text-xs">
          {formatViewCount(card.views)}thumbnailUrl
        </CardDescription>
        <CardTitle className="line-clamp-2 mt-1">{card.title}</CardTitle>
      </div>
    </Card>
  );
}

export default ContentsCard;
