type ConditionOption = { value: string; label: string };

//FilterConditions class for getting condition options based on the criteria type
export class FilterConditions {
  static readonly NUMBER: ConditionOption[] = [
    { value: 'EQUALS', label: 'Equals' },
    { value: 'GREATER_THAN', label: 'Greater than' },
    { value: 'LESS_THAN', label: 'Less than' },
  ];

  static readonly STRING: ConditionOption[] = [
    { value: 'EQUALS', label: 'Equals' },
    { value: 'CONTAINS', label: 'Contains' },
    { value: 'STARTS_WITH', label: 'Starts with' },
    { value: 'ENDS_WITH', label: 'Ends with' },
  ];

  static readonly DATE: ConditionOption[] = [
    { value: 'EQUALS', label: 'Equals' },
    { value: 'BEFORE', label: 'Before' },
    { value: 'AFTER', label: 'After' },
  ];

  private static readonly conditionMap: { [key: string]: ConditionOption[] } = {
    NUMBER: FilterConditions.NUMBER,
    STRING: FilterConditions.STRING,
    DATE: FilterConditions.DATE,
  };

  static getConditionLabel(type: string, value: string): string {
    const conditions = FilterConditions.conditionMap[type] || [];
    const condition = conditions.find((c) => c.value === value);
    return condition ? condition.label : value;
  }

  static getConditionOptions(type: string): ConditionOption[] {
    return FilterConditions.conditionMap[type] || [];
  }
}
