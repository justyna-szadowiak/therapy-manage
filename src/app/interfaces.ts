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
  therapist_vocational_education: string;
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
  therapist_id: number;
  patient_name: string;
  kind_of_therapy: string;
  date_time: number;
}

export interface Role {
  id: number;
  role: string;
  name: string;
}
