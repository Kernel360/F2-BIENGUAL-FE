import { RecommendedPreview } from '@/types/Preview';

export const mockRecommendedData: {
  code: string;
  message: string;
  data: { recommendedContents: RecommendedPreview[] };
} = {
  code: 'U-R-002',
  message: '카테고리 추천 컨텐츠 조회 성공',
  data: {
    recommendedContents: [
      {
        contentId: 18,
        title: 'A simple guide to chaos theory - BBC World Service',
        thumbnailUrl:
          'https://d2pl413irf0x58.cloudfront.net/content/content-19/size-480.webp',
        contentType: 'LISTENING',
        category: 'Sports',
        isPointRequired: false,
      },
      {
        contentId: 52,
        title:
          'More than one million children in Gaza need mental health support, says UN | BBC News',
        thumbnailUrl:
          'https://d2pl413irf0x58.cloudfront.net/content/content-31/size-480.webp',
        contentType: 'LISTENING',
        category: 'News',
        isPointRequired: false,
      },
      {
        contentId: 10,
        title: 'Trump’s extreme vision for America hikes pressure on Harris',
        thumbnailUrl:
          'https://d2pl413irf0x58.cloudfront.net/content/content-11/size-480.webp',
        contentType: 'READING',
        category: 'Politics',
        isPointRequired: false,
      },
      {
        contentId: 9,
        title:
          'Fareed: How regional leaders are attempting to upend the international order',
        thumbnailUrl:
          'https://d2pl413irf0x58.cloudfront.net/content/content-34/size-480.webp',
        contentType: 'LISTENING',
        category: 'Politics',
        isPointRequired: false,
      },
      {
        contentId: 19,
        title:
          'Record number of early votes cast in Georgia as election gets underway in battleground state',
        thumbnailUrl:
          'https://d2pl413irf0x58.cloudfront.net/content/content-54/size-480.webp',
        contentType: 'READING',
        category: 'Politics',
        isPointRequired: false,
      },
      {
        contentId: 27,
        title: 'Former One Direction member Liam Payne dies at 31',
        thumbnailUrl:
          'https://d2pl413irf0x58.cloudfront.net/content/content-45/size-480.webp',
        contentType: 'LISTENING',
        category: 'Politics',
        isPointRequired: false,
      },
      {
        contentId: 34,
        title:
          'Han Kang wins Nobel Prize in literature for ‘intense poetic prose’ confronting human fragility',
        thumbnailUrl:
          'https://d2pl413irf0x58.cloudfront.net/content/content-52/size-480.webp',
        contentType: 'READING',
        category: 'Style',
        isPointRequired: false,
      },
      {
        contentId: 11,
        title: 'Judge scrutinizes Boeing plea deal and will decide case ‘soon’',
        thumbnailUrl:
          'https://d2pl413irf0x58.cloudfront.net/content/content-22/size-480.webp',
        contentType: 'READING',
        category: 'Business',
        isPointRequired: false,
      },
      {
        contentId: 17,
        title: 'Harvard negotiator explains how to argue | Dan Shapiro',
        thumbnailUrl:
          'https://d2pl413irf0x58.cloudfront.net/content/content-38/size-480.webp',
        contentType: 'LISTENING',
        category: 'Education',
        isPointRequired: false,
      },
    ],
  },
};
