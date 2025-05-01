/* eslint-disable */
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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any; }
  /** A custom scalar that validates and transforms price values */
  Price: { input: any; output: any; }
};

export type Ad = {
  __typename?: 'Ad';
  adType: AdTypes;
  booking: Array<BookingModel>;
  createdAt: Scalars['DateTime']['output'];
  deal: Deal;
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  location: Location;
  mainPhoto: Scalars['String']['output'];
  owner: Owner;
  photos: Array<Scalars['String']['output']>;
  propertyDetails: PropertyDetails;
  propertyType: PropertyTypes;
  updatedAt: Scalars['DateTime']['output'];
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
  Rent = 'rent',
  Sell = 'sell'
}

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

export type CreateAdInput = {
  adType: Scalars['String']['input'];
  deal: DealInput;
  description: Scalars['String']['input'];
  features: Array<Scalars['String']['input']>;
  location: LocationDto;
  mainPhoto: Scalars['String']['input'];
  photos: Array<Scalars['String']['input']>;
  propertyDetails: PropertyDetailsInput;
  propertyType: Scalars['String']['input'];
};

export type Deal = {
  __typename?: 'Deal';
  createdAt: Scalars['DateTime']['output'];
  durationRent?: Maybe<DurationRentTypes>;
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
  durationRent?: InputMaybe<Scalars['String']['input']>;
  fields: Scalars['JSONObject']['input'];
  price: Scalars['Price']['input'];
};

export enum DurationRentTypes {
  Long = 'long',
  Short = 'short'
}

export type Location = {
  __typename?: 'Location';
  city: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  street: Scalars['String']['output'];
};

export type LocationDto = {
  city: Scalars['String']['input'];
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  street: Scalars['String']['input'];
};

export type LocationFilter = {
  city?: InputMaybe<Scalars['String']['input']>;
  fields?: InputMaybe<Scalars['JSON']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAd: Ad;
  updateAd: Ad;
};


export type MutationCreateAdArgs = {
  createAdInput: CreateAdInput;
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
  fields: Scalars['JSONObject']['input'];
};

export enum PropertyTypes {
  Apartment = 'apartment',
  House = 'house'
}

export type Query = {
  __typename?: 'Query';
  getAdById?: Maybe<Ad>;
  getAllAds: AdsResponse;
};


export type QueryGetAdByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetAllAdsArgs = {
  filters?: InputMaybe<AdFilterInput>;
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
  durationRent?: InputMaybe<Scalars['String']['input']>;
  fields?: InputMaybe<Scalars['JSONObject']['input']>;
  price?: InputMaybe<Scalars['Price']['input']>;
};

export type UpdatePropertyDetailsInput = {
  fields?: InputMaybe<Scalars['JSONObject']['input']>;
};
