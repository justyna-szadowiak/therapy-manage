export interface Patient {
  number_id: number;
  name: string;
  middle_name: string;
  surename: string;
}

export interface Therapy {
  id: number;
  therapy: string;
  therapist: string;
}

export interface Therapist {
  id: number;
  therapist_title: string;
  therapist_name: string;
  therapist_surename: string;
}

export interface Plan {
  patient_id: number;
  kind_of_therapy: string;
  therapist: string;
  date_time: number;
}

export interface PlanForTherapist {
  therapist: string;
  patient_name: string;
  kind_of_therapy: string;
  date_time: number;
}

export type JwtPayload<T> = T & {
  iat: number;
  exp: number;
}

export interface User {
  id: number,
  name: string,
  middle_name: string,
  surname: string,
  title: string,
  email: string,
  is_admin: boolean;
}
