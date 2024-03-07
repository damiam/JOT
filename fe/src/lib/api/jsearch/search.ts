import type { CommaSeparated } from "../../types";
import { unwrap } from "../../utils";
import axios from "./axios";
import type { EmploymentType, FilterEntry, JobRequirement, Res } from "./types";

interface ApplyOption {
  publisher: string;
  apply_link: string;
  is_direct: boolean;
}

interface JobRequiredExperience {
  no_experience_required: boolean;
  required_experience_in_months: number;
  experience_mentioned: boolean;
  experience_preferred: boolean;
}

interface JobRequiredEducation {
  postgraduate_degree: boolean;
  professional_certification: boolean;
  high_school: boolean;
  associates_degree: boolean;
  bachelors_degree: boolean;
  degree_mentioned: boolean;
  degree_preferred: boolean;
  professional_certification_mentioned: boolean;
}

interface JobHighlights {
  Qualifications: string[];
  Responsibilities: string[];
}

export interface Offer {
  job_id: string;
  employer_name: string;
  employer_logo: string | null;
  employer_website: string | null;
  employer_company_type: string | null;
  job_publisher: string;
  job_employment_type: string;
  job_title: string;
  job_apply_link: string;
  job_apply_is_direct: boolean;
  job_apply_quality_score: number;
  apply_options: ApplyOption[];
  job_description: string;
  job_is_remote: boolean;
  job_posted_at_timestamp: number;
  job_posted_at_datetime_utc: string;
  job_city: string;
  job_state: string;
  job_country: string;
  job_latitude: number;
  job_longitude: number;
  job_benefits: string | null;
  job_google_link: string;
  job_offer_expiration_datetime_utc: string;
  job_offer_expiration_timestamp: number;
  job_required_experience: JobRequiredExperience;
  job_required_skills: string | null;
  job_required_education: JobRequiredEducation;
  job_experience_in_place_of_education: boolean;
  job_min_salary: string | null;
  job_max_salary: string | null;
  job_salary_currency: string | null;
  job_salary_period: string | null;
  job_highlights: JobHighlights;
  job_job_title: string;
  job_posting_language: string;
  job_onet_soc: string;
  job_onet_job_zone: string;
}

type Params = {
  query: string;
  page?: number;
  num_pages?: number;
  date_posted?: FilterEntry[];
  remote_jobs_only?: boolean;
  employment_types?: CommaSeparated<EmploymentType>;
  job_requirements?: CommaSeparated<JobRequirement>;
  job_titles?: string;
  company_types?: string;
  employer?: string;
  actively_hiring?: boolean;
  radius?: number;
  categories?: string;
  exclude_job_publishers?: string;
};

export default async (params: Params) =>
  unwrap(axios.get<Res<Offer[]>>("search", { params }));
