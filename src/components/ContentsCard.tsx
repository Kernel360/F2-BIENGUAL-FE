import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { formatViewCount } from '@/lib/utils';

interface CardDataProps {
  id: number;
  imageUrl: string;
  category: string;
  title: string;
  views: number;
}

function ContentsCard({ card }: { card: CardDataProps }) {
  return (
    <Card className="rounded-xl overflow-hidden shadow-mille">
      <AspectRatio ratio={16 / 9}>
        <img src={card.imageUrl} alt={card.title} className="object-cover" />
      </AspectRatio>
      <div className="p-4">
        <Badge className="rounded">{card.category}</Badge>
        <CardDescription className="mt-1 text-xs">
          {formatViewCount(card.views)}
        </CardDescription>
        <CardTitle className="line-clamp-2 mt-1">{card.title}</CardTitle>
      </div>
    </Card>
  );
}

export default ContentsCard;
