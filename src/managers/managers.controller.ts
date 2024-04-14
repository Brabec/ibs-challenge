import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  NotFoundException,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateManagerDto } from '@managers/dto/create-manager.dto';
import { ManagerDto } from '@managers/dto/manager.dto';
import { ManagersService } from '@managers/managers.service';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { EntityNotFoundError } from 'typeorm';

@Controller('api/managers')
export class ManagersController {
  constructor(private readonly managerService: ManagersService) {}

  @Post()
  async create(
    @Body() createManagerDto: CreateManagerDto,
  ): Promise<ManagerDto> {
    try {
      return await this.managerService.createManager(createManagerDto);
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }
      throw new BadRequestException(err.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findOne(@Query('email') email: string): Promise<ManagerDto> {
    try {
      return await this.managerService.getManager(email);
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException();
      }
      throw new BadRequestException(err.message);
    }
  }
}
