import { InputRef, InputShapeFromTypeParam, InputType, SchemaTypes } from '@pothos/core';
import { PrismaModelTypes } from '@pothos/plugin-prisma';
import {
  FilterListOps,
  FilterOps,
  FilterShape,
  PrismaFilterOptions,
  PrismaListFilterOptions,
  PrismaOrderByOptions,
  PrismaWhereOptions,
} from './types';

import type { PrismaCrudPlugin } from '.';

declare global {
  export namespace PothosSchemaTypes {
    export interface Plugins<Types extends SchemaTypes> {
      prismaCrud: PrismaCrudPlugin<Types>;
    }

    export interface SchemaBuilder<Types extends SchemaTypes> {
      prismaListFilter: <Type extends InputType<Types>, Ops extends FilterListOps>(
        type: Type,
        options: PrismaListFilterOptions<Types, Type, Ops>,
      ) => InputRef<{
        [K in Ops]: InputShapeFromTypeParam<Types, Type, true>;
      }>;
      prismaFilter: <Type extends InputType<Types>, Ops extends FilterOps>(
        type: Type,
        options: PrismaFilterOptions<Types, Type, Ops>,
      ) => InputRef<Pick<FilterShape<InputShapeFromTypeParam<Types, Type, true>>, Ops>>;

      prismaOrderBy: <
        Name extends keyof Types['PrismaTypes'],
        Model extends PrismaModelTypes = Types['PrismaTypes'][Name] extends PrismaModelTypes
          ? Types['PrismaTypes'][Name]
          : never,
      >(
        name: Name,
        options: PrismaOrderByOptions<Types, Model>,
      ) => InputRef<Model['OrderBy']>;

      orderByEnum: () => EnumRef<'asc' | 'desc'>;

      prismaWhere: <
        Name extends keyof Types['PrismaTypes'],
        Model extends PrismaModelTypes = Types['PrismaTypes'][Name] extends PrismaModelTypes
          ? Types['PrismaTypes'][Name]
          : never,
      >(
        type: Name,
        options: PrismaWhereOptions<Types, Model>,
      ) => InputRef<Model['Where']>;
    }
  }
}
