import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.shema';
import mongoose, { Model } from 'mongoose';
import { compareSync, genSaltSync, hashSync } from "bcryptjs"
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>
  ) { };

  hashPassword(password: string) {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt)
    return hash
  }


  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto
    const hashPassword = this.hashPassword(password)
    let user = await this.userModel.create({
      email, password: hashPassword, name
    })
    return user
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return "Not Found User"
    }
    return this.userModel.findOne({
      _id: id
    })
  }

  findOneByUser(username: string) {
    return this.userModel.findOne({
      email: username
    })
  }

  IsValidPassword(password: string, hash: string) {
    return compareSync(password, hash)
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({
      _id: updateUserDto._id
    }, { ...updateUserDto })
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return "Not Found User"
    }
    return this.userModel.softDelete({
      _id: id
    })
  }
}
