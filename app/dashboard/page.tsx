import { getAllAuthors, getAllGenres, getAllMusic } from "@/lib/api";
import { Menu, Music } from "@/lib/types";

import Dashboard from "@/components/dashboard";

const page = () => {
  const data: Music[] = getAllMusic();
  const dataMenu: Menu[] = [
    {
      title: "Жанры",
      label: "Жанры",
      description: "Выберите жанры",
      values: getAllGenres(),
    },
    {
      title: "Испонители",
      label: "Испонители",
      description: "Выберите испонители",
      values: getAllAuthors(),
    },
  ];
  return <Dashboard data={data} menu={dataMenu} />;
};

export default page;
