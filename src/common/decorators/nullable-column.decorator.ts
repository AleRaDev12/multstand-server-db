import { Column, ColumnOptions } from 'typeorm';

export function NullableColumn(additionalOptions: Partial<ColumnOptions> = {}) {
  return function (target: unknown, propertyKey: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const constructor = (target as any).constructor;
    const entityName = constructor.entityName;
    const nullable = constructor.nullable?.[propertyKey];

    if (nullable === undefined) {
      throw new Error(
        `Nullable status for property ${propertyKey} not found in entity ${entityName}`,
      );
    }

    const options = { nullable, ...additionalOptions };
    Column(options)(target, propertyKey);
  };
} 