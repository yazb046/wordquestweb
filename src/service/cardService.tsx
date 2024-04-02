import Iterable from "../types/Iterable";
import CardType, { cardBuilder } from "../types/CardType";
import {
  abstractGet,
  abstractGetWithRequestParams,
  abstractPost,
} from "./abstractService";
import { wordBuilder } from "../types/WordType";

export const saveNewCard = (
  userId: number,
  wordId: number,
  iterable: Iterable,
  comment: string
) => {
  let card = cardBuilder(
    0,
    "",
    iterable.getContent(),
    comment,
    false,
    iterable.getId(),
    1,
    userId,
    wordId
  );
  saveNew(userId, wordId, card);
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
      cardBuilder(
        e.id,
        e.contextTitle,
        e.text,
        e.helpText,
        e.isArchived,
        e.textId,
        e.version,
        e.userId,
        e.word,
      )
    );
  });
  response.data.content = mappedContent;
  return response.data;
};

export const saveNew = (userId: number, wordId: number, card: CardType) => {
  let path = `/api/cards?userId=${userId}&wordId=${wordId}`;
  abstractPost(path, card);
};
