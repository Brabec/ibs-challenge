import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ManagerEntity } from '@managers/entity/manager.entity';
import { Repository } from 'typeorm';
import { ManagerDto } from '@managers/dto/manager.dto';
import { toManagerDto } from '@shared/mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateManagerDto } from '@managers/dto/create-manager.dto';
import { LoginDto } from '@auth/dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { comparePassword, toPromise } from '@shared/utils';

@Injectable()
export class ManagersService implements UsersService {
  constructor(
    @InjectRepository(ManagerEntity)
    private managerRepository: Repository<ManagerEntity>,
  ) {}

  async validateUser(managerLoginDto: LoginDto): Promise<any> {
    const manager = await this.managerRepository.findOne({
      where: { email: managerLoginDto.email },
    });

    if (manager && this.areEqual(manager.password, managerLoginDto.password)) {
      return toPromise(toManagerDto(manager));
    }

    return null;
  }

  async createManager(createManagerDto: CreateManagerDto): Promise<ManagerDto> {
    const userInDb = await this.managerRepository.findOneBy({
      email: createManagerDto.email,
    });

    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    let manager = new ManagerEntity();
    manager.email = createManagerDto.email;
    manager.password = createManagerDto.password;
    manager = await this.managerRepository.save(manager);

    return toManagerDto(manager);
  }

  async getManager(email: string): Promise<ManagerDto> {
    const manager = await this.managerRepository.findOneByOrFail({ email });

    return toManagerDto(manager);
  }

  async areEqual(password: string, hashedPass: string): Promise<boolean> {
    return await comparePassword(password, hashedPass);
  }
}
