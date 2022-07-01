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
};

export type AffectedRowsOutput = {
  __typename?: 'AffectedRowsOutput';
  count: Scalars['Int'];
};

export type AggregateBook = {
  __typename?: 'AggregateBook';
  _count?: Maybe<BookCountAggregate>;
  _max?: Maybe<BookMaxAggregate>;
  _min?: Maybe<BookMinAggregate>;
};

export type AggregateBookEdition = {
  __typename?: 'AggregateBookEdition';
  _avg?: Maybe<BookEditionAvgAggregate>;
  _count?: Maybe<BookEditionCountAggregate>;
  _max?: Maybe<BookEditionMaxAggregate>;
  _min?: Maybe<BookEditionMinAggregate>;
  _sum?: Maybe<BookEditionSumAggregate>;
};

export type AggregateChat = {
  __typename?: 'AggregateChat';
  _count?: Maybe<ChatCountAggregate>;
  _max?: Maybe<ChatMaxAggregate>;
  _min?: Maybe<ChatMinAggregate>;
};

export type AggregateMessage = {
  __typename?: 'AggregateMessage';
  _count?: Maybe<MessageCountAggregate>;
  _max?: Maybe<MessageMaxAggregate>;
  _min?: Maybe<MessageMinAggregate>;
};

export type AggregateNotification = {
  __typename?: 'AggregateNotification';
  _count?: Maybe<NotificationCountAggregate>;
  _max?: Maybe<NotificationMaxAggregate>;
  _min?: Maybe<NotificationMinAggregate>;
};

export type AggregateSwap = {
  __typename?: 'AggregateSwap';
  _count?: Maybe<SwapCountAggregate>;
  _max?: Maybe<SwapMaxAggregate>;
  _min?: Maybe<SwapMinAggregate>;
};

export type AggregateUser = {
  __typename?: 'AggregateUser';
  _avg?: Maybe<UserAvgAggregate>;
  _count?: Maybe<UserCountAggregate>;
  _max?: Maybe<UserMaxAggregate>;
  _min?: Maybe<UserMinAggregate>;
  _sum?: Maybe<UserSumAggregate>;
};

export type AggregateUserAvatar = {
  __typename?: 'AggregateUserAvatar';
  _count?: Maybe<UserAvatarCountAggregate>;
  _max?: Maybe<UserAvatarMaxAggregate>;
  _min?: Maybe<UserAvatarMinAggregate>;
};

export type AggregateUserWaitsBookEdition = {
  __typename?: 'AggregateUserWaitsBookEdition';
  _count?: Maybe<UserWaitsBookEditionCountAggregate>;
  _max?: Maybe<UserWaitsBookEditionMaxAggregate>;
  _min?: Maybe<UserWaitsBookEditionMinAggregate>;
};

export type Book = {
  __typename?: 'Book';
  _count?: Maybe<BookCount>;
  authors: Array<Scalars['String']>;
  chats: Array<Chat>;
  condition: BooksCondition;
  createdAt: Scalars['DateTime'];
  creator: User;
  creatorId: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  edition: BookEdition;
  editionId: Scalars['String'];
  holder: User;
  holderId: Scalars['String'];
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  isbn_10?: Maybe<Scalars['String']>;
  isbn_13?: Maybe<Scalars['String']>;
  publishedDate?: Maybe<Scalars['String']>;
  status: BooksStatus;
  swaps: Array<Swap>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};


export type BookChatsArgs = {
  cursor?: InputMaybe<ChatWhereUniqueInput>;
  distinct?: InputMaybe<Array<ChatScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ChatOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ChatWhereInput>;
};


export type BookSwapsArgs = {
  cursor?: InputMaybe<SwapWhereUniqueInput>;
  distinct?: InputMaybe<Array<SwapScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SwapOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SwapWhereInput>;
};

export type BookCount = {
  __typename?: 'BookCount';
  chats: Scalars['Int'];
  swaps: Scalars['Int'];
};

export type BookCountAggregate = {
  __typename?: 'BookCountAggregate';
  _all: Scalars['Int'];
  authors: Scalars['Int'];
  condition: Scalars['Int'];
  createdAt: Scalars['Int'];
  creatorId: Scalars['Int'];
  description: Scalars['Int'];
  editionId: Scalars['Int'];
  holderId: Scalars['Int'];
  id: Scalars['Int'];
  image: Scalars['Int'];
  isbn_10: Scalars['Int'];
  isbn_13: Scalars['Int'];
  publishedDate: Scalars['Int'];
  status: Scalars['Int'];
  title: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type BookCountOrderByAggregateInput = {
  authors?: InputMaybe<SortOrder>;
  condition?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  creatorId?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  editionId?: InputMaybe<SortOrder>;
  holderId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  image?: InputMaybe<SortOrder>;
  isbn_10?: InputMaybe<SortOrder>;
  isbn_13?: InputMaybe<SortOrder>;
  publishedDate?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type BookCreateInput = {
  authors?: InputMaybe<BookCreateauthorsInput>;
  chats?: InputMaybe<ChatCreateNestedManyWithoutBookInput>;
  condition?: InputMaybe<BooksCondition>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  creator: UserCreateNestedOneWithoutCreatedBooksInput;
  description?: InputMaybe<Scalars['String']>;
  edition: BookEditionCreateNestedOneWithoutBooksInput;
  holder: UserCreateNestedOneWithoutBooksInput;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  isbn_10?: InputMaybe<Scalars['String']>;
  isbn_13?: InputMaybe<Scalars['String']>;
  publishedDate?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<BooksStatus>;
  swaps?: InputMaybe<SwapCreateNestedManyWithoutBookInput>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type BookCreateManyCreatorInput = {
  authors?: InputMaybe<BookCreateauthorsInput>;
  condition?: InputMaybe<BooksCondition>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  editionId: Scalars['String'];
  holderId: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  isbn_10?: InputMaybe<Scalars['String']>;
  isbn_13?: InputMaybe<Scalars['String']>;
  publishedDate?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<BooksStatus>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type BookCreateManyCreatorInputEnvelope = {
  data: Array<BookCreateManyCreatorInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type BookCreateManyEditionInput = {
  authors?: InputMaybe<BookCreateauthorsInput>;
  condition?: InputMaybe<BooksCondition>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  creatorId: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  holderId: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  isbn_10?: InputMaybe<Scalars['String']>;
  isbn_13?: InputMaybe<Scalars['String']>;
  publishedDate?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<BooksStatus>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type BookCreateManyEditionInputEnvelope = {
  data: Array<BookCreateManyEditionInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type BookCreateManyHolderInput = {
  authors?: InputMaybe<BookCreateauthorsInput>;
  condition?: InputMaybe<BooksCondition>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  creatorId: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  editionId: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  isbn_10?: InputMaybe<Scalars['String']>;
  isbn_13?: InputMaybe<Scalars['String']>;
  publishedDate?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<BooksStatus>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type BookCreateManyHolderInputEnvelope = {
  data: Array<BookCreateManyHolderInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type BookCreateManyInput = {
  authors?: InputMaybe<BookCreateauthorsInput>;
  condition?: InputMaybe<BooksCondition>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  creatorId: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  editionId: Scalars['String'];
  holderId: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  isbn_10?: InputMaybe<Scalars['String']>;
  isbn_13?: InputMaybe<Scalars['String']>;
  publishedDate?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<BooksStatus>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type BookCreateNestedManyWithoutCreatorInput = {
  connect?: InputMaybe<Array<BookWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BookCreateOrConnectWithoutCreatorInput>>;
  create?: InputMaybe<Array<BookCreateWithoutCreatorInput>>;
  createMany?: InputMaybe<BookCreateManyCreatorInputEnvelope>;
};

export type BookCreateNestedManyWithoutEditionInput = {
  connect?: InputMaybe<Array<BookWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BookCreateOrConnectWithoutEditionInput>>;
  create?: InputMaybe<Array<BookCreateWithoutEditionInput>>;
  createMany?: InputMaybe<BookCreateManyEditionInputEnvelope>;
};

export type BookCreateNestedManyWithoutHolderInput = {
  connect?: InputMaybe<Array<BookWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BookCreateOrConnectWithoutHolderInput>>;
  create?: InputMaybe<Array<BookCreateWithoutHolderInput>>;
  createMany?: InputMaybe<BookCreateManyHolderInputEnvelope>;
};

export type BookCreateNestedOneWithoutChatsInput = {
  connect?: InputMaybe<BookWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BookCreateOrConnectWithoutChatsInput>;
  create?: InputMaybe<BookCreateWithoutChatsInput>;
};

export type BookCreateNestedOneWithoutSwapsInput = {
  connect?: InputMaybe<BookWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BookCreateOrConnectWithoutSwapsInput>;
  create?: InputMaybe<BookCreateWithoutSwapsInput>;
};

export type BookCreateOrConnectWithoutChatsInput = {
  create: BookCreateWithoutChatsInput;
  where: BookWhereUniqueInput;
};

export type BookCreateOrConnectWithoutCreatorInput = {
  create: BookCreateWithoutCreatorInput;
  where: BookWhereUniqueInput;
};

export type BookCreateOrConnectWithoutEditionInput = {
  create: BookCreateWithoutEditionInput;
  where: BookWhereUniqueInput;
};

export type BookCreateOrConnectWithoutHolderInput = {
  create: BookCreateWithoutHolderInput;
  where: BookWhereUniqueInput;
};

export type BookCreateOrConnectWithoutSwapsInput = {
  create: BookCreateWithoutSwapsInput;
  where: BookWhereUniqueInput;
};

export type BookCreateWithoutChatsInput = {
  authors?: InputMaybe<BookCreateauthorsInput>;
  condition?: InputMaybe<BooksCondition>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  creator: UserCreateNestedOneWithoutCreatedBooksInput;
  description?: InputMaybe<Scalars['String']>;
  edition: BookEditionCreateNestedOneWithoutBooksInput;
  holder: UserCreateNestedOneWithoutBooksInput;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  isbn_10?: InputMaybe<Scalars['String']>;
  isbn_13?: InputMaybe<Scalars['String']>;
  publishedDate?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<BooksStatus>;
  swaps?: InputMaybe<SwapCreateNestedManyWithoutBookInput>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type BookCreateWithoutCreatorInput = {
  authors?: InputMaybe<BookCreateauthorsInput>;
  chats?: InputMaybe<ChatCreateNestedManyWithoutBookInput>;
  condition?: InputMaybe<BooksCondition>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  edition: BookEditionCreateNestedOneWithoutBooksInput;
  holder: UserCreateNestedOneWithoutBooksInput;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  isbn_10?: InputMaybe<Scalars['String']>;
  isbn_13?: InputMaybe<Scalars['String']>;
  publishedDate?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<BooksStatus>;
  swaps?: InputMaybe<SwapCreateNestedManyWithoutBookInput>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type BookCreateWithoutEditionInput = {
  authors?: InputMaybe<BookCreateauthorsInput>;
  chats?: InputMaybe<ChatCreateNestedManyWithoutBookInput>;
  condition?: InputMaybe<BooksCondition>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  creator: UserCreateNestedOneWithoutCreatedBooksInput;
  description?: InputMaybe<Scalars['String']>;
  holder: UserCreateNestedOneWithoutBooksInput;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  isbn_10?: InputMaybe<Scalars['String']>;
  isbn_13?: InputMaybe<Scalars['String']>;
  publishedDate?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<BooksStatus>;
  swaps?: InputMaybe<SwapCreateNestedManyWithoutBookInput>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type BookCreateWithoutHolderInput = {
  authors?: InputMaybe<BookCreateauthorsInput>;
  chats?: InputMaybe<ChatCreateNestedManyWithoutBookInput>;
  condition?: InputMaybe<BooksCondition>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  creator: UserCreateNestedOneWithoutCreatedBooksInput;
  description?: InputMaybe<Scalars['String']>;
  edition: BookEditionCreateNestedOneWithoutBooksInput;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  isbn_10?: InputMaybe<Scalars['String']>;
  isbn_13?: InputMaybe<Scalars['String']>;
  publishedDate?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<BooksStatus>;
  swaps?: InputMaybe<SwapCreateNestedManyWithoutBookInput>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type BookCreateWithoutSwapsInput = {
  authors?: InputMaybe<BookCreateauthorsInput>;
  chats?: InputMaybe<ChatCreateNestedManyWithoutBookInput>;
  condition?: InputMaybe<BooksCondition>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  creator: UserCreateNestedOneWithoutCreatedBooksInput;
  description?: InputMaybe<Scalars['String']>;
  edition: BookEditionCreateNestedOneWithoutBooksInput;
  holder: UserCreateNestedOneWithoutBooksInput;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  isbn_10?: InputMaybe<Scalars['String']>;
  isbn_13?: InputMaybe<Scalars['String']>;
  publishedDate?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<BooksStatus>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type BookCreateauthorsInput = {
  set: Array<Scalars['String']>;
};

export type BookEdition = {
  __typename?: 'BookEdition';
  _count?: Maybe<BookEditionCount>;
  authors: Array<Scalars['String']>;
  books: Array<Book>;
  booksCount: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  expects: Array<UserWaitsBookEdition>;
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  isbn_10?: Maybe<Scalars['String']>;
  isbn_13?: Maybe<Scalars['String']>;
  publishedDate?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  views: Scalars['Int'];
  virtual: Scalars['Boolean'];
};


export type BookEditionBooksArgs = {
  cursor?: InputMaybe<BookWhereUniqueInput>;
  distinct?: InputMaybe<Array<BookScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<BookOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BookWhereInput>;
};


export type BookEditionExpectsArgs = {
  cursor?: InputMaybe<UserWaitsBookEditionWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserWaitsBookEditionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserWaitsBookEditionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWaitsBookEditionWhereInput>;
};

export type BookEditionAvgAggregate = {
  __typename?: 'BookEditionAvgAggregate';
  booksCount?: Maybe<Scalars['Float']>;
  views?: Maybe<Scalars['Float']>;
};

export type BookEditionAvgOrderByAggregateInput = {
  booksCount?: InputMaybe<SortOrder>;
  views?: InputMaybe<SortOrder>;
};

export type BookEditionCount = {
  __typename?: 'BookEditionCount';
  books: Scalars['Int'];
  expects: Scalars['Int'];
};

export type BookEditionCountAggregate = {
  __typename?: 'BookEditionCountAggregate';
  _all: Scalars['Int'];
  authors: Scalars['Int'];
  booksCount: Scalars['Int'];
  createdAt: Scalars['Int'];
  description: Scalars['Int'];
  id: Scalars['Int'];
  image: Scalars['Int'];
  isbn_10: Scalars['Int'];
  isbn_13: Scalars['Int'];
  publishedDate: Scalars['Int'];
  title: Scalars['Int'];
  updatedAt: Scalars['Int'];
  views: Scalars['Int'];
  virtual: Scalars['Int'];
};

export type BookEditionCountOrderByAggregateInput = {
  authors?: InputMaybe<SortOrder>;
  booksCount?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  image?: InputMaybe<SortOrder>;
  isbn_10?: InputMaybe<SortOrder>;
  isbn_13?: InputMaybe<SortOrder>;
  publishedDate?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  views?: InputMaybe<SortOrder>;
  virtual?: InputMaybe<SortOrder>;
};

export type BookEditionCreateInput = {
  authors?: InputMaybe<BookEditionCreateauthorsInput>;
  books?: InputMaybe<BookCreateNestedManyWithoutEditionInput>;
  booksCount?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  expects?: InputMaybe<UserWaitsBookEditionCreateNestedManyWithoutEditionInput>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  isbn_10?: InputMaybe<Scalars['String']>;
  isbn_13?: InputMaybe<Scalars['String']>;
  publishedDate?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<Scalars['Int']>;
  virtual?: InputMaybe<Scalars['Boolean']>;
};

export type BookEditionCreateManyInput = {
  authors?: InputMaybe<BookEditionCreateauthorsInput>;
  booksCount?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  isbn_10?: InputMaybe<Scalars['String']>;
  isbn_13?: InputMaybe<Scalars['String']>;
  publishedDate?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<Scalars['Int']>;
  virtual?: InputMaybe<Scalars['Boolean']>;
};

export type BookEditionCreateNestedOneWithoutBooksInput = {
  connect?: InputMaybe<BookEditionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BookEditionCreateOrConnectWithoutBooksInput>;
  create?: InputMaybe<BookEditionCreateWithoutBooksInput>;
};

export type BookEditionCreateNestedOneWithoutExpectsInput = {
  connect?: InputMaybe<BookEditionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BookEditionCreateOrConnectWithoutExpectsInput>;
  create?: InputMaybe<BookEditionCreateWithoutExpectsInput>;
};

export type BookEditionCreateOrConnectWithoutBooksInput = {
  create: BookEditionCreateWithoutBooksInput;
  where: BookEditionWhereUniqueInput;
};

export type BookEditionCreateOrConnectWithoutExpectsInput = {
  create: BookEditionCreateWithoutExpectsInput;
  where: BookEditionWhereUniqueInput;
};

export type BookEditionCreateWithoutBooksInput = {
  authors?: InputMaybe<BookEditionCreateauthorsInput>;
  booksCount?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  expects?: InputMaybe<UserWaitsBookEditionCreateNestedManyWithoutEditionInput>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  isbn_10?: InputMaybe<Scalars['String']>;
  isbn_13?: InputMaybe<Scalars['String']>;
  publishedDate?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<Scalars['Int']>;
  virtual?: InputMaybe<Scalars['Boolean']>;
};

export type BookEditionCreateWithoutExpectsInput = {
  authors?: InputMaybe<BookEditionCreateauthorsInput>;
  books?: InputMaybe<BookCreateNestedManyWithoutEditionInput>;
  booksCount?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  isbn_10?: InputMaybe<Scalars['String']>;
  isbn_13?: InputMaybe<Scalars['String']>;
  publishedDate?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<Scalars['Int']>;
  virtual?: InputMaybe<Scalars['Boolean']>;
};

export type BookEditionCreateauthorsInput = {
  set: Array<Scalars['String']>;
};

export type BookEditionGroupBy = {
  __typename?: 'BookEditionGroupBy';
  _avg?: Maybe<BookEditionAvgAggregate>;
  _count?: Maybe<BookEditionCountAggregate>;
  _max?: Maybe<BookEditionMaxAggregate>;
  _min?: Maybe<BookEditionMinAggregate>;
  _sum?: Maybe<BookEditionSumAggregate>;
  authors?: Maybe<Array<Scalars['String']>>;
  booksCount: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  isbn_10?: Maybe<Scalars['String']>;
  isbn_13?: Maybe<Scalars['String']>;
  publishedDate?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  views: Scalars['Int'];
  virtual: Scalars['Boolean'];
};

export type BookEditionMaxAggregate = {
  __typename?: 'BookEditionMaxAggregate';
  booksCount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  isbn_10?: Maybe<Scalars['String']>;
  isbn_13?: Maybe<Scalars['String']>;
  publishedDate?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  views?: Maybe<Scalars['Int']>;
  virtual?: Maybe<Scalars['Boolean']>;
};

export type BookEditionMaxOrderByAggregateInput = {
  booksCount?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  image?: InputMaybe<SortOrder>;
  isbn_10?: InputMaybe<SortOrder>;
  isbn_13?: InputMaybe<SortOrder>;
  publishedDate?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  views?: InputMaybe<SortOrder>;
  virtual?: InputMaybe<SortOrder>;
};

export type BookEditionMinAggregate = {
  __typename?: 'BookEditionMinAggregate';
  booksCount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  isbn_10?: Maybe<Scalars['String']>;
  isbn_13?: Maybe<Scalars['String']>;
  publishedDate?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  views?: Maybe<Scalars['Int']>;
  virtual?: Maybe<Scalars['Boolean']>;
};

export type BookEditionMinOrderByAggregateInput = {
  booksCount?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  image?: InputMaybe<SortOrder>;
  isbn_10?: InputMaybe<SortOrder>;
  isbn_13?: InputMaybe<SortOrder>;
  publishedDate?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  views?: InputMaybe<SortOrder>;
  virtual?: InputMaybe<SortOrder>;
};

export type BookEditionOrderByWithAggregationInput = {
  _avg?: InputMaybe<BookEditionAvgOrderByAggregateInput>;
  _count?: InputMaybe<BookEditionCountOrderByAggregateInput>;
  _max?: InputMaybe<BookEditionMaxOrderByAggregateInput>;
  _min?: InputMaybe<BookEditionMinOrderByAggregateInput>;
  _sum?: InputMaybe<BookEditionSumOrderByAggregateInput>;
  authors?: InputMaybe<SortOrder>;
  booksCount?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  image?: InputMaybe<SortOrder>;
  isbn_10?: InputMaybe<SortOrder>;
  isbn_13?: InputMaybe<SortOrder>;
  publishedDate?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  views?: InputMaybe<SortOrder>;
  virtual?: InputMaybe<SortOrder>;
};

export type BookEditionOrderByWithRelationInput = {
  authors?: InputMaybe<SortOrder>;
  books?: InputMaybe<BookOrderByRelationAggregateInput>;
  booksCount?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  expects?: InputMaybe<UserWaitsBookEditionOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  image?: InputMaybe<SortOrder>;
  isbn_10?: InputMaybe<SortOrder>;
  isbn_13?: InputMaybe<SortOrder>;
  publishedDate?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  views?: InputMaybe<SortOrder>;
  virtual?: InputMaybe<SortOrder>;
};

export type BookEditionRelationFilter = {
  is?: InputMaybe<BookEditionWhereInput>;
  isNot?: InputMaybe<BookEditionWhereInput>;
};

export enum BookEditionScalarFieldEnum {
  Authors = 'authors',
  BooksCount = 'booksCount',
  CreatedAt = 'createdAt',
  Description = 'description',
  Id = 'id',
  Image = 'image',
  Isbn_10 = 'isbn_10',
  Isbn_13 = 'isbn_13',
  PublishedDate = 'publishedDate',
  Title = 'title',
  UpdatedAt = 'updatedAt',
  Views = 'views',
  Virtual = 'virtual'
}

export type BookEditionScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<BookEditionScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<BookEditionScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<BookEditionScalarWhereWithAggregatesInput>>;
  authors?: InputMaybe<StringNullableListFilter>;
  booksCount?: InputMaybe<IntWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  description?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  image?: InputMaybe<StringNullableWithAggregatesFilter>;
  isbn_10?: InputMaybe<StringNullableWithAggregatesFilter>;
  isbn_13?: InputMaybe<StringNullableWithAggregatesFilter>;
  publishedDate?: InputMaybe<StringNullableWithAggregatesFilter>;
  title?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  views?: InputMaybe<IntWithAggregatesFilter>;
  virtual?: InputMaybe<BoolWithAggregatesFilter>;
};

export type BookEditionSumAggregate = {
  __typename?: 'BookEditionSumAggregate';
  booksCount?: Maybe<Scalars['Int']>;
  views?: Maybe<Scalars['Int']>;
};

export type BookEditionSumOrderByAggregateInput = {
  booksCount?: InputMaybe<SortOrder>;
  views?: InputMaybe<SortOrder>;
};

export type BookEditionTypeSense = {
  __typename?: 'BookEditionTypeSense';
  _count?: Maybe<BookEditionCount>;
  authors: Array<Scalars['String']>;
  books: Array<Book>;
  booksCount: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  expects: Array<UserWaitsBookEdition>;
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  isbn_10?: Maybe<Scalars['String']>;
  isbn_13?: Maybe<Scalars['String']>;
  publishedDate?: Maybe<Scalars['String']>;
  relatedEditionId: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  views: Scalars['Int'];
  virtual: Scalars['Boolean'];
};


export type BookEditionTypeSenseBooksArgs = {
  cursor?: InputMaybe<BookWhereUniqueInput>;
  distinct?: InputMaybe<Array<BookScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<BookOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BookWhereInput>;
};


export type BookEditionTypeSenseExpectsArgs = {
  cursor?: InputMaybe<UserWaitsBookEditionWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserWaitsBookEditionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserWaitsBookEditionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWaitsBookEditionWhereInput>;
};

export type BookEditionUpdateInput = {
  authors?: InputMaybe<BookEditionUpdateauthorsInput>;
  books?: InputMaybe<BookUpdateManyWithoutEditionInput>;
  booksCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  expects?: InputMaybe<UserWaitsBookEditionUpdateManyWithoutEditionInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  image?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  isbn_10?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  isbn_13?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  publishedDate?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  views?: InputMaybe<IntFieldUpdateOperationsInput>;
  virtual?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type BookEditionUpdateManyMutationInput = {
  authors?: InputMaybe<BookEditionUpdateauthorsInput>;
  booksCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  image?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  isbn_10?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  isbn_13?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  publishedDate?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  views?: InputMaybe<IntFieldUpdateOperationsInput>;
  virtual?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type BookEditionUpdateOneRequiredWithoutBooksInput = {
  connect?: InputMaybe<BookEditionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BookEditionCreateOrConnectWithoutBooksInput>;
  create?: InputMaybe<BookEditionCreateWithoutBooksInput>;
  update?: InputMaybe<BookEditionUpdateWithoutBooksInput>;
  upsert?: InputMaybe<BookEditionUpsertWithoutBooksInput>;
};

export type BookEditionUpdateOneRequiredWithoutExpectsInput = {
  connect?: InputMaybe<BookEditionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BookEditionCreateOrConnectWithoutExpectsInput>;
  create?: InputMaybe<BookEditionCreateWithoutExpectsInput>;
  update?: InputMaybe<BookEditionUpdateWithoutExpectsInput>;
  upsert?: InputMaybe<BookEditionUpsertWithoutExpectsInput>;
};

export type BookEditionUpdateWithoutBooksInput = {
  authors?: InputMaybe<BookEditionUpdateauthorsInput>;
  booksCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  expects?: InputMaybe<UserWaitsBookEditionUpdateManyWithoutEditionInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  image?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  isbn_10?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  isbn_13?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  publishedDate?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  views?: InputMaybe<IntFieldUpdateOperationsInput>;
  virtual?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type BookEditionUpdateWithoutExpectsInput = {
  authors?: InputMaybe<BookEditionUpdateauthorsInput>;
  books?: InputMaybe<BookUpdateManyWithoutEditionInput>;
  booksCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  image?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  isbn_10?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  isbn_13?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  publishedDate?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  views?: InputMaybe<IntFieldUpdateOperationsInput>;
  virtual?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type BookEditionUpdateauthorsInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type BookEditionUpsertWithoutBooksInput = {
  create: BookEditionCreateWithoutBooksInput;
  update: BookEditionUpdateWithoutBooksInput;
};

export type BookEditionUpsertWithoutExpectsInput = {
  create: BookEditionCreateWithoutExpectsInput;
  update: BookEditionUpdateWithoutExpectsInput;
};

export type BookEditionWhereInput = {
  AND?: InputMaybe<Array<BookEditionWhereInput>>;
  NOT?: InputMaybe<Array<BookEditionWhereInput>>;
  OR?: InputMaybe<Array<BookEditionWhereInput>>;
  authors?: InputMaybe<StringNullableListFilter>;
  books?: InputMaybe<BookListRelationFilter>;
  booksCount?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  expects?: InputMaybe<UserWaitsBookEditionListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  image?: InputMaybe<StringNullableFilter>;
  isbn_10?: InputMaybe<StringNullableFilter>;
  isbn_13?: InputMaybe<StringNullableFilter>;
  publishedDate?: InputMaybe<StringNullableFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  views?: InputMaybe<IntFilter>;
  virtual?: InputMaybe<BoolFilter>;
};

export type BookEditionWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type BookGroupBy = {
  __typename?: 'BookGroupBy';
  _count?: Maybe<BookCountAggregate>;
  _max?: Maybe<BookMaxAggregate>;
  _min?: Maybe<BookMinAggregate>;
  authors?: Maybe<Array<Scalars['String']>>;
  condition: BooksCondition;
  createdAt: Scalars['DateTime'];
  creatorId: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  editionId: Scalars['String'];
  holderId: Scalars['String'];
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  isbn_10?: Maybe<Scalars['String']>;
  isbn_13?: Maybe<Scalars['String']>;
  publishedDate?: Maybe<Scalars['String']>;
  status: BooksStatus;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type BookListRelationFilter = {
  every?: InputMaybe<BookWhereInput>;
  none?: InputMaybe<BookWhereInput>;
  some?: InputMaybe<BookWhereInput>;
};

export type BookMaxAggregate = {
  __typename?: 'BookMaxAggregate';
  condition?: Maybe<BooksCondition>;
  createdAt?: Maybe<Scalars['DateTime']>;
  creatorId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  editionId?: Maybe<Scalars['String']>;
  holderId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  isbn_10?: Maybe<Scalars['String']>;
  isbn_13?: Maybe<Scalars['String']>;
  publishedDate?: Maybe<Scalars['String']>;
  status?: Maybe<BooksStatus>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type BookMaxOrderByAggregateInput = {
  condition?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  creatorId?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  editionId?: InputMaybe<SortOrder>;
  holderId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  image?: InputMaybe<SortOrder>;
  isbn_10?: InputMaybe<SortOrder>;
  isbn_13?: InputMaybe<SortOrder>;
  publishedDate?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type BookMinAggregate = {
  __typename?: 'BookMinAggregate';
  condition?: Maybe<BooksCondition>;
  createdAt?: Maybe<Scalars['DateTime']>;
  creatorId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  editionId?: Maybe<Scalars['String']>;
  holderId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  isbn_10?: Maybe<Scalars['String']>;
  isbn_13?: Maybe<Scalars['String']>;
  publishedDate?: Maybe<Scalars['String']>;
  status?: Maybe<BooksStatus>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type BookMinOrderByAggregateInput = {
  condition?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  creatorId?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  editionId?: InputMaybe<SortOrder>;
  holderId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  image?: InputMaybe<SortOrder>;
  isbn_10?: InputMaybe<SortOrder>;
  isbn_13?: InputMaybe<SortOrder>;
  publishedDate?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type BookOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type BookOrderByWithAggregationInput = {
  _count?: InputMaybe<BookCountOrderByAggregateInput>;
  _max?: InputMaybe<BookMaxOrderByAggregateInput>;
  _min?: InputMaybe<BookMinOrderByAggregateInput>;
  authors?: InputMaybe<SortOrder>;
  condition?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  creatorId?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  editionId?: InputMaybe<SortOrder>;
  holderId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  image?: InputMaybe<SortOrder>;
  isbn_10?: InputMaybe<SortOrder>;
  isbn_13?: InputMaybe<SortOrder>;
  publishedDate?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type BookOrderByWithRelationInput = {
  authors?: InputMaybe<SortOrder>;
  chats?: InputMaybe<ChatOrderByRelationAggregateInput>;
  condition?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  creator?: InputMaybe<UserOrderByWithRelationInput>;
  creatorId?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  edition?: InputMaybe<BookEditionOrderByWithRelationInput>;
  editionId?: InputMaybe<SortOrder>;
  holder?: InputMaybe<UserOrderByWithRelationInput>;
  holderId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  image?: InputMaybe<SortOrder>;
  isbn_10?: InputMaybe<SortOrder>;
  isbn_13?: InputMaybe<SortOrder>;
  publishedDate?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  swaps?: InputMaybe<SwapOrderByRelationAggregateInput>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type BookRelationFilter = {
  is?: InputMaybe<BookWhereInput>;
  isNot?: InputMaybe<BookWhereInput>;
};

export type BookResponse = {
  __typename?: 'BookResponse';
  book?: Maybe<Book>;
  errors?: Maybe<Array<FieldError>>;
  status: ResponseStatus;
};

export enum BookScalarFieldEnum {
  Authors = 'authors',
  Condition = 'condition',
  CreatedAt = 'createdAt',
  CreatorId = 'creatorId',
  Description = 'description',
  EditionId = 'editionId',
  HolderId = 'holderId',
  Id = 'id',
  Image = 'image',
  Isbn_10 = 'isbn_10',
  Isbn_13 = 'isbn_13',
  PublishedDate = 'publishedDate',
  Status = 'status',
  Title = 'title',
  UpdatedAt = 'updatedAt'
}

export type BookScalarWhereInput = {
  AND?: InputMaybe<Array<BookScalarWhereInput>>;
  NOT?: InputMaybe<Array<BookScalarWhereInput>>;
  OR?: InputMaybe<Array<BookScalarWhereInput>>;
  authors?: InputMaybe<StringNullableListFilter>;
  condition?: InputMaybe<EnumBooksConditionFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  creatorId?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringNullableFilter>;
  editionId?: InputMaybe<StringFilter>;
  holderId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  image?: InputMaybe<StringNullableFilter>;
  isbn_10?: InputMaybe<StringNullableFilter>;
  isbn_13?: InputMaybe<StringNullableFilter>;
  publishedDate?: InputMaybe<StringNullableFilter>;
  status?: InputMaybe<EnumBooksStatusFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type BookScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<BookScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<BookScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<BookScalarWhereWithAggregatesInput>>;
  authors?: InputMaybe<StringNullableListFilter>;
  condition?: InputMaybe<EnumBooksConditionWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  creatorId?: InputMaybe<StringWithAggregatesFilter>;
  description?: InputMaybe<StringNullableWithAggregatesFilter>;
  editionId?: InputMaybe<StringWithAggregatesFilter>;
  holderId?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  image?: InputMaybe<StringNullableWithAggregatesFilter>;
  isbn_10?: InputMaybe<StringNullableWithAggregatesFilter>;
  isbn_13?: InputMaybe<StringNullableWithAggregatesFilter>;
  publishedDate?: InputMaybe<StringNullableWithAggregatesFilter>;
  status?: InputMaybe<EnumBooksStatusWithAggregatesFilter>;
  title?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type BookUpdateInput = {
  authors?: InputMaybe<BookUpdateauthorsInput>;
  chats?: InputMaybe<ChatUpdateManyWithoutBookInput>;
  condition?: InputMaybe<EnumBooksConditionFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  creator?: InputMaybe<UserUpdateOneRequiredWithoutCreatedBooksInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  edition?: InputMaybe<BookEditionUpdateOneRequiredWithoutBooksInput>;
  holder?: InputMaybe<UserUpdateOneRequiredWithoutBooksInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  image?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  isbn_10?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  isbn_13?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  publishedDate?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  status?: InputMaybe<EnumBooksStatusFieldUpdateOperationsInput>;
  swaps?: InputMaybe<SwapUpdateManyWithoutBookInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BookUpdateManyMutationInput = {
  authors?: InputMaybe<BookUpdateauthorsInput>;
  condition?: InputMaybe<EnumBooksConditionFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  image?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  isbn_10?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  isbn_13?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  publishedDate?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  status?: InputMaybe<EnumBooksStatusFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BookUpdateManyWithWhereWithoutCreatorInput = {
  data: BookUpdateManyMutationInput;
  where: BookScalarWhereInput;
};

export type BookUpdateManyWithWhereWithoutEditionInput = {
  data: BookUpdateManyMutationInput;
  where: BookScalarWhereInput;
};

export type BookUpdateManyWithWhereWithoutHolderInput = {
  data: BookUpdateManyMutationInput;
  where: BookScalarWhereInput;
};

export type BookUpdateManyWithoutCreatorInput = {
  connect?: InputMaybe<Array<BookWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BookCreateOrConnectWithoutCreatorInput>>;
  create?: InputMaybe<Array<BookCreateWithoutCreatorInput>>;
  createMany?: InputMaybe<BookCreateManyCreatorInputEnvelope>;
  delete?: InputMaybe<Array<BookWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<BookScalarWhereInput>>;
  disconnect?: InputMaybe<Array<BookWhereUniqueInput>>;
  set?: InputMaybe<Array<BookWhereUniqueInput>>;
  update?: InputMaybe<Array<BookUpdateWithWhereUniqueWithoutCreatorInput>>;
  updateMany?: InputMaybe<Array<BookUpdateManyWithWhereWithoutCreatorInput>>;
  upsert?: InputMaybe<Array<BookUpsertWithWhereUniqueWithoutCreatorInput>>;
};

export type BookUpdateManyWithoutEditionInput = {
  connect?: InputMaybe<Array<BookWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BookCreateOrConnectWithoutEditionInput>>;
  create?: InputMaybe<Array<BookCreateWithoutEditionInput>>;
  createMany?: InputMaybe<BookCreateManyEditionInputEnvelope>;
  delete?: InputMaybe<Array<BookWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<BookScalarWhereInput>>;
  disconnect?: InputMaybe<Array<BookWhereUniqueInput>>;
  set?: InputMaybe<Array<BookWhereUniqueInput>>;
  update?: InputMaybe<Array<BookUpdateWithWhereUniqueWithoutEditionInput>>;
  updateMany?: InputMaybe<Array<BookUpdateManyWithWhereWithoutEditionInput>>;
  upsert?: InputMaybe<Array<BookUpsertWithWhereUniqueWithoutEditionInput>>;
};

export type BookUpdateManyWithoutHolderInput = {
  connect?: InputMaybe<Array<BookWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BookCreateOrConnectWithoutHolderInput>>;
  create?: InputMaybe<Array<BookCreateWithoutHolderInput>>;
  createMany?: InputMaybe<BookCreateManyHolderInputEnvelope>;
  delete?: InputMaybe<Array<BookWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<BookScalarWhereInput>>;
  disconnect?: InputMaybe<Array<BookWhereUniqueInput>>;
  set?: InputMaybe<Array<BookWhereUniqueInput>>;
  update?: InputMaybe<Array<BookUpdateWithWhereUniqueWithoutHolderInput>>;
  updateMany?: InputMaybe<Array<BookUpdateManyWithWhereWithoutHolderInput>>;
  upsert?: InputMaybe<Array<BookUpsertWithWhereUniqueWithoutHolderInput>>;
};

export type BookUpdateOneRequiredWithoutChatsInput = {
  connect?: InputMaybe<BookWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BookCreateOrConnectWithoutChatsInput>;
  create?: InputMaybe<BookCreateWithoutChatsInput>;
  update?: InputMaybe<BookUpdateWithoutChatsInput>;
  upsert?: InputMaybe<BookUpsertWithoutChatsInput>;
};

export type BookUpdateOneRequiredWithoutSwapsInput = {
  connect?: InputMaybe<BookWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BookCreateOrConnectWithoutSwapsInput>;
  create?: InputMaybe<BookCreateWithoutSwapsInput>;
  update?: InputMaybe<BookUpdateWithoutSwapsInput>;
  upsert?: InputMaybe<BookUpsertWithoutSwapsInput>;
};

export type BookUpdateWithWhereUniqueWithoutCreatorInput = {
  data: BookUpdateWithoutCreatorInput;
  where: BookWhereUniqueInput;
};

export type BookUpdateWithWhereUniqueWithoutEditionInput = {
  data: BookUpdateWithoutEditionInput;
  where: BookWhereUniqueInput;
};

export type BookUpdateWithWhereUniqueWithoutHolderInput = {
  data: BookUpdateWithoutHolderInput;
  where: BookWhereUniqueInput;
};

export type BookUpdateWithoutChatsInput = {
  authors?: InputMaybe<BookUpdateauthorsInput>;
  condition?: InputMaybe<EnumBooksConditionFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  creator?: InputMaybe<UserUpdateOneRequiredWithoutCreatedBooksInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  edition?: InputMaybe<BookEditionUpdateOneRequiredWithoutBooksInput>;
  holder?: InputMaybe<UserUpdateOneRequiredWithoutBooksInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  image?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  isbn_10?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  isbn_13?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  publishedDate?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  status?: InputMaybe<EnumBooksStatusFieldUpdateOperationsInput>;
  swaps?: InputMaybe<SwapUpdateManyWithoutBookInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BookUpdateWithoutCreatorInput = {
  authors?: InputMaybe<BookUpdateauthorsInput>;
  chats?: InputMaybe<ChatUpdateManyWithoutBookInput>;
  condition?: InputMaybe<EnumBooksConditionFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  edition?: InputMaybe<BookEditionUpdateOneRequiredWithoutBooksInput>;
  holder?: InputMaybe<UserUpdateOneRequiredWithoutBooksInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  image?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  isbn_10?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  isbn_13?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  publishedDate?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  status?: InputMaybe<EnumBooksStatusFieldUpdateOperationsInput>;
  swaps?: InputMaybe<SwapUpdateManyWithoutBookInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BookUpdateWithoutEditionInput = {
  authors?: InputMaybe<BookUpdateauthorsInput>;
  chats?: InputMaybe<ChatUpdateManyWithoutBookInput>;
  condition?: InputMaybe<EnumBooksConditionFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  creator?: InputMaybe<UserUpdateOneRequiredWithoutCreatedBooksInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  holder?: InputMaybe<UserUpdateOneRequiredWithoutBooksInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  image?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  isbn_10?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  isbn_13?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  publishedDate?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  status?: InputMaybe<EnumBooksStatusFieldUpdateOperationsInput>;
  swaps?: InputMaybe<SwapUpdateManyWithoutBookInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BookUpdateWithoutHolderInput = {
  authors?: InputMaybe<BookUpdateauthorsInput>;
  chats?: InputMaybe<ChatUpdateManyWithoutBookInput>;
  condition?: InputMaybe<EnumBooksConditionFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  creator?: InputMaybe<UserUpdateOneRequiredWithoutCreatedBooksInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  edition?: InputMaybe<BookEditionUpdateOneRequiredWithoutBooksInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  image?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  isbn_10?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  isbn_13?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  publishedDate?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  status?: InputMaybe<EnumBooksStatusFieldUpdateOperationsInput>;
  swaps?: InputMaybe<SwapUpdateManyWithoutBookInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BookUpdateWithoutSwapsInput = {
  authors?: InputMaybe<BookUpdateauthorsInput>;
  chats?: InputMaybe<ChatUpdateManyWithoutBookInput>;
  condition?: InputMaybe<EnumBooksConditionFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  creator?: InputMaybe<UserUpdateOneRequiredWithoutCreatedBooksInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  edition?: InputMaybe<BookEditionUpdateOneRequiredWithoutBooksInput>;
  holder?: InputMaybe<UserUpdateOneRequiredWithoutBooksInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  image?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  isbn_10?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  isbn_13?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  publishedDate?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  status?: InputMaybe<EnumBooksStatusFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BookUpdateauthorsInput = {
  push?: InputMaybe<Array<Scalars['String']>>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type BookUpsertWithWhereUniqueWithoutCreatorInput = {
  create: BookCreateWithoutCreatorInput;
  update: BookUpdateWithoutCreatorInput;
  where: BookWhereUniqueInput;
};

export type BookUpsertWithWhereUniqueWithoutEditionInput = {
  create: BookCreateWithoutEditionInput;
  update: BookUpdateWithoutEditionInput;
  where: BookWhereUniqueInput;
};

export type BookUpsertWithWhereUniqueWithoutHolderInput = {
  create: BookCreateWithoutHolderInput;
  update: BookUpdateWithoutHolderInput;
  where: BookWhereUniqueInput;
};

export type BookUpsertWithoutChatsInput = {
  create: BookCreateWithoutChatsInput;
  update: BookUpdateWithoutChatsInput;
};

export type BookUpsertWithoutSwapsInput = {
  create: BookCreateWithoutSwapsInput;
  update: BookUpdateWithoutSwapsInput;
};

export type BookWhereInput = {
  AND?: InputMaybe<Array<BookWhereInput>>;
  NOT?: InputMaybe<Array<BookWhereInput>>;
  OR?: InputMaybe<Array<BookWhereInput>>;
  authors?: InputMaybe<StringNullableListFilter>;
  chats?: InputMaybe<ChatListRelationFilter>;
  condition?: InputMaybe<EnumBooksConditionFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  creator?: InputMaybe<UserRelationFilter>;
  creatorId?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringNullableFilter>;
  edition?: InputMaybe<BookEditionRelationFilter>;
  editionId?: InputMaybe<StringFilter>;
  holder?: InputMaybe<UserRelationFilter>;
  holderId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  image?: InputMaybe<StringNullableFilter>;
  isbn_10?: InputMaybe<StringNullableFilter>;
  isbn_13?: InputMaybe<StringNullableFilter>;
  publishedDate?: InputMaybe<StringNullableFilter>;
  status?: InputMaybe<EnumBooksStatusFilter>;
  swaps?: InputMaybe<SwapListRelationFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type BookWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export enum BooksCondition {
  Bad = 'BAD',
  Brandnew = 'BRANDNEW',
  Good = 'GOOD',
  Likenew = 'LIKENEW',
  Satisfactory = 'SATISFACTORY',
  Terrible = 'TERRIBLE'
}

export enum BooksStatus {
  Absent = 'ABSENT',
  Extracted = 'EXTRACTED',
  Hold = 'HOLD',
  Open = 'OPEN',
  Swapping = 'SWAPPING'
}

export type BoolFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Boolean']>;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type BoolWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedBoolFilter>;
  _min?: InputMaybe<NestedBoolFilter>;
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolWithAggregatesFilter>;
};

export type Chat = {
  __typename?: 'Chat';
  _count?: Maybe<ChatCount>;
  book: Book;
  bookId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  messages: Array<Message>;
  recipient: User;
  recipientId: Scalars['String'];
  sender: User;
  senderId: Scalars['String'];
  status: ChatStatus;
  swap?: Maybe<Swap>;
  updatedAt: Scalars['DateTime'];
};


export type ChatMessagesArgs = {
  cursor?: InputMaybe<MessageWhereUniqueInput>;
  distinct?: InputMaybe<Array<MessageScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<MessageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MessageWhereInput>;
};

export type ChatCount = {
  __typename?: 'ChatCount';
  messages: Scalars['Int'];
};

export type ChatCountAggregate = {
  __typename?: 'ChatCountAggregate';
  _all: Scalars['Int'];
  bookId: Scalars['Int'];
  createdAt: Scalars['Int'];
  id: Scalars['Int'];
  recipientId: Scalars['Int'];
  senderId: Scalars['Int'];
  status: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type ChatCountOrderByAggregateInput = {
  bookId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  recipientId?: InputMaybe<SortOrder>;
  senderId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ChatCreateInput = {
  book: BookCreateNestedOneWithoutChatsInput;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutChatInput>;
  recipient: UserCreateNestedOneWithoutChatRecipientInput;
  sender: UserCreateNestedOneWithoutChatSenderInput;
  status?: InputMaybe<ChatStatus>;
  swap?: InputMaybe<SwapCreateNestedOneWithoutChatInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ChatCreateManyBookInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  recipientId: Scalars['String'];
  senderId: Scalars['String'];
  status?: InputMaybe<ChatStatus>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ChatCreateManyBookInputEnvelope = {
  data: Array<ChatCreateManyBookInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ChatCreateManyInput = {
  bookId: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  recipientId: Scalars['String'];
  senderId: Scalars['String'];
  status?: InputMaybe<ChatStatus>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ChatCreateManyRecipientInput = {
  bookId: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  senderId: Scalars['String'];
  status?: InputMaybe<ChatStatus>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ChatCreateManyRecipientInputEnvelope = {
  data: Array<ChatCreateManyRecipientInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ChatCreateManySenderInput = {
  bookId: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  recipientId: Scalars['String'];
  status?: InputMaybe<ChatStatus>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ChatCreateManySenderInputEnvelope = {
  data: Array<ChatCreateManySenderInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ChatCreateNestedManyWithoutBookInput = {
  connect?: InputMaybe<Array<ChatWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ChatCreateOrConnectWithoutBookInput>>;
  create?: InputMaybe<Array<ChatCreateWithoutBookInput>>;
  createMany?: InputMaybe<ChatCreateManyBookInputEnvelope>;
};

export type ChatCreateNestedManyWithoutRecipientInput = {
  connect?: InputMaybe<Array<ChatWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ChatCreateOrConnectWithoutRecipientInput>>;
  create?: InputMaybe<Array<ChatCreateWithoutRecipientInput>>;
  createMany?: InputMaybe<ChatCreateManyRecipientInputEnvelope>;
};

export type ChatCreateNestedManyWithoutSenderInput = {
  connect?: InputMaybe<Array<ChatWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ChatCreateOrConnectWithoutSenderInput>>;
  create?: InputMaybe<Array<ChatCreateWithoutSenderInput>>;
  createMany?: InputMaybe<ChatCreateManySenderInputEnvelope>;
};

export type ChatCreateNestedOneWithoutMessagesInput = {
  connect?: InputMaybe<ChatWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChatCreateOrConnectWithoutMessagesInput>;
  create?: InputMaybe<ChatCreateWithoutMessagesInput>;
};

export type ChatCreateNestedOneWithoutSwapInput = {
  connect?: InputMaybe<ChatWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChatCreateOrConnectWithoutSwapInput>;
  create?: InputMaybe<ChatCreateWithoutSwapInput>;
};

export type ChatCreateOrConnectWithoutBookInput = {
  create: ChatCreateWithoutBookInput;
  where: ChatWhereUniqueInput;
};

export type ChatCreateOrConnectWithoutMessagesInput = {
  create: ChatCreateWithoutMessagesInput;
  where: ChatWhereUniqueInput;
};

export type ChatCreateOrConnectWithoutRecipientInput = {
  create: ChatCreateWithoutRecipientInput;
  where: ChatWhereUniqueInput;
};

export type ChatCreateOrConnectWithoutSenderInput = {
  create: ChatCreateWithoutSenderInput;
  where: ChatWhereUniqueInput;
};

export type ChatCreateOrConnectWithoutSwapInput = {
  create: ChatCreateWithoutSwapInput;
  where: ChatWhereUniqueInput;
};

export type ChatCreateWithoutBookInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutChatInput>;
  recipient: UserCreateNestedOneWithoutChatRecipientInput;
  sender: UserCreateNestedOneWithoutChatSenderInput;
  status?: InputMaybe<ChatStatus>;
  swap?: InputMaybe<SwapCreateNestedOneWithoutChatInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ChatCreateWithoutMessagesInput = {
  book: BookCreateNestedOneWithoutChatsInput;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  recipient: UserCreateNestedOneWithoutChatRecipientInput;
  sender: UserCreateNestedOneWithoutChatSenderInput;
  status?: InputMaybe<ChatStatus>;
  swap?: InputMaybe<SwapCreateNestedOneWithoutChatInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ChatCreateWithoutRecipientInput = {
  book: BookCreateNestedOneWithoutChatsInput;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutChatInput>;
  sender: UserCreateNestedOneWithoutChatSenderInput;
  status?: InputMaybe<ChatStatus>;
  swap?: InputMaybe<SwapCreateNestedOneWithoutChatInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ChatCreateWithoutSenderInput = {
  book: BookCreateNestedOneWithoutChatsInput;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutChatInput>;
  recipient: UserCreateNestedOneWithoutChatRecipientInput;
  status?: InputMaybe<ChatStatus>;
  swap?: InputMaybe<SwapCreateNestedOneWithoutChatInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ChatCreateWithoutSwapInput = {
  book: BookCreateNestedOneWithoutChatsInput;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutChatInput>;
  recipient: UserCreateNestedOneWithoutChatRecipientInput;
  sender: UserCreateNestedOneWithoutChatSenderInput;
  status?: InputMaybe<ChatStatus>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ChatGroupBy = {
  __typename?: 'ChatGroupBy';
  _count?: Maybe<ChatCountAggregate>;
  _max?: Maybe<ChatMaxAggregate>;
  _min?: Maybe<ChatMinAggregate>;
  bookId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  recipientId: Scalars['String'];
  senderId: Scalars['String'];
  status: ChatStatus;
  updatedAt: Scalars['DateTime'];
};

export type ChatListRelationFilter = {
  every?: InputMaybe<ChatWhereInput>;
  none?: InputMaybe<ChatWhereInput>;
  some?: InputMaybe<ChatWhereInput>;
};

export type ChatMaxAggregate = {
  __typename?: 'ChatMaxAggregate';
  bookId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  recipientId?: Maybe<Scalars['String']>;
  senderId?: Maybe<Scalars['String']>;
  status?: Maybe<ChatStatus>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ChatMaxOrderByAggregateInput = {
  bookId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  recipientId?: InputMaybe<SortOrder>;
  senderId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ChatMinAggregate = {
  __typename?: 'ChatMinAggregate';
  bookId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  recipientId?: Maybe<Scalars['String']>;
  senderId?: Maybe<Scalars['String']>;
  status?: Maybe<ChatStatus>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ChatMinOrderByAggregateInput = {
  bookId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  recipientId?: InputMaybe<SortOrder>;
  senderId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ChatOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ChatOrderByWithAggregationInput = {
  _count?: InputMaybe<ChatCountOrderByAggregateInput>;
  _max?: InputMaybe<ChatMaxOrderByAggregateInput>;
  _min?: InputMaybe<ChatMinOrderByAggregateInput>;
  bookId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  recipientId?: InputMaybe<SortOrder>;
  senderId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ChatOrderByWithRelationInput = {
  book?: InputMaybe<BookOrderByWithRelationInput>;
  bookId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  messages?: InputMaybe<MessageOrderByRelationAggregateInput>;
  recipient?: InputMaybe<UserOrderByWithRelationInput>;
  recipientId?: InputMaybe<SortOrder>;
  sender?: InputMaybe<UserOrderByWithRelationInput>;
  senderId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  swap?: InputMaybe<SwapOrderByWithRelationInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ChatRelationFilter = {
  is?: InputMaybe<ChatWhereInput>;
  isNot?: InputMaybe<ChatWhereInput>;
};

export type ChatResponse = {
  __typename?: 'ChatResponse';
  chat: Chat;
  errors?: Maybe<Array<FieldError>>;
  status: ResponseStatus;
};

export enum ChatScalarFieldEnum {
  BookId = 'bookId',
  CreatedAt = 'createdAt',
  Id = 'id',
  RecipientId = 'recipientId',
  SenderId = 'senderId',
  Status = 'status',
  UpdatedAt = 'updatedAt'
}

export type ChatScalarWhereInput = {
  AND?: InputMaybe<Array<ChatScalarWhereInput>>;
  NOT?: InputMaybe<Array<ChatScalarWhereInput>>;
  OR?: InputMaybe<Array<ChatScalarWhereInput>>;
  bookId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  recipientId?: InputMaybe<StringFilter>;
  senderId?: InputMaybe<StringFilter>;
  status?: InputMaybe<EnumChatStatusFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ChatScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<ChatScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<ChatScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<ChatScalarWhereWithAggregatesInput>>;
  bookId?: InputMaybe<StringWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  recipientId?: InputMaybe<StringWithAggregatesFilter>;
  senderId?: InputMaybe<StringWithAggregatesFilter>;
  status?: InputMaybe<EnumChatStatusWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export enum ChatStatus {
  Archived = 'ARCHIVED',
  Created = 'CREATED',
  Swapped = 'SWAPPED'
}

export type ChatUpdateInput = {
  book?: InputMaybe<BookUpdateOneRequiredWithoutChatsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutChatInput>;
  recipient?: InputMaybe<UserUpdateOneRequiredWithoutChatRecipientInput>;
  sender?: InputMaybe<UserUpdateOneRequiredWithoutChatSenderInput>;
  status?: InputMaybe<EnumChatStatusFieldUpdateOperationsInput>;
  swap?: InputMaybe<SwapUpdateOneWithoutChatInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ChatUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  status?: InputMaybe<EnumChatStatusFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ChatUpdateManyWithWhereWithoutBookInput = {
  data: ChatUpdateManyMutationInput;
  where: ChatScalarWhereInput;
};

export type ChatUpdateManyWithWhereWithoutRecipientInput = {
  data: ChatUpdateManyMutationInput;
  where: ChatScalarWhereInput;
};

export type ChatUpdateManyWithWhereWithoutSenderInput = {
  data: ChatUpdateManyMutationInput;
  where: ChatScalarWhereInput;
};

export type ChatUpdateManyWithoutBookInput = {
  connect?: InputMaybe<Array<ChatWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ChatCreateOrConnectWithoutBookInput>>;
  create?: InputMaybe<Array<ChatCreateWithoutBookInput>>;
  createMany?: InputMaybe<ChatCreateManyBookInputEnvelope>;
  delete?: InputMaybe<Array<ChatWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ChatScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ChatWhereUniqueInput>>;
  set?: InputMaybe<Array<ChatWhereUniqueInput>>;
  update?: InputMaybe<Array<ChatUpdateWithWhereUniqueWithoutBookInput>>;
  updateMany?: InputMaybe<Array<ChatUpdateManyWithWhereWithoutBookInput>>;
  upsert?: InputMaybe<Array<ChatUpsertWithWhereUniqueWithoutBookInput>>;
};

export type ChatUpdateManyWithoutRecipientInput = {
  connect?: InputMaybe<Array<ChatWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ChatCreateOrConnectWithoutRecipientInput>>;
  create?: InputMaybe<Array<ChatCreateWithoutRecipientInput>>;
  createMany?: InputMaybe<ChatCreateManyRecipientInputEnvelope>;
  delete?: InputMaybe<Array<ChatWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ChatScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ChatWhereUniqueInput>>;
  set?: InputMaybe<Array<ChatWhereUniqueInput>>;
  update?: InputMaybe<Array<ChatUpdateWithWhereUniqueWithoutRecipientInput>>;
  updateMany?: InputMaybe<Array<ChatUpdateManyWithWhereWithoutRecipientInput>>;
  upsert?: InputMaybe<Array<ChatUpsertWithWhereUniqueWithoutRecipientInput>>;
};

export type ChatUpdateManyWithoutSenderInput = {
  connect?: InputMaybe<Array<ChatWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ChatCreateOrConnectWithoutSenderInput>>;
  create?: InputMaybe<Array<ChatCreateWithoutSenderInput>>;
  createMany?: InputMaybe<ChatCreateManySenderInputEnvelope>;
  delete?: InputMaybe<Array<ChatWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ChatScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ChatWhereUniqueInput>>;
  set?: InputMaybe<Array<ChatWhereUniqueInput>>;
  update?: InputMaybe<Array<ChatUpdateWithWhereUniqueWithoutSenderInput>>;
  updateMany?: InputMaybe<Array<ChatUpdateManyWithWhereWithoutSenderInput>>;
  upsert?: InputMaybe<Array<ChatUpsertWithWhereUniqueWithoutSenderInput>>;
};

export type ChatUpdateOneRequiredWithoutMessagesInput = {
  connect?: InputMaybe<ChatWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChatCreateOrConnectWithoutMessagesInput>;
  create?: InputMaybe<ChatCreateWithoutMessagesInput>;
  update?: InputMaybe<ChatUpdateWithoutMessagesInput>;
  upsert?: InputMaybe<ChatUpsertWithoutMessagesInput>;
};

export type ChatUpdateOneRequiredWithoutSwapInput = {
  connect?: InputMaybe<ChatWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChatCreateOrConnectWithoutSwapInput>;
  create?: InputMaybe<ChatCreateWithoutSwapInput>;
  update?: InputMaybe<ChatUpdateWithoutSwapInput>;
  upsert?: InputMaybe<ChatUpsertWithoutSwapInput>;
};

export type ChatUpdateWithWhereUniqueWithoutBookInput = {
  data: ChatUpdateWithoutBookInput;
  where: ChatWhereUniqueInput;
};

export type ChatUpdateWithWhereUniqueWithoutRecipientInput = {
  data: ChatUpdateWithoutRecipientInput;
  where: ChatWhereUniqueInput;
};

export type ChatUpdateWithWhereUniqueWithoutSenderInput = {
  data: ChatUpdateWithoutSenderInput;
  where: ChatWhereUniqueInput;
};

export type ChatUpdateWithoutBookInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutChatInput>;
  recipient?: InputMaybe<UserUpdateOneRequiredWithoutChatRecipientInput>;
  sender?: InputMaybe<UserUpdateOneRequiredWithoutChatSenderInput>;
  status?: InputMaybe<EnumChatStatusFieldUpdateOperationsInput>;
  swap?: InputMaybe<SwapUpdateOneWithoutChatInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ChatUpdateWithoutMessagesInput = {
  book?: InputMaybe<BookUpdateOneRequiredWithoutChatsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  recipient?: InputMaybe<UserUpdateOneRequiredWithoutChatRecipientInput>;
  sender?: InputMaybe<UserUpdateOneRequiredWithoutChatSenderInput>;
  status?: InputMaybe<EnumChatStatusFieldUpdateOperationsInput>;
  swap?: InputMaybe<SwapUpdateOneWithoutChatInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ChatUpdateWithoutRecipientInput = {
  book?: InputMaybe<BookUpdateOneRequiredWithoutChatsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutChatInput>;
  sender?: InputMaybe<UserUpdateOneRequiredWithoutChatSenderInput>;
  status?: InputMaybe<EnumChatStatusFieldUpdateOperationsInput>;
  swap?: InputMaybe<SwapUpdateOneWithoutChatInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ChatUpdateWithoutSenderInput = {
  book?: InputMaybe<BookUpdateOneRequiredWithoutChatsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutChatInput>;
  recipient?: InputMaybe<UserUpdateOneRequiredWithoutChatRecipientInput>;
  status?: InputMaybe<EnumChatStatusFieldUpdateOperationsInput>;
  swap?: InputMaybe<SwapUpdateOneWithoutChatInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ChatUpdateWithoutSwapInput = {
  book?: InputMaybe<BookUpdateOneRequiredWithoutChatsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutChatInput>;
  recipient?: InputMaybe<UserUpdateOneRequiredWithoutChatRecipientInput>;
  sender?: InputMaybe<UserUpdateOneRequiredWithoutChatSenderInput>;
  status?: InputMaybe<EnumChatStatusFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ChatUpsertWithWhereUniqueWithoutBookInput = {
  create: ChatCreateWithoutBookInput;
  update: ChatUpdateWithoutBookInput;
  where: ChatWhereUniqueInput;
};

export type ChatUpsertWithWhereUniqueWithoutRecipientInput = {
  create: ChatCreateWithoutRecipientInput;
  update: ChatUpdateWithoutRecipientInput;
  where: ChatWhereUniqueInput;
};

export type ChatUpsertWithWhereUniqueWithoutSenderInput = {
  create: ChatCreateWithoutSenderInput;
  update: ChatUpdateWithoutSenderInput;
  where: ChatWhereUniqueInput;
};

export type ChatUpsertWithoutMessagesInput = {
  create: ChatCreateWithoutMessagesInput;
  update: ChatUpdateWithoutMessagesInput;
};

export type ChatUpsertWithoutSwapInput = {
  create: ChatCreateWithoutSwapInput;
  update: ChatUpdateWithoutSwapInput;
};

export type ChatWhereInput = {
  AND?: InputMaybe<Array<ChatWhereInput>>;
  NOT?: InputMaybe<Array<ChatWhereInput>>;
  OR?: InputMaybe<Array<ChatWhereInput>>;
  book?: InputMaybe<BookRelationFilter>;
  bookId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  messages?: InputMaybe<MessageListRelationFilter>;
  recipient?: InputMaybe<UserRelationFilter>;
  recipientId?: InputMaybe<StringFilter>;
  sender?: InputMaybe<UserRelationFilter>;
  senderId?: InputMaybe<StringFilter>;
  status?: InputMaybe<EnumChatStatusFilter>;
  swap?: InputMaybe<SwapRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ChatWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Credentials = {
  __typename?: 'Credentials';
  refreshToken: Scalars['String'];
  token: Scalars['String'];
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DateTimeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedDateTimeFilter>;
  _min?: InputMaybe<NestedDateTimeFilter>;
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
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
  editions?: Maybe<Array<BookEditionTypeSense>>;
  errors?: Maybe<Array<FieldError>>;
  status: ResponseStatus;
};

export type EmailPasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type EnumBooksConditionFieldUpdateOperationsInput = {
  set?: InputMaybe<BooksCondition>;
};

export type EnumBooksConditionFilter = {
  equals?: InputMaybe<BooksCondition>;
  in?: InputMaybe<Array<BooksCondition>>;
  not?: InputMaybe<NestedEnumBooksConditionFilter>;
  notIn?: InputMaybe<Array<BooksCondition>>;
};

export type EnumBooksConditionWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumBooksConditionFilter>;
  _min?: InputMaybe<NestedEnumBooksConditionFilter>;
  equals?: InputMaybe<BooksCondition>;
  in?: InputMaybe<Array<BooksCondition>>;
  not?: InputMaybe<NestedEnumBooksConditionWithAggregatesFilter>;
  notIn?: InputMaybe<Array<BooksCondition>>;
};

export type EnumBooksStatusFieldUpdateOperationsInput = {
  set?: InputMaybe<BooksStatus>;
};

export type EnumBooksStatusFilter = {
  equals?: InputMaybe<BooksStatus>;
  in?: InputMaybe<Array<BooksStatus>>;
  not?: InputMaybe<NestedEnumBooksStatusFilter>;
  notIn?: InputMaybe<Array<BooksStatus>>;
};

export type EnumBooksStatusWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumBooksStatusFilter>;
  _min?: InputMaybe<NestedEnumBooksStatusFilter>;
  equals?: InputMaybe<BooksStatus>;
  in?: InputMaybe<Array<BooksStatus>>;
  not?: InputMaybe<NestedEnumBooksStatusWithAggregatesFilter>;
  notIn?: InputMaybe<Array<BooksStatus>>;
};

export type EnumChatStatusFieldUpdateOperationsInput = {
  set?: InputMaybe<ChatStatus>;
};

export type EnumChatStatusFilter = {
  equals?: InputMaybe<ChatStatus>;
  in?: InputMaybe<Array<ChatStatus>>;
  not?: InputMaybe<NestedEnumChatStatusFilter>;
  notIn?: InputMaybe<Array<ChatStatus>>;
};

export type EnumChatStatusWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumChatStatusFilter>;
  _min?: InputMaybe<NestedEnumChatStatusFilter>;
  equals?: InputMaybe<ChatStatus>;
  in?: InputMaybe<Array<ChatStatus>>;
  not?: InputMaybe<NestedEnumChatStatusWithAggregatesFilter>;
  notIn?: InputMaybe<Array<ChatStatus>>;
};

export type EnumSwapStatusFieldUpdateOperationsInput = {
  set?: InputMaybe<SwapStatus>;
};

export type EnumSwapStatusFilter = {
  equals?: InputMaybe<SwapStatus>;
  in?: InputMaybe<Array<SwapStatus>>;
  not?: InputMaybe<NestedEnumSwapStatusFilter>;
  notIn?: InputMaybe<Array<SwapStatus>>;
};

export type EnumSwapStatusWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumSwapStatusFilter>;
  _min?: InputMaybe<NestedEnumSwapStatusFilter>;
  equals?: InputMaybe<SwapStatus>;
  in?: InputMaybe<Array<SwapStatus>>;
  not?: InputMaybe<NestedEnumSwapStatusWithAggregatesFilter>;
  notIn?: InputMaybe<Array<SwapStatus>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type IntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']>;
  divide?: InputMaybe<Scalars['Int']>;
  increment?: InputMaybe<Scalars['Int']>;
  multiply?: InputMaybe<Scalars['Int']>;
  set?: InputMaybe<Scalars['Int']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IntWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedIntFilter>;
  _min?: InputMaybe<NestedIntFilter>;
  _sum?: InputMaybe<NestedIntFilter>;
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  credentials?: Maybe<Credentials>;
  errors?: Maybe<Array<FieldError>>;
  status: ResponseStatus;
  user?: Maybe<User>;
};

export type Message = {
  __typename?: 'Message';
  chat: Chat;
  chatId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  isRead: Scalars['Boolean'];
  message: Scalars['String'];
  userId: Scalars['String'];
};

export type MessageCountAggregate = {
  __typename?: 'MessageCountAggregate';
  _all: Scalars['Int'];
  chatId: Scalars['Int'];
  createdAt: Scalars['Int'];
  id: Scalars['Int'];
  isRead: Scalars['Int'];
  message: Scalars['Int'];
  userId: Scalars['Int'];
};

export type MessageCountOrderByAggregateInput = {
  chatId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isRead?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type MessageCreateInput = {
  chat: ChatCreateNestedOneWithoutMessagesInput;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  isRead?: InputMaybe<Scalars['Boolean']>;
  message: Scalars['String'];
  userId: Scalars['String'];
};

export type MessageCreateManyChatInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  isRead?: InputMaybe<Scalars['Boolean']>;
  message: Scalars['String'];
  userId: Scalars['String'];
};

export type MessageCreateManyChatInputEnvelope = {
  data: Array<MessageCreateManyChatInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type MessageCreateManyInput = {
  chatId: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  isRead?: InputMaybe<Scalars['Boolean']>;
  message: Scalars['String'];
  userId: Scalars['String'];
};

export type MessageCreateNestedManyWithoutChatInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutChatInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutChatInput>>;
  createMany?: InputMaybe<MessageCreateManyChatInputEnvelope>;
};

export type MessageCreateOrConnectWithoutChatInput = {
  create: MessageCreateWithoutChatInput;
  where: MessageWhereUniqueInput;
};

export type MessageCreateWithoutChatInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  isRead?: InputMaybe<Scalars['Boolean']>;
  message: Scalars['String'];
  userId: Scalars['String'];
};

export type MessageGroupBy = {
  __typename?: 'MessageGroupBy';
  _count?: Maybe<MessageCountAggregate>;
  _max?: Maybe<MessageMaxAggregate>;
  _min?: Maybe<MessageMinAggregate>;
  chatId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  isRead: Scalars['Boolean'];
  message: Scalars['String'];
  userId: Scalars['String'];
};

export type MessageListRelationFilter = {
  every?: InputMaybe<MessageWhereInput>;
  none?: InputMaybe<MessageWhereInput>;
  some?: InputMaybe<MessageWhereInput>;
};

export type MessageMaxAggregate = {
  __typename?: 'MessageMaxAggregate';
  chatId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  isRead?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type MessageMaxOrderByAggregateInput = {
  chatId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isRead?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type MessageMinAggregate = {
  __typename?: 'MessageMinAggregate';
  chatId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  isRead?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type MessageMinOrderByAggregateInput = {
  chatId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isRead?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type MessageOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type MessageOrderByWithAggregationInput = {
  _count?: InputMaybe<MessageCountOrderByAggregateInput>;
  _max?: InputMaybe<MessageMaxOrderByAggregateInput>;
  _min?: InputMaybe<MessageMinOrderByAggregateInput>;
  chatId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isRead?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type MessageOrderByWithRelationInput = {
  chat?: InputMaybe<ChatOrderByWithRelationInput>;
  chatId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isRead?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export enum MessageScalarFieldEnum {
  ChatId = 'chatId',
  CreatedAt = 'createdAt',
  Id = 'id',
  IsRead = 'isRead',
  Message = 'message',
  UserId = 'userId'
}

export type MessageScalarWhereInput = {
  AND?: InputMaybe<Array<MessageScalarWhereInput>>;
  NOT?: InputMaybe<Array<MessageScalarWhereInput>>;
  OR?: InputMaybe<Array<MessageScalarWhereInput>>;
  chatId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  isRead?: InputMaybe<BoolFilter>;
  message?: InputMaybe<StringFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type MessageScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<MessageScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<MessageScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<MessageScalarWhereWithAggregatesInput>>;
  chatId?: InputMaybe<StringWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  isRead?: InputMaybe<BoolWithAggregatesFilter>;
  message?: InputMaybe<StringWithAggregatesFilter>;
  userId?: InputMaybe<StringWithAggregatesFilter>;
};

export type MessageUpdateInput = {
  chat?: InputMaybe<ChatUpdateOneRequiredWithoutMessagesInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isRead?: InputMaybe<BoolFieldUpdateOperationsInput>;
  message?: InputMaybe<StringFieldUpdateOperationsInput>;
  userId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type MessageUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isRead?: InputMaybe<BoolFieldUpdateOperationsInput>;
  message?: InputMaybe<StringFieldUpdateOperationsInput>;
  userId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type MessageUpdateManyWithWhereWithoutChatInput = {
  data: MessageUpdateManyMutationInput;
  where: MessageScalarWhereInput;
};

export type MessageUpdateManyWithoutChatInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutChatInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutChatInput>>;
  createMany?: InputMaybe<MessageCreateManyChatInputEnvelope>;
  delete?: InputMaybe<Array<MessageWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MessageScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  set?: InputMaybe<Array<MessageWhereUniqueInput>>;
  update?: InputMaybe<Array<MessageUpdateWithWhereUniqueWithoutChatInput>>;
  updateMany?: InputMaybe<Array<MessageUpdateManyWithWhereWithoutChatInput>>;
  upsert?: InputMaybe<Array<MessageUpsertWithWhereUniqueWithoutChatInput>>;
};

export type MessageUpdateWithWhereUniqueWithoutChatInput = {
  data: MessageUpdateWithoutChatInput;
  where: MessageWhereUniqueInput;
};

export type MessageUpdateWithoutChatInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isRead?: InputMaybe<BoolFieldUpdateOperationsInput>;
  message?: InputMaybe<StringFieldUpdateOperationsInput>;
  userId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type MessageUpsertWithWhereUniqueWithoutChatInput = {
  create: MessageCreateWithoutChatInput;
  update: MessageUpdateWithoutChatInput;
  where: MessageWhereUniqueInput;
};

export type MessageWhereInput = {
  AND?: InputMaybe<Array<MessageWhereInput>>;
  NOT?: InputMaybe<Array<MessageWhereInput>>;
  OR?: InputMaybe<Array<MessageWhereInput>>;
  chat?: InputMaybe<ChatRelationFilter>;
  chatId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  isRead?: InputMaybe<BoolFilter>;
  message?: InputMaybe<StringFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type MessageWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBookToMyWaitingList?: Maybe<EditionResponse>;
  approveSwap: ChatResponse;
  clearNotifications: UserResponse;
  createBook: BookResponse;
  createBookEdition: BookEdition;
  createChat: ChatResponse;
  createManyBook: AffectedRowsOutput;
  createManyBookEdition: AffectedRowsOutput;
  createManyChat: AffectedRowsOutput;
  createManyMessage: AffectedRowsOutput;
  createManyNotification: AffectedRowsOutput;
  createManySwap: AffectedRowsOutput;
  createManyUser: AffectedRowsOutput;
  createManyUserAvatar: AffectedRowsOutput;
  createManyUserWaitsBookEdition: AffectedRowsOutput;
  createMessage: Message;
  createNotification: Notification;
  createSwap: Swap;
  createUser: User;
  createUserAvatar: UserAvatar;
  createUserWaitsBookEdition: UserWaitsBookEdition;
  customUpsertEdition?: Maybe<BookEdition>;
  deleteBook?: Maybe<Book>;
  deleteBookEdition?: Maybe<BookEdition>;
  deleteChat?: Maybe<Chat>;
  deleteManyBook: AffectedRowsOutput;
  deleteManyBookEdition: AffectedRowsOutput;
  deleteManyChat: AffectedRowsOutput;
  deleteManyMessage: AffectedRowsOutput;
  deleteManyNotification: AffectedRowsOutput;
  deleteManySwap: AffectedRowsOutput;
  deleteManyUser: AffectedRowsOutput;
  deleteManyUserAvatar: AffectedRowsOutput;
  deleteManyUserWaitsBookEdition: AffectedRowsOutput;
  deleteMessage?: Maybe<Message>;
  deleteNotification?: Maybe<Notification>;
  deleteSwap?: Maybe<Swap>;
  deleteUser?: Maybe<User>;
  deleteUserAvatar?: Maybe<UserAvatar>;
  deleteUserWaitsBookEdition?: Maybe<UserWaitsBookEdition>;
  initSwap: ChatResponse;
  login: LoginResponse;
  refreshToken?: Maybe<Credentials>;
  registerUser: LoginResponse;
  removeBookFromMyWaitingList?: Maybe<EditionResponse>;
  sendMessage: ChatResponse;
  setBookHold: BookResponse;
  setBookOpen: BookResponse;
  updateBook?: Maybe<Book>;
  updateBookEdition?: Maybe<BookEdition>;
  updateChat?: Maybe<Chat>;
  updateManyBook: AffectedRowsOutput;
  updateManyBookEdition: AffectedRowsOutput;
  updateManyChat: AffectedRowsOutput;
  updateManyMessage: AffectedRowsOutput;
  updateManyNotification: AffectedRowsOutput;
  updateManySwap: AffectedRowsOutput;
  updateManyUser: AffectedRowsOutput;
  updateManyUserAvatar: AffectedRowsOutput;
  updateManyUserWaitsBookEdition: AffectedRowsOutput;
  updateMe: UserResponse;
  updateMessage?: Maybe<Message>;
  updateNotification?: Maybe<Notification>;
  updateSwap?: Maybe<Swap>;
  updateUser?: Maybe<User>;
  updateUserAvatar?: Maybe<UserAvatar>;
  updateUserWaitsBookEdition?: Maybe<UserWaitsBookEdition>;
  upsertBook: Book;
  upsertBookEdition: BookEdition;
  upsertChat: Chat;
  upsertMessage: Message;
  upsertNotification: Notification;
  upsertSwap: Swap;
  upsertUser: User;
  upsertUserAvatar: UserAvatar;
  upsertUserWaitsBookEdition: UserWaitsBookEdition;
};


export type MutationAddBookToMyWaitingListArgs = {
  editionId: Scalars['String'];
};


export type MutationApproveSwapArgs = {
  bookId: Scalars['String'];
  swapId: Scalars['String'];
};


export type MutationCreateBookArgs = {
  editionId: Scalars['String'];
  options: BookCreateInput;
};


export type MutationCreateBookEditionArgs = {
  data: BookEditionCreateInput;
};


export type MutationCreateChatArgs = {
  bookId: Scalars['String'];
};


export type MutationCreateManyBookArgs = {
  data: Array<BookCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateManyBookEditionArgs = {
  data: Array<BookEditionCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateManyChatArgs = {
  data: Array<ChatCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateManyMessageArgs = {
  data: Array<MessageCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateManyNotificationArgs = {
  data: Array<NotificationCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateManySwapArgs = {
  data: Array<SwapCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateManyUserArgs = {
  data: Array<UserCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateManyUserAvatarArgs = {
  data: Array<UserAvatarCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateManyUserWaitsBookEditionArgs = {
  data: Array<UserWaitsBookEditionCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateMessageArgs = {
  data: MessageCreateInput;
};


export type MutationCreateNotificationArgs = {
  data: NotificationCreateInput;
};


export type MutationCreateSwapArgs = {
  data: SwapCreateInput;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateUserAvatarArgs = {
  data: UserAvatarCreateInput;
};


export type MutationCreateUserWaitsBookEditionArgs = {
  data: UserWaitsBookEditionCreateInput;
};


export type MutationCustomUpsertEditionArgs = {
  create: BookEditionCreateInput;
  indexId: Scalars['String'];
  update: BookEditionUpdateInput;
  where: BookEditionWhereUniqueInput;
};


export type MutationDeleteBookArgs = {
  where: BookWhereUniqueInput;
};


export type MutationDeleteBookEditionArgs = {
  where: BookEditionWhereUniqueInput;
};


export type MutationDeleteChatArgs = {
  where: ChatWhereUniqueInput;
};


export type MutationDeleteManyBookArgs = {
  where?: InputMaybe<BookWhereInput>;
};


export type MutationDeleteManyBookEditionArgs = {
  where?: InputMaybe<BookEditionWhereInput>;
};


export type MutationDeleteManyChatArgs = {
  where?: InputMaybe<ChatWhereInput>;
};


export type MutationDeleteManyMessageArgs = {
  where?: InputMaybe<MessageWhereInput>;
};


export type MutationDeleteManyNotificationArgs = {
  where?: InputMaybe<NotificationWhereInput>;
};


export type MutationDeleteManySwapArgs = {
  where?: InputMaybe<SwapWhereInput>;
};


export type MutationDeleteManyUserArgs = {
  where?: InputMaybe<UserWhereInput>;
};


export type MutationDeleteManyUserAvatarArgs = {
  where?: InputMaybe<UserAvatarWhereInput>;
};


export type MutationDeleteManyUserWaitsBookEditionArgs = {
  where?: InputMaybe<UserWaitsBookEditionWhereInput>;
};


export type MutationDeleteMessageArgs = {
  where: MessageWhereUniqueInput;
};


export type MutationDeleteNotificationArgs = {
  where: NotificationWhereUniqueInput;
};


export type MutationDeleteSwapArgs = {
  where: SwapWhereUniqueInput;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteUserAvatarArgs = {
  where: UserAvatarWhereUniqueInput;
};


export type MutationDeleteUserWaitsBookEditionArgs = {
  where: UserWaitsBookEditionWhereUniqueInput;
};


export type MutationInitSwapArgs = {
  bookId: Scalars['String'];
  chatId: Scalars['String'];
  recipientId: Scalars['String'];
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
  editionId: Scalars['String'];
};


export type MutationSendMessageArgs = {
  chatId: Scalars['String'];
  date: Scalars['String'];
  message: Scalars['String'];
};


export type MutationSetBookHoldArgs = {
  id: Scalars['String'];
};


export type MutationSetBookOpenArgs = {
  id: Scalars['String'];
};


export type MutationUpdateBookArgs = {
  data: BookUpdateInput;
  where: BookWhereUniqueInput;
};


export type MutationUpdateBookEditionArgs = {
  data: BookEditionUpdateInput;
  where: BookEditionWhereUniqueInput;
};


export type MutationUpdateChatArgs = {
  data: ChatUpdateInput;
  where: ChatWhereUniqueInput;
};


export type MutationUpdateManyBookArgs = {
  data: BookUpdateManyMutationInput;
  where?: InputMaybe<BookWhereInput>;
};


export type MutationUpdateManyBookEditionArgs = {
  data: BookEditionUpdateManyMutationInput;
  where?: InputMaybe<BookEditionWhereInput>;
};


export type MutationUpdateManyChatArgs = {
  data: ChatUpdateManyMutationInput;
  where?: InputMaybe<ChatWhereInput>;
};


export type MutationUpdateManyMessageArgs = {
  data: MessageUpdateManyMutationInput;
  where?: InputMaybe<MessageWhereInput>;
};


export type MutationUpdateManyNotificationArgs = {
  data: NotificationUpdateManyMutationInput;
  where?: InputMaybe<NotificationWhereInput>;
};


export type MutationUpdateManySwapArgs = {
  data: SwapUpdateManyMutationInput;
  where?: InputMaybe<SwapWhereInput>;
};


export type MutationUpdateManyUserArgs = {
  data: UserUpdateManyMutationInput;
  where?: InputMaybe<UserWhereInput>;
};


export type MutationUpdateManyUserAvatarArgs = {
  data: UserAvatarUpdateManyMutationInput;
  where?: InputMaybe<UserAvatarWhereInput>;
};


export type MutationUpdateManyUserWaitsBookEditionArgs = {
  data: UserWaitsBookEditionUpdateManyMutationInput;
  where?: InputMaybe<UserWaitsBookEditionWhereInput>;
};


export type MutationUpdateMeArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateMessageArgs = {
  data: MessageUpdateInput;
  where: MessageWhereUniqueInput;
};


export type MutationUpdateNotificationArgs = {
  data: NotificationUpdateInput;
  where: NotificationWhereUniqueInput;
};


export type MutationUpdateSwapArgs = {
  data: SwapUpdateInput;
  where: SwapWhereUniqueInput;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateUserAvatarArgs = {
  data: UserAvatarUpdateInput;
  where: UserAvatarWhereUniqueInput;
};


export type MutationUpdateUserWaitsBookEditionArgs = {
  data: UserWaitsBookEditionUpdateInput;
  where: UserWaitsBookEditionWhereUniqueInput;
};


export type MutationUpsertBookArgs = {
  create: BookCreateInput;
  update: BookUpdateInput;
  where: BookWhereUniqueInput;
};


export type MutationUpsertBookEditionArgs = {
  create: BookEditionCreateInput;
  update: BookEditionUpdateInput;
  where: BookEditionWhereUniqueInput;
};


export type MutationUpsertChatArgs = {
  create: ChatCreateInput;
  update: ChatUpdateInput;
  where: ChatWhereUniqueInput;
};


export type MutationUpsertMessageArgs = {
  create: MessageCreateInput;
  update: MessageUpdateInput;
  where: MessageWhereUniqueInput;
};


export type MutationUpsertNotificationArgs = {
  create: NotificationCreateInput;
  update: NotificationUpdateInput;
  where: NotificationWhereUniqueInput;
};


export type MutationUpsertSwapArgs = {
  create: SwapCreateInput;
  update: SwapUpdateInput;
  where: SwapWhereUniqueInput;
};


export type MutationUpsertUserArgs = {
  create: UserCreateInput;
  update: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpsertUserAvatarArgs = {
  create: UserAvatarCreateInput;
  update: UserAvatarUpdateInput;
  where: UserAvatarWhereUniqueInput;
};


export type MutationUpsertUserWaitsBookEditionArgs = {
  create: UserWaitsBookEditionCreateInput;
  update: UserWaitsBookEditionUpdateInput;
  where: UserWaitsBookEditionWhereUniqueInput;
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedBoolWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedBoolFilter>;
  _min?: InputMaybe<NestedBoolFilter>;
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolWithAggregatesFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedDateTimeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedDateTimeFilter>;
  _min?: InputMaybe<NestedDateTimeFilter>;
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedEnumBooksConditionFilter = {
  equals?: InputMaybe<BooksCondition>;
  in?: InputMaybe<Array<BooksCondition>>;
  not?: InputMaybe<NestedEnumBooksConditionFilter>;
  notIn?: InputMaybe<Array<BooksCondition>>;
};

export type NestedEnumBooksConditionWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumBooksConditionFilter>;
  _min?: InputMaybe<NestedEnumBooksConditionFilter>;
  equals?: InputMaybe<BooksCondition>;
  in?: InputMaybe<Array<BooksCondition>>;
  not?: InputMaybe<NestedEnumBooksConditionWithAggregatesFilter>;
  notIn?: InputMaybe<Array<BooksCondition>>;
};

export type NestedEnumBooksStatusFilter = {
  equals?: InputMaybe<BooksStatus>;
  in?: InputMaybe<Array<BooksStatus>>;
  not?: InputMaybe<NestedEnumBooksStatusFilter>;
  notIn?: InputMaybe<Array<BooksStatus>>;
};

export type NestedEnumBooksStatusWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumBooksStatusFilter>;
  _min?: InputMaybe<NestedEnumBooksStatusFilter>;
  equals?: InputMaybe<BooksStatus>;
  in?: InputMaybe<Array<BooksStatus>>;
  not?: InputMaybe<NestedEnumBooksStatusWithAggregatesFilter>;
  notIn?: InputMaybe<Array<BooksStatus>>;
};

export type NestedEnumChatStatusFilter = {
  equals?: InputMaybe<ChatStatus>;
  in?: InputMaybe<Array<ChatStatus>>;
  not?: InputMaybe<NestedEnumChatStatusFilter>;
  notIn?: InputMaybe<Array<ChatStatus>>;
};

export type NestedEnumChatStatusWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumChatStatusFilter>;
  _min?: InputMaybe<NestedEnumChatStatusFilter>;
  equals?: InputMaybe<ChatStatus>;
  in?: InputMaybe<Array<ChatStatus>>;
  not?: InputMaybe<NestedEnumChatStatusWithAggregatesFilter>;
  notIn?: InputMaybe<Array<ChatStatus>>;
};

export type NestedEnumSwapStatusFilter = {
  equals?: InputMaybe<SwapStatus>;
  in?: InputMaybe<Array<SwapStatus>>;
  not?: InputMaybe<NestedEnumSwapStatusFilter>;
  notIn?: InputMaybe<Array<SwapStatus>>;
};

export type NestedEnumSwapStatusWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumSwapStatusFilter>;
  _min?: InputMaybe<NestedEnumSwapStatusFilter>;
  equals?: InputMaybe<SwapStatus>;
  in?: InputMaybe<Array<SwapStatus>>;
  not?: InputMaybe<NestedEnumSwapStatusWithAggregatesFilter>;
  notIn?: InputMaybe<Array<SwapStatus>>;
};

export type NestedFloatFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedIntWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedIntFilter>;
  _min?: InputMaybe<NestedIntFilter>;
  _sum?: InputMaybe<NestedIntFilter>;
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedStringNullableFilter>;
  _min?: InputMaybe<NestedStringNullableFilter>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedStringFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  isRead: Scalars['Boolean'];
  message: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  user: User;
  userId: Scalars['String'];
};

export type NotificationCountAggregate = {
  __typename?: 'NotificationCountAggregate';
  _all: Scalars['Int'];
  createdAt: Scalars['Int'];
  id: Scalars['Int'];
  isRead: Scalars['Int'];
  message: Scalars['Int'];
  url: Scalars['Int'];
  userId: Scalars['Int'];
};

export type NotificationCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isRead?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type NotificationCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  isRead?: InputMaybe<Scalars['Boolean']>;
  message: Scalars['String'];
  url?: InputMaybe<Scalars['String']>;
  user: UserCreateNestedOneWithoutNotificationsInput;
};

export type NotificationCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  isRead?: InputMaybe<Scalars['Boolean']>;
  message: Scalars['String'];
  url?: InputMaybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type NotificationCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  isRead?: InputMaybe<Scalars['Boolean']>;
  message: Scalars['String'];
  url?: InputMaybe<Scalars['String']>;
};

export type NotificationCreateManyUserInputEnvelope = {
  data: Array<NotificationCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type NotificationCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<NotificationCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<NotificationCreateWithoutUserInput>>;
  createMany?: InputMaybe<NotificationCreateManyUserInputEnvelope>;
};

export type NotificationCreateOrConnectWithoutUserInput = {
  create: NotificationCreateWithoutUserInput;
  where: NotificationWhereUniqueInput;
};

export type NotificationCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  isRead?: InputMaybe<Scalars['Boolean']>;
  message: Scalars['String'];
  url?: InputMaybe<Scalars['String']>;
};

export type NotificationGroupBy = {
  __typename?: 'NotificationGroupBy';
  _count?: Maybe<NotificationCountAggregate>;
  _max?: Maybe<NotificationMaxAggregate>;
  _min?: Maybe<NotificationMinAggregate>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  isRead: Scalars['Boolean'];
  message: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type NotificationListRelationFilter = {
  every?: InputMaybe<NotificationWhereInput>;
  none?: InputMaybe<NotificationWhereInput>;
  some?: InputMaybe<NotificationWhereInput>;
};

export type NotificationMaxAggregate = {
  __typename?: 'NotificationMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  isRead?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type NotificationMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isRead?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type NotificationMinAggregate = {
  __typename?: 'NotificationMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  isRead?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type NotificationMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isRead?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type NotificationOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type NotificationOrderByWithAggregationInput = {
  _count?: InputMaybe<NotificationCountOrderByAggregateInput>;
  _max?: InputMaybe<NotificationMaxOrderByAggregateInput>;
  _min?: InputMaybe<NotificationMinOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isRead?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type NotificationOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isRead?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export enum NotificationScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  IsRead = 'isRead',
  Message = 'message',
  Url = 'url',
  UserId = 'userId'
}

export type NotificationScalarWhereInput = {
  AND?: InputMaybe<Array<NotificationScalarWhereInput>>;
  NOT?: InputMaybe<Array<NotificationScalarWhereInput>>;
  OR?: InputMaybe<Array<NotificationScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  isRead?: InputMaybe<BoolFilter>;
  message?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringNullableFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type NotificationScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<NotificationScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<NotificationScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<NotificationScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  isRead?: InputMaybe<BoolWithAggregatesFilter>;
  message?: InputMaybe<StringWithAggregatesFilter>;
  url?: InputMaybe<StringNullableWithAggregatesFilter>;
  userId?: InputMaybe<StringWithAggregatesFilter>;
};

export type NotificationUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isRead?: InputMaybe<BoolFieldUpdateOperationsInput>;
  message?: InputMaybe<StringFieldUpdateOperationsInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutNotificationsInput>;
};

export type NotificationUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isRead?: InputMaybe<BoolFieldUpdateOperationsInput>;
  message?: InputMaybe<StringFieldUpdateOperationsInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type NotificationUpdateManyWithWhereWithoutUserInput = {
  data: NotificationUpdateManyMutationInput;
  where: NotificationScalarWhereInput;
};

export type NotificationUpdateManyWithoutUserInput = {
  connect?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<NotificationCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<NotificationCreateWithoutUserInput>>;
  createMany?: InputMaybe<NotificationCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<NotificationScalarWhereInput>>;
  disconnect?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  set?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  update?: InputMaybe<Array<NotificationUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<NotificationUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<NotificationUpsertWithWhereUniqueWithoutUserInput>>;
};

export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
  data: NotificationUpdateWithoutUserInput;
  where: NotificationWhereUniqueInput;
};

export type NotificationUpdateWithoutUserInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isRead?: InputMaybe<BoolFieldUpdateOperationsInput>;
  message?: InputMaybe<StringFieldUpdateOperationsInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
  create: NotificationCreateWithoutUserInput;
  update: NotificationUpdateWithoutUserInput;
  where: NotificationWhereUniqueInput;
};

export type NotificationWhereInput = {
  AND?: InputMaybe<Array<NotificationWhereInput>>;
  NOT?: InputMaybe<Array<NotificationWhereInput>>;
  OR?: InputMaybe<Array<NotificationWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  isRead?: InputMaybe<BoolFilter>;
  message?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringNullableFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type NotificationWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  aggregateBook: AggregateBook;
  aggregateBookEdition: AggregateBookEdition;
  aggregateChat: AggregateChat;
  aggregateMessage: AggregateMessage;
  aggregateNotification: AggregateNotification;
  aggregateSwap: AggregateSwap;
  aggregateUser: AggregateUser;
  aggregateUserAvatar: AggregateUserAvatar;
  aggregateUserWaitsBookEdition: AggregateUserWaitsBookEdition;
  book?: Maybe<Book>;
  bookEdition?: Maybe<BookEdition>;
  bookEditions: Array<BookEdition>;
  books: Array<Book>;
  chat?: Maybe<Chat>;
  chats: Array<Chat>;
  findFirstBook?: Maybe<Book>;
  findFirstBookEdition?: Maybe<BookEdition>;
  findFirstChat?: Maybe<Chat>;
  findFirstMessage?: Maybe<Message>;
  findFirstNotification?: Maybe<Notification>;
  findFirstSwap?: Maybe<Swap>;
  findFirstUser?: Maybe<User>;
  findFirstUserAvatar?: Maybe<UserAvatar>;
  findFirstUserWaitsBookEdition?: Maybe<UserWaitsBookEdition>;
  getBook?: Maybe<BookResponse>;
  getBooksStatic?: Maybe<Array<Scalars['String']>>;
  getEdition?: Maybe<EditionResponse>;
  getEditions?: Maybe<EditionsResponse>;
  getEditionsSearch?: Maybe<EditionsResponse>;
  getEditionsStatic?: Maybe<Array<Scalars['String']>>;
  getRoom: ChatResponse;
  getUser?: Maybe<User>;
  getUsers?: Maybe<Array<User>>;
  groupByBook: Array<BookGroupBy>;
  groupByBookEdition: Array<BookEditionGroupBy>;
  groupByChat: Array<ChatGroupBy>;
  groupByMessage: Array<MessageGroupBy>;
  groupByNotification: Array<NotificationGroupBy>;
  groupBySwap: Array<SwapGroupBy>;
  groupByUser: Array<UserGroupBy>;
  groupByUserAvatar: Array<UserAvatarGroupBy>;
  groupByUserWaitsBookEdition: Array<UserWaitsBookEditionGroupBy>;
  me?: Maybe<UserResponse>;
  message?: Maybe<Message>;
  messages: Array<Message>;
  notification?: Maybe<Notification>;
  notifications: Array<Notification>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  user?: Maybe<User>;
  userAvatar?: Maybe<UserAvatar>;
  userAvatars: Array<UserAvatar>;
  userWaitsBookEdition?: Maybe<UserWaitsBookEdition>;
  userWaitsBookEditions: Array<UserWaitsBookEdition>;
  users: Array<User>;
};


export type QueryAggregateBookArgs = {
  cursor?: InputMaybe<BookWhereUniqueInput>;
  orderBy?: InputMaybe<Array<BookOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BookWhereInput>;
};


export type QueryAggregateBookEditionArgs = {
  cursor?: InputMaybe<BookEditionWhereUniqueInput>;
  orderBy?: InputMaybe<Array<BookEditionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BookEditionWhereInput>;
};


export type QueryAggregateChatArgs = {
  cursor?: InputMaybe<ChatWhereUniqueInput>;
  orderBy?: InputMaybe<Array<ChatOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ChatWhereInput>;
};


export type QueryAggregateMessageArgs = {
  cursor?: InputMaybe<MessageWhereUniqueInput>;
  orderBy?: InputMaybe<Array<MessageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MessageWhereInput>;
};


export type QueryAggregateNotificationArgs = {
  cursor?: InputMaybe<NotificationWhereUniqueInput>;
  orderBy?: InputMaybe<Array<NotificationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NotificationWhereInput>;
};


export type QueryAggregateSwapArgs = {
  cursor?: InputMaybe<SwapWhereUniqueInput>;
  orderBy?: InputMaybe<Array<SwapOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SwapWhereInput>;
};


export type QueryAggregateUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryAggregateUserAvatarArgs = {
  cursor?: InputMaybe<UserAvatarWhereUniqueInput>;
  orderBy?: InputMaybe<Array<UserAvatarOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserAvatarWhereInput>;
};


export type QueryAggregateUserWaitsBookEditionArgs = {
  cursor?: InputMaybe<UserWaitsBookEditionWhereUniqueInput>;
  orderBy?: InputMaybe<Array<UserWaitsBookEditionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWaitsBookEditionWhereInput>;
};


export type QueryBookArgs = {
  where: BookWhereUniqueInput;
};


export type QueryBookEditionArgs = {
  where: BookEditionWhereUniqueInput;
};


export type QueryBookEditionsArgs = {
  cursor?: InputMaybe<BookEditionWhereUniqueInput>;
  distinct?: InputMaybe<Array<BookEditionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<BookEditionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BookEditionWhereInput>;
};


export type QueryBooksArgs = {
  cursor?: InputMaybe<BookWhereUniqueInput>;
  distinct?: InputMaybe<Array<BookScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<BookOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BookWhereInput>;
};


export type QueryChatArgs = {
  where: ChatWhereUniqueInput;
};


export type QueryChatsArgs = {
  cursor?: InputMaybe<ChatWhereUniqueInput>;
  distinct?: InputMaybe<Array<ChatScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ChatOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ChatWhereInput>;
};


export type QueryFindFirstBookArgs = {
  cursor?: InputMaybe<BookWhereUniqueInput>;
  distinct?: InputMaybe<Array<BookScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<BookOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BookWhereInput>;
};


export type QueryFindFirstBookEditionArgs = {
  cursor?: InputMaybe<BookEditionWhereUniqueInput>;
  distinct?: InputMaybe<Array<BookEditionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<BookEditionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BookEditionWhereInput>;
};


export type QueryFindFirstChatArgs = {
  cursor?: InputMaybe<ChatWhereUniqueInput>;
  distinct?: InputMaybe<Array<ChatScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ChatOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ChatWhereInput>;
};


export type QueryFindFirstMessageArgs = {
  cursor?: InputMaybe<MessageWhereUniqueInput>;
  distinct?: InputMaybe<Array<MessageScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<MessageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MessageWhereInput>;
};


export type QueryFindFirstNotificationArgs = {
  cursor?: InputMaybe<NotificationWhereUniqueInput>;
  distinct?: InputMaybe<Array<NotificationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<NotificationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NotificationWhereInput>;
};


export type QueryFindFirstSwapArgs = {
  cursor?: InputMaybe<SwapWhereUniqueInput>;
  distinct?: InputMaybe<Array<SwapScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SwapOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SwapWhereInput>;
};


export type QueryFindFirstUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryFindFirstUserAvatarArgs = {
  cursor?: InputMaybe<UserAvatarWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserAvatarScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserAvatarOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserAvatarWhereInput>;
};


export type QueryFindFirstUserWaitsBookEditionArgs = {
  cursor?: InputMaybe<UserWaitsBookEditionWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserWaitsBookEditionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserWaitsBookEditionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWaitsBookEditionWhereInput>;
};


export type QueryGetBookArgs = {
  id: Scalars['String'];
};


export type QueryGetEditionArgs = {
  id: Scalars['String'];
};


export type QueryGetEditionsArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
  popular?: InputMaybe<Scalars['Boolean']>;
  recent?: InputMaybe<Scalars['Boolean']>;
  status?: InputMaybe<BooksStatus>;
};


export type QueryGetEditionsSearchArgs = {
  search?: InputMaybe<Scalars['String']>;
};


export type QueryGetRoomArgs = {
  id: Scalars['String'];
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};


export type QueryGroupByBookArgs = {
  by: Array<BookScalarFieldEnum>;
  having?: InputMaybe<BookScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<BookOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BookWhereInput>;
};


export type QueryGroupByBookEditionArgs = {
  by: Array<BookEditionScalarFieldEnum>;
  having?: InputMaybe<BookEditionScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<BookEditionOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BookEditionWhereInput>;
};


export type QueryGroupByChatArgs = {
  by: Array<ChatScalarFieldEnum>;
  having?: InputMaybe<ChatScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<ChatOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ChatWhereInput>;
};


export type QueryGroupByMessageArgs = {
  by: Array<MessageScalarFieldEnum>;
  having?: InputMaybe<MessageScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<MessageOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MessageWhereInput>;
};


export type QueryGroupByNotificationArgs = {
  by: Array<NotificationScalarFieldEnum>;
  having?: InputMaybe<NotificationScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<NotificationOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NotificationWhereInput>;
};


export type QueryGroupBySwapArgs = {
  by: Array<SwapScalarFieldEnum>;
  having?: InputMaybe<SwapScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<SwapOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SwapWhereInput>;
};


export type QueryGroupByUserArgs = {
  by: Array<UserScalarFieldEnum>;
  having?: InputMaybe<UserScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<UserOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryGroupByUserAvatarArgs = {
  by: Array<UserAvatarScalarFieldEnum>;
  having?: InputMaybe<UserAvatarScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<UserAvatarOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserAvatarWhereInput>;
};


export type QueryGroupByUserWaitsBookEditionArgs = {
  by: Array<UserWaitsBookEditionScalarFieldEnum>;
  having?: InputMaybe<UserWaitsBookEditionScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<UserWaitsBookEditionOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWaitsBookEditionWhereInput>;
};


export type QueryMessageArgs = {
  where: MessageWhereUniqueInput;
};


export type QueryMessagesArgs = {
  cursor?: InputMaybe<MessageWhereUniqueInput>;
  distinct?: InputMaybe<Array<MessageScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<MessageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MessageWhereInput>;
};


export type QueryNotificationArgs = {
  where: NotificationWhereUniqueInput;
};


export type QueryNotificationsArgs = {
  cursor?: InputMaybe<NotificationWhereUniqueInput>;
  distinct?: InputMaybe<Array<NotificationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<NotificationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NotificationWhereInput>;
};


export type QuerySwapArgs = {
  where: SwapWhereUniqueInput;
};


export type QuerySwapsArgs = {
  cursor?: InputMaybe<SwapWhereUniqueInput>;
  distinct?: InputMaybe<Array<SwapScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SwapOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SwapWhereInput>;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUserAvatarArgs = {
  where: UserAvatarWhereUniqueInput;
};


export type QueryUserAvatarsArgs = {
  cursor?: InputMaybe<UserAvatarWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserAvatarScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserAvatarOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserAvatarWhereInput>;
};


export type QueryUserWaitsBookEditionArgs = {
  where: UserWaitsBookEditionWhereUniqueInput;
};


export type QueryUserWaitsBookEditionsArgs = {
  cursor?: InputMaybe<UserWaitsBookEditionWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserWaitsBookEditionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserWaitsBookEditionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWaitsBookEditionWhereInput>;
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

/** Mark response status as Success or Error */
export enum ResponseStatus {
  Error = 'ERROR',
  Success = 'SUCCESS'
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableListFilter = {
  equals?: InputMaybe<Array<Scalars['String']>>;
  has?: InputMaybe<Scalars['String']>;
  hasEvery?: InputMaybe<Array<Scalars['String']>>;
  hasSome?: InputMaybe<Array<Scalars['String']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
};

export type StringNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedStringNullableFilter>;
  _min?: InputMaybe<NestedStringNullableFilter>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedStringFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Swap = {
  __typename?: 'Swap';
  book: Book;
  bookId: Scalars['String'];
  chat: Chat;
  chatId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  recipient: User;
  recipientId: Scalars['String'];
  sender: User;
  senderId: Scalars['String'];
  status: SwapStatus;
  updatedAt: Scalars['DateTime'];
};

export type SwapCountAggregate = {
  __typename?: 'SwapCountAggregate';
  _all: Scalars['Int'];
  bookId: Scalars['Int'];
  chatId: Scalars['Int'];
  createdAt: Scalars['Int'];
  id: Scalars['Int'];
  recipientId: Scalars['Int'];
  senderId: Scalars['Int'];
  status: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type SwapCountOrderByAggregateInput = {
  bookId?: InputMaybe<SortOrder>;
  chatId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  recipientId?: InputMaybe<SortOrder>;
  senderId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SwapCreateInput = {
  book: BookCreateNestedOneWithoutSwapsInput;
  chat: ChatCreateNestedOneWithoutSwapInput;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  recipient: UserCreateNestedOneWithoutSwapsInput;
  sender: UserCreateNestedOneWithoutSendsInput;
  status?: InputMaybe<SwapStatus>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SwapCreateManyBookInput = {
  chatId: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  recipientId: Scalars['String'];
  senderId: Scalars['String'];
  status?: InputMaybe<SwapStatus>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SwapCreateManyBookInputEnvelope = {
  data: Array<SwapCreateManyBookInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type SwapCreateManyInput = {
  bookId: Scalars['String'];
  chatId: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  recipientId: Scalars['String'];
  senderId: Scalars['String'];
  status?: InputMaybe<SwapStatus>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SwapCreateManyRecipientInput = {
  bookId: Scalars['String'];
  chatId: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  senderId: Scalars['String'];
  status?: InputMaybe<SwapStatus>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SwapCreateManyRecipientInputEnvelope = {
  data: Array<SwapCreateManyRecipientInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type SwapCreateManySenderInput = {
  bookId: Scalars['String'];
  chatId: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  recipientId: Scalars['String'];
  status?: InputMaybe<SwapStatus>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SwapCreateManySenderInputEnvelope = {
  data: Array<SwapCreateManySenderInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type SwapCreateNestedManyWithoutBookInput = {
  connect?: InputMaybe<Array<SwapWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SwapCreateOrConnectWithoutBookInput>>;
  create?: InputMaybe<Array<SwapCreateWithoutBookInput>>;
  createMany?: InputMaybe<SwapCreateManyBookInputEnvelope>;
};

export type SwapCreateNestedManyWithoutRecipientInput = {
  connect?: InputMaybe<Array<SwapWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SwapCreateOrConnectWithoutRecipientInput>>;
  create?: InputMaybe<Array<SwapCreateWithoutRecipientInput>>;
  createMany?: InputMaybe<SwapCreateManyRecipientInputEnvelope>;
};

export type SwapCreateNestedManyWithoutSenderInput = {
  connect?: InputMaybe<Array<SwapWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SwapCreateOrConnectWithoutSenderInput>>;
  create?: InputMaybe<Array<SwapCreateWithoutSenderInput>>;
  createMany?: InputMaybe<SwapCreateManySenderInputEnvelope>;
};

export type SwapCreateNestedOneWithoutChatInput = {
  connect?: InputMaybe<SwapWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SwapCreateOrConnectWithoutChatInput>;
  create?: InputMaybe<SwapCreateWithoutChatInput>;
};

export type SwapCreateOrConnectWithoutBookInput = {
  create: SwapCreateWithoutBookInput;
  where: SwapWhereUniqueInput;
};

export type SwapCreateOrConnectWithoutChatInput = {
  create: SwapCreateWithoutChatInput;
  where: SwapWhereUniqueInput;
};

export type SwapCreateOrConnectWithoutRecipientInput = {
  create: SwapCreateWithoutRecipientInput;
  where: SwapWhereUniqueInput;
};

export type SwapCreateOrConnectWithoutSenderInput = {
  create: SwapCreateWithoutSenderInput;
  where: SwapWhereUniqueInput;
};

export type SwapCreateWithoutBookInput = {
  chat: ChatCreateNestedOneWithoutSwapInput;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  recipient: UserCreateNestedOneWithoutSwapsInput;
  sender: UserCreateNestedOneWithoutSendsInput;
  status?: InputMaybe<SwapStatus>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SwapCreateWithoutChatInput = {
  book: BookCreateNestedOneWithoutSwapsInput;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  recipient: UserCreateNestedOneWithoutSwapsInput;
  sender: UserCreateNestedOneWithoutSendsInput;
  status?: InputMaybe<SwapStatus>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SwapCreateWithoutRecipientInput = {
  book: BookCreateNestedOneWithoutSwapsInput;
  chat: ChatCreateNestedOneWithoutSwapInput;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  sender: UserCreateNestedOneWithoutSendsInput;
  status?: InputMaybe<SwapStatus>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SwapCreateWithoutSenderInput = {
  book: BookCreateNestedOneWithoutSwapsInput;
  chat: ChatCreateNestedOneWithoutSwapInput;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  recipient: UserCreateNestedOneWithoutSwapsInput;
  status?: InputMaybe<SwapStatus>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SwapGroupBy = {
  __typename?: 'SwapGroupBy';
  _count?: Maybe<SwapCountAggregate>;
  _max?: Maybe<SwapMaxAggregate>;
  _min?: Maybe<SwapMinAggregate>;
  bookId: Scalars['String'];
  chatId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  recipientId: Scalars['String'];
  senderId: Scalars['String'];
  status: SwapStatus;
  updatedAt: Scalars['DateTime'];
};

export type SwapListRelationFilter = {
  every?: InputMaybe<SwapWhereInput>;
  none?: InputMaybe<SwapWhereInput>;
  some?: InputMaybe<SwapWhereInput>;
};

export type SwapMaxAggregate = {
  __typename?: 'SwapMaxAggregate';
  bookId?: Maybe<Scalars['String']>;
  chatId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  recipientId?: Maybe<Scalars['String']>;
  senderId?: Maybe<Scalars['String']>;
  status?: Maybe<SwapStatus>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type SwapMaxOrderByAggregateInput = {
  bookId?: InputMaybe<SortOrder>;
  chatId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  recipientId?: InputMaybe<SortOrder>;
  senderId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SwapMinAggregate = {
  __typename?: 'SwapMinAggregate';
  bookId?: Maybe<Scalars['String']>;
  chatId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  recipientId?: Maybe<Scalars['String']>;
  senderId?: Maybe<Scalars['String']>;
  status?: Maybe<SwapStatus>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type SwapMinOrderByAggregateInput = {
  bookId?: InputMaybe<SortOrder>;
  chatId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  recipientId?: InputMaybe<SortOrder>;
  senderId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SwapOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type SwapOrderByWithAggregationInput = {
  _count?: InputMaybe<SwapCountOrderByAggregateInput>;
  _max?: InputMaybe<SwapMaxOrderByAggregateInput>;
  _min?: InputMaybe<SwapMinOrderByAggregateInput>;
  bookId?: InputMaybe<SortOrder>;
  chatId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  recipientId?: InputMaybe<SortOrder>;
  senderId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SwapOrderByWithRelationInput = {
  book?: InputMaybe<BookOrderByWithRelationInput>;
  bookId?: InputMaybe<SortOrder>;
  chat?: InputMaybe<ChatOrderByWithRelationInput>;
  chatId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  recipient?: InputMaybe<UserOrderByWithRelationInput>;
  recipientId?: InputMaybe<SortOrder>;
  sender?: InputMaybe<UserOrderByWithRelationInput>;
  senderId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SwapRelationFilter = {
  is?: InputMaybe<SwapWhereInput>;
  isNot?: InputMaybe<SwapWhereInput>;
};

export enum SwapScalarFieldEnum {
  BookId = 'bookId',
  ChatId = 'chatId',
  CreatedAt = 'createdAt',
  Id = 'id',
  RecipientId = 'recipientId',
  SenderId = 'senderId',
  Status = 'status',
  UpdatedAt = 'updatedAt'
}

export type SwapScalarWhereInput = {
  AND?: InputMaybe<Array<SwapScalarWhereInput>>;
  NOT?: InputMaybe<Array<SwapScalarWhereInput>>;
  OR?: InputMaybe<Array<SwapScalarWhereInput>>;
  bookId?: InputMaybe<StringFilter>;
  chatId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  recipientId?: InputMaybe<StringFilter>;
  senderId?: InputMaybe<StringFilter>;
  status?: InputMaybe<EnumSwapStatusFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type SwapScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<SwapScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<SwapScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<SwapScalarWhereWithAggregatesInput>>;
  bookId?: InputMaybe<StringWithAggregatesFilter>;
  chatId?: InputMaybe<StringWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  recipientId?: InputMaybe<StringWithAggregatesFilter>;
  senderId?: InputMaybe<StringWithAggregatesFilter>;
  status?: InputMaybe<EnumSwapStatusWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export enum SwapStatus {
  Approved = 'APPROVED',
  Canceled = 'CANCELED',
  Initiated = 'INITIATED'
}

export type SwapUpdateInput = {
  book?: InputMaybe<BookUpdateOneRequiredWithoutSwapsInput>;
  chat?: InputMaybe<ChatUpdateOneRequiredWithoutSwapInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  recipient?: InputMaybe<UserUpdateOneRequiredWithoutSwapsInput>;
  sender?: InputMaybe<UserUpdateOneRequiredWithoutSendsInput>;
  status?: InputMaybe<EnumSwapStatusFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SwapUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  status?: InputMaybe<EnumSwapStatusFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SwapUpdateManyWithWhereWithoutBookInput = {
  data: SwapUpdateManyMutationInput;
  where: SwapScalarWhereInput;
};

export type SwapUpdateManyWithWhereWithoutRecipientInput = {
  data: SwapUpdateManyMutationInput;
  where: SwapScalarWhereInput;
};

export type SwapUpdateManyWithWhereWithoutSenderInput = {
  data: SwapUpdateManyMutationInput;
  where: SwapScalarWhereInput;
};

export type SwapUpdateManyWithoutBookInput = {
  connect?: InputMaybe<Array<SwapWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SwapCreateOrConnectWithoutBookInput>>;
  create?: InputMaybe<Array<SwapCreateWithoutBookInput>>;
  createMany?: InputMaybe<SwapCreateManyBookInputEnvelope>;
  delete?: InputMaybe<Array<SwapWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<SwapScalarWhereInput>>;
  disconnect?: InputMaybe<Array<SwapWhereUniqueInput>>;
  set?: InputMaybe<Array<SwapWhereUniqueInput>>;
  update?: InputMaybe<Array<SwapUpdateWithWhereUniqueWithoutBookInput>>;
  updateMany?: InputMaybe<Array<SwapUpdateManyWithWhereWithoutBookInput>>;
  upsert?: InputMaybe<Array<SwapUpsertWithWhereUniqueWithoutBookInput>>;
};

export type SwapUpdateManyWithoutRecipientInput = {
  connect?: InputMaybe<Array<SwapWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SwapCreateOrConnectWithoutRecipientInput>>;
  create?: InputMaybe<Array<SwapCreateWithoutRecipientInput>>;
  createMany?: InputMaybe<SwapCreateManyRecipientInputEnvelope>;
  delete?: InputMaybe<Array<SwapWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<SwapScalarWhereInput>>;
  disconnect?: InputMaybe<Array<SwapWhereUniqueInput>>;
  set?: InputMaybe<Array<SwapWhereUniqueInput>>;
  update?: InputMaybe<Array<SwapUpdateWithWhereUniqueWithoutRecipientInput>>;
  updateMany?: InputMaybe<Array<SwapUpdateManyWithWhereWithoutRecipientInput>>;
  upsert?: InputMaybe<Array<SwapUpsertWithWhereUniqueWithoutRecipientInput>>;
};

export type SwapUpdateManyWithoutSenderInput = {
  connect?: InputMaybe<Array<SwapWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SwapCreateOrConnectWithoutSenderInput>>;
  create?: InputMaybe<Array<SwapCreateWithoutSenderInput>>;
  createMany?: InputMaybe<SwapCreateManySenderInputEnvelope>;
  delete?: InputMaybe<Array<SwapWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<SwapScalarWhereInput>>;
  disconnect?: InputMaybe<Array<SwapWhereUniqueInput>>;
  set?: InputMaybe<Array<SwapWhereUniqueInput>>;
  update?: InputMaybe<Array<SwapUpdateWithWhereUniqueWithoutSenderInput>>;
  updateMany?: InputMaybe<Array<SwapUpdateManyWithWhereWithoutSenderInput>>;
  upsert?: InputMaybe<Array<SwapUpsertWithWhereUniqueWithoutSenderInput>>;
};

export type SwapUpdateOneWithoutChatInput = {
  connect?: InputMaybe<SwapWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SwapCreateOrConnectWithoutChatInput>;
  create?: InputMaybe<SwapCreateWithoutChatInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<SwapUpdateWithoutChatInput>;
  upsert?: InputMaybe<SwapUpsertWithoutChatInput>;
};

export type SwapUpdateWithWhereUniqueWithoutBookInput = {
  data: SwapUpdateWithoutBookInput;
  where: SwapWhereUniqueInput;
};

export type SwapUpdateWithWhereUniqueWithoutRecipientInput = {
  data: SwapUpdateWithoutRecipientInput;
  where: SwapWhereUniqueInput;
};

export type SwapUpdateWithWhereUniqueWithoutSenderInput = {
  data: SwapUpdateWithoutSenderInput;
  where: SwapWhereUniqueInput;
};

export type SwapUpdateWithoutBookInput = {
  chat?: InputMaybe<ChatUpdateOneRequiredWithoutSwapInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  recipient?: InputMaybe<UserUpdateOneRequiredWithoutSwapsInput>;
  sender?: InputMaybe<UserUpdateOneRequiredWithoutSendsInput>;
  status?: InputMaybe<EnumSwapStatusFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SwapUpdateWithoutChatInput = {
  book?: InputMaybe<BookUpdateOneRequiredWithoutSwapsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  recipient?: InputMaybe<UserUpdateOneRequiredWithoutSwapsInput>;
  sender?: InputMaybe<UserUpdateOneRequiredWithoutSendsInput>;
  status?: InputMaybe<EnumSwapStatusFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SwapUpdateWithoutRecipientInput = {
  book?: InputMaybe<BookUpdateOneRequiredWithoutSwapsInput>;
  chat?: InputMaybe<ChatUpdateOneRequiredWithoutSwapInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  sender?: InputMaybe<UserUpdateOneRequiredWithoutSendsInput>;
  status?: InputMaybe<EnumSwapStatusFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SwapUpdateWithoutSenderInput = {
  book?: InputMaybe<BookUpdateOneRequiredWithoutSwapsInput>;
  chat?: InputMaybe<ChatUpdateOneRequiredWithoutSwapInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  recipient?: InputMaybe<UserUpdateOneRequiredWithoutSwapsInput>;
  status?: InputMaybe<EnumSwapStatusFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SwapUpsertWithWhereUniqueWithoutBookInput = {
  create: SwapCreateWithoutBookInput;
  update: SwapUpdateWithoutBookInput;
  where: SwapWhereUniqueInput;
};

export type SwapUpsertWithWhereUniqueWithoutRecipientInput = {
  create: SwapCreateWithoutRecipientInput;
  update: SwapUpdateWithoutRecipientInput;
  where: SwapWhereUniqueInput;
};

export type SwapUpsertWithWhereUniqueWithoutSenderInput = {
  create: SwapCreateWithoutSenderInput;
  update: SwapUpdateWithoutSenderInput;
  where: SwapWhereUniqueInput;
};

export type SwapUpsertWithoutChatInput = {
  create: SwapCreateWithoutChatInput;
  update: SwapUpdateWithoutChatInput;
};

export type SwapWhereInput = {
  AND?: InputMaybe<Array<SwapWhereInput>>;
  NOT?: InputMaybe<Array<SwapWhereInput>>;
  OR?: InputMaybe<Array<SwapWhereInput>>;
  book?: InputMaybe<BookRelationFilter>;
  bookId?: InputMaybe<StringFilter>;
  chat?: InputMaybe<ChatRelationFilter>;
  chatId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  recipient?: InputMaybe<UserRelationFilter>;
  recipientId?: InputMaybe<StringFilter>;
  sender?: InputMaybe<UserRelationFilter>;
  senderId?: InputMaybe<StringFilter>;
  status?: InputMaybe<EnumSwapStatusFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type SwapWhereUniqueInput = {
  chatId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _count?: Maybe<UserCount>;
  avatar?: Maybe<UserAvatar>;
  avatarId?: Maybe<Scalars['String']>;
  books: Array<Book>;
  chatRecipient: Array<Chat>;
  chatSender: Array<Chat>;
  city?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBooks: Array<Book>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  notifications: Array<Notification>;
  password: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  points: Scalars['Int'];
  sends: Array<Swap>;
  swaps: Array<Swap>;
  updatedAt: Scalars['DateTime'];
  waiting: Array<UserWaitsBookEdition>;
};


export type UserBooksArgs = {
  cursor?: InputMaybe<BookWhereUniqueInput>;
  distinct?: InputMaybe<Array<BookScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<BookOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BookWhereInput>;
};


export type UserChatRecipientArgs = {
  cursor?: InputMaybe<ChatWhereUniqueInput>;
  distinct?: InputMaybe<Array<ChatScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ChatOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ChatWhereInput>;
};


export type UserChatSenderArgs = {
  cursor?: InputMaybe<ChatWhereUniqueInput>;
  distinct?: InputMaybe<Array<ChatScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ChatOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ChatWhereInput>;
};


export type UserCreatedBooksArgs = {
  cursor?: InputMaybe<BookWhereUniqueInput>;
  distinct?: InputMaybe<Array<BookScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<BookOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BookWhereInput>;
};


export type UserNotificationsArgs = {
  cursor?: InputMaybe<NotificationWhereUniqueInput>;
  distinct?: InputMaybe<Array<NotificationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<NotificationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NotificationWhereInput>;
};


export type UserSendsArgs = {
  cursor?: InputMaybe<SwapWhereUniqueInput>;
  distinct?: InputMaybe<Array<SwapScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SwapOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SwapWhereInput>;
};


export type UserSwapsArgs = {
  cursor?: InputMaybe<SwapWhereUniqueInput>;
  distinct?: InputMaybe<Array<SwapScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SwapOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SwapWhereInput>;
};


export type UserWaitingArgs = {
  cursor?: InputMaybe<UserWaitsBookEditionWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserWaitsBookEditionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserWaitsBookEditionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWaitsBookEditionWhereInput>;
};

export type UserAvatar = {
  __typename?: 'UserAvatar';
  accessoriesType?: Maybe<Scalars['String']>;
  avatarStyle?: Maybe<Scalars['String']>;
  clotheColor?: Maybe<Scalars['String']>;
  clotheType?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  eyeType?: Maybe<Scalars['String']>;
  eyebrowType?: Maybe<Scalars['String']>;
  facialHairColor?: Maybe<Scalars['String']>;
  facialHairType?: Maybe<Scalars['String']>;
  graphicType?: Maybe<Scalars['String']>;
  hairColor?: Maybe<Scalars['String']>;
  hatColor?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  mouthType?: Maybe<Scalars['String']>;
  skinColor?: Maybe<Scalars['String']>;
  topType?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};

export type UserAvatarCountAggregate = {
  __typename?: 'UserAvatarCountAggregate';
  _all: Scalars['Int'];
  accessoriesType: Scalars['Int'];
  avatarStyle: Scalars['Int'];
  clotheColor: Scalars['Int'];
  clotheType: Scalars['Int'];
  createdAt: Scalars['Int'];
  eyeType: Scalars['Int'];
  eyebrowType: Scalars['Int'];
  facialHairColor: Scalars['Int'];
  facialHairType: Scalars['Int'];
  graphicType: Scalars['Int'];
  hairColor: Scalars['Int'];
  hatColor: Scalars['Int'];
  id: Scalars['Int'];
  mouthType: Scalars['Int'];
  skinColor: Scalars['Int'];
  topType: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type UserAvatarCountOrderByAggregateInput = {
  accessoriesType?: InputMaybe<SortOrder>;
  avatarStyle?: InputMaybe<SortOrder>;
  clotheColor?: InputMaybe<SortOrder>;
  clotheType?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  eyeType?: InputMaybe<SortOrder>;
  eyebrowType?: InputMaybe<SortOrder>;
  facialHairColor?: InputMaybe<SortOrder>;
  facialHairType?: InputMaybe<SortOrder>;
  graphicType?: InputMaybe<SortOrder>;
  hairColor?: InputMaybe<SortOrder>;
  hatColor?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  mouthType?: InputMaybe<SortOrder>;
  skinColor?: InputMaybe<SortOrder>;
  topType?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type UserAvatarCreateInput = {
  accessoriesType?: InputMaybe<Scalars['String']>;
  avatarStyle?: InputMaybe<Scalars['String']>;
  clotheColor?: InputMaybe<Scalars['String']>;
  clotheType?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  eyeType?: InputMaybe<Scalars['String']>;
  eyebrowType?: InputMaybe<Scalars['String']>;
  facialHairColor?: InputMaybe<Scalars['String']>;
  facialHairType?: InputMaybe<Scalars['String']>;
  graphicType?: InputMaybe<Scalars['String']>;
  hairColor?: InputMaybe<Scalars['String']>;
  hatColor?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  mouthType?: InputMaybe<Scalars['String']>;
  skinColor?: InputMaybe<Scalars['String']>;
  topType?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserCreateNestedOneWithoutAvatarInput>;
};

export type UserAvatarCreateManyInput = {
  accessoriesType?: InputMaybe<Scalars['String']>;
  avatarStyle?: InputMaybe<Scalars['String']>;
  clotheColor?: InputMaybe<Scalars['String']>;
  clotheType?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  eyeType?: InputMaybe<Scalars['String']>;
  eyebrowType?: InputMaybe<Scalars['String']>;
  facialHairColor?: InputMaybe<Scalars['String']>;
  facialHairType?: InputMaybe<Scalars['String']>;
  graphicType?: InputMaybe<Scalars['String']>;
  hairColor?: InputMaybe<Scalars['String']>;
  hatColor?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  mouthType?: InputMaybe<Scalars['String']>;
  skinColor?: InputMaybe<Scalars['String']>;
  topType?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type UserAvatarCreateNestedOneWithoutUserInput = {
  connect?: InputMaybe<UserAvatarWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserAvatarCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<UserAvatarCreateWithoutUserInput>;
};

export type UserAvatarCreateOrConnectWithoutUserInput = {
  create: UserAvatarCreateWithoutUserInput;
  where: UserAvatarWhereUniqueInput;
};

export type UserAvatarCreateWithoutUserInput = {
  accessoriesType?: InputMaybe<Scalars['String']>;
  avatarStyle?: InputMaybe<Scalars['String']>;
  clotheColor?: InputMaybe<Scalars['String']>;
  clotheType?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  eyeType?: InputMaybe<Scalars['String']>;
  eyebrowType?: InputMaybe<Scalars['String']>;
  facialHairColor?: InputMaybe<Scalars['String']>;
  facialHairType?: InputMaybe<Scalars['String']>;
  graphicType?: InputMaybe<Scalars['String']>;
  hairColor?: InputMaybe<Scalars['String']>;
  hatColor?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  mouthType?: InputMaybe<Scalars['String']>;
  skinColor?: InputMaybe<Scalars['String']>;
  topType?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type UserAvatarGroupBy = {
  __typename?: 'UserAvatarGroupBy';
  _count?: Maybe<UserAvatarCountAggregate>;
  _max?: Maybe<UserAvatarMaxAggregate>;
  _min?: Maybe<UserAvatarMinAggregate>;
  accessoriesType?: Maybe<Scalars['String']>;
  avatarStyle?: Maybe<Scalars['String']>;
  clotheColor?: Maybe<Scalars['String']>;
  clotheType?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  eyeType?: Maybe<Scalars['String']>;
  eyebrowType?: Maybe<Scalars['String']>;
  facialHairColor?: Maybe<Scalars['String']>;
  facialHairType?: Maybe<Scalars['String']>;
  graphicType?: Maybe<Scalars['String']>;
  hairColor?: Maybe<Scalars['String']>;
  hatColor?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  mouthType?: Maybe<Scalars['String']>;
  skinColor?: Maybe<Scalars['String']>;
  topType?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type UserAvatarMaxAggregate = {
  __typename?: 'UserAvatarMaxAggregate';
  accessoriesType?: Maybe<Scalars['String']>;
  avatarStyle?: Maybe<Scalars['String']>;
  clotheColor?: Maybe<Scalars['String']>;
  clotheType?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  eyeType?: Maybe<Scalars['String']>;
  eyebrowType?: Maybe<Scalars['String']>;
  facialHairColor?: Maybe<Scalars['String']>;
  facialHairType?: Maybe<Scalars['String']>;
  graphicType?: Maybe<Scalars['String']>;
  hairColor?: Maybe<Scalars['String']>;
  hatColor?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  mouthType?: Maybe<Scalars['String']>;
  skinColor?: Maybe<Scalars['String']>;
  topType?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserAvatarMaxOrderByAggregateInput = {
  accessoriesType?: InputMaybe<SortOrder>;
  avatarStyle?: InputMaybe<SortOrder>;
  clotheColor?: InputMaybe<SortOrder>;
  clotheType?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  eyeType?: InputMaybe<SortOrder>;
  eyebrowType?: InputMaybe<SortOrder>;
  facialHairColor?: InputMaybe<SortOrder>;
  facialHairType?: InputMaybe<SortOrder>;
  graphicType?: InputMaybe<SortOrder>;
  hairColor?: InputMaybe<SortOrder>;
  hatColor?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  mouthType?: InputMaybe<SortOrder>;
  skinColor?: InputMaybe<SortOrder>;
  topType?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type UserAvatarMinAggregate = {
  __typename?: 'UserAvatarMinAggregate';
  accessoriesType?: Maybe<Scalars['String']>;
  avatarStyle?: Maybe<Scalars['String']>;
  clotheColor?: Maybe<Scalars['String']>;
  clotheType?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  eyeType?: Maybe<Scalars['String']>;
  eyebrowType?: Maybe<Scalars['String']>;
  facialHairColor?: Maybe<Scalars['String']>;
  facialHairType?: Maybe<Scalars['String']>;
  graphicType?: Maybe<Scalars['String']>;
  hairColor?: Maybe<Scalars['String']>;
  hatColor?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  mouthType?: Maybe<Scalars['String']>;
  skinColor?: Maybe<Scalars['String']>;
  topType?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserAvatarMinOrderByAggregateInput = {
  accessoriesType?: InputMaybe<SortOrder>;
  avatarStyle?: InputMaybe<SortOrder>;
  clotheColor?: InputMaybe<SortOrder>;
  clotheType?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  eyeType?: InputMaybe<SortOrder>;
  eyebrowType?: InputMaybe<SortOrder>;
  facialHairColor?: InputMaybe<SortOrder>;
  facialHairType?: InputMaybe<SortOrder>;
  graphicType?: InputMaybe<SortOrder>;
  hairColor?: InputMaybe<SortOrder>;
  hatColor?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  mouthType?: InputMaybe<SortOrder>;
  skinColor?: InputMaybe<SortOrder>;
  topType?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type UserAvatarOrderByWithAggregationInput = {
  _count?: InputMaybe<UserAvatarCountOrderByAggregateInput>;
  _max?: InputMaybe<UserAvatarMaxOrderByAggregateInput>;
  _min?: InputMaybe<UserAvatarMinOrderByAggregateInput>;
  accessoriesType?: InputMaybe<SortOrder>;
  avatarStyle?: InputMaybe<SortOrder>;
  clotheColor?: InputMaybe<SortOrder>;
  clotheType?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  eyeType?: InputMaybe<SortOrder>;
  eyebrowType?: InputMaybe<SortOrder>;
  facialHairColor?: InputMaybe<SortOrder>;
  facialHairType?: InputMaybe<SortOrder>;
  graphicType?: InputMaybe<SortOrder>;
  hairColor?: InputMaybe<SortOrder>;
  hatColor?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  mouthType?: InputMaybe<SortOrder>;
  skinColor?: InputMaybe<SortOrder>;
  topType?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type UserAvatarOrderByWithRelationInput = {
  accessoriesType?: InputMaybe<SortOrder>;
  avatarStyle?: InputMaybe<SortOrder>;
  clotheColor?: InputMaybe<SortOrder>;
  clotheType?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  eyeType?: InputMaybe<SortOrder>;
  eyebrowType?: InputMaybe<SortOrder>;
  facialHairColor?: InputMaybe<SortOrder>;
  facialHairType?: InputMaybe<SortOrder>;
  graphicType?: InputMaybe<SortOrder>;
  hairColor?: InputMaybe<SortOrder>;
  hatColor?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  mouthType?: InputMaybe<SortOrder>;
  skinColor?: InputMaybe<SortOrder>;
  topType?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
};

export type UserAvatarRelationFilter = {
  is?: InputMaybe<UserAvatarWhereInput>;
  isNot?: InputMaybe<UserAvatarWhereInput>;
};

export enum UserAvatarScalarFieldEnum {
  AccessoriesType = 'accessoriesType',
  AvatarStyle = 'avatarStyle',
  ClotheColor = 'clotheColor',
  ClotheType = 'clotheType',
  CreatedAt = 'createdAt',
  EyeType = 'eyeType',
  EyebrowType = 'eyebrowType',
  FacialHairColor = 'facialHairColor',
  FacialHairType = 'facialHairType',
  GraphicType = 'graphicType',
  HairColor = 'hairColor',
  HatColor = 'hatColor',
  Id = 'id',
  MouthType = 'mouthType',
  SkinColor = 'skinColor',
  TopType = 'topType',
  UpdatedAt = 'updatedAt'
}

export type UserAvatarScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<UserAvatarScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<UserAvatarScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<UserAvatarScalarWhereWithAggregatesInput>>;
  accessoriesType?: InputMaybe<StringNullableWithAggregatesFilter>;
  avatarStyle?: InputMaybe<StringNullableWithAggregatesFilter>;
  clotheColor?: InputMaybe<StringNullableWithAggregatesFilter>;
  clotheType?: InputMaybe<StringNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  eyeType?: InputMaybe<StringNullableWithAggregatesFilter>;
  eyebrowType?: InputMaybe<StringNullableWithAggregatesFilter>;
  facialHairColor?: InputMaybe<StringNullableWithAggregatesFilter>;
  facialHairType?: InputMaybe<StringNullableWithAggregatesFilter>;
  graphicType?: InputMaybe<StringNullableWithAggregatesFilter>;
  hairColor?: InputMaybe<StringNullableWithAggregatesFilter>;
  hatColor?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  mouthType?: InputMaybe<StringNullableWithAggregatesFilter>;
  skinColor?: InputMaybe<StringNullableWithAggregatesFilter>;
  topType?: InputMaybe<StringNullableWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type UserAvatarUpdateInput = {
  accessoriesType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  avatarStyle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  clotheColor?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  clotheType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  eyeType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  eyebrowType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  facialHairColor?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  facialHairType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  graphicType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  hairColor?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  hatColor?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mouthType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  skinColor?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  topType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneWithoutAvatarInput>;
};

export type UserAvatarUpdateManyMutationInput = {
  accessoriesType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  avatarStyle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  clotheColor?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  clotheType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  eyeType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  eyebrowType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  facialHairColor?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  facialHairType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  graphicType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  hairColor?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  hatColor?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mouthType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  skinColor?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  topType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type UserAvatarUpdateOneWithoutUserInput = {
  connect?: InputMaybe<UserAvatarWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserAvatarCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<UserAvatarCreateWithoutUserInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<UserAvatarUpdateWithoutUserInput>;
  upsert?: InputMaybe<UserAvatarUpsertWithoutUserInput>;
};

export type UserAvatarUpdateWithoutUserInput = {
  accessoriesType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  avatarStyle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  clotheColor?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  clotheType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  eyeType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  eyebrowType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  facialHairColor?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  facialHairType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  graphicType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  hairColor?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  hatColor?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  mouthType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  skinColor?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  topType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type UserAvatarUpsertWithoutUserInput = {
  create: UserAvatarCreateWithoutUserInput;
  update: UserAvatarUpdateWithoutUserInput;
};

export type UserAvatarWhereInput = {
  AND?: InputMaybe<Array<UserAvatarWhereInput>>;
  NOT?: InputMaybe<Array<UserAvatarWhereInput>>;
  OR?: InputMaybe<Array<UserAvatarWhereInput>>;
  accessoriesType?: InputMaybe<StringNullableFilter>;
  avatarStyle?: InputMaybe<StringNullableFilter>;
  clotheColor?: InputMaybe<StringNullableFilter>;
  clotheType?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  eyeType?: InputMaybe<StringNullableFilter>;
  eyebrowType?: InputMaybe<StringNullableFilter>;
  facialHairColor?: InputMaybe<StringNullableFilter>;
  facialHairType?: InputMaybe<StringNullableFilter>;
  graphicType?: InputMaybe<StringNullableFilter>;
  hairColor?: InputMaybe<StringNullableFilter>;
  hatColor?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  mouthType?: InputMaybe<StringNullableFilter>;
  skinColor?: InputMaybe<StringNullableFilter>;
  topType?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
};

export type UserAvatarWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type UserAvgAggregate = {
  __typename?: 'UserAvgAggregate';
  points?: Maybe<Scalars['Float']>;
};

export type UserAvgOrderByAggregateInput = {
  points?: InputMaybe<SortOrder>;
};

export type UserCount = {
  __typename?: 'UserCount';
  books: Scalars['Int'];
  chatRecipient: Scalars['Int'];
  chatSender: Scalars['Int'];
  createdBooks: Scalars['Int'];
  notifications: Scalars['Int'];
  sends: Scalars['Int'];
  swaps: Scalars['Int'];
  waiting: Scalars['Int'];
};

export type UserCountAggregate = {
  __typename?: 'UserCountAggregate';
  _all: Scalars['Int'];
  avatarId: Scalars['Int'];
  city: Scalars['Int'];
  createdAt: Scalars['Int'];
  email: Scalars['Int'];
  firstName: Scalars['Int'];
  id: Scalars['Int'];
  lastName: Scalars['Int'];
  password: Scalars['Int'];
  phone: Scalars['Int'];
  points: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type UserCountOrderByAggregateInput = {
  avatarId?: InputMaybe<SortOrder>;
  city?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  phone?: InputMaybe<SortOrder>;
  points?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type UserCreateInput = {
  avatar?: InputMaybe<UserAvatarCreateNestedOneWithoutUserInput>;
  books?: InputMaybe<BookCreateNestedManyWithoutHolderInput>;
  chatRecipient?: InputMaybe<ChatCreateNestedManyWithoutRecipientInput>;
  chatSender?: InputMaybe<ChatCreateNestedManyWithoutSenderInput>;
  city?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBooks?: InputMaybe<BookCreateNestedManyWithoutCreatorInput>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  points?: InputMaybe<Scalars['Int']>;
  sends?: InputMaybe<SwapCreateNestedManyWithoutSenderInput>;
  swaps?: InputMaybe<SwapCreateNestedManyWithoutRecipientInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  waiting?: InputMaybe<UserWaitsBookEditionCreateNestedManyWithoutUserInput>;
};

export type UserCreateManyInput = {
  avatarId?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  points?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type UserCreateNestedOneWithoutAvatarInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutAvatarInput>;
  create?: InputMaybe<UserCreateWithoutAvatarInput>;
};

export type UserCreateNestedOneWithoutBooksInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutBooksInput>;
  create?: InputMaybe<UserCreateWithoutBooksInput>;
};

export type UserCreateNestedOneWithoutChatRecipientInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutChatRecipientInput>;
  create?: InputMaybe<UserCreateWithoutChatRecipientInput>;
};

export type UserCreateNestedOneWithoutChatSenderInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutChatSenderInput>;
  create?: InputMaybe<UserCreateWithoutChatSenderInput>;
};

export type UserCreateNestedOneWithoutCreatedBooksInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutCreatedBooksInput>;
  create?: InputMaybe<UserCreateWithoutCreatedBooksInput>;
};

export type UserCreateNestedOneWithoutNotificationsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutNotificationsInput>;
  create?: InputMaybe<UserCreateWithoutNotificationsInput>;
};

export type UserCreateNestedOneWithoutSendsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutSendsInput>;
  create?: InputMaybe<UserCreateWithoutSendsInput>;
};

export type UserCreateNestedOneWithoutSwapsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutSwapsInput>;
  create?: InputMaybe<UserCreateWithoutSwapsInput>;
};

export type UserCreateNestedOneWithoutWaitingInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutWaitingInput>;
  create?: InputMaybe<UserCreateWithoutWaitingInput>;
};

export type UserCreateOrConnectWithoutAvatarInput = {
  create: UserCreateWithoutAvatarInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutBooksInput = {
  create: UserCreateWithoutBooksInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutChatRecipientInput = {
  create: UserCreateWithoutChatRecipientInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutChatSenderInput = {
  create: UserCreateWithoutChatSenderInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutCreatedBooksInput = {
  create: UserCreateWithoutCreatedBooksInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutNotificationsInput = {
  create: UserCreateWithoutNotificationsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutSendsInput = {
  create: UserCreateWithoutSendsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutSwapsInput = {
  create: UserCreateWithoutSwapsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutWaitingInput = {
  create: UserCreateWithoutWaitingInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutAvatarInput = {
  books?: InputMaybe<BookCreateNestedManyWithoutHolderInput>;
  chatRecipient?: InputMaybe<ChatCreateNestedManyWithoutRecipientInput>;
  chatSender?: InputMaybe<ChatCreateNestedManyWithoutSenderInput>;
  city?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBooks?: InputMaybe<BookCreateNestedManyWithoutCreatorInput>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  points?: InputMaybe<Scalars['Int']>;
  sends?: InputMaybe<SwapCreateNestedManyWithoutSenderInput>;
  swaps?: InputMaybe<SwapCreateNestedManyWithoutRecipientInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  waiting?: InputMaybe<UserWaitsBookEditionCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutBooksInput = {
  avatar?: InputMaybe<UserAvatarCreateNestedOneWithoutUserInput>;
  chatRecipient?: InputMaybe<ChatCreateNestedManyWithoutRecipientInput>;
  chatSender?: InputMaybe<ChatCreateNestedManyWithoutSenderInput>;
  city?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBooks?: InputMaybe<BookCreateNestedManyWithoutCreatorInput>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  points?: InputMaybe<Scalars['Int']>;
  sends?: InputMaybe<SwapCreateNestedManyWithoutSenderInput>;
  swaps?: InputMaybe<SwapCreateNestedManyWithoutRecipientInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  waiting?: InputMaybe<UserWaitsBookEditionCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutChatRecipientInput = {
  avatar?: InputMaybe<UserAvatarCreateNestedOneWithoutUserInput>;
  books?: InputMaybe<BookCreateNestedManyWithoutHolderInput>;
  chatSender?: InputMaybe<ChatCreateNestedManyWithoutSenderInput>;
  city?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBooks?: InputMaybe<BookCreateNestedManyWithoutCreatorInput>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  points?: InputMaybe<Scalars['Int']>;
  sends?: InputMaybe<SwapCreateNestedManyWithoutSenderInput>;
  swaps?: InputMaybe<SwapCreateNestedManyWithoutRecipientInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  waiting?: InputMaybe<UserWaitsBookEditionCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutChatSenderInput = {
  avatar?: InputMaybe<UserAvatarCreateNestedOneWithoutUserInput>;
  books?: InputMaybe<BookCreateNestedManyWithoutHolderInput>;
  chatRecipient?: InputMaybe<ChatCreateNestedManyWithoutRecipientInput>;
  city?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBooks?: InputMaybe<BookCreateNestedManyWithoutCreatorInput>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  points?: InputMaybe<Scalars['Int']>;
  sends?: InputMaybe<SwapCreateNestedManyWithoutSenderInput>;
  swaps?: InputMaybe<SwapCreateNestedManyWithoutRecipientInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  waiting?: InputMaybe<UserWaitsBookEditionCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutCreatedBooksInput = {
  avatar?: InputMaybe<UserAvatarCreateNestedOneWithoutUserInput>;
  books?: InputMaybe<BookCreateNestedManyWithoutHolderInput>;
  chatRecipient?: InputMaybe<ChatCreateNestedManyWithoutRecipientInput>;
  chatSender?: InputMaybe<ChatCreateNestedManyWithoutSenderInput>;
  city?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  points?: InputMaybe<Scalars['Int']>;
  sends?: InputMaybe<SwapCreateNestedManyWithoutSenderInput>;
  swaps?: InputMaybe<SwapCreateNestedManyWithoutRecipientInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  waiting?: InputMaybe<UserWaitsBookEditionCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutNotificationsInput = {
  avatar?: InputMaybe<UserAvatarCreateNestedOneWithoutUserInput>;
  books?: InputMaybe<BookCreateNestedManyWithoutHolderInput>;
  chatRecipient?: InputMaybe<ChatCreateNestedManyWithoutRecipientInput>;
  chatSender?: InputMaybe<ChatCreateNestedManyWithoutSenderInput>;
  city?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBooks?: InputMaybe<BookCreateNestedManyWithoutCreatorInput>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  points?: InputMaybe<Scalars['Int']>;
  sends?: InputMaybe<SwapCreateNestedManyWithoutSenderInput>;
  swaps?: InputMaybe<SwapCreateNestedManyWithoutRecipientInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  waiting?: InputMaybe<UserWaitsBookEditionCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutSendsInput = {
  avatar?: InputMaybe<UserAvatarCreateNestedOneWithoutUserInput>;
  books?: InputMaybe<BookCreateNestedManyWithoutHolderInput>;
  chatRecipient?: InputMaybe<ChatCreateNestedManyWithoutRecipientInput>;
  chatSender?: InputMaybe<ChatCreateNestedManyWithoutSenderInput>;
  city?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBooks?: InputMaybe<BookCreateNestedManyWithoutCreatorInput>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  points?: InputMaybe<Scalars['Int']>;
  swaps?: InputMaybe<SwapCreateNestedManyWithoutRecipientInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  waiting?: InputMaybe<UserWaitsBookEditionCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutSwapsInput = {
  avatar?: InputMaybe<UserAvatarCreateNestedOneWithoutUserInput>;
  books?: InputMaybe<BookCreateNestedManyWithoutHolderInput>;
  chatRecipient?: InputMaybe<ChatCreateNestedManyWithoutRecipientInput>;
  chatSender?: InputMaybe<ChatCreateNestedManyWithoutSenderInput>;
  city?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBooks?: InputMaybe<BookCreateNestedManyWithoutCreatorInput>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  points?: InputMaybe<Scalars['Int']>;
  sends?: InputMaybe<SwapCreateNestedManyWithoutSenderInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  waiting?: InputMaybe<UserWaitsBookEditionCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutWaitingInput = {
  avatar?: InputMaybe<UserAvatarCreateNestedOneWithoutUserInput>;
  books?: InputMaybe<BookCreateNestedManyWithoutHolderInput>;
  chatRecipient?: InputMaybe<ChatCreateNestedManyWithoutRecipientInput>;
  chatSender?: InputMaybe<ChatCreateNestedManyWithoutSenderInput>;
  city?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBooks?: InputMaybe<BookCreateNestedManyWithoutCreatorInput>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  points?: InputMaybe<Scalars['Int']>;
  sends?: InputMaybe<SwapCreateNestedManyWithoutSenderInput>;
  swaps?: InputMaybe<SwapCreateNestedManyWithoutRecipientInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type UserGroupBy = {
  __typename?: 'UserGroupBy';
  _avg?: Maybe<UserAvgAggregate>;
  _count?: Maybe<UserCountAggregate>;
  _max?: Maybe<UserMaxAggregate>;
  _min?: Maybe<UserMinAggregate>;
  _sum?: Maybe<UserSumAggregate>;
  avatarId?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  points: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type UserMaxAggregate = {
  __typename?: 'UserMaxAggregate';
  avatarId?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  points?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserMaxOrderByAggregateInput = {
  avatarId?: InputMaybe<SortOrder>;
  city?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  phone?: InputMaybe<SortOrder>;
  points?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type UserMinAggregate = {
  __typename?: 'UserMinAggregate';
  avatarId?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  points?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserMinOrderByAggregateInput = {
  avatarId?: InputMaybe<SortOrder>;
  city?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  phone?: InputMaybe<SortOrder>;
  points?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type UserOrderByWithAggregationInput = {
  _avg?: InputMaybe<UserAvgOrderByAggregateInput>;
  _count?: InputMaybe<UserCountOrderByAggregateInput>;
  _max?: InputMaybe<UserMaxOrderByAggregateInput>;
  _min?: InputMaybe<UserMinOrderByAggregateInput>;
  _sum?: InputMaybe<UserSumOrderByAggregateInput>;
  avatarId?: InputMaybe<SortOrder>;
  city?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  phone?: InputMaybe<SortOrder>;
  points?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type UserOrderByWithRelationInput = {
  avatar?: InputMaybe<UserAvatarOrderByWithRelationInput>;
  avatarId?: InputMaybe<SortOrder>;
  books?: InputMaybe<BookOrderByRelationAggregateInput>;
  chatRecipient?: InputMaybe<ChatOrderByRelationAggregateInput>;
  chatSender?: InputMaybe<ChatOrderByRelationAggregateInput>;
  city?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  createdBooks?: InputMaybe<BookOrderByRelationAggregateInput>;
  email?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrder>;
  notifications?: InputMaybe<NotificationOrderByRelationAggregateInput>;
  password?: InputMaybe<SortOrder>;
  phone?: InputMaybe<SortOrder>;
  points?: InputMaybe<SortOrder>;
  sends?: InputMaybe<SwapOrderByRelationAggregateInput>;
  swaps?: InputMaybe<SwapOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  waiting?: InputMaybe<UserWaitsBookEditionOrderByRelationAggregateInput>;
};

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  status: ResponseStatus;
  user?: Maybe<User>;
};

export enum UserScalarFieldEnum {
  AvatarId = 'avatarId',
  City = 'city',
  CreatedAt = 'createdAt',
  Email = 'email',
  FirstName = 'firstName',
  Id = 'id',
  LastName = 'lastName',
  Password = 'password',
  Phone = 'phone',
  Points = 'points',
  UpdatedAt = 'updatedAt'
}

export type UserScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<UserScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<UserScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<UserScalarWhereWithAggregatesInput>>;
  avatarId?: InputMaybe<StringNullableWithAggregatesFilter>;
  city?: InputMaybe<StringNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  email?: InputMaybe<StringWithAggregatesFilter>;
  firstName?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  lastName?: InputMaybe<StringNullableWithAggregatesFilter>;
  password?: InputMaybe<StringWithAggregatesFilter>;
  phone?: InputMaybe<StringNullableWithAggregatesFilter>;
  points?: InputMaybe<IntWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type UserSumAggregate = {
  __typename?: 'UserSumAggregate';
  points?: Maybe<Scalars['Int']>;
};

export type UserSumOrderByAggregateInput = {
  points?: InputMaybe<SortOrder>;
};

export type UserUpdateInput = {
  avatar?: InputMaybe<UserAvatarUpdateOneWithoutUserInput>;
  books?: InputMaybe<BookUpdateManyWithoutHolderInput>;
  chatRecipient?: InputMaybe<ChatUpdateManyWithoutRecipientInput>;
  chatSender?: InputMaybe<ChatUpdateManyWithoutSenderInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBooks?: InputMaybe<BookUpdateManyWithoutCreatorInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutUserInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  points?: InputMaybe<IntFieldUpdateOperationsInput>;
  sends?: InputMaybe<SwapUpdateManyWithoutSenderInput>;
  swaps?: InputMaybe<SwapUpdateManyWithoutRecipientInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  waiting?: InputMaybe<UserWaitsBookEditionUpdateManyWithoutUserInput>;
};

export type UserUpdateManyMutationInput = {
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  points?: InputMaybe<IntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type UserUpdateOneRequiredWithoutBooksInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutBooksInput>;
  create?: InputMaybe<UserCreateWithoutBooksInput>;
  update?: InputMaybe<UserUpdateWithoutBooksInput>;
  upsert?: InputMaybe<UserUpsertWithoutBooksInput>;
};

export type UserUpdateOneRequiredWithoutChatRecipientInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutChatRecipientInput>;
  create?: InputMaybe<UserCreateWithoutChatRecipientInput>;
  update?: InputMaybe<UserUpdateWithoutChatRecipientInput>;
  upsert?: InputMaybe<UserUpsertWithoutChatRecipientInput>;
};

export type UserUpdateOneRequiredWithoutChatSenderInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutChatSenderInput>;
  create?: InputMaybe<UserCreateWithoutChatSenderInput>;
  update?: InputMaybe<UserUpdateWithoutChatSenderInput>;
  upsert?: InputMaybe<UserUpsertWithoutChatSenderInput>;
};

export type UserUpdateOneRequiredWithoutCreatedBooksInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutCreatedBooksInput>;
  create?: InputMaybe<UserCreateWithoutCreatedBooksInput>;
  update?: InputMaybe<UserUpdateWithoutCreatedBooksInput>;
  upsert?: InputMaybe<UserUpsertWithoutCreatedBooksInput>;
};

export type UserUpdateOneRequiredWithoutNotificationsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutNotificationsInput>;
  create?: InputMaybe<UserCreateWithoutNotificationsInput>;
  update?: InputMaybe<UserUpdateWithoutNotificationsInput>;
  upsert?: InputMaybe<UserUpsertWithoutNotificationsInput>;
};

export type UserUpdateOneRequiredWithoutSendsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutSendsInput>;
  create?: InputMaybe<UserCreateWithoutSendsInput>;
  update?: InputMaybe<UserUpdateWithoutSendsInput>;
  upsert?: InputMaybe<UserUpsertWithoutSendsInput>;
};

export type UserUpdateOneRequiredWithoutSwapsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutSwapsInput>;
  create?: InputMaybe<UserCreateWithoutSwapsInput>;
  update?: InputMaybe<UserUpdateWithoutSwapsInput>;
  upsert?: InputMaybe<UserUpsertWithoutSwapsInput>;
};

export type UserUpdateOneRequiredWithoutWaitingInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutWaitingInput>;
  create?: InputMaybe<UserCreateWithoutWaitingInput>;
  update?: InputMaybe<UserUpdateWithoutWaitingInput>;
  upsert?: InputMaybe<UserUpsertWithoutWaitingInput>;
};

export type UserUpdateOneWithoutAvatarInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutAvatarInput>;
  create?: InputMaybe<UserCreateWithoutAvatarInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<UserUpdateWithoutAvatarInput>;
  upsert?: InputMaybe<UserUpsertWithoutAvatarInput>;
};

export type UserUpdateWithoutAvatarInput = {
  books?: InputMaybe<BookUpdateManyWithoutHolderInput>;
  chatRecipient?: InputMaybe<ChatUpdateManyWithoutRecipientInput>;
  chatSender?: InputMaybe<ChatUpdateManyWithoutSenderInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBooks?: InputMaybe<BookUpdateManyWithoutCreatorInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutUserInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  points?: InputMaybe<IntFieldUpdateOperationsInput>;
  sends?: InputMaybe<SwapUpdateManyWithoutSenderInput>;
  swaps?: InputMaybe<SwapUpdateManyWithoutRecipientInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  waiting?: InputMaybe<UserWaitsBookEditionUpdateManyWithoutUserInput>;
};

export type UserUpdateWithoutBooksInput = {
  avatar?: InputMaybe<UserAvatarUpdateOneWithoutUserInput>;
  chatRecipient?: InputMaybe<ChatUpdateManyWithoutRecipientInput>;
  chatSender?: InputMaybe<ChatUpdateManyWithoutSenderInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBooks?: InputMaybe<BookUpdateManyWithoutCreatorInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutUserInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  points?: InputMaybe<IntFieldUpdateOperationsInput>;
  sends?: InputMaybe<SwapUpdateManyWithoutSenderInput>;
  swaps?: InputMaybe<SwapUpdateManyWithoutRecipientInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  waiting?: InputMaybe<UserWaitsBookEditionUpdateManyWithoutUserInput>;
};

export type UserUpdateWithoutChatRecipientInput = {
  avatar?: InputMaybe<UserAvatarUpdateOneWithoutUserInput>;
  books?: InputMaybe<BookUpdateManyWithoutHolderInput>;
  chatSender?: InputMaybe<ChatUpdateManyWithoutSenderInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBooks?: InputMaybe<BookUpdateManyWithoutCreatorInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutUserInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  points?: InputMaybe<IntFieldUpdateOperationsInput>;
  sends?: InputMaybe<SwapUpdateManyWithoutSenderInput>;
  swaps?: InputMaybe<SwapUpdateManyWithoutRecipientInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  waiting?: InputMaybe<UserWaitsBookEditionUpdateManyWithoutUserInput>;
};

export type UserUpdateWithoutChatSenderInput = {
  avatar?: InputMaybe<UserAvatarUpdateOneWithoutUserInput>;
  books?: InputMaybe<BookUpdateManyWithoutHolderInput>;
  chatRecipient?: InputMaybe<ChatUpdateManyWithoutRecipientInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBooks?: InputMaybe<BookUpdateManyWithoutCreatorInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutUserInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  points?: InputMaybe<IntFieldUpdateOperationsInput>;
  sends?: InputMaybe<SwapUpdateManyWithoutSenderInput>;
  swaps?: InputMaybe<SwapUpdateManyWithoutRecipientInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  waiting?: InputMaybe<UserWaitsBookEditionUpdateManyWithoutUserInput>;
};

export type UserUpdateWithoutCreatedBooksInput = {
  avatar?: InputMaybe<UserAvatarUpdateOneWithoutUserInput>;
  books?: InputMaybe<BookUpdateManyWithoutHolderInput>;
  chatRecipient?: InputMaybe<ChatUpdateManyWithoutRecipientInput>;
  chatSender?: InputMaybe<ChatUpdateManyWithoutSenderInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutUserInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  points?: InputMaybe<IntFieldUpdateOperationsInput>;
  sends?: InputMaybe<SwapUpdateManyWithoutSenderInput>;
  swaps?: InputMaybe<SwapUpdateManyWithoutRecipientInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  waiting?: InputMaybe<UserWaitsBookEditionUpdateManyWithoutUserInput>;
};

export type UserUpdateWithoutNotificationsInput = {
  avatar?: InputMaybe<UserAvatarUpdateOneWithoutUserInput>;
  books?: InputMaybe<BookUpdateManyWithoutHolderInput>;
  chatRecipient?: InputMaybe<ChatUpdateManyWithoutRecipientInput>;
  chatSender?: InputMaybe<ChatUpdateManyWithoutSenderInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBooks?: InputMaybe<BookUpdateManyWithoutCreatorInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  points?: InputMaybe<IntFieldUpdateOperationsInput>;
  sends?: InputMaybe<SwapUpdateManyWithoutSenderInput>;
  swaps?: InputMaybe<SwapUpdateManyWithoutRecipientInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  waiting?: InputMaybe<UserWaitsBookEditionUpdateManyWithoutUserInput>;
};

export type UserUpdateWithoutSendsInput = {
  avatar?: InputMaybe<UserAvatarUpdateOneWithoutUserInput>;
  books?: InputMaybe<BookUpdateManyWithoutHolderInput>;
  chatRecipient?: InputMaybe<ChatUpdateManyWithoutRecipientInput>;
  chatSender?: InputMaybe<ChatUpdateManyWithoutSenderInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBooks?: InputMaybe<BookUpdateManyWithoutCreatorInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutUserInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  points?: InputMaybe<IntFieldUpdateOperationsInput>;
  swaps?: InputMaybe<SwapUpdateManyWithoutRecipientInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  waiting?: InputMaybe<UserWaitsBookEditionUpdateManyWithoutUserInput>;
};

export type UserUpdateWithoutSwapsInput = {
  avatar?: InputMaybe<UserAvatarUpdateOneWithoutUserInput>;
  books?: InputMaybe<BookUpdateManyWithoutHolderInput>;
  chatRecipient?: InputMaybe<ChatUpdateManyWithoutRecipientInput>;
  chatSender?: InputMaybe<ChatUpdateManyWithoutSenderInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBooks?: InputMaybe<BookUpdateManyWithoutCreatorInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutUserInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  points?: InputMaybe<IntFieldUpdateOperationsInput>;
  sends?: InputMaybe<SwapUpdateManyWithoutSenderInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  waiting?: InputMaybe<UserWaitsBookEditionUpdateManyWithoutUserInput>;
};

export type UserUpdateWithoutWaitingInput = {
  avatar?: InputMaybe<UserAvatarUpdateOneWithoutUserInput>;
  books?: InputMaybe<BookUpdateManyWithoutHolderInput>;
  chatRecipient?: InputMaybe<ChatUpdateManyWithoutRecipientInput>;
  chatSender?: InputMaybe<ChatUpdateManyWithoutSenderInput>;
  city?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBooks?: InputMaybe<BookUpdateManyWithoutCreatorInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutUserInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  points?: InputMaybe<IntFieldUpdateOperationsInput>;
  sends?: InputMaybe<SwapUpdateManyWithoutSenderInput>;
  swaps?: InputMaybe<SwapUpdateManyWithoutRecipientInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type UserUpsertWithoutAvatarInput = {
  create: UserCreateWithoutAvatarInput;
  update: UserUpdateWithoutAvatarInput;
};

export type UserUpsertWithoutBooksInput = {
  create: UserCreateWithoutBooksInput;
  update: UserUpdateWithoutBooksInput;
};

export type UserUpsertWithoutChatRecipientInput = {
  create: UserCreateWithoutChatRecipientInput;
  update: UserUpdateWithoutChatRecipientInput;
};

export type UserUpsertWithoutChatSenderInput = {
  create: UserCreateWithoutChatSenderInput;
  update: UserUpdateWithoutChatSenderInput;
};

export type UserUpsertWithoutCreatedBooksInput = {
  create: UserCreateWithoutCreatedBooksInput;
  update: UserUpdateWithoutCreatedBooksInput;
};

export type UserUpsertWithoutNotificationsInput = {
  create: UserCreateWithoutNotificationsInput;
  update: UserUpdateWithoutNotificationsInput;
};

export type UserUpsertWithoutSendsInput = {
  create: UserCreateWithoutSendsInput;
  update: UserUpdateWithoutSendsInput;
};

export type UserUpsertWithoutSwapsInput = {
  create: UserCreateWithoutSwapsInput;
  update: UserUpdateWithoutSwapsInput;
};

export type UserUpsertWithoutWaitingInput = {
  create: UserCreateWithoutWaitingInput;
  update: UserUpdateWithoutWaitingInput;
};

export type UserWaitsBookEdition = {
  __typename?: 'UserWaitsBookEdition';
  assignedAt: Scalars['DateTime'];
  edition: BookEdition;
  editionId: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type UserWaitsBookEditionCountAggregate = {
  __typename?: 'UserWaitsBookEditionCountAggregate';
  _all: Scalars['Int'];
  assignedAt: Scalars['Int'];
  editionId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type UserWaitsBookEditionCountOrderByAggregateInput = {
  assignedAt?: InputMaybe<SortOrder>;
  editionId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type UserWaitsBookEditionCreateInput = {
  assignedAt?: InputMaybe<Scalars['DateTime']>;
  edition: BookEditionCreateNestedOneWithoutExpectsInput;
  user: UserCreateNestedOneWithoutWaitingInput;
};

export type UserWaitsBookEditionCreateManyEditionInput = {
  assignedAt?: InputMaybe<Scalars['DateTime']>;
  userId: Scalars['String'];
};

export type UserWaitsBookEditionCreateManyEditionInputEnvelope = {
  data: Array<UserWaitsBookEditionCreateManyEditionInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type UserWaitsBookEditionCreateManyInput = {
  assignedAt?: InputMaybe<Scalars['DateTime']>;
  editionId: Scalars['String'];
  userId: Scalars['String'];
};

export type UserWaitsBookEditionCreateManyUserInput = {
  assignedAt?: InputMaybe<Scalars['DateTime']>;
  editionId: Scalars['String'];
};

export type UserWaitsBookEditionCreateManyUserInputEnvelope = {
  data: Array<UserWaitsBookEditionCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type UserWaitsBookEditionCreateNestedManyWithoutEditionInput = {
  connect?: InputMaybe<Array<UserWaitsBookEditionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserWaitsBookEditionCreateOrConnectWithoutEditionInput>>;
  create?: InputMaybe<Array<UserWaitsBookEditionCreateWithoutEditionInput>>;
  createMany?: InputMaybe<UserWaitsBookEditionCreateManyEditionInputEnvelope>;
};

export type UserWaitsBookEditionCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<UserWaitsBookEditionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserWaitsBookEditionCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<UserWaitsBookEditionCreateWithoutUserInput>>;
  createMany?: InputMaybe<UserWaitsBookEditionCreateManyUserInputEnvelope>;
};

export type UserWaitsBookEditionCreateOrConnectWithoutEditionInput = {
  create: UserWaitsBookEditionCreateWithoutEditionInput;
  where: UserWaitsBookEditionWhereUniqueInput;
};

export type UserWaitsBookEditionCreateOrConnectWithoutUserInput = {
  create: UserWaitsBookEditionCreateWithoutUserInput;
  where: UserWaitsBookEditionWhereUniqueInput;
};

export type UserWaitsBookEditionCreateWithoutEditionInput = {
  assignedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutWaitingInput;
};

export type UserWaitsBookEditionCreateWithoutUserInput = {
  assignedAt?: InputMaybe<Scalars['DateTime']>;
  edition: BookEditionCreateNestedOneWithoutExpectsInput;
};

export type UserWaitsBookEditionGroupBy = {
  __typename?: 'UserWaitsBookEditionGroupBy';
  _count?: Maybe<UserWaitsBookEditionCountAggregate>;
  _max?: Maybe<UserWaitsBookEditionMaxAggregate>;
  _min?: Maybe<UserWaitsBookEditionMinAggregate>;
  assignedAt: Scalars['DateTime'];
  editionId: Scalars['String'];
  userId: Scalars['String'];
};

export type UserWaitsBookEditionListRelationFilter = {
  every?: InputMaybe<UserWaitsBookEditionWhereInput>;
  none?: InputMaybe<UserWaitsBookEditionWhereInput>;
  some?: InputMaybe<UserWaitsBookEditionWhereInput>;
};

export type UserWaitsBookEditionMaxAggregate = {
  __typename?: 'UserWaitsBookEditionMaxAggregate';
  assignedAt?: Maybe<Scalars['DateTime']>;
  editionId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type UserWaitsBookEditionMaxOrderByAggregateInput = {
  assignedAt?: InputMaybe<SortOrder>;
  editionId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type UserWaitsBookEditionMinAggregate = {
  __typename?: 'UserWaitsBookEditionMinAggregate';
  assignedAt?: Maybe<Scalars['DateTime']>;
  editionId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type UserWaitsBookEditionMinOrderByAggregateInput = {
  assignedAt?: InputMaybe<SortOrder>;
  editionId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type UserWaitsBookEditionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type UserWaitsBookEditionOrderByWithAggregationInput = {
  _count?: InputMaybe<UserWaitsBookEditionCountOrderByAggregateInput>;
  _max?: InputMaybe<UserWaitsBookEditionMaxOrderByAggregateInput>;
  _min?: InputMaybe<UserWaitsBookEditionMinOrderByAggregateInput>;
  assignedAt?: InputMaybe<SortOrder>;
  editionId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type UserWaitsBookEditionOrderByWithRelationInput = {
  assignedAt?: InputMaybe<SortOrder>;
  edition?: InputMaybe<BookEditionOrderByWithRelationInput>;
  editionId?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export enum UserWaitsBookEditionScalarFieldEnum {
  AssignedAt = 'assignedAt',
  EditionId = 'editionId',
  UserId = 'userId'
}

export type UserWaitsBookEditionScalarWhereInput = {
  AND?: InputMaybe<Array<UserWaitsBookEditionScalarWhereInput>>;
  NOT?: InputMaybe<Array<UserWaitsBookEditionScalarWhereInput>>;
  OR?: InputMaybe<Array<UserWaitsBookEditionScalarWhereInput>>;
  assignedAt?: InputMaybe<DateTimeFilter>;
  editionId?: InputMaybe<StringFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type UserWaitsBookEditionScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<UserWaitsBookEditionScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<UserWaitsBookEditionScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<UserWaitsBookEditionScalarWhereWithAggregatesInput>>;
  assignedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  editionId?: InputMaybe<StringWithAggregatesFilter>;
  userId?: InputMaybe<StringWithAggregatesFilter>;
};

export type UserWaitsBookEditionUpdateInput = {
  assignedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  edition?: InputMaybe<BookEditionUpdateOneRequiredWithoutExpectsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutWaitingInput>;
};

export type UserWaitsBookEditionUpdateManyMutationInput = {
  assignedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type UserWaitsBookEditionUpdateManyWithWhereWithoutEditionInput = {
  data: UserWaitsBookEditionUpdateManyMutationInput;
  where: UserWaitsBookEditionScalarWhereInput;
};

export type UserWaitsBookEditionUpdateManyWithWhereWithoutUserInput = {
  data: UserWaitsBookEditionUpdateManyMutationInput;
  where: UserWaitsBookEditionScalarWhereInput;
};

export type UserWaitsBookEditionUpdateManyWithoutEditionInput = {
  connect?: InputMaybe<Array<UserWaitsBookEditionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserWaitsBookEditionCreateOrConnectWithoutEditionInput>>;
  create?: InputMaybe<Array<UserWaitsBookEditionCreateWithoutEditionInput>>;
  createMany?: InputMaybe<UserWaitsBookEditionCreateManyEditionInputEnvelope>;
  delete?: InputMaybe<Array<UserWaitsBookEditionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserWaitsBookEditionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserWaitsBookEditionWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWaitsBookEditionWhereUniqueInput>>;
  update?: InputMaybe<Array<UserWaitsBookEditionUpdateWithWhereUniqueWithoutEditionInput>>;
  updateMany?: InputMaybe<Array<UserWaitsBookEditionUpdateManyWithWhereWithoutEditionInput>>;
  upsert?: InputMaybe<Array<UserWaitsBookEditionUpsertWithWhereUniqueWithoutEditionInput>>;
};

export type UserWaitsBookEditionUpdateManyWithoutUserInput = {
  connect?: InputMaybe<Array<UserWaitsBookEditionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserWaitsBookEditionCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<UserWaitsBookEditionCreateWithoutUserInput>>;
  createMany?: InputMaybe<UserWaitsBookEditionCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<UserWaitsBookEditionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserWaitsBookEditionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserWaitsBookEditionWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWaitsBookEditionWhereUniqueInput>>;
  update?: InputMaybe<Array<UserWaitsBookEditionUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<UserWaitsBookEditionUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<UserWaitsBookEditionUpsertWithWhereUniqueWithoutUserInput>>;
};

export type UserWaitsBookEditionUpdateWithWhereUniqueWithoutEditionInput = {
  data: UserWaitsBookEditionUpdateWithoutEditionInput;
  where: UserWaitsBookEditionWhereUniqueInput;
};

export type UserWaitsBookEditionUpdateWithWhereUniqueWithoutUserInput = {
  data: UserWaitsBookEditionUpdateWithoutUserInput;
  where: UserWaitsBookEditionWhereUniqueInput;
};

export type UserWaitsBookEditionUpdateWithoutEditionInput = {
  assignedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutWaitingInput>;
};

export type UserWaitsBookEditionUpdateWithoutUserInput = {
  assignedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  edition?: InputMaybe<BookEditionUpdateOneRequiredWithoutExpectsInput>;
};

export type UserWaitsBookEditionUpsertWithWhereUniqueWithoutEditionInput = {
  create: UserWaitsBookEditionCreateWithoutEditionInput;
  update: UserWaitsBookEditionUpdateWithoutEditionInput;
  where: UserWaitsBookEditionWhereUniqueInput;
};

export type UserWaitsBookEditionUpsertWithWhereUniqueWithoutUserInput = {
  create: UserWaitsBookEditionCreateWithoutUserInput;
  update: UserWaitsBookEditionUpdateWithoutUserInput;
  where: UserWaitsBookEditionWhereUniqueInput;
};

export type UserWaitsBookEditionUserIdEditionIdCompoundUniqueInput = {
  editionId: Scalars['String'];
  userId: Scalars['String'];
};

export type UserWaitsBookEditionWhereInput = {
  AND?: InputMaybe<Array<UserWaitsBookEditionWhereInput>>;
  NOT?: InputMaybe<Array<UserWaitsBookEditionWhereInput>>;
  OR?: InputMaybe<Array<UserWaitsBookEditionWhereInput>>;
  assignedAt?: InputMaybe<DateTimeFilter>;
  edition?: InputMaybe<BookEditionRelationFilter>;
  editionId?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type UserWaitsBookEditionWhereUniqueInput = {
  userId_editionId?: InputMaybe<UserWaitsBookEditionUserIdEditionIdCompoundUniqueInput>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  avatar?: InputMaybe<UserAvatarRelationFilter>;
  avatarId?: InputMaybe<StringNullableFilter>;
  books?: InputMaybe<BookListRelationFilter>;
  chatRecipient?: InputMaybe<ChatListRelationFilter>;
  chatSender?: InputMaybe<ChatListRelationFilter>;
  city?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBooks?: InputMaybe<BookListRelationFilter>;
  email?: InputMaybe<StringFilter>;
  firstName?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  lastName?: InputMaybe<StringNullableFilter>;
  notifications?: InputMaybe<NotificationListRelationFilter>;
  password?: InputMaybe<StringFilter>;
  phone?: InputMaybe<StringNullableFilter>;
  points?: InputMaybe<IntFilter>;
  sends?: InputMaybe<SwapListRelationFilter>;
  swaps?: InputMaybe<SwapListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  waiting?: InputMaybe<UserWaitsBookEditionListRelationFilter>;
};

export type UserWhereUniqueInput = {
  avatarId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type AddToMyWaitingListMutationVariables = Exact<{
  editionId: Scalars['String'];
}>;


export type AddToMyWaitingListMutation = { __typename?: 'Mutation', updateMe: { __typename?: 'UserResponse', status: ResponseStatus, errors?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, points: number, notifications: Array<{ __typename?: 'Notification', isRead: boolean, message: string, createdAt: any, url?: string | null }>, waiting: Array<{ __typename?: 'UserWaitsBookEdition', assignedAt: any, edition: { __typename?: 'BookEdition', id: string, title: string, description?: string | null, image?: string | null, booksCount: number, publishedDate?: string | null, authors: Array<string>, virtual: boolean, isbn_13?: string | null, isbn_10?: string | null, views: number, books: Array<{ __typename?: 'Book', id: string, condition: BooksCondition, status: BooksStatus }> }, user: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string } }>, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null, sends: Array<{ __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, chat: { __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> } }>, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, chat: { __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> } }>, books: Array<{ __typename?: 'Book', id: string, title: string, description?: string | null, authors: Array<string>, status: BooksStatus, condition: BooksCondition, image?: string | null, edition: { __typename?: 'BookEdition', id: string } }>, chatSender: Array<{ __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> }>, chatRecipient: Array<{ __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> }> } | null } };

export type ApproveSwapMutationVariables = Exact<{
  swapId: Scalars['String'];
  bookId: Scalars['String'];
}>;


export type ApproveSwapMutation = { __typename?: 'Mutation', approveSwap: { __typename?: 'ChatResponse', status: ResponseStatus, errors?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, chat: { __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> } } };

export type ClearNotificationsMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearNotificationsMutation = { __typename?: 'Mutation', clearNotifications: { __typename?: 'UserResponse', status: ResponseStatus, errors?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, points: number, notifications: Array<{ __typename?: 'Notification', isRead: boolean, message: string, createdAt: any, url?: string | null }>, waiting: Array<{ __typename?: 'UserWaitsBookEdition', assignedAt: any, edition: { __typename?: 'BookEdition', id: string, title: string, description?: string | null, image?: string | null, booksCount: number, publishedDate?: string | null, authors: Array<string>, virtual: boolean, isbn_13?: string | null, isbn_10?: string | null, views: number, books: Array<{ __typename?: 'Book', id: string, condition: BooksCondition, status: BooksStatus }> }, user: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string } }>, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null, sends: Array<{ __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, chat: { __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> } }>, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, chat: { __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> } }>, books: Array<{ __typename?: 'Book', id: string, title: string, description?: string | null, authors: Array<string>, status: BooksStatus, condition: BooksCondition, image?: string | null, edition: { __typename?: 'BookEdition', id: string } }>, chatSender: Array<{ __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> }>, chatRecipient: Array<{ __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> }> } | null } };

export type CreateChatMutationVariables = Exact<{
  bookId: Scalars['String'];
}>;


export type CreateChatMutation = { __typename?: 'Mutation', createChat: { __typename?: 'ChatResponse', status: ResponseStatus, errors?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, chat: { __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> } } };

export type GetEditionQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetEditionQuery = { __typename?: 'Query', getEdition?: { __typename?: 'EditionResponse', status: ResponseStatus, errors?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, edition?: { __typename?: 'BookEdition', id: string, title: string, description?: string | null, authors: Array<string>, image?: string | null, publishedDate?: string | null, views: number, expects: Array<{ __typename?: 'UserWaitsBookEdition', user: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null } }>, books: Array<{ __typename?: 'Book', id: string, status: BooksStatus, condition: BooksCondition, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, creator: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null } }> } | null } | null };

export type GetEditionsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
  status?: InputMaybe<BooksStatus>;
  recent?: InputMaybe<Scalars['Boolean']>;
  popular?: InputMaybe<Scalars['Boolean']>;
}>;


export type GetEditionsQuery = { __typename?: 'Query', getEditions?: { __typename?: 'EditionsResponse', status: ResponseStatus, count?: number | null, errors?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, editions?: Array<{ __typename?: 'BookEditionTypeSense', id: string, title: string, description?: string | null, authors: Array<string>, image?: string | null, publishedDate?: string | null, views: number, booksCount: number }> | null } | null };

export type GetEditionsSearchQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type GetEditionsSearchQuery = { __typename?: 'Query', getEditionsSearch?: { __typename?: 'EditionsResponse', status: ResponseStatus, count?: number | null, errors?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, editions?: Array<{ __typename?: 'BookEditionTypeSense', id: string, title: string, description?: string | null, image?: string | null, authors: Array<string>, virtual: boolean, booksCount: number, relatedEditionId: string }> | null } | null };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, points: number, notifications: Array<{ __typename?: 'Notification', isRead: boolean, message: string, createdAt: any, url?: string | null }>, waiting: Array<{ __typename?: 'UserWaitsBookEdition', assignedAt: any, edition: { __typename?: 'BookEdition', id: string, title: string, description?: string | null, image?: string | null, booksCount: number, publishedDate?: string | null, authors: Array<string>, virtual: boolean, isbn_13?: string | null, isbn_10?: string | null, views: number, books: Array<{ __typename?: 'Book', id: string, condition: BooksCondition, status: BooksStatus }> }, user: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string } }>, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null, sends: Array<{ __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, chat: { __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> } }>, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, chat: { __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> } }>, books: Array<{ __typename?: 'Book', id: string, title: string, description?: string | null, authors: Array<string>, status: BooksStatus, condition: BooksCondition, image?: string | null, edition: { __typename?: 'BookEdition', id: string } }>, chatSender: Array<{ __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> }>, chatRecipient: Array<{ __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> }> } | null } | null };

export type GetRoomQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetRoomQuery = { __typename?: 'Query', getRoom: { __typename?: 'ChatResponse', status: ResponseStatus, errors?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, chat: { __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> } } };

export type InitSwapMutationVariables = Exact<{
  bookId: Scalars['String'];
  chatId: Scalars['String'];
  recipientId: Scalars['String'];
}>;


export type InitSwapMutation = { __typename?: 'Mutation', initSwap: { __typename?: 'ChatResponse', status: ResponseStatus, errors?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, chat: { __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> } } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', status: ResponseStatus, errors?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, credentials?: { __typename?: 'Credentials', token: string, refreshToken: string } | null } };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'LoginResponse', status: ResponseStatus, errors?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, credentials?: { __typename?: 'Credentials', token: string, refreshToken: string } | null } };

export type RemoveFromMyWaitingListMutationVariables = Exact<{
  userId: Scalars['String'];
  editionId: Scalars['String'];
}>;


export type RemoveFromMyWaitingListMutation = { __typename?: 'Mutation', updateMe: { __typename?: 'UserResponse', status: ResponseStatus, errors?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, points: number, notifications: Array<{ __typename?: 'Notification', isRead: boolean, message: string, createdAt: any, url?: string | null }>, waiting: Array<{ __typename?: 'UserWaitsBookEdition', assignedAt: any, edition: { __typename?: 'BookEdition', id: string, title: string, description?: string | null, image?: string | null, booksCount: number, publishedDate?: string | null, authors: Array<string>, virtual: boolean, isbn_13?: string | null, isbn_10?: string | null, views: number, books: Array<{ __typename?: 'Book', id: string, condition: BooksCondition, status: BooksStatus }> }, user: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string } }>, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null, sends: Array<{ __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, chat: { __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> } }>, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, chat: { __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> } }>, books: Array<{ __typename?: 'Book', id: string, title: string, description?: string | null, authors: Array<string>, status: BooksStatus, condition: BooksCondition, image?: string | null, edition: { __typename?: 'BookEdition', id: string } }>, chatSender: Array<{ __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> }>, chatRecipient: Array<{ __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> }> } | null } };

export type SendMessageMutationVariables = Exact<{
  chatId: Scalars['String'];
  message: Scalars['String'];
  date: Scalars['String'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'ChatResponse', status: ResponseStatus, errors?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, chat: { __typename?: 'Chat', id: string, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> } } };

export type UpdateUserAvatarMutationVariables = Exact<{
  accessoriesType?: InputMaybe<Scalars['String']>;
  avatarStyle?: InputMaybe<Scalars['String']>;
  clotheColor?: InputMaybe<Scalars['String']>;
  clotheType?: InputMaybe<Scalars['String']>;
  eyeType?: InputMaybe<Scalars['String']>;
  eyebrowType?: InputMaybe<Scalars['String']>;
  facialHairColor?: InputMaybe<Scalars['String']>;
  facialHairType?: InputMaybe<Scalars['String']>;
  graphicType?: InputMaybe<Scalars['String']>;
  hairColor?: InputMaybe<Scalars['String']>;
  hatColor?: InputMaybe<Scalars['String']>;
  mouthType?: InputMaybe<Scalars['String']>;
  skinColor?: InputMaybe<Scalars['String']>;
  topType?: InputMaybe<Scalars['String']>;
}>;


export type UpdateUserAvatarMutation = { __typename?: 'Mutation', updateMe: { __typename?: 'UserResponse', status: ResponseStatus, errors?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, points: number, notifications: Array<{ __typename?: 'Notification', isRead: boolean, message: string, createdAt: any, url?: string | null }>, waiting: Array<{ __typename?: 'UserWaitsBookEdition', assignedAt: any, edition: { __typename?: 'BookEdition', id: string, title: string, description?: string | null, image?: string | null, booksCount: number, publishedDate?: string | null, authors: Array<string>, virtual: boolean, isbn_13?: string | null, isbn_10?: string | null, views: number, books: Array<{ __typename?: 'Book', id: string, condition: BooksCondition, status: BooksStatus }> }, user: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string } }>, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null, sends: Array<{ __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, chat: { __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> } }>, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, chat: { __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> } }>, books: Array<{ __typename?: 'Book', id: string, title: string, description?: string | null, authors: Array<string>, status: BooksStatus, condition: BooksCondition, image?: string | null, edition: { __typename?: 'BookEdition', id: string } }>, chatSender: Array<{ __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> }>, chatRecipient: Array<{ __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> }> } | null } };

export type UpdateBookStatusMutationVariables = Exact<{
  bookId: Scalars['String'];
  status: BooksStatus;
}>;


export type UpdateBookStatusMutation = { __typename?: 'Mutation', updateBook?: { __typename?: 'Book', id: string, description?: string | null, title: string, condition: BooksCondition, status: BooksStatus, image?: string | null } | null };

export type UpdateUserDataMutationVariables = Exact<{
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
}>;


export type UpdateUserDataMutation = { __typename?: 'Mutation', updateMe: { __typename?: 'UserResponse', status: ResponseStatus, errors?: Array<{ __typename?: 'FieldError', field?: string | null, message?: string | null }> | null, user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, points: number, notifications: Array<{ __typename?: 'Notification', isRead: boolean, message: string, createdAt: any, url?: string | null }>, waiting: Array<{ __typename?: 'UserWaitsBookEdition', assignedAt: any, edition: { __typename?: 'BookEdition', id: string, title: string, description?: string | null, image?: string | null, booksCount: number, publishedDate?: string | null, authors: Array<string>, virtual: boolean, isbn_13?: string | null, isbn_10?: string | null, views: number, books: Array<{ __typename?: 'Book', id: string, condition: BooksCondition, status: BooksStatus }> }, user: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string } }>, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null, sends: Array<{ __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, chat: { __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> } }>, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, chat: { __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> } }>, books: Array<{ __typename?: 'Book', id: string, title: string, description?: string | null, authors: Array<string>, status: BooksStatus, condition: BooksCondition, image?: string | null, edition: { __typename?: 'BookEdition', id: string } }>, chatSender: Array<{ __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> }>, chatRecipient: Array<{ __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> }> } | null } };

export type UpsertEditionMutationVariables = Exact<{
  editionId?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  authors: Array<Scalars['String']> | Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  condition?: InputMaybe<BooksCondition>;
  userId: Scalars['String'];
  indexId: Scalars['String'];
}>;


export type UpsertEditionMutation = { __typename?: 'Mutation', customUpsertEdition?: { __typename?: 'BookEdition', id: string } | null };

export type AvatarFragment = { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null };

export type BookFragment = { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } };

export type ChatFragment = { __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> };

export type EditionFragment = { __typename?: 'BookEdition', id: string, title: string, description?: string | null, authors: Array<string>, image?: string | null, publishedDate?: string | null, views: number, expects: Array<{ __typename?: 'UserWaitsBookEdition', assignedAt: any, edition: { __typename?: 'BookEdition', id: string, title: string, description?: string | null, image?: string | null, booksCount: number, publishedDate?: string | null, authors: Array<string>, virtual: boolean, isbn_13?: string | null, isbn_10?: string | null, views: number, books: Array<{ __typename?: 'Book', id: string, condition: BooksCondition, status: BooksStatus }> }, user: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string } }>, books: Array<{ __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } }> };

export type RelationEditionFragment = { __typename?: 'UserWaitsBookEdition', assignedAt: any, edition: { __typename?: 'BookEdition', id: string, title: string, description?: string | null, image?: string | null, booksCount: number, publishedDate?: string | null, authors: Array<string>, virtual: boolean, isbn_13?: string | null, isbn_10?: string | null, views: number, books: Array<{ __typename?: 'Book', id: string, condition: BooksCondition, status: BooksStatus }> }, user: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string } };

export type RecipientFragment = { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null };

export type SenderFragment = { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null };

export type SwapFragment = { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, chat: { __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> } };

export type UserFragment = { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, points: number, notifications: Array<{ __typename?: 'Notification', isRead: boolean, message: string, createdAt: any, url?: string | null }>, waiting: Array<{ __typename?: 'UserWaitsBookEdition', assignedAt: any, edition: { __typename?: 'BookEdition', id: string, title: string, description?: string | null, image?: string | null, booksCount: number, publishedDate?: string | null, authors: Array<string>, virtual: boolean, isbn_13?: string | null, isbn_10?: string | null, views: number, books: Array<{ __typename?: 'Book', id: string, condition: BooksCondition, status: BooksStatus }> }, user: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string } }>, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null, sends: Array<{ __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, chat: { __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> } }>, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, chat: { __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> } }>, books: Array<{ __typename?: 'Book', id: string, title: string, description?: string | null, authors: Array<string>, status: BooksStatus, condition: BooksCondition, image?: string | null, edition: { __typename?: 'BookEdition', id: string } }>, chatSender: Array<{ __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> }>, chatRecipient: Array<{ __typename?: 'Chat', id: string, status: ChatStatus, book: { __typename?: 'Book', id: string, title: string, description?: string | null, image?: string | null }, recipient: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, sender: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, swap?: { __typename?: 'Swap', id: string, status: SwapStatus, book: { __typename?: 'Book', id: string, description?: string | null, image?: string | null, title: string, condition: BooksCondition, status: BooksStatus, swaps: Array<{ __typename?: 'Swap', id: string, status: SwapStatus }>, creator: { __typename?: 'User', id: string, email: string }, holder: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, avatar?: { __typename?: 'UserAvatar', topType?: string | null, eyeType?: string | null, eyebrowType?: string | null, mouthType?: string | null, facialHairType?: string | null, facialHairColor?: string | null, hairColor?: string | null, hatColor?: string | null, skinColor?: string | null, clotheColor?: string | null, clotheType?: string | null, accessoriesType?: string | null } | null }, edition: { __typename?: 'BookEdition', id: string } } } | null, messages: Array<{ __typename?: 'Message', createdAt: any, message: string, userId: string, isRead: boolean }> }> };


declare module '*/AddToMyWaitingListMutation.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const AddToMyWaitingList: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/ApproveSwapMutation.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const ApproveSwap: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/ClearNotificationsMutation.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const ClearNotifications: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/CreateChatMutation.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const CreateChat: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/GetEdition.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const getEdition: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/GetEditionsQuery.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const getEditions: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/GetEditionsSearchQuery.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const getEditionsSearch: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/GetMe.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetMe: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/GetRoom.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const getRoom: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/InitSwapMutation.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const InitSwap: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/LoginMutation.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const Login: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/RegisterMutation.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const Register: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/RemoveFromMyWaitingListMutation.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const RemoveFromMyWaitingList: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/SendMessageMutation.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const SendMessage: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/UpdateAvatarMutation.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const UpdateUserAvatar: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/UpdateBookStatusMutation.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const UpdateBookStatus: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/UpdateUserMutation.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const UpdateUserData: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/UpsertEditionMutation.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const upsertEdition: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/fragmentAvatar.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const Avatar: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/fragmentBook.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const Book: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/fragmentChat.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const Chat: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/fragmentEdition.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const Edition: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/fragmentEditionRelation.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const RelationEdition: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/fragmentRecipient.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const Recipient: DocumentNode;

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
    
export const RelationEdition = gql`
    fragment RelationEdition on UserWaitsBookEdition {
  assignedAt
  edition {
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
    views
    books {
      id
      condition
      status
    }
  }
  user {
    id
    firstName
    lastName
    email
  }
}
    `;
export const Avatar = gql`
    fragment Avatar on UserAvatar {
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
    `;
export const Book = gql`
    fragment Book on Book {
  id
  description
  image
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
    firstName
    lastName
    email
    avatar {
      ...Avatar
    }
  }
  edition {
    id
  }
}
    ${Avatar}`;
export const Edition = gql`
    fragment Edition on BookEdition {
  id
  title
  description
  authors
  image
  publishedDate
  views
  expects {
    ...RelationEdition
  }
  books {
    ...Book
  }
}
    ${RelationEdition}
${Book}`;
export const Recipient = gql`
    fragment Recipient on User {
  id
  firstName
  lastName
  email
  avatar {
    ...Avatar
  }
}
    ${Avatar}`;
export const Sender = gql`
    fragment Sender on User {
  id
  firstName
  lastName
  email
  avatar {
    ...Avatar
  }
}
    ${Avatar}`;
export const Chat = gql`
    fragment Chat on Chat {
  id
  book {
    id
    title
    description
    image
  }
  recipient {
    ...Recipient
  }
  sender {
    ...Sender
  }
  swap {
    id
    book {
      ...Book
    }
    status
  }
  messages {
    createdAt
    message
    userId
    isRead
  }
  status
}
    ${Recipient}
${Sender}
${Book}`;
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
  chat {
    ...Chat
  }
  status
}
    ${Book}
${Recipient}
${Sender}
${Chat}`;
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
    url
  }
  waiting {
    ...RelationEdition
  }
  avatar {
    ...Avatar
  }
  points
  sends {
    ...Swap
  }
  swaps {
    ...Swap
  }
  books {
    id
    title
    description
    authors
    status
    condition
    image
    edition {
      id
    }
  }
  chatSender {
    ...Chat
  }
  chatRecipient {
    ...Chat
  }
}
    ${RelationEdition}
${Avatar}
${Swap}
${Chat}`;
export const AddToMyWaitingList = gql`
    mutation AddToMyWaitingList($editionId: String!) {
  updateMe(
    where: {id: "empty"}
    data: {waiting: {create: {edition: {connect: {id: $editionId}}}}}
  ) {
    status
    errors {
      field
      message
    }
    user {
      ...User
    }
  }
}
    ${User}`;
export const ApproveSwap = gql`
    mutation ApproveSwap($swapId: String!, $bookId: String!) {
  approveSwap(swapId: $swapId, bookId: $bookId) {
    status
    errors {
      field
      message
    }
    chat {
      ...Chat
    }
  }
}
    ${Chat}`;
export const ClearNotifications = gql`
    mutation ClearNotifications {
  clearNotifications {
    status
    errors {
      field
      message
    }
    user {
      ...User
    }
  }
}
    ${User}`;
export const CreateChat = gql`
    mutation CreateChat($bookId: String!) {
  createChat(bookId: $bookId) {
    status
    errors {
      field
      message
    }
    chat {
      ...Chat
    }
  }
}
    ${Chat}`;
export const GetEdition = gql`
    query getEdition($id: String!) {
  getEdition(id: $id) {
    status
    errors {
      field
      message
    }
    edition {
      id
      title
      description
      authors
      image
      publishedDate
      views
      expects(where: {}) {
        user {
          id
          firstName
          lastName
          email
          avatar {
            ...Avatar
          }
        }
      }
      books(where: {}) {
        id
        status
        condition
        holder {
          id
          firstName
          lastName
          email
          avatar {
            ...Avatar
          }
        }
        creator {
          id
          firstName
          lastName
          email
          avatar {
            ...Avatar
          }
        }
      }
    }
  }
}
    ${Avatar}`;
export const GetEditions = gql`
    query getEditions($offset: Float, $limit: Float, $status: BooksStatus, $recent: Boolean, $popular: Boolean) {
  getEditions(
    offset: $offset
    limit: $limit
    status: $status
    recent: $recent
    popular: $popular
  ) {
    status
    errors {
      field
      message
    }
    count
    editions {
      id
      title
      description
      authors
      image
      publishedDate
      views
      booksCount
    }
  }
}
    `;
export const GetEditionsSearch = gql`
    query getEditionsSearch($search: String!) {
  getEditionsSearch(search: $search) {
    status
    errors {
      field
      message
    }
    count
    editions {
      id
      title
      description
      image
      authors
      virtual
      booksCount
      relatedEditionId
    }
  }
}
    `;
export const GetMe = gql`
    query GetMe {
  me {
    user {
      ...User
    }
  }
}
    ${User}`;
export const GetRoom = gql`
    query getRoom($id: String!) {
  getRoom(id: $id) {
    status
    errors {
      field
      message
    }
    chat {
      ...Chat
    }
  }
}
    ${Chat}`;
export const InitSwap = gql`
    mutation InitSwap($bookId: String!, $chatId: String!, $recipientId: String!) {
  initSwap(bookId: $bookId, chatId: $chatId, recipientId: $recipientId) {
    status
    errors {
      field
      message
    }
    chat {
      ...Chat
    }
  }
}
    ${Chat}`;
export const Login = gql`
    mutation Login($email: String!, $password: String!) {
  login(options: {email: $email, password: $password}) {
    status
    errors {
      field
      message
    }
    credentials {
      token
      refreshToken
    }
  }
}
    `;
export const Register = gql`
    mutation Register($email: String!, $password: String!) {
  registerUser(options: {email: $email, password: $password}) {
    status
    errors {
      field
      message
    }
    credentials {
      token
      refreshToken
    }
  }
}
    `;
export const RemoveFromMyWaitingList = gql`
    mutation RemoveFromMyWaitingList($userId: String!, $editionId: String!) {
  updateMe(
    where: {id: "empty"}
    data: {waiting: {delete: {userId_editionId: {userId: $userId, editionId: $editionId}}}}
  ) {
    status
    errors {
      field
      message
    }
    user {
      ...User
    }
  }
}
    ${User}`;
export const SendMessage = gql`
    mutation SendMessage($chatId: String!, $message: String!, $date: String!) {
  sendMessage(chatId: $chatId, message: $message, date: $date) {
    status
    errors {
      field
      message
    }
    chat {
      id
      messages {
        createdAt
        message
        userId
        isRead
      }
    }
  }
}
    `;
export const UpdateUserAvatar = gql`
    mutation UpdateUserAvatar($accessoriesType: String, $avatarStyle: String, $clotheColor: String, $clotheType: String, $eyeType: String, $eyebrowType: String, $facialHairColor: String, $facialHairType: String, $graphicType: String, $hairColor: String, $hatColor: String, $mouthType: String, $skinColor: String, $topType: String) {
  updateMe(
    where: {id: "empty"}
    data: {avatar: {upsert: {create: {accessoriesType: $accessoriesType, avatarStyle: $avatarStyle, clotheColor: $clotheColor, clotheType: $clotheType, eyeType: $eyeType, eyebrowType: $eyebrowType, facialHairColor: $facialHairColor, facialHairType: $facialHairType, graphicType: $graphicType, hairColor: $hairColor, hatColor: $hatColor, mouthType: $mouthType, skinColor: $skinColor, topType: $topType}, update: {accessoriesType: {set: $accessoriesType}, avatarStyle: {set: $avatarStyle}, clotheColor: {set: $clotheColor}, clotheType: {set: $clotheType}, eyeType: {set: $eyeType}, eyebrowType: {set: $eyebrowType}, facialHairColor: {set: $facialHairColor}, facialHairType: {set: $facialHairType}, graphicType: {set: $graphicType}, hairColor: {set: $hairColor}, hatColor: {set: $hatColor}, mouthType: {set: $mouthType}, skinColor: {set: $skinColor}, topType: {set: $topType}}}}}
  ) {
    status
    errors {
      field
      message
    }
    user {
      ...User
    }
  }
}
    ${User}`;
export const UpdateBookStatus = gql`
    mutation UpdateBookStatus($bookId: String!, $status: BooksStatus!) {
  updateBook(where: {id: $bookId}, data: {status: {set: $status}}) {
    id
    description
    title
    condition
    status
    image
  }
}
    `;
export const UpdateUserData = gql`
    mutation UpdateUserData($firstName: String, $lastName: String) {
  updateMe(
    where: {id: "empty"}
    data: {firstName: {set: $firstName}, lastName: {set: $lastName}}
  ) {
    status
    errors {
      field
      message
    }
    user {
      ...User
    }
  }
}
    ${User}`;
export const UpsertEdition = gql`
    mutation upsertEdition($editionId: String, $title: String!, $authors: [String!]!, $description: String, $image: String, $condition: BooksCondition, $userId: String!, $indexId: String!) {
  customUpsertEdition(
    where: {id: $editionId}
    create: {title: $title, authors: {set: $authors}, books: {create: {title: $title, authors: {set: $authors}, condition: $condition, creator: {connect: {id: $userId}}, image: $image, description: $description, holder: {connect: {id: $userId}}}}, description: $description, image: $image, virtual: false}
    update: {virtual: {set: false}, books: {create: {title: $title, authors: {set: $authors}, condition: $condition, creator: {connect: {id: $userId}}, image: $image, description: $description, holder: {connect: {id: $userId}}}}}
    indexId: $indexId
  ) {
    id
  }
}
    `;
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
        "name": "AffectedRowsOutput",
        "fields": [
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
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AggregateBook",
        "fields": [
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "BookCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "BookMaxAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "BookMinAggregate",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AggregateBookEdition",
        "fields": [
          {
            "name": "_avg",
            "type": {
              "kind": "OBJECT",
              "name": "BookEditionAvgAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "BookEditionCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "BookEditionMaxAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "BookEditionMinAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_sum",
            "type": {
              "kind": "OBJECT",
              "name": "BookEditionSumAggregate",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AggregateChat",
        "fields": [
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "ChatCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "ChatMaxAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "ChatMinAggregate",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AggregateMessage",
        "fields": [
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "MessageCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "MessageMaxAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "MessageMinAggregate",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AggregateNotification",
        "fields": [
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "NotificationCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "NotificationMaxAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "NotificationMinAggregate",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AggregateSwap",
        "fields": [
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "SwapCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "SwapMaxAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "SwapMinAggregate",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AggregateUser",
        "fields": [
          {
            "name": "_avg",
            "type": {
              "kind": "OBJECT",
              "name": "UserAvgAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "UserCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "UserMaxAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "UserMinAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_sum",
            "type": {
              "kind": "OBJECT",
              "name": "UserSumAggregate",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AggregateUserAvatar",
        "fields": [
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "UserAvatarCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "UserAvatarMaxAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "UserAvatarMinAggregate",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AggregateUserWaitsBookEdition",
        "fields": [
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "UserWaitsBookEditionCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "UserWaitsBookEditionMaxAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "UserWaitsBookEditionMinAggregate",
              "ofType": null
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
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "BookCount",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "authors",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "chats",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Chat",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
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
            "name": "creatorId",
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
            "name": "editionId",
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
            "name": "holderId",
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
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
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
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "BookCount",
        "fields": [
          {
            "name": "chats",
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
        "name": "BookCountAggregate",
        "fields": [
          {
            "name": "_all",
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
            "name": "authors",
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
            "name": "creatorId",
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
            "name": "editionId",
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
            "name": "holderId",
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
            "name": "image",
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
            "name": "isbn_10",
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
            "name": "isbn_13",
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
            "name": "publishedDate",
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
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "BookEdition",
        "fields": [
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "BookEditionCount",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "authors",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
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
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
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
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "expects",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "UserWaitsBookEdition",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
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
        "name": "BookEditionAvgAggregate",
        "fields": [
          {
            "name": "booksCount",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "views",
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
        "name": "BookEditionCount",
        "fields": [
          {
            "name": "books",
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
        "name": "BookEditionCountAggregate",
        "fields": [
          {
            "name": "_all",
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
            "name": "authors",
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
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "isbn_10",
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
            "name": "isbn_13",
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
            "name": "publishedDate",
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
        "name": "BookEditionGroupBy",
        "fields": [
          {
            "name": "_avg",
            "type": {
              "kind": "OBJECT",
              "name": "BookEditionAvgAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "BookEditionCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "BookEditionMaxAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "BookEditionMinAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_sum",
            "type": {
              "kind": "OBJECT",
              "name": "BookEditionSumAggregate",
              "ofType": null
            },
            "args": []
          },
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
        "name": "BookEditionMaxAggregate",
        "fields": [
          {
            "name": "booksCount",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "views",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "virtual",
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
        "name": "BookEditionMinAggregate",
        "fields": [
          {
            "name": "booksCount",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "views",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "virtual",
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
        "name": "BookEditionSumAggregate",
        "fields": [
          {
            "name": "booksCount",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "views",
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
        "name": "BookEditionTypeSense",
        "fields": [
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "BookEditionCount",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "authors",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
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
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
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
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "expects",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "UserWaitsBookEdition",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
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
            "name": "relatedEditionId",
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
        "name": "BookGroupBy",
        "fields": [
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "BookCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "BookMaxAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "BookMinAggregate",
              "ofType": null
            },
            "args": []
          },
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
            "name": "creatorId",
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
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "editionId",
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
            "name": "holderId",
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
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "BookMaxAggregate",
        "fields": [
          {
            "name": "condition",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "creatorId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
            "name": "editionId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "holderId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
            "name": "status",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "title",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updatedAt",
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
        "name": "BookMinAggregate",
        "fields": [
          {
            "name": "condition",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "creatorId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
            "name": "editionId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "holderId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
            "name": "status",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "title",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updatedAt",
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
        "name": "Chat",
        "fields": [
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "ChatCount",
              "ofType": null
            },
            "args": []
          },
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
            "name": "bookId",
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
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
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
            "name": "recipientId",
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
            "name": "senderId",
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
            "name": "swap",
            "type": {
              "kind": "OBJECT",
              "name": "Swap",
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
        "name": "ChatCount",
        "fields": [
          {
            "name": "messages",
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
        "name": "ChatCountAggregate",
        "fields": [
          {
            "name": "_all",
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
            "name": "bookId",
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
            "name": "recipientId",
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
            "name": "senderId",
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
        "name": "ChatGroupBy",
        "fields": [
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "ChatCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "ChatMaxAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "ChatMinAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "bookId",
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
            "name": "recipientId",
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
            "name": "senderId",
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
        "name": "ChatMaxAggregate",
        "fields": [
          {
            "name": "bookId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "recipientId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "senderId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "status",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updatedAt",
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
        "name": "ChatMinAggregate",
        "fields": [
          {
            "name": "bookId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "recipientId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "senderId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "status",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updatedAt",
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
        "name": "ChatResponse",
        "fields": [
          {
            "name": "chat",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Chat",
                "ofType": null
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
                  "name": "BookEditionTypeSense",
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
            "name": "chat",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Chat",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "chatId",
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
        "name": "MessageCountAggregate",
        "fields": [
          {
            "name": "_all",
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
            "name": "chatId",
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
        "name": "MessageGroupBy",
        "fields": [
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "MessageCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "MessageMaxAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "MessageMinAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "chatId",
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
        "name": "MessageMaxAggregate",
        "fields": [
          {
            "name": "chatId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "isRead",
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
          },
          {
            "name": "userId",
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
        "name": "MessageMinAggregate",
        "fields": [
          {
            "name": "chatId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "isRead",
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
          },
          {
            "name": "userId",
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
        "name": "Mutation",
        "fields": [
          {
            "name": "addBookToMyWaitingList",
            "type": {
              "kind": "OBJECT",
              "name": "EditionResponse",
              "ofType": null
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
            "name": "approveSwap",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ChatResponse",
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
              },
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
                "name": "editionId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
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
            "name": "createBookEdition",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "BookEdition",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
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
            "name": "createChat",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ChatResponse",
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
            "name": "createManyBook",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
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
              },
              {
                "name": "skipDuplicates",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "createManyBookEdition",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
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
              },
              {
                "name": "skipDuplicates",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "createManyChat",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
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
              },
              {
                "name": "skipDuplicates",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "createManyMessage",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
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
              },
              {
                "name": "skipDuplicates",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "createManyNotification",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
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
              },
              {
                "name": "skipDuplicates",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "createManySwap",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
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
              },
              {
                "name": "skipDuplicates",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "createManyUser",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
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
              },
              {
                "name": "skipDuplicates",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "createManyUserAvatar",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
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
              },
              {
                "name": "skipDuplicates",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "createManyUserWaitsBookEdition",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
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
              },
              {
                "name": "skipDuplicates",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "createMessage",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Message",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
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
            "name": "createNotification",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Notification",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
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
            "name": "createSwap",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Swap",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
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
            "name": "createUser",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
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
            "name": "createUserAvatar",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UserAvatar",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
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
            "name": "createUserWaitsBookEdition",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UserWaitsBookEdition",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
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
            "name": "customUpsertEdition",
            "type": {
              "kind": "OBJECT",
              "name": "BookEdition",
              "ofType": null
            },
            "args": [
              {
                "name": "create",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "indexId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "update",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
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
            "name": "deleteBook",
            "type": {
              "kind": "OBJECT",
              "name": "Book",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
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
            "name": "deleteBookEdition",
            "type": {
              "kind": "OBJECT",
              "name": "BookEdition",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
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
            "name": "deleteChat",
            "type": {
              "kind": "OBJECT",
              "name": "Chat",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
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
            "name": "deleteManyBook",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "deleteManyBookEdition",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "deleteManyChat",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "deleteManyMessage",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "deleteManyNotification",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "deleteManySwap",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "deleteManyUser",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "deleteManyUserAvatar",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "deleteManyUserWaitsBookEdition",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "deleteMessage",
            "type": {
              "kind": "OBJECT",
              "name": "Message",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
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
            "name": "deleteNotification",
            "type": {
              "kind": "OBJECT",
              "name": "Notification",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
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
            "name": "deleteSwap",
            "type": {
              "kind": "OBJECT",
              "name": "Swap",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
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
            "name": "deleteUser",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
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
            "name": "deleteUserAvatar",
            "type": {
              "kind": "OBJECT",
              "name": "UserAvatar",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
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
            "name": "deleteUserWaitsBookEdition",
            "type": {
              "kind": "OBJECT",
              "name": "UserWaitsBookEdition",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
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
            "name": "initSwap",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ChatResponse",
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
              },
              {
                "name": "chatId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "recipientId",
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
            "name": "sendMessage",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ChatResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "chatId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "date",
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
            "name": "updateBook",
            "type": {
              "kind": "OBJECT",
              "name": "Book",
              "ofType": null
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
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
            "name": "updateBookEdition",
            "type": {
              "kind": "OBJECT",
              "name": "BookEdition",
              "ofType": null
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
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
            "name": "updateChat",
            "type": {
              "kind": "OBJECT",
              "name": "Chat",
              "ofType": null
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
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
            "name": "updateManyBook",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "updateManyBookEdition",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "updateManyChat",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "updateManyMessage",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "updateManyNotification",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "updateManySwap",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "updateManyUser",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "updateManyUserAvatar",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "updateManyUserWaitsBookEdition",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
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
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
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
            "name": "updateMessage",
            "type": {
              "kind": "OBJECT",
              "name": "Message",
              "ofType": null
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
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
            "name": "updateNotification",
            "type": {
              "kind": "OBJECT",
              "name": "Notification",
              "ofType": null
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
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
            "name": "updateSwap",
            "type": {
              "kind": "OBJECT",
              "name": "Swap",
              "ofType": null
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
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
            "name": "updateUser",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
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
            "name": "updateUserAvatar",
            "type": {
              "kind": "OBJECT",
              "name": "UserAvatar",
              "ofType": null
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
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
            "name": "updateUserWaitsBookEdition",
            "type": {
              "kind": "OBJECT",
              "name": "UserWaitsBookEdition",
              "ofType": null
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
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
            "name": "upsertBook",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Book",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "create",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "update",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
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
            "name": "upsertBookEdition",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "BookEdition",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "create",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "update",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
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
            "name": "upsertChat",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Chat",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "create",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "update",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
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
            "name": "upsertMessage",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Message",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "create",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "update",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
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
            "name": "upsertNotification",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Notification",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "create",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "update",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
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
            "name": "upsertSwap",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Swap",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "create",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "update",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
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
            "name": "upsertUser",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "create",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "update",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
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
            "name": "upsertUserAvatar",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UserAvatar",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "create",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "update",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
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
            "name": "upsertUserWaitsBookEdition",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "UserWaitsBookEdition",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "create",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "update",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
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
            "name": "url",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "user",
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
        "name": "NotificationCountAggregate",
        "fields": [
          {
            "name": "_all",
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
            "name": "url",
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
        "name": "NotificationGroupBy",
        "fields": [
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "NotificationCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "NotificationMaxAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "NotificationMinAggregate",
              "ofType": null
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
            "name": "url",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
        "name": "NotificationMaxAggregate",
        "fields": [
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "isRead",
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
          },
          {
            "name": "url",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "userId",
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
        "name": "NotificationMinAggregate",
        "fields": [
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "isRead",
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
          },
          {
            "name": "url",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "userId",
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
        "name": "Query",
        "fields": [
          {
            "name": "aggregateBook",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AggregateBook",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "aggregateBookEdition",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AggregateBookEdition",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "aggregateChat",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AggregateChat",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "aggregateMessage",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AggregateMessage",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "aggregateNotification",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AggregateNotification",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "aggregateSwap",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AggregateSwap",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "aggregateUser",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AggregateUser",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "aggregateUserAvatar",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AggregateUserAvatar",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "aggregateUserWaitsBookEdition",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AggregateUserWaitsBookEdition",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "book",
            "type": {
              "kind": "OBJECT",
              "name": "Book",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
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
            "name": "bookEdition",
            "type": {
              "kind": "OBJECT",
              "name": "BookEdition",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
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
            "name": "bookEditions",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "BookEdition",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
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
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "chat",
            "type": {
              "kind": "OBJECT",
              "name": "Chat",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
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
            "name": "chats",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Chat",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "findFirstBook",
            "type": {
              "kind": "OBJECT",
              "name": "Book",
              "ofType": null
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "findFirstBookEdition",
            "type": {
              "kind": "OBJECT",
              "name": "BookEdition",
              "ofType": null
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "findFirstChat",
            "type": {
              "kind": "OBJECT",
              "name": "Chat",
              "ofType": null
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "findFirstMessage",
            "type": {
              "kind": "OBJECT",
              "name": "Message",
              "ofType": null
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "findFirstNotification",
            "type": {
              "kind": "OBJECT",
              "name": "Notification",
              "ofType": null
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "findFirstSwap",
            "type": {
              "kind": "OBJECT",
              "name": "Swap",
              "ofType": null
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "findFirstUser",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "findFirstUserAvatar",
            "type": {
              "kind": "OBJECT",
              "name": "UserAvatar",
              "ofType": null
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "findFirstUserWaitsBookEdition",
            "type": {
              "kind": "OBJECT",
              "name": "UserWaitsBookEdition",
              "ofType": null
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
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
                "name": "status",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "getEditionsSearch",
            "type": {
              "kind": "OBJECT",
              "name": "EditionsResponse",
              "ofType": null
            },
            "args": [
              {
                "name": "search",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
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
                "name": "ChatResponse",
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
            "name": "groupByBook",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "BookGroupBy",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "by",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
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
              },
              {
                "name": "having",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groupByBookEdition",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "BookEditionGroupBy",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "by",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
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
              },
              {
                "name": "having",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groupByChat",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ChatGroupBy",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "by",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
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
              },
              {
                "name": "having",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groupByMessage",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "MessageGroupBy",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "by",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
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
              },
              {
                "name": "having",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groupByNotification",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "NotificationGroupBy",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "by",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
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
              },
              {
                "name": "having",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groupBySwap",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "SwapGroupBy",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "by",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
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
              },
              {
                "name": "having",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groupByUser",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "UserGroupBy",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "by",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
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
              },
              {
                "name": "having",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groupByUserAvatar",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "UserAvatarGroupBy",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "by",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
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
              },
              {
                "name": "having",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "groupByUserWaitsBookEdition",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "UserWaitsBookEditionGroupBy",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "by",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
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
              },
              {
                "name": "having",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "me",
            "type": {
              "kind": "OBJECT",
              "name": "UserResponse",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "message",
            "type": {
              "kind": "OBJECT",
              "name": "Message",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
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
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "notification",
            "type": {
              "kind": "OBJECT",
              "name": "Notification",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
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
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "swap",
            "type": {
              "kind": "OBJECT",
              "name": "Swap",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
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
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "user",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
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
            "name": "userAvatar",
            "type": {
              "kind": "OBJECT",
              "name": "UserAvatar",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
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
            "name": "userAvatars",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "UserAvatar",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "userWaitsBookEdition",
            "type": {
              "kind": "OBJECT",
              "name": "UserWaitsBookEdition",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
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
            "name": "userWaitsBookEditions",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "UserWaitsBookEdition",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "users",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "User",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
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
            "name": "bookId",
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
            "name": "chat",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Chat",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "chatId",
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
            "name": "recipientId",
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
            "name": "senderId",
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
        "name": "SwapCountAggregate",
        "fields": [
          {
            "name": "_all",
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
            "name": "bookId",
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
            "name": "chatId",
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
            "name": "recipientId",
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
            "name": "senderId",
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
        "name": "SwapGroupBy",
        "fields": [
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "SwapCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "SwapMaxAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "SwapMinAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "bookId",
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
            "name": "chatId",
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
            "name": "recipientId",
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
            "name": "senderId",
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
        "name": "SwapMaxAggregate",
        "fields": [
          {
            "name": "bookId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "chatId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "recipientId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "senderId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "status",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updatedAt",
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
        "name": "SwapMinAggregate",
        "fields": [
          {
            "name": "bookId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "chatId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "recipientId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "senderId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "status",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updatedAt",
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
        "name": "User",
        "fields": [
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "UserCount",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "avatar",
            "type": {
              "kind": "OBJECT",
              "name": "UserAvatar",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "avatarId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
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
                    "name": "Chat",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
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
                    "name": "Chat",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
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
            "name": "createdBooks",
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
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
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
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "password",
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
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
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
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
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
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "UserWaitsBookEdition",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "cursor",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "distinct",
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
              },
              {
                "name": "orderBy",
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
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UserAvatar",
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
            "name": "avatarStyle",
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
            "name": "graphicType",
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
        "name": "UserAvatarCountAggregate",
        "fields": [
          {
            "name": "_all",
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
            "name": "accessoriesType",
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
            "name": "avatarStyle",
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
            "name": "clotheColor",
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
            "name": "clotheType",
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
            "name": "eyeType",
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
            "name": "eyebrowType",
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
            "name": "facialHairColor",
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
            "name": "facialHairType",
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
            "name": "graphicType",
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
            "name": "hairColor",
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
            "name": "hatColor",
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
            "name": "mouthType",
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
            "name": "skinColor",
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
            "name": "topType",
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
        "name": "UserAvatarGroupBy",
        "fields": [
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "UserAvatarCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "UserAvatarMaxAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "UserAvatarMinAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "accessoriesType",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "avatarStyle",
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
            "name": "graphicType",
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
        "name": "UserAvatarMaxAggregate",
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
            "name": "avatarStyle",
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
            "name": "createdAt",
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
            "name": "graphicType",
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
            "name": "id",
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
          },
          {
            "name": "updatedAt",
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
        "name": "UserAvatarMinAggregate",
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
            "name": "avatarStyle",
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
            "name": "createdAt",
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
            "name": "graphicType",
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
            "name": "id",
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
          },
          {
            "name": "updatedAt",
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
        "name": "UserAvgAggregate",
        "fields": [
          {
            "name": "points",
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
        "name": "UserCount",
        "fields": [
          {
            "name": "books",
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
            "name": "chatRecipient",
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
            "name": "chatSender",
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
            "name": "createdBooks",
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
            "name": "notifications",
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
            "name": "sends",
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
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "waiting",
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
        "name": "UserCountAggregate",
        "fields": [
          {
            "name": "_all",
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
            "name": "avatarId",
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
            "name": "city",
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
            "name": "lastName",
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
            "name": "password",
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
            "name": "phone",
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
        "name": "UserGroupBy",
        "fields": [
          {
            "name": "_avg",
            "type": {
              "kind": "OBJECT",
              "name": "UserAvgAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "UserCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "UserMaxAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "UserMinAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_sum",
            "type": {
              "kind": "OBJECT",
              "name": "UserSumAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "avatarId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
            "name": "password",
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
        "name": "UserMaxAggregate",
        "fields": [
          {
            "name": "avatarId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "email",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
            "name": "password",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updatedAt",
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
        "name": "UserMinAggregate",
        "fields": [
          {
            "name": "avatarId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "email",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
            "name": "password",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updatedAt",
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
        "kind": "OBJECT",
        "name": "UserSumAggregate",
        "fields": [
          {
            "name": "points",
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
        "name": "UserWaitsBookEdition",
        "fields": [
          {
            "name": "assignedAt",
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
            "name": "editionId",
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
        "name": "UserWaitsBookEditionCountAggregate",
        "fields": [
          {
            "name": "_all",
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
            "name": "assignedAt",
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
            "name": "editionId",
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
        "name": "UserWaitsBookEditionGroupBy",
        "fields": [
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "UserWaitsBookEditionCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "UserWaitsBookEditionMaxAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "UserWaitsBookEditionMinAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "assignedAt",
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
            "name": "editionId",
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
        "name": "UserWaitsBookEditionMaxAggregate",
        "fields": [
          {
            "name": "assignedAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "editionId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "userId",
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
        "name": "UserWaitsBookEditionMinAggregate",
        "fields": [
          {
            "name": "assignedAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "editionId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "userId",
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
        "kind": "SCALAR",
        "name": "Any"
      }
    ],
    "directives": []
  }
} as unknown as IntrospectionQuery;