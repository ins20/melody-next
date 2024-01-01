"use server";
import fs from "fs";
import path from "path";
import { DB, Data, Music } from "./types";

const filePath = path.resolve("./db.json");

function readDataFromFile() {
  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading data from file:", error);
    return null;
  }
}
const db: DB = readDataFromFile();

export const getAllMusic = () => {
  return db.data;
};

export const getAllGenres = () => {
  return Array.from(
    new Set(
      db.data
        .map(({ genres }) => genres)
        .map(([genre]) => JSON.stringify(genre))
    )
  ).map((genre) => JSON.parse(genre));
};

export const getAllAuthors = () => {
  const authorsSet = new Set();

  db.data
    .map(({ authors }) => authors)
    .map((authors) => {
      authors.forEach((author) => authorsSet.add(JSON.stringify(author)));
    });

  return Array.from(authorsSet).map((author) => JSON.parse(author as string));
};

export const getAllVideos = () => {
  return db.data.map(({ video }) => video);
};
export const getFilteredMusic = (filter: string[]) => {
  return db.data.filter(
    ({ genres, authors }) =>
      genres.some((genre: Data) => filter.includes(genre.id)) ||
      authors.some((author: Data) => filter.includes(author.id))
  );
};

export const getById = (itemId: number) => {
  return db.data.find(({ id }) => id === itemId) as Music;
};
