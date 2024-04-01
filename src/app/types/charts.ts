export interface Charts {
  gengres: string;
  artist: string;
  created: number;
  imageUrl: string;
  name: string;
  ___class: string;
  collection: Collection[];
  ownerId: string | null;
  updated: number;
  objectId: string;
}

interface Collection {
  label: string;
  artist: string;
  audioUrl: string;
  imageUrl: string;
  songName: string;
}
