// src/types/index.ts

export interface User {
  id: string | number; // Le ponemos string | number por si el profe usa UUIDs o IDs numéricos
  nickName: string;
  // Nota: El TP dice que el password es siempre "123456" y se valida localmente, 
  // así que es probable que la API no devuelva el campo password por seguridad.
}

export interface Tag {
  id: string | number;
  name: string;
}

export interface Post {
  id: string | number;
  description: string;
  
  // Campos del usuario (locales y del backend)
  userId: string | number;  // El que usás para la creación
  UserId?: string | number; // El que devuelve el backend real con mayúscula
  User?: {
    id: string | number;
    nickName: string;
    email?: string;
  };

  // Campos de etiquetas (locales y del backend)
  tags: (string | number)[]; // El array plano que usás al crear
  Tags?: {                   // El objeto que devuelve el backend mapeado
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

// respuesta genérica de errores de la API 
export interface ApiError {
  error: string;
  message?: string;
}

export interface PostImage {
  id: string | number;
  url: string;
  postId: string | number;
}