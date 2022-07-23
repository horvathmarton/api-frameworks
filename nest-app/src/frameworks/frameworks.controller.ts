import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth';
import { Role } from 'src/auth/roles.decorator';
import { Framework, User } from 'src/models';
import { FrameworkPayload } from 'src/payloads';
import { ApiResponse } from 'src/types';
import { getRepository } from 'typeorm';

@Controller('frameworks')
export class FrameworksControllers {
  constructor(private authService: AuthService) {}

  @Get()
  @Role('anonymous')
  public async list(): Promise<ApiResponse<{ name: string }[]>> {
    const frameworks = await getRepository(Framework).find({
      where: { active: true },
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      payload: frameworks.map((framework) => ({
        name: framework.name,
      })),
    };
  }

  @Get(':name')
  @Role('anonymous')
  public async get(
    @Param('name') name: string,
  ): Promise<ApiResponse<Framework>> {
    const framework = await getRepository(Framework).findOne(name);

    if (!framework) {
      throw new NotFoundException("Framework doesn't exist.");
    }

    return { payload: framework };
  }

  @Post()
  @Role('admin')
  public async create(
    @Body() payload: FrameworkPayload,
    @Req() request: Request,
  ): Promise<void> {
    const token = this.authService.parseToken(request);
    const { username } = this.authService.decodeToken(token);

    await getRepository(Framework).save({
      ...payload,
      createdBy: username as unknown as User,
      updatedBy: username as unknown as User,
    });
  }

  @Put(':name')
  @Role('admin')
  public async update(
    @Body() payload: FrameworkPayload,
    @Req() request: Request,
    @Param('name') name: string,
  ): Promise<void> {
    const token = this.authService.parseToken(request);
    const { username } = this.authService.decodeToken(token);

    const framework = await getRepository(Framework).findOne(name);

    if (!framework) {
      throw new NotFoundException("Framework doesn't exist.");
    }

    await getRepository(Framework).update(name, {
      ...payload,
      updatedBy: username as unknown as User,
    });
  }
}
