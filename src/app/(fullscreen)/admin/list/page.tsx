'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Preview, ContentsResponse } from '@/types/Preview';

export interface AdminListProps {
  //   isCheck: boolean;
  //   contents: ContentsResponse["data"];
  content: Preview;
  hasQuiz: boolean;
  isDeactivated: boolean;
}

const mockData: AdminListProps[] = [
  {
    content: {
      contentId: 1,
      title: 'title1',
      category: 'category1',
      thumbnailUrl: 'thumbnailUrl1',
      contentType: 'LISTENING',
      preScripts: 'preScripts1',
      hits: 1,
    },

    hasQuiz: false,
    isDeactivated: false,
  },
  {
    content: {
      contentId: 2,
      title: 'title2',
      category: 'category2',
      thumbnailUrl: 'thumbnailUrl2',
      contentType: 'LISTENING',
      preScripts: 'preScripts2',
      hits: 2,
    },

    hasQuiz: true,
    isDeactivated: true,
  },
  {
    content: {
      contentId: 3,
      title: 'title3',
      category: 'category3',
      thumbnailUrl: 'thumbnailUrl3',
      contentType: 'READING',
      preScripts: 'preScripts3',
      hits: 3,
    },

    hasQuiz: false,
    isDeactivated: true,
  },
];

function ListTable() {
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item: number) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <div className="flex h-full w-full">
      <table className="w-full  ">
        <thead>
          <tr className="">
            <th className="px-4 py-2">
              <br />
            </th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Hits</th>
            <th className="px-4 py-2">Quiz Available</th>
            <th className="px-4 py-2">Deactivated</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((item, index) => (
            <tr
              //   onClick={() => toggleSelect(item.content[0].contentId)}
              key={item.content.contentId}
              className={
                `${selected.includes(item?.content.contentId)}`
                  ? `bg-yellow-100`
                  : ``
              }
            >
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  onClick={() => toggleSelect(item?.content.contentId)}
                />
              </td>
              <td className="px-4 py-2">{item.content.title}</td>
              <td className="px-4 py-2">{item.content.category}</td>
              <td className="px-4 py-2">{item.content.contentType}</td>
              <td className="px-4 py-2">{item.content.hits}</td>
              <td className="px-4 py-2">{item.hasQuiz ? 'Yes' : 'No'}</td>
              <td className="px-4 py-2">{item.isDeactivated ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default function ListPage(params) {
  return (
    <div>
      <div className="flex justify-end">
        <Button variant="secondary">수정</Button>

        <Button variant="destructive">비활성화</Button>
      </div>

      <ListTable />
    </div>
  );
}
