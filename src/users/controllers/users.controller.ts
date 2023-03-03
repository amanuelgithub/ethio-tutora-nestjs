import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Response,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
// import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

import path = require('path');
import { join } from 'path';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { CheckPolicies } from 'src/casl/check-policy.decorator';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProfileDto } from '../dto/update-profile.dto';

/**
 * used to store the uploaded profileImages to the
 * destination folder specified.
 */
export const storage = {
  storage: diskStorage({
    destination: './uploads/profileimages',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();

      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

// @UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  // @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, User))
  findAll(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Patch(':id/change-password')
  @UseGuards(JwtAuthGuard)
  changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<User> {
    return this.usersService.changePassword(id, changePasswordDto);
  }

  @Post('upload/:id')
  @UseGuards(JwtAuthGuard)
  // @UseGuards(PoliciesGuard)
  // @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, User))
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@Req() req, @Param('id') id: string, @UploadedFile() file) {
    // uploading file is simply storing the name of the file to the users data table
    // and to store the actual data to a specific directory folder. And when their is a
    // request to the uploaded file we reference them using their name's from the database.
    console.log('Requesting user', req.user);
    console.log('file: ', file);
    return this.usersService.updateProfileImage(id, {
      profileImage: file.filename,
    } as UpdateProfileDto);
  }

  @Get('profile-images/:imagename')
  // @UseGuards(PoliciesGuard)
  // @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, User))
  findProfileImage(
    @Param('imagename') imagename,
    @Response() res,
  ): Promise<any> {
    return res.sendFile(
      join(process.cwd(), 'uploads/profileimages/' + imagename),
    );
  }
}
