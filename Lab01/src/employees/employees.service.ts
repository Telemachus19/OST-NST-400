import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  private readonly employees: Employee[] = [
    {
      id: 1,
      name: 'Alice',
      age: '28',
      salary: 60000,
    },
    {
      id: 2,
      name: 'Bob',
      age: '35',
      salary: 80000,
    },
    {
      id: 3,
      name: 'Charlie',
      age: '42',
      salary: 120000,
    },
  ];

  findAll(): Employee[] {
    return this.employees;
  }

  findById(id: number): Employee {
    const employee = this.employees.find((emp) => emp.id === id);
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  getHighestPaid(): Employee {
    if (this.employees.length === 0) {
      throw new NotFoundException('No employees found');
    }
    return this.employees.reduce((prev, current) => {
      return prev.salary > current.salary ? prev : current;
    });
  }
}
