import axios from "./axios";
import type { CommaSeparated } from "../../types";
import { unwrap } from "../../utils";
import type {
  DatePosted,
  EmploymentType,
  FilterEntry,
  JobRequirement,
  Res,
} from "./types";

type Params = {
  query: string;
  date_posted?: DatePosted;
  remote_jobs_only?: boolean;
  employment_types?: CommaSeparated<EmploymentType>;
  job_requirements?: CommaSeparated<JobRequirement>;
  radius?: number;
  job_titles?: string;
  company_types?: string;
  employers?: string;
  actively_hiring?: boolean;
  categories?: string;
};

export type Filters = {
  categories: FilterEntry[];
  job_titles: FilterEntry[];
  company_types: FilterEntry[];
  employers: FilterEntry[];
  date_posted: FilterEntry[];
  employment_types: FilterEntry[];
  job_requirements: FilterEntry[];
};

export default async (params: Params) =>
  unwrap(axios.get<Res<Filters>>("search-filters", { params }));
