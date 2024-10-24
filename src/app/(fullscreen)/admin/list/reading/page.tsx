import React from 'react';

import { fetchPaginatedReadingPreview } from '@/api/queries/contentsQueries'; // Ensure you have this function to fetch data
import { Button } from '@/components/ui/button';

import ListTable from '../components/ListTable';

export default async function ListPage() {
  const initialReadingContents = await fetchPaginatedReadingPreview(0, 10);

  return (
    <div>
      <div className="flex justify-end">
        <Button variant="secondary">수정</Button>
        <Button variant="destructive">비활성화</Button>
      </div>
      {/* Pass the data to ListTable */}
      <ListTable initialContents={initialReadingContents} />
    </div>
  );
}
