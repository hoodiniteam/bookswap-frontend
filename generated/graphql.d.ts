import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
};

export type AddBookInput = {
  authors: Array<Scalars['String']>;
  condition: BooksCondition;
  description: Scalars['String'];
  editionId?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  isbn_10?: InputMaybe<Scalars['String']>;
  isbn_13?: InputMaybe<Scalars['String']>;
  publishedDate?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  userDescription?: InputMaybe<Scalars['String']>;
};

export type AddEditionInput = {
  description: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type Avatar = {
  __typename?: 'Avatar';
  accessoriesType?: Maybe<Scalars['String']>;
  clotheColor?: Maybe<Scalars['String']>;
  clotheType?: Maybe<Scalars['String']>;
  eyeType?: Maybe<Scalars['String']>;
  eyebrowType?: Maybe<Scalars['String']>;
  facialHairColor?: Maybe<Scalars['String']>;
  facialHairType?: Maybe<Scalars['String']>;
  hairColor?: Maybe<Scalars['String']>;
  hatColor?: Maybe<Scalars['String']>;
  mouthType?: Maybe<Scalars['String']>;
  skinColor?: Maybe<Scalars['String']>;
  topType?: Maybe<Scalars['String']>;
};

export type Book = {
  __typename?: 'Book';
  condition: BooksCondition;
  createdAt: Scalars['String'];
  creator: User;
  description?: Maybe<Scalars['String']>;
  edition: BookEdition;
  holder: User;
  id: Scalars['String'];
  status: BooksStatus;
  swaps: Array<Swap>;
  title: Scalars['String'];
  trade?: Maybe<Trade>;
  updatedAt: Scalars['String'];
};

export type BookEdition = {
  __typename?: 'BookEdition';
  authors?: Maybe<Array<Scalars['String']>>;
  books: Array<Book>;
  booksCount: Scalars['Float'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  expects?: Maybe<Array<User>>;
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  isbn_10?: Maybe<Scalars['String']>;
  isbn_13?: Maybe<Scalars['String']>;
  publishedDate?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  views: Scalars['Float'];
  virtual: Scalars['Boolean'];
};

export type BookResponse = {
  __typename?: 'BookResponse';
  book?: Maybe<Book>;
  errors?: Maybe<Array<FieldError>>;
  status: ResponseStatus;
};

/** The current state of the book condition */
export enum BooksCondition {
  Bad = 'BAD',
  Brandnew = 'BRANDNEW',
  Good = 'GOOD',
  Likenew = 'LIKENEW',
  Satisfactory = 'SATISFACTORY',
  Terrible = 'TERRIBLE'
}

export type BooksResponse = {
  __typename?: 'BooksResponse';
  books?: Maybe<Array<Book>>;
  count: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  status: ResponseStatus;
};

/** Current book availability status */
export enum BooksStatus {
  Absent = 'ABSENT',
  Extracted = 'EXTRACTED',
  Hold = 'HOLD',
  Open = 'OPEN',
  Swapping = 'SWAPPING'
}

export type Credentials = {
  __typename?: 'Credentials';
  refreshToken: Scalars['String'];
  token: Scalars['String'];
};

export type EditionResponse = {
  __typename?: 'EditionResponse';
  edition?: Maybe<BookEdition>;
  errors?: Maybe<Array<FieldError>>;
  status: ResponseStatus;
};

export type EditionsResponse = {
  __typename?: 'EditionsResponse';
  count?: Maybe<Scalars['Float']>;
  editions?: Maybe<Array<BookEdition>>;
  errors?: Maybe<Array<FieldError>>;
  status: ResponseStatus;
};

export type EmailPasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

/** Gender of the user */
export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER'
}

export type LoginResponse = {
  __typename?: 'LoginResponse';
  credentials?: Maybe<Credentials>;
  errors?: Maybe<Array<FieldError>>;
  status: ResponseStatus;
  user?: Maybe<User>;
};

export type Message = {
  __typename?: 'Message';
  createdAt: Scalars['String'];
  isRead: Scalars['Boolean'];
  message: Scalars['String'];
  userId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  abortSwap: SwapDoneResponse;
  addBookToMyWaitingList?: Maybe<EditionResponse>;
  clearNotifications: UserResponse;
  createBook: BookResponse;
  createEmptyEdition: EditionResponse;
  createMySwap: SwapResponse;
  createRoom: RoomResponse;
  login: LoginResponse;
  refreshToken?: Maybe<Credentials>;
  registerUser: LoginResponse;
  removeBookFromMyWaitingList?: Maybe<EditionResponse>;
  sendMessage: RoomResponse;
  setBookHold: BookResponse;
  setBookOpen: BookResponse;
  setToDelivered: SwapResponse;
  setToDelivering: SwapResponse;
  setToSwapped: SwapDoneResponse;
  updateBook?: Maybe<BookResponse>;
  updateMe: UserResponse;
};


export type MutationAbortSwapArgs = {
  swapId: Scalars['String'];
};


export type MutationAddBookToMyWaitingListArgs = {
  id: Scalars['String'];
};


export type MutationCreateBookArgs = {
  options: AddBookInput;
};


export type MutationCreateEmptyEditionArgs = {
  options: AddEditionInput;
};


export type MutationCreateMySwapArgs = {
  editionId: Scalars['String'];
};


export type MutationCreateRoomArgs = {
  bookId: Scalars['String'];
};


export type MutationLoginArgs = {
  options: EmailPasswordInput;
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationRegisterUserArgs = {
  options: EmailPasswordInput;
};


export type MutationRemoveBookFromMyWaitingListArgs = {
  id: Scalars['String'];
};


export type MutationSendMessageArgs = {
  id: Scalars['String'];
  message: Scalars['String'];
};


export type MutationSetBookHoldArgs = {
  id: Scalars['String'];
};


export type MutationSetBookOpenArgs = {
  id: Scalars['String'];
};


export type MutationSetToDeliveredArgs = {
  swapId: Scalars['String'];
};


export type MutationSetToDeliveringArgs = {
  swapId: Scalars['String'];
};


export type MutationSetToSwappedArgs = {
  swapId: Scalars['String'];
};


export type MutationUpdateBookArgs = {
  options: UpdateBookInput;
};


export type MutationUpdateMeArgs = {
  options: UserDataInput;
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['String'];
  isRead: Scalars['Boolean'];
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getBook?: Maybe<BookResponse>;
  getBooks?: Maybe<BooksResponse>;
  getBooksStatic?: Maybe<Array<Scalars['String']>>;
  getEdition?: Maybe<EditionResponse>;
  getEditions?: Maybe<EditionsResponse>;
  getEditionsStatic?: Maybe<Array<Scalars['String']>>;
  getRoom: RoomResponse;
  getUser?: Maybe<User>;
  getUsers?: Maybe<Array<User>>;
  me?: Maybe<UserResponse>;
};


export type QueryGetBookArgs = {
  id: Scalars['String'];
};


export type QueryGetBooksArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<BooksStatus>;
};


export type QueryGetEditionArgs = {
  id: Scalars['String'];
};


export type QueryGetEditionsArgs = {
  hasBooks?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
  popular?: InputMaybe<Scalars['Boolean']>;
  recent?: InputMaybe<Scalars['Boolean']>;
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Array<BooksStatus>>;
};


export type QueryGetRoomArgs = {
  id: Scalars['String'];
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};

/** Mark response status as Success or Error */
export enum ResponseStatus {
  Error = 'ERROR',
  Success = 'SUCCESS'
}

export type Room = {
  __typename?: 'Room';
  book: Book;
  createdAt: Scalars['String'];
  id: Scalars['String'];
  messages: Array<Message>;
  recipient: User;
  sender: User;
  swaps?: Maybe<Array<Swap>>;
  updatedAt: Scalars['String'];
};

export type RoomResponse = {
  __typename?: 'RoomResponse';
  errors?: Maybe<Array<FieldError>>;
  room: Room;
  status: ResponseStatus;
};

export type Swap = {
  __typename?: 'Swap';
  book: Book;
  createdAt: Scalars['String'];
  id: Scalars['String'];
  recipient?: Maybe<User>;
  room?: Maybe<Room>;
  sender?: Maybe<User>;
  status: SwapStatus;
  updatedAt: Scalars['String'];
};

export type SwapDoneResponse = {
  __typename?: 'SwapDoneResponse';
  book?: Maybe<Book>;
  errors?: Maybe<Array<FieldError>>;
  status: ResponseStatus;
  swap?: Maybe<Swap>;
};

export type SwapResponse = {
  __typename?: 'SwapResponse';
  errors?: Maybe<Array<FieldError>>;
  status: ResponseStatus;
  swap?: Maybe<Swap>;
};

/** Status of the swap process */
export enum SwapStatus {
  Arrived = 'ARRIVED',
  Canceled = 'CANCELED',
  Created = 'CREATED',
  Delivered = 'DELIVERED',
  Delivering = 'DELIVERING',
  Payment = 'PAYMENT',
  Swapped = 'SWAPPED'
}

export type Trade = {
  __typename?: 'Trade';
  book: Book;
  createdAt: Scalars['String'];
  endingDate: Scalars['DateTime'];
  id: Scalars['String'];
  status: TradeStatus;
  trader: User;
  updatedAt: Scalars['String'];
};

export enum TradeStatus {
  Assepted = 'ASSEPTED',
  Canceled = 'CANCELED',
  Created = 'CREATED',
  Lastnotification = 'LASTNOTIFICATION',
  Notified = 'NOTIFIED',
  Rejected = 'REJECTED'
}

export type UpdateBookInput = {
  condition?: InputMaybe<BooksCondition>;
  description?: InputMaybe<Scalars['String']>;
  editionId: Scalars['String'];
  id: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
  userDescription?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  apartment?: Maybe<Scalars['String']>;
  avatar?: Maybe<Avatar>;
  bDay?: Maybe<Scalars['DateTime']>;
  books?: Maybe<Array<Book>>;
  chatRecipient: Array<Room>;
  chatSender: Array<Room>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  id: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  notifications: Array<Notification>;
  phone?: Maybe<Scalars['String']>;
  points: Scalars['Float'];
  region?: Maybe<Scalars['String']>;
  sends: Array<Swap>;
  street?: Maybe<Scalars['String']>;
  swaps: Array<Swap>;
  trades: Array<Trade>;
  updatedAt: Scalars['String'];
  waiting?: Maybe<Array<BookEdition>>;
  zipcode?: Maybe<Scalars['Float']>;
};

export type UserDataInput = {
  apartment?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['JSONObject']>;
  bDay?: InputMaybe<Scalars['DateTime']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  lastName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  region?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
  zipcode?: InputMaybe<Scalars['Float']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  status: ResponseStatus;
  user?: Maybe<User>;
};

export type CreateRoomMutationMutationVariables = Exact<{
  bookId: Scalars['String'];
}>;


export type CreateRoomMutationMutation = { __typename?: 'Mutation', createRoom: { __typename?: 'RoomResponse', status: ResponseStatus, errors?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, room: { __typename?: 'Room', id: string, book: { __typename?: 'Book', id: string, description?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, email: string }, edition: { __typename?: 'BookEdition', id: string, image?: string | null, title: string, authors?: Array<string> | null, description: string, isbn_10?: string | null, isbn_13?: string | null } }, recipient: { __typename?: 'User', id: string, email: string }, sender: { __typename?: 'User', id: string, email: string }, swaps?: Array<{ __typename?: 'Swap', id: string, book: { __typename?: 'Book', id: string, description?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, email: string }, edition: { __typename?: 'BookEdition', id: string, image?: string | null, title: string, authors?: Array<string> | null, description: string, isbn_10?: string | null, isbn_13?: string | null } } }> | null, messages: Array<{ __typename?: 'Message', createdAt: string, message: string, userId: string, isRead: boolean }> } } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, points: number, notifications: Array<{ __typename?: 'Notification', isRead: boolean, message: string, createdAt: string }>, waiting?: Array<{ __typename?: 'BookEdition', id: string, title: string, description: string, image?: string | null, booksCount: number, publishedDate?: string | null, authors?: Array<string> | null, virtual: boolean, isbn_13?: string | null, isbn_10?: string | null }> | null, avatar?: { __typename?: 'Avatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null, sends: Array<{ __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, email: string }, edition: { __typename?: 'BookEdition', id: string, image?: string | null, title: string, authors?: Array<string> | null, description: string, isbn_10?: string | null, isbn_13?: string | null } }, recipient?: { __typename?: 'User', id: string, email: string } | null, sender?: { __typename?: 'User', id: string, email: string } | null, room?: { __typename?: 'Room', id: string, book: { __typename?: 'Book', id: string, description?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, email: string }, edition: { __typename?: 'BookEdition', id: string, image?: string | null, title: string, authors?: Array<string> | null, description: string, isbn_10?: string | null, isbn_13?: string | null } }, recipient: { __typename?: 'User', id: string, email: string }, sender: { __typename?: 'User', id: string, email: string }, swaps?: Array<{ __typename?: 'Swap', id: string, book: { __typename?: 'Book', id: string, description?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, email: string }, edition: { __typename?: 'BookEdition', id: string, image?: string | null, title: string, authors?: Array<string> | null, description: string, isbn_10?: string | null, isbn_13?: string | null } } }> | null, messages: Array<{ __typename?: 'Message', createdAt: string, message: string, userId: string, isRead: boolean }> } | null }>, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, email: string }, edition: { __typename?: 'BookEdition', id: string, image?: string | null, title: string, authors?: Array<string> | null, description: string, isbn_10?: string | null, isbn_13?: string | null } }, recipient?: { __typename?: 'User', id: string, email: string } | null, sender?: { __typename?: 'User', id: string, email: string } | null, room?: { __typename?: 'Room', id: string, book: { __typename?: 'Book', id: string, description?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, email: string }, edition: { __typename?: 'BookEdition', id: string, image?: string | null, title: string, authors?: Array<string> | null, description: string, isbn_10?: string | null, isbn_13?: string | null } }, recipient: { __typename?: 'User', id: string, email: string }, sender: { __typename?: 'User', id: string, email: string }, swaps?: Array<{ __typename?: 'Swap', id: string, book: { __typename?: 'Book', id: string, description?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, email: string }, edition: { __typename?: 'BookEdition', id: string, image?: string | null, title: string, authors?: Array<string> | null, description: string, isbn_10?: string | null, isbn_13?: string | null } } }> | null, messages: Array<{ __typename?: 'Message', createdAt: string, message: string, userId: string, isRead: boolean }> } | null }>, trades: Array<{ __typename?: 'Trade', status: TradeStatus, endingDate: any, book: { __typename?: 'Book', id: string, edition: { __typename?: 'BookEdition', id: string } } }>, books?: Array<{ __typename?: 'Book', id: string, title: string, description?: string | null, status: BooksStatus, condition: BooksCondition, edition: { __typename?: 'BookEdition', id: string, title: string, description: string, image?: string | null, booksCount: number, publishedDate?: string | null, authors?: Array<string> | null, virtual: boolean, isbn_13?: string | null, isbn_10?: string | null } }> | null, chatSender: Array<{ __typename?: 'Room', id: string, book: { __typename?: 'Book', id: string, title: string }, messages: Array<{ __typename?: 'Message', createdAt: string, message: string, userId: string, isRead: boolean }> }>, chatRecipient: Array<{ __typename?: 'Room', id: string, book: { __typename?: 'Book', id: string, title: string }, messages: Array<{ __typename?: 'Message', createdAt: string, message: string, userId: string, isRead: boolean }> }> } | null } | null };

export type BookFragment = { __typename?: 'Book', id: string, description?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, email: string }, edition: { __typename?: 'BookEdition', id: string, image?: string | null, title: string, authors?: Array<string> | null, description: string, isbn_10?: string | null, isbn_13?: string | null } };

export type EditionFragment = { __typename?: 'BookEdition', id: string, title: string, description: string, image?: string | null, booksCount: number, publishedDate?: string | null, authors?: Array<string> | null, virtual: boolean, isbn_13?: string | null, isbn_10?: string | null };

export type RecipientFragment = { __typename?: 'User', id: string, email: string };

export type RoomFragment = { __typename?: 'Room', id: string, book: { __typename?: 'Book', id: string, description?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, email: string }, edition: { __typename?: 'BookEdition', id: string, image?: string | null, title: string, authors?: Array<string> | null, description: string, isbn_10?: string | null, isbn_13?: string | null } }, recipient: { __typename?: 'User', id: string, email: string }, sender: { __typename?: 'User', id: string, email: string }, swaps?: Array<{ __typename?: 'Swap', id: string, book: { __typename?: 'Book', id: string, description?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, email: string }, edition: { __typename?: 'BookEdition', id: string, image?: string | null, title: string, authors?: Array<string> | null, description: string, isbn_10?: string | null, isbn_13?: string | null } } }> | null, messages: Array<{ __typename?: 'Message', createdAt: string, message: string, userId: string, isRead: boolean }> };

export type SenderFragment = { __typename?: 'User', id: string, email: string };

export type SwapFragment = { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, email: string }, edition: { __typename?: 'BookEdition', id: string, image?: string | null, title: string, authors?: Array<string> | null, description: string, isbn_10?: string | null, isbn_13?: string | null } }, recipient?: { __typename?: 'User', id: string, email: string } | null, sender?: { __typename?: 'User', id: string, email: string } | null, room?: { __typename?: 'Room', id: string, book: { __typename?: 'Book', id: string, description?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, email: string }, edition: { __typename?: 'BookEdition', id: string, image?: string | null, title: string, authors?: Array<string> | null, description: string, isbn_10?: string | null, isbn_13?: string | null } }, recipient: { __typename?: 'User', id: string, email: string }, sender: { __typename?: 'User', id: string, email: string }, swaps?: Array<{ __typename?: 'Swap', id: string, book: { __typename?: 'Book', id: string, description?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, email: string }, edition: { __typename?: 'BookEdition', id: string, image?: string | null, title: string, authors?: Array<string> | null, description: string, isbn_10?: string | null, isbn_13?: string | null } } }> | null, messages: Array<{ __typename?: 'Message', createdAt: string, message: string, userId: string, isRead: boolean }> } | null };

export type UserFragment = { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, points: number, notifications: Array<{ __typename?: 'Notification', isRead: boolean, message: string, createdAt: string }>, waiting?: Array<{ __typename?: 'BookEdition', id: string, title: string, description: string, image?: string | null, booksCount: number, publishedDate?: string | null, authors?: Array<string> | null, virtual: boolean, isbn_13?: string | null, isbn_10?: string | null }> | null, avatar?: { __typename?: 'Avatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null, sends: Array<{ __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, email: string }, edition: { __typename?: 'BookEdition', id: string, image?: string | null, title: string, authors?: Array<string> | null, description: string, isbn_10?: string | null, isbn_13?: string | null } }, recipient?: { __typename?: 'User', id: string, email: string } | null, sender?: { __typename?: 'User', id: string, email: string } | null, room?: { __typename?: 'Room', id: string, book: { __typename?: 'Book', id: string, description?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, email: string }, edition: { __typename?: 'BookEdition', id: string, image?: string | null, title: string, authors?: Array<string> | null, description: string, isbn_10?: string | null, isbn_13?: string | null } }, recipient: { __typename?: 'User', id: string, email: string }, sender: { __typename?: 'User', id: string, email: string }, swaps?: Array<{ __typename?: 'Swap', id: string, book: { __typename?: 'Book', id: string, description?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, email: string }, edition: { __typename?: 'BookEdition', id: string, image?: string | null, title: string, authors?: Array<string> | null, description: string, isbn_10?: string | null, isbn_13?: string | null } } }> | null, messages: Array<{ __typename?: 'Message', createdAt: string, message: string, userId: string, isRead: boolean }> } | null }>, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, email: string }, edition: { __typename?: 'BookEdition', id: string, image?: string | null, title: string, authors?: Array<string> | null, description: string, isbn_10?: string | null, isbn_13?: string | null } }, recipient?: { __typename?: 'User', id: string, email: string } | null, sender?: { __typename?: 'User', id: string, email: string } | null, room?: { __typename?: 'Room', id: string, book: { __typename?: 'Book', id: string, description?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, email: string }, edition: { __typename?: 'BookEdition', id: string, image?: string | null, title: string, authors?: Array<string> | null, description: string, isbn_10?: string | null, isbn_13?: string | null } }, recipient: { __typename?: 'User', id: string, email: string }, sender: { __typename?: 'User', id: string, email: string }, swaps?: Array<{ __typename?: 'Swap', id: string, book: { __typename?: 'Book', id: string, description?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, email: string }, edition: { __typename?: 'BookEdition', id: string, image?: string | null, title: string, authors?: Array<string> | null, description: string, isbn_10?: string | null, isbn_13?: string | null } } }> | null, messages: Array<{ __typename?: 'Message', createdAt: string, message: string, userId: string, isRead: boolean }> } | null }>, trades: Array<{ __typename?: 'Trade', status: TradeStatus, endingDate: any, book: { __typename?: 'Book', id: string, edition: { __typename?: 'BookEdition', id: string } } }>, books?: Array<{ __typename?: 'Book', id: string, title: string, description?: string | null, status: BooksStatus, condition: BooksCondition, edition: { __typename?: 'BookEdition', id: string, title: string, description: string, image?: string | null, booksCount: number, publishedDate?: string | null, authors?: Array<string> | null, virtual: boolean, isbn_13?: string | null, isbn_10?: string | null } }> | null, chatSender: Array<{ __typename?: 'Room', id: string, book: { __typename?: 'Book', id: string, title: string }, messages: Array<{ __typename?: 'Message', createdAt: string, message: string, userId: string, isRead: boolean }> }>, chatRecipient: Array<{ __typename?: 'Room', id: string, book: { __typename?: 'Book', id: string, title: string }, messages: Array<{ __typename?: 'Message', createdAt: string, message: string, userId: string, isRead: boolean }> }> };


declare module '*/CreateRoomMutation.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const CreateRoomMutation: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/GetMe.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetMe: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/fragmentBook.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const Book: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/fragmentEdition.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const Edition: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/fragmentRecipient.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const Recipient: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/fragmentRoom.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const Room: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/fragmentSender.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const Sender: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/fragmentSwap.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const Swap: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/fragmentUser.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const User: DocumentNode;

  export default defaultDocument;
}
    
export const Edition = gql`
    fragment Edition on BookEdition {
  id
  title
  description
  image
  booksCount
  publishedDate
  authors
  virtual
  isbn_13
  isbn_10
}
    `;
export const Book = gql`
    fragment Book on Book {
  id
  description
  title
  condition
  status
  swaps {
    id
    status
  }
  creator {
    id
    email
  }
  holder {
    id
    email
  }
  edition {
    id
    image
    title
    authors
    description
    isbn_10
    isbn_13
  }
}
    `;
export const Recipient = gql`
    fragment Recipient on User {
  id
  email
}
    `;
export const Sender = gql`
    fragment Sender on User {
  id
  email
}
    `;
export const Room = gql`
    fragment Room on Room {
  id
  book {
    ...Book
  }
  recipient {
    ...Recipient
  }
  sender {
    ...Sender
  }
  swaps {
    id
    book {
      ...Book
    }
  }
  messages {
    createdAt
    message
    userId
    isRead
  }
}
    ${Book}
${Recipient}
${Sender}`;
export const Swap = gql`
    fragment Swap on Swap {
  id
  book {
    ...Book
  }
  recipient {
    ...Recipient
  }
  sender {
    ...Sender
  }
  room {
    ...Room
  }
  status
}
    ${Book}
${Recipient}
${Sender}
${Room}`;
export const User = gql`
    fragment User on User {
  id
  firstName
  lastName
  email
  notifications {
    isRead
    message
    createdAt
  }
  waiting {
    ...Edition
  }
  avatar {
    topType
    eyeType
    eyebrowType
    mouthType
    facialHairType
    facialHairColor
    hairColor
    hatColor
    skinColor
    clotheColor
    clotheType
    accessoriesType
  }
  points
  sends {
    ...Swap
  }
  swaps {
    ...Swap
  }
  trades {
    book {
      id
      edition {
        id
      }
    }
    status
    endingDate
  }
  books {
    id
    title
    description
    status
    condition
    edition {
      ...Edition
    }
  }
  chatSender {
    id
    book {
      id
      title
    }
    messages {
      createdAt
      message
      userId
      isRead
    }
  }
  chatRecipient {
    id
    book {
      id
      title
    }
    messages {
      createdAt
      message
      userId
      isRead
    }
  }
}
    ${Edition}
${Swap}`;
export const CreateRoomMutation = gql`
    mutation CreateRoomMutation($bookId: String!) {
  createRoom(bookId: $bookId) {
    status
    errors {
      field
      message
    }
    room {
      ...Room
    }
  }
}
    ${Room}`;
export const GetMe = gql`
    query GetMe {
  me {
    user {
      ...User
    }
  }
}
    ${User}`;
import { IntrospectionQuery } from 'graphql';
export default {
  "__schema": {
    "queryType": {
      "name": "Query"
    },
    "mutationType": {
      "name": "Mutation"
    },
    "subscriptionType": null,
    "types": [
      {
        "kind": "OBJECT",
        "name": "Avatar",
        "fields": [
          {
            "name": "accessoriesType",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "clotheColor",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "clotheType",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "eyeType",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "eyebrowType",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "facialHairColor",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "facialHairType",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "hairColor",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "hatColor",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "mouthType",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "skinColor",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "topType",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Book",
        "fields": [
          {
            "name": "condition",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "creator",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "edition",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "BookEdition",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "holder",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "swaps",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Swap",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "title",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "trade",
            "type": {
              "kind": "OBJECT",
              "name": "Trade",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "BookEdition",
        "fields": [
          {
            "name": "authors",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            },
            "args": []
          },
          {
            "name": "books",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Book",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "booksCount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "description",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "expects",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "User",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "image",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "isbn_10",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "isbn_13",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "publishedDate",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "title",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "views",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "virtual",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "BookResponse",
        "fields": [
          {
            "name": "book",
            "type": {
              "kind": "OBJECT",
              "name": "Book",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "errors",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "FieldError",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "BooksResponse",
        "fields": [
          {
            "name": "books",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Book",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "errors",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "FieldError",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Credentials",
        "fields": [
          {
            "name": "refreshToken",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "token",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "EditionResponse",
        "fields": [
          {
            "name": "edition",
            "type": {
              "kind": "OBJECT",
              "name": "BookEdition",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "errors",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "FieldError",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "EditionsResponse",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "editions",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "BookEdition",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "errors",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "FieldError",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "FieldError",
        "fields": [
          {
            "name": "field",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "message",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "LoginResponse",
        "fields": [
          {
            "name": "credentials",
            "type": {
              "kind": "OBJECT",
              "name": "Credentials",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "errors",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "FieldError",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "user",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Message",
        "fields": [
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "isRead",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "message",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "userId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Mutation",
        "fields": [
          {
            "name": "abortSwap",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "SwapDoneResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "swapId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "addBookToMyWaitingList",
            "type": {
              "kind": "OBJECT",
              "name": "EditionResponse",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "clearNotifications",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UserResponse",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "createBook",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "BookResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "options",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "createEmptyEdition",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "EditionResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "options",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "createMySwap",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "SwapResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "editionId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "createRoom",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "RoomResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "bookId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "login",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "LoginResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "options",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "refreshToken",
            "type": {
              "kind": "OBJECT",
              "name": "Credentials",
              "ofType": null
            },
            "args": [
              {
                "name": "refreshToken",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "registerUser",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "LoginResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "options",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "removeBookFromMyWaitingList",
            "type": {
              "kind": "OBJECT",
              "name": "EditionResponse",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "sendMessage",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "RoomResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "message",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "setBookHold",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "BookResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "setBookOpen",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "BookResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "setToDelivered",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "SwapResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "swapId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "setToDelivering",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "SwapResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "swapId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "setToSwapped",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "SwapDoneResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "swapId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "updateBook",
            "type": {
              "kind": "OBJECT",
              "name": "BookResponse",
              "ofType": null
            },
            "args": [
              {
                "name": "options",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "updateMe",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UserResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "options",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Notification",
        "fields": [
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "isRead",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "message",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Query",
        "fields": [
          {
            "name": "getBook",
            "type": {
              "kind": "OBJECT",
              "name": "BookResponse",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "getBooks",
            "type": {
              "kind": "OBJECT",
              "name": "BooksResponse",
              "ofType": null
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "search",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "status",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "getBooksStatic",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            },
            "args": []
          },
          {
            "name": "getEdition",
            "type": {
              "kind": "OBJECT",
              "name": "EditionResponse",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "getEditions",
            "type": {
              "kind": "OBJECT",
              "name": "EditionsResponse",
              "ofType": null
            },
            "args": [
              {
                "name": "hasBooks",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "popular",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "recent",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "search",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "status",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "getEditionsStatic",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            },
            "args": []
          },
          {
            "name": "getRoom",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "RoomResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "getUser",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "getUsers",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "User",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "me",
            "type": {
              "kind": "OBJECT",
              "name": "UserResponse",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Room",
        "fields": [
          {
            "name": "book",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Book",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "messages",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Message",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "recipient",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "sender",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "swaps",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Swap",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "RoomResponse",
        "fields": [
          {
            "name": "errors",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "FieldError",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "room",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Room",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Swap",
        "fields": [
          {
            "name": "book",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Book",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "recipient",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "room",
            "type": {
              "kind": "OBJECT",
              "name": "Room",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "sender",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SwapDoneResponse",
        "fields": [
          {
            "name": "book",
            "type": {
              "kind": "OBJECT",
              "name": "Book",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "errors",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "FieldError",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "swap",
            "type": {
              "kind": "OBJECT",
              "name": "Swap",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SwapResponse",
        "fields": [
          {
            "name": "errors",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "FieldError",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "swap",
            "type": {
              "kind": "OBJECT",
              "name": "Swap",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Trade",
        "fields": [
          {
            "name": "book",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Book",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "endingDate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "trader",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "User",
        "fields": [
          {
            "name": "apartment",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "avatar",
            "type": {
              "kind": "OBJECT",
              "name": "Avatar",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "bDay",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "books",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Book",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "chatRecipient",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Room",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "chatSender",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Room",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "city",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "country",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "email",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "firstName",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "gender",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "lastName",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "notifications",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Notification",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "phone",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "points",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "region",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "sends",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Swap",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "street",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "swaps",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Swap",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "trades",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Trade",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "waiting",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "BookEdition",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "zipcode",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UserResponse",
        "fields": [
          {
            "name": "errors",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "FieldError",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "user",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Any"
      }
    ],
    "directives": []
  }
} as unknown as IntrospectionQuery;