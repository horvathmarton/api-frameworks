import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class VotePayload {
	@IsString()
	frameworkName: string;

	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(10)
	public documentation: number;

	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(10)
	public configuration: number;

	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(10)
	public dependencyManagement: number;

	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(10)
	public routing: number;

	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(10)
	public debugging: number;

	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(10)
	public inputValidation: number;

	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(10)
	public auth: number;

	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(10)
	public serialization: number;

	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(10)
	public testing: number;

	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(10)
	public logging: number;

	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(10)
	public caching: number;

	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(10)
	public httpRequests: number;

	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(10)
	public queueHandling: number;

	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(10)
	public websockets: number;
}
