import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  UseInterceptors,
  UploadedFile,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

import path = require('path');
import { join } from 'path';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

/**
 * used to store the uploaded profileImages to the
 * destination folder specified.
 */
export const storage = {
  storage: diskStorage({
    destination: './uploads/profileimages',
    filename: (req, file, cb) => {
      const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();

      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findUserById(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }

  /**
   *
   * @param file Images with jpeg or png file extensions
   * @param req to upload profileImage to User entity
   * @returns updated User entity data
   */
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file, @Request() req) {
    const user: User = req.user;
    // uploading file is simply storing the name of the file to the users data table
    // and to store the actual data to a specific directory folder. And when their is a
    // request to the uploaded file we reference them using their name's from the database.
    return this.usersService.updateOne(user.id, { profileImage: file.filename } as User);
  }

  @Get('profile-image/:imagename')
  findProfileImage(@Param('imagename') imagename, @Response() res): Promise<unknown> {
    return res.sendFile(join(process.cwd(), 'uploads/profileimages/' + imagename));
  }
}
