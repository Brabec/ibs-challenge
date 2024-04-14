import { Injectable } from '@nestjs/common';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

@Injectable()
export class PaginationService {
  constructor() {}

  async paginate<T>(
    repository: Repository<T>,
    options: IPaginationOptions,
    searchOptions?: Partial<T>,
  ): Promise<Pagination<T>> {
    const queryBuilder = repository.createQueryBuilder('entity');

    if (searchOptions) {
      Object.entries(searchOptions).forEach(([key, value]) => {
        queryBuilder.andWhere(`entity.${key} LIKE :${key}`, {
          [key]: `%${value}%`,
        });
      });
    }

    return paginate<T>(queryBuilder, options);
  }
}
