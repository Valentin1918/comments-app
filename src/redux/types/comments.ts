export type CommentCoordinates = {
  x: number;
  y: number;
};

export type Comment = {
  status: 'draft' | 'active' | 'edit' | 'resolved';
  treads: Array<string>;
  coordinates: CommentCoordinates;
  draft?: string;
  warned?: boolean;
};

export type CommentsState = {
  [commentId: string]: Comment;
};
