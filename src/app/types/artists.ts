
import { Collection } from "./charts";
import { Releases } from "./releases";

export interface Artists {
  created: number;
  imageUrl: string;
  name: string;
  description: {'info':string};
  tracks:Releases[];
  charts:Collection[];
  ___class: string;
  ownerId: string;
  updated: number;
  objectId: string;
}


