import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginateQueryParamPart {
  @ApiPropertyOptional({ type: 'integer', default: 0 })
  @Type(() => Number)
  @IsOptional({ always: true })
  page: number;

  @ApiPropertyOptional({ type: 'integer', default: 10 })
  @Type(() => Number)
  @IsOptional({ always: true })
  limit: number;

  @ApiPropertyOptional({ type: 'string' })
  @Type(() => String)
  @IsOptional({ always: true })
  searchText: string;

  // @ApiProperty({ enum: SortOrderEnum, default: SortOrderEnum.DESC })
  // @IsEnum(SortOrderEnum, { always: true })
  // sortOrder: SortOrderEnum;
}
