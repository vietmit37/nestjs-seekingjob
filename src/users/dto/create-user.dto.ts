import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateUserDto {
    @IsEmail({}, { message: "Email khong dung dinh dang" })
    @IsNotEmpty(
        {
            message: "Email khoogn dc de trong"
        }
    )
    email: string;

    @IsNotEmpty()
    password: string

    name: string
}
