// src/types/index.ts

export interface User {
  id: string | number; 
  nickName: string;

}

export interface Tag {
  id: string | number;
  name: string;
}

export interface Post {
  id: string | number;
  description: string;
  
  
  userId: string | number;  
  UserId?: string | number;
  User?: {
    id: string | number;
    nickName: string;
    email?: string;
  };

  tags: (string | number)[]; 
  Tags?: {                   
    id: string | number;
    name: string;
  }[];
}

export interface PostImage {
  id: string | number;
  postId: string | number;
  url: string;
}

export interface Comment {
  id: string | number;
  content: string;
  userId: string | number;
  UserId?: string | number; 
  postId: string | number;
  User?: {                 
    id: string | number;
    nickName: string;
  };
}


export interface CreatePostPayload {
  description: string;
  userId: string | number;
  tags: (string | number)[];
}

export interface ApiError {
  error: string;
  message?: string;
}

export interface PostImage {
  id: string | number;
  url: string;
  postId: string | number;
}