import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  findAll(): Employee[] {
    return this.employeesService.findAll();
  }

  @Get('highest-paid')
  getHighestPaid(): Employee {
    return this.employeesService.getHighestPaid();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Employee {
    return this.employeesService.findById(id);
  }
}
