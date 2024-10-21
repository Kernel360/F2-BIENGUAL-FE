import { Category } from '@/types/Category';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

export const fetchAllCategories = async (): Promise<Category> => {
  const response = await fetch(`${BASE_URL}/categories/all`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
};
