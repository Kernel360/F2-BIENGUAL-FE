'use client';

import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { fetchReadingContents } from '@/api/queries/contentsQueries';
import { ContentsResponse, Preview } from '@/types/Preview';

// todo : 리딩이랑 리스닝 나눠서 보여주기?
export interface AdminListProps {
  content: Preview;
  hasQuiz: boolean;
  isDeactivated: boolean;
}

export default function ListTable({
  initialContents,
}: {
  initialContents: ContentsResponse;
}) {
  // 리딩
  const { data: readingData } = useQuery({
    queryKey: ['readingContentsData'],
    queryFn: () => fetchReadingContents(0, 10),
    initialData: initialContents,
  });

  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item: number) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <div>
      {/* <Button>리딩</Button>
      <Button>리스닝</Button> */}
      <div>{readingData?.message}</div>
      <div className="flex h-full w-full">
        <div className="w-full overflow-auto" style={{ maxHeight: '800px' }}>
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2"> </th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Hits</th>
                <th className="px-4 py-2">Quiz Available</th>
                <th className="px-4 py-2">Deactivated</th>
              </tr>
            </thead>
            <tbody>
              {readingData?.data.contents.map((item) => (
                <tr
                  key={item.contentId}
                  className={
                    selected.includes(item.contentId) ? 'bg-yellow-100' : ''
                  }
                >
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selected.includes(item.contentId)}
                      onChange={() => toggleSelect(item.contentId)}
                    />
                  </td>
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2">{item.contentType}</td>
                  <td className="px-4 py-2">{item.hits}</td>
                  {/* <td className="px-4 py-2">{item.hasQuiz ? 'Yes' : 'No'}</td> */}
                  {/* <td className="px-4 py-2">{item.isDeactivated ? 'Yes' : 'No'}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
