import CardType, { cardBuilder, cardBuilderExtended } from "../components/CardType";
import Iterable from "../types/Iterable";
import {
  abstractGetWithRequestParams,
  abstractPost,
  abstractPut,
} from "./abstractService";

export const saveNewCard = (
  userId: number|undefined,
  wordId: number|undefined,
  card: CardType,
) => {
  create(userId, wordId, card);
};


export const fetchAllCardsByUserId = (
    userId: number,
    pageNo: number,
    pageSize: number,
    sortBy: string,
    direction: string
  ): any => {
    return fetchAndMap (
        userId,
        pageNo,
        pageSize,
        sortBy,
        direction
      ).then( (response) => {return response});
  }

export const fetchAndMap = async (
  userId: number,
  pageNo: number,
  pageSize: number,
  sortBy: string,
  direction: string
): Promise<CardType> => {
  const response = await abstractGetWithRequestParams(
    `/api/cards?userId=${userId}`,
    { params: { pageNo, pageSize, sortBy, direction } }
  );
  let mappedContent: CardType[] = [];
  response.data.content.forEach((e: CardType) => {
    mappedContent.push(
      cardBuilderExtended(
        e.id,
        e.title,
        e.content,
        e.isArchived,
        e.userId,
        e.word,
        e.version
      )
    );
  });
  response.data.content = mappedContent;
  return response.data;
};

export const create = (userId: number|undefined, wordId: number|undefined, card: CardType) => {
  let path = `/api/cards?userId=${userId}&wordId=${wordId}`;
  abstractPost(path, card);
};

export const save = (userId: number|undefined, card: Iterable) => {
  let path = "/api/cards/update";
  abstractPost(path, card);
};
