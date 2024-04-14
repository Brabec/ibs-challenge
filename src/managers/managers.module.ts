import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagersService } from '@managers/managers.service';
import { ManagerEntity } from '@managers/entity/manager.entity';
import { ManagersController } from '@managers/managers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ManagerEntity])],
  providers: [ManagersService],
  controllers: [ManagersController],
  exports: [ManagersService],
})
export class ManagersModule {}
