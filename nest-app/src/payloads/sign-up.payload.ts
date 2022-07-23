import { IsString } from 'class-validator';

export class SignUpPayload {
	@IsString()
	public username: string;

	@IsString()
	public fullName: string;

	@IsString()
	public password: string;
}
