export interface TagsResp {
  total: number;
  tags: Tag[];
}

export interface Tag {
  id: number;
  name: string;
  createdAt: string;
}
