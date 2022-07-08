import { Controller, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.adminService.remove(id);
  }
}
