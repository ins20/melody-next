export type Music = {
  id: number;
  title: string;
  video: string;
  image: string;
  audio: string;
  genres: Data[];
  authors: Data[];
};

export type Data = {
  id: string;
  label: string;
};

export type DB = {
  data: Music[];
};

export type Menu = {
  title: string;
  label: string;
  description: string;
  values: Data[];
};
