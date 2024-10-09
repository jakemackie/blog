export interface SinglePost {
  slug: {
    current: string;
    _type: string;
  };
  categories: Category[];
  author: AuthorReference;
  publishedAt: string | null;
  title: string;
  body: Block[];
  mainImage?: ImageReference;
}

export interface Block {
  markDefs: any[];
  children: Child[];
  _type: string;
  style: string;
  _key: string;
}

export interface Child {
  _type: string;
  text: string;
  marks: any[];
}

export interface Category {
  _ref: string;
  _type: string;
  _key: string;
}

export interface AuthorReference {
  name: string;
  image?: ImageReference;
}

export interface ImageReference {
  alt?: string;
  asset: {
    _ref: string;
    _type: string;
  };
  _type: string;
}

export interface Author {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: string;
  name: string;
  slug: {
    current: string;
    _type: string;
  };
  bio: Array<{
    _key: string;
    _type: string;
    style: string;
    markDefs: any[];
    children: Array<{
      _key: string;
      _type: string;
      marks: any[];
      text: string;
    }>;
  }>;
}
