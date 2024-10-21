export interface Category {
  code: string;
  message: string;
  data: { categoryList: CategoryList[] };
}

export interface CategoryList {
  id: number;
  name: string;
}
