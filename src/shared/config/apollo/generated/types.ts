export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type Ad = {
  __typename?: 'Ad';
  adType: AdTypes;
  booking: Array<BookingModel>;
  contact: AdContact;
  createdAt: Scalars['DateTime']['output'];
  deal: Deal;
  description: Scalars['String']['output'];
  features: Array<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  location: Location;
  mainPhoto: Scalars['String']['output'];
  owner: Owner;
  photos: Array<Scalars['String']['output']>;
  propertyDetails: PropertyDetails;
  propertyType: PropertyTypes;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  views?: Maybe<Scalars['Float']['output']>;
};

export type AdCategoryFilterInput = {
  adType: Scalars['String']['input'];
  city: Scalars['String']['input'];
  propertyType: Scalars['String']['input'];
};

export type AdContact = {
  __typename?: 'AdContact';
  communication: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
};

export type AdFilterInput = {
  adType?: InputMaybe<Scalars['String']['input']>;
  deal?: InputMaybe<DealFilter>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  location?: InputMaybe<LocationFilter>;
  page?: InputMaybe<Scalars['Float']['input']>;
  propertyDetails?: InputMaybe<PropertyDetailsFilter>;
  propertyType?: InputMaybe<Scalars['String']['input']>;
};

export enum AdTypes {
  RentLong = 'rent_long',
  RentShort = 'rent_short',
  Sell = 'sell'
}

export type AdsByCategories = {
  __typename?: 'AdsByCategories';
  adType: AdTypes;
  ads: Array<Ad>;
  propertyType: PropertyTypes;
};

export type AdsByCategoriesInput = {
  categories: Array<AdCategoryFilterInput>;
  limit: Scalars['Int']['input'];
};

export type AdsResponse = {
  __typename?: 'AdsResponse';
  ads: Array<Ad>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type BookingModel = {
  __typename?: 'BookingModel';
  endDate: Scalars['DateTime']['output'];
  startDate: Scalars['DateTime']['output'];
};

export type ContactInput = {
  communication: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type CreateAdInput = {
  adType: Scalars['String']['input'];
  contact: ContactInput;
  deal: DealInput;
  description: Scalars['String']['input'];
  features: Array<Scalars['String']['input']>;
  location: LocationDto;
  mainPhoto: Scalars['String']['input'];
  photos: Array<Scalars['String']['input']>;
  propertyDetails: PropertyDetailsInput;
  propertyType: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Deal = {
  __typename?: 'Deal';
  createdAt: Scalars['DateTime']['output'];
  fields: Scalars['JSON']['output'];
  id: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DealFilter = {
  fields?: InputMaybe<Scalars['JSON']['input']>;
  price?: InputMaybe<PriceFilter>;
};

export type DealInput = {
  fields: Scalars['JSON']['input'];
  price: Scalars['Float']['input'];
};

export type FavoriteAd = {
  __typename?: 'FavoriteAd';
  ad: Ad;
  adId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
};

export type Location = {
  __typename?: 'Location';
  address: Scalars['String']['output'];
  city: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};

export type LocationDto = {
  address: Scalars['String']['input'];
  city: Scalars['String']['input'];
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};

export type LocationFilter = {
  city?: InputMaybe<Scalars['String']['input']>;
  fields?: InputMaybe<Scalars['JSON']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAd: Ad;
  syncFavorites: SyncFavorites;
  toggleFavoriteAd: ToggleFavoriteResponse;
  updateAd: Ad;
};


export type MutationCreateAdArgs = {
  createAdInput: CreateAdInput;
};


export type MutationSyncFavoritesArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type MutationToggleFavoriteAdArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateAdArgs = {
  id: Scalars['ID']['input'];
  updatedFields: UpdateAdInput;
};

export type Owner = {
  __typename?: 'Owner';
  avatar?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type PriceFilter = {
  from?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Int']['input']>;
};

export type PropertyDetails = {
  __typename?: 'PropertyDetails';
  fields: Scalars['JSON']['output'];
};

export type PropertyDetailsFilter = {
  fields?: InputMaybe<Scalars['JSON']['input']>;
};

export type PropertyDetailsInput = {
  fields: Scalars['JSON']['input'];
};

export enum PropertyTypes {
  Apartment = 'apartment',
  House = 'house'
}

export type Query = {
  __typename?: 'Query';
  getAdById?: Maybe<Ad>;
  getAdsByCategories: Array<AdsByCategories>;
  getAdsByIds: Array<Ad>;
  getAllAds: AdsResponse;
  getFavoriteAds: Array<FavoriteAd>;
};


export type QueryGetAdByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetAdsByCategoriesArgs = {
  data: AdsByCategoriesInput;
};


export type QueryGetAdsByIdsArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type QueryGetAllAdsArgs = {
  filters?: InputMaybe<AdFilterInput>;
};

export type SyncFavorites = {
  __typename?: 'SyncFavorites';
  status: Scalars['Boolean']['output'];
};

export type ToggleFavoriteResponse = {
  __typename?: 'ToggleFavoriteResponse';
  id: Scalars['ID']['output'];
  status: Scalars['String']['output'];
};

export type UpdateAdInput = {
  adType?: InputMaybe<AdTypes>;
  deal?: InputMaybe<UpdateDealInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<LocationDto>;
  mainPhoto?: InputMaybe<Scalars['String']['input']>;
  photos?: InputMaybe<Array<Scalars['String']['input']>>;
  propertyDetails?: InputMaybe<UpdatePropertyDetailsInput>;
  propertyType?: InputMaybe<PropertyTypes>;
};

export type UpdateDealInput = {
  fields?: InputMaybe<Scalars['JSON']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdatePropertyDetailsInput = {
  fields?: InputMaybe<Scalars['JSON']['input']>;
};
