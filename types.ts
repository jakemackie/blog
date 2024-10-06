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
