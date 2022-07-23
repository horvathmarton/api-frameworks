import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth';
import { Role } from 'src/auth/roles.decorator';
import { Framework, Vote } from 'src/models';
import { VotePayload } from 'src/payloads/vote.payload';
import { ApiResponse } from 'src/types';
import { getRepository } from 'typeorm';

@Controller('votes')
export class VotesController {
  constructor(private authService: AuthService) {}

  @Get()
  @Role('anonymous')
  public async summary(): Promise<ApiResponse<any>> {
    const result = await getRepository(Vote)
      .createQueryBuilder('vote')
      .select([
        'framework.name AS name',
        'AVG(documentation) AS documentation',
        'AVG(configuration) AS configuration',
        'AVG(dependency_management) AS dependencyManagement',
        'AVG(routing) AS routing',
        'AVG(debugging) AS debugging',
        'AVG(input_validation) AS inputValidation',
        'AVG(auth) AS auth',
        'AVG(serialization) AS serialization',
        'AVG(testing) AS testing',
        'AVG(logging) AS logging',
        'AVG(caching) AS caching',
        'AVG(http_requests) AS httpRequests',
        'AVG(queue_handling) AS queueHandling',
        'AVG(websockets) AS websockets',
      ])
      .innerJoin('vote.framework', 'framework', 'framework.active = TRUE')
      .groupBy('framework.name')
      .getRawMany();

    return { payload: result };
  }

  @Get('me')
  @Role('user')
  public async myVotes(@Req() request: Request): Promise<ApiResponse<Vote[]>> {
    const token = this.authService.parseToken(request);
    const { username } = this.authService.decodeToken(token);

    const votes = await getRepository(Vote).find({
      where: {
        voter: {
          username,
        },
      },
    });

    return { payload: votes };
  }

  @Post()
  @Role('user')
  public async create(
    @Body() payload: VotePayload,
    @Req() request: Request,
  ): Promise<void> {
    const token = this.authService.parseToken(request);
    const { username } = this.authService.decodeToken(token);

    const frameworkExists =
      (await getRepository(Framework).count({ name: payload.frameworkName })) >=
      1;

    if (!frameworkExists) {
      throw new NotFoundException("Framework doesn't exist.");
    }

    const voteExists =
      (await getRepository(Vote).count({
        voterUsername: username,
        frameworkName: payload.frameworkName,
      })) >= 1;

    if (voteExists) {
      throw new ConflictException('You already voted for this framework.');
    }

    await getRepository(Vote).save({
      ...payload,
      voterUsername: username,
    });
  }

  @Put()
  @Role('user')
  public async update(
    @Body() payload: VotePayload,
    @Req() request: Request,
  ): Promise<void> {
    const token = this.authService.parseToken(request);
    const { username } = this.authService.decodeToken(token);

    const votes = await getRepository(Vote).find({
      voterUsername: username,
      frameworkName: payload.frameworkName,
    });

    if (votes.length < 1) {
      throw new NotFoundException("You haven't voted for this framework yet.");
    }

    await getRepository(Vote).update(
      {
        voterUsername: username,
        frameworkName: payload.frameworkName,
      },
      { ...payload },
    );
  }

  @Delete(':frameworkName')
  @Role('user')
  @HttpCode(204)
  public async delete(
    @Req() request: Request,
    @Param('frameworkName') frameworkName: string,
  ): Promise<void> {
    const token = this.authService.parseToken(request);
    const { username } = this.authService.decodeToken(token);

    const votes = await getRepository(Vote).find({
      voterUsername: username,
      frameworkName,
    });

    if (votes.length < 1) {
      throw new NotFoundException("You haven't voted for this framework yet.");
    }

    await getRepository(Vote).remove(votes);
  }
}
