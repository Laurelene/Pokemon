export interface PagedData<T> {
  data: T[];

  // nombre de pokemon que l'on veut récupére avec l'API
  limit: number;

  // offset : id à partir duquel on veut faire la recherche
  offset: number;
}
