import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
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
  /** A custom scalar type */
  double: { input: any; output: any; }
  /** A custom scalar type */
  int: { input: any; output: any; }
  /** A custom scalar type */
  objectId: { input: any; output: any; }
  /** A custom scalar type */
  string: { input: any; output: any; }
};

/** columns and relationships of "Catches" */
export type Catches = {
  __typename?: 'Catches';
  AirTemp: Scalars['double']['output'];
  BodyOfWater: Scalars['string']['output'];
  CatchDate: Scalars['string']['output'];
  CatchTime: Scalars['string']['output'];
  Fisherman: Scalars['string']['output'];
  HighTideOffset: Scalars['int']['output'];
  Loc: Array<Scalars['double']['output']>;
  LowTideOffset: Scalars['int']['output'];
  Lure: Scalars['string']['output'];
  MoonPhase: Scalars['string']['output'];
  Picture: Scalars['string']['output'];
  Pressure: Scalars['int']['output'];
  Species: Scalars['string']['output'];
  Sunrise: Scalars['string']['output'];
  Sunset: Scalars['string']['output'];
  Tide: Array<Catches_Tide>;
  TideDirection: Scalars['string']['output'];
  WaterTemp: Scalars['int']['output'];
  WindDirection: Scalars['string']['output'];
  WindSpeed: Scalars['int']['output'];
  _id: Scalars['objectId']['output'];
};

export type Catches_Tide = {
  __typename?: 'Catches_Tide';
  TideHeight: Scalars['double']['output'];
  TideTime: Scalars['string']['output'];
  TideType: Scalars['string']['output'];
};

/** aggregated selection of "Catches" */
export type Catches_Aggregate = {
  __typename?: 'Catches_aggregate';
  aggregate?: Maybe<Catches_Aggregate_Fields>;
  nodes: Array<Catches>;
};

/** aggregate fields of "Catches" */
export type Catches_Aggregate_Fields = {
  __typename?: 'Catches_aggregate_fields';
  count: Scalars['Int']['output'];
};


/** aggregate fields of "Catches" */
export type Catches_Aggregate_FieldsCountArgs = {
  column?: InputMaybe<Catches_Select_Column>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "Catches". All fields are combined with a logical 'AND'. */
export type Catches_Bool_Exp = {
  AirTemp?: InputMaybe<Double_Mongodb_Comparison_Exp>;
  BodyOfWater?: InputMaybe<String_Mongodb_Comparison_Exp>;
  CatchDate?: InputMaybe<String_Mongodb_Comparison_Exp>;
  CatchTime?: InputMaybe<String_Mongodb_Comparison_Exp>;
  Fisherman?: InputMaybe<String_Mongodb_Comparison_Exp>;
  HighTideOffset?: InputMaybe<Int_Mongodb_Comparison_Exp>;
  LowTideOffset?: InputMaybe<Int_Mongodb_Comparison_Exp>;
  Lure?: InputMaybe<String_Mongodb_Comparison_Exp>;
  MoonPhase?: InputMaybe<String_Mongodb_Comparison_Exp>;
  Picture?: InputMaybe<String_Mongodb_Comparison_Exp>;
  Pressure?: InputMaybe<Int_Mongodb_Comparison_Exp>;
  Species?: InputMaybe<String_Mongodb_Comparison_Exp>;
  Sunrise?: InputMaybe<String_Mongodb_Comparison_Exp>;
  Sunset?: InputMaybe<String_Mongodb_Comparison_Exp>;
  TideDirection?: InputMaybe<String_Mongodb_Comparison_Exp>;
  WaterTemp?: InputMaybe<Int_Mongodb_Comparison_Exp>;
  WindDirection?: InputMaybe<String_Mongodb_Comparison_Exp>;
  WindSpeed?: InputMaybe<Int_Mongodb_Comparison_Exp>;
  _and?: InputMaybe<Array<Catches_Bool_Exp>>;
  _id?: InputMaybe<ObjectId_Mongodb_Comparison_Exp>;
  _not?: InputMaybe<Catches_Bool_Exp>;
  _or?: InputMaybe<Array<Catches_Bool_Exp>>;
};

/** Ordering options when selecting data from "Catches". */
export type Catches_Order_By = {
  AirTemp?: InputMaybe<Mongodb_Order_By>;
  BodyOfWater?: InputMaybe<Mongodb_Order_By>;
  CatchDate?: InputMaybe<Mongodb_Order_By>;
  CatchTime?: InputMaybe<Mongodb_Order_By>;
  Fisherman?: InputMaybe<Mongodb_Order_By>;
  HighTideOffset?: InputMaybe<Mongodb_Order_By>;
  LowTideOffset?: InputMaybe<Mongodb_Order_By>;
  Lure?: InputMaybe<Mongodb_Order_By>;
  MoonPhase?: InputMaybe<Mongodb_Order_By>;
  Picture?: InputMaybe<Mongodb_Order_By>;
  Pressure?: InputMaybe<Mongodb_Order_By>;
  Species?: InputMaybe<Mongodb_Order_By>;
  Sunrise?: InputMaybe<Mongodb_Order_By>;
  Sunset?: InputMaybe<Mongodb_Order_By>;
  TideDirection?: InputMaybe<Mongodb_Order_By>;
  WaterTemp?: InputMaybe<Mongodb_Order_By>;
  WindDirection?: InputMaybe<Mongodb_Order_By>;
  WindSpeed?: InputMaybe<Mongodb_Order_By>;
  _id?: InputMaybe<Mongodb_Order_By>;
};

/** select columns of table "Catches" */
export enum Catches_Select_Column {
  /** column name */
  AirTemp = 'AirTemp',
  /** column name */
  BodyOfWater = 'BodyOfWater',
  /** column name */
  CatchDate = 'CatchDate',
  /** column name */
  CatchTime = 'CatchTime',
  /** column name */
  Fisherman = 'Fisherman',
  /** column name */
  HighTideOffset = 'HighTideOffset',
  /** column name */
  Loc = 'Loc',
  /** column name */
  LowTideOffset = 'LowTideOffset',
  /** column name */
  Lure = 'Lure',
  /** column name */
  MoonPhase = 'MoonPhase',
  /** column name */
  Picture = 'Picture',
  /** column name */
  Pressure = 'Pressure',
  /** column name */
  Species = 'Species',
  /** column name */
  Sunrise = 'Sunrise',
  /** column name */
  Sunset = 'Sunset',
  /** column name */
  Tide = 'Tide',
  /** column name */
  TideDirection = 'TideDirection',
  /** column name */
  WaterTemp = 'WaterTemp',
  /** column name */
  WindDirection = 'WindDirection',
  /** column name */
  WindSpeed = 'WindSpeed',
  /** column name */
  Id = '_id'
}

/** Boolean expression to compare columns of type "double". All fields are combined with logical 'AND'. */
export type Double_Mongodb_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['double']['input']>;
  _gt?: InputMaybe<Scalars['double']['input']>;
  _gte?: InputMaybe<Scalars['double']['input']>;
  _in?: InputMaybe<Array<Scalars['double']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['double']['input']>;
  _lte?: InputMaybe<Scalars['double']['input']>;
  _neq?: InputMaybe<Scalars['double']['input']>;
  _nin?: InputMaybe<Array<Scalars['double']['input']>>;
};

/** Boolean expression to compare columns of type "int". All fields are combined with logical 'AND'. */
export type Int_Mongodb_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['int']['input']>;
  _gt?: InputMaybe<Scalars['int']['input']>;
  _gte?: InputMaybe<Scalars['int']['input']>;
  _in?: InputMaybe<Array<Scalars['int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['int']['input']>;
  _lte?: InputMaybe<Scalars['int']['input']>;
  _neq?: InputMaybe<Scalars['int']['input']>;
  _nin?: InputMaybe<Array<Scalars['int']['input']>>;
};

/** column ordering options */
export enum Mongodb_Order_By {
  /** in ascending order */
  Asc = 'asc',
  /** in descending order */
  Desc = 'desc'
}

/** Boolean expression to compare columns of type "objectId". All fields are combined with logical 'AND'. */
export type ObjectId_Mongodb_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['objectId']['input']>;
  _gt?: InputMaybe<Scalars['objectId']['input']>;
  _gte?: InputMaybe<Scalars['objectId']['input']>;
  _in?: InputMaybe<Array<Scalars['objectId']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['objectId']['input']>;
  _lte?: InputMaybe<Scalars['objectId']['input']>;
  _neq?: InputMaybe<Scalars['objectId']['input']>;
  _nin?: InputMaybe<Array<Scalars['objectId']['input']>>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "Catches" */
  Catches: Array<Catches>;
  /** fetch aggregated fields from the table: "Catches" */
  Catches_aggregate: Catches_Aggregate;
  /** fetch data from the table: "Catches" using primary key columns */
  Catches_by_pk?: Maybe<Catches>;
};


export type Query_RootCatchesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Catches_Order_By>>;
  where?: InputMaybe<Catches_Bool_Exp>;
};


export type Query_RootCatches_AggregateArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Catches_Order_By>>;
  where?: InputMaybe<Catches_Bool_Exp>;
};


export type Query_RootCatches_By_PkArgs = {
  _id: Scalars['objectId']['input'];
};

/** Boolean expression to compare columns of type "string". All fields are combined with logical 'AND'. */
export type String_Mongodb_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['string']['input']>;
  _gt?: InputMaybe<Scalars['string']['input']>;
  _gte?: InputMaybe<Scalars['string']['input']>;
  _in?: InputMaybe<Array<Scalars['string']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['string']['input']>;
  _lte?: InputMaybe<Scalars['string']['input']>;
  _neq?: InputMaybe<Scalars['string']['input']>;
  _nin?: InputMaybe<Array<Scalars['string']['input']>>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "Catches" */
  Catches: Array<Catches>;
  /** fetch aggregated fields from the table: "Catches" */
  Catches_aggregate: Catches_Aggregate;
  /** fetch data from the table: "Catches" using primary key columns */
  Catches_by_pk?: Maybe<Catches>;
};


export type Subscription_RootCatchesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Catches_Order_By>>;
  where?: InputMaybe<Catches_Bool_Exp>;
};


export type Subscription_RootCatches_AggregateArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Catches_Order_By>>;
  where?: InputMaybe<Catches_Bool_Exp>;
};


export type Subscription_RootCatches_By_PkArgs = {
  _id: Scalars['objectId']['input'];
};

export type FishingEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type FishingEventsQuery = { __typename?: 'query_root', Catches: Array<{ __typename?: 'Catches', BodyOfWater: any, CatchDate: any, CatchTime: any, _id: any, AirTemp: any, Fisherman: any, Loc: Array<any>, Picture: any, Pressure: any, TideDirection: any, LowTideOffset: any, HighTideOffset: any, Species: any, WaterTemp: any, WindDirection: any, WindSpeed: any }> };

export type FishingEventsByFilterQueryVariables = Exact<{
  fisherman?: InputMaybe<Scalars['string']['input']>;
  species?: InputMaybe<Scalars['string']['input']>;
  water?: InputMaybe<Scalars['string']['input']>;
  startDate?: InputMaybe<Scalars['string']['input']>;
  endDate?: InputMaybe<Scalars['string']['input']>;
}>;


export type FishingEventsByFilterQuery = { __typename?: 'query_root', Catches: Array<{ __typename?: 'Catches', BodyOfWater: any, CatchDate: any, CatchTime: any, _id: any, AirTemp: any, Fisherman: any, Loc: Array<any>, Picture: any, Pressure: any, TideDirection: any, LowTideOffset: any, HighTideOffset: any, Species: any, WaterTemp: any, WindDirection: any, WindSpeed: any }> };

export type CatchesInfoQueryVariables = Exact<{
  fisherman?: InputMaybe<Array<Scalars['string']['input']> | Scalars['string']['input']>;
  species?: InputMaybe<Array<Scalars['string']['input']> | Scalars['string']['input']>;
  catchDate?: InputMaybe<Scalars['string']['input']>;
}>;


export type CatchesInfoQuery = { __typename?: 'query_root', Catches: Array<{ __typename?: 'Catches', BodyOfWater: any, CatchDate: any, CatchTime: any, _id: any, AirTemp: any, Fisherman: any, Loc: Array<any>, Picture: any, Pressure: any, TideDirection: any, Species: any, WaterTemp: any, WindDirection: any, WindSpeed: any }> };

export const FishingEventsDocument = gql`
    query FishingEvents {
  Catches {
    BodyOfWater
    CatchDate
    CatchTime
    _id
    AirTemp
    Fisherman
    Loc
    Picture
    Pressure
    TideDirection
    LowTideOffset
    HighTideOffset
    Species
    WaterTemp
    WindDirection
    WindSpeed
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FishingEventsGQL extends Apollo.Query<FishingEventsQuery, FishingEventsQueryVariables> {
    override document = FishingEventsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FishingEventsByFilterDocument = gql`
    query FishingEventsByFilter($fisherman: string, $species: string, $water: string, $startDate: string, $endDate: string) {
  Catches(
    where: {Fisherman: {_eq: $fisherman}, Species: {_eq: $species}, BodyOfWater: {_eq: $water}, CatchDate: {_gte: $startDate, _lte: $endDate}}
  ) {
    BodyOfWater
    CatchDate
    CatchTime
    _id
    AirTemp
    Fisherman
    Loc
    Picture
    Pressure
    TideDirection
    LowTideOffset
    HighTideOffset
    Species
    WaterTemp
    WindDirection
    WindSpeed
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FishingEventsByFilterGQL extends Apollo.Query<FishingEventsByFilterQuery, FishingEventsByFilterQueryVariables> {
    override document = FishingEventsByFilterDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CatchesInfoDocument = gql`
    query CatchesInfo($fisherman: [string!], $species: [string!], $catchDate: string) {
  Catches(
    where: {Fisherman: {_in: $fisherman}, Species: {_in: $species}, CatchDate: {_eq: $catchDate}}
  ) {
    BodyOfWater
    CatchDate
    CatchTime
    _id
    AirTemp
    Fisherman
    Loc
    Picture
    Pressure
    TideDirection
    Species
    WaterTemp
    WindDirection
    WindSpeed
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CatchesInfoGQL extends Apollo.Query<CatchesInfoQuery, CatchesInfoQueryVariables> {
    override document = CatchesInfoDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }