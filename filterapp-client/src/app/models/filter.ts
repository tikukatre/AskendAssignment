import { Criteria } from './criteria';

export interface Filter {
  id?: number;
  name: string;
  criteriaList: Criteria[];
}
