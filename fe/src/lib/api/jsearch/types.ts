export type FilterEntry = {
  name: string;
  value: string;
  est_count: number;
};

export enum DatePosted {
  ALL = "all",
  TODAY = "today",
  THREE_DAYS = "3days",
  WEEK = "week",
  MONTH = "month",
}

export type EmploymentType = "FULLTIME" | "CONTRACTOR" | "PARTTIME" | "INTERN";

export type JobRequirement =
  | "under_3_years_experience"
  | "more_than_3_years_experience"
  | "no_experience"
  | "no_degree";

export type Res<T> = {
  status: string;
  request_id: string;
  parameters: Record<string, string>;
  data: T;
};
