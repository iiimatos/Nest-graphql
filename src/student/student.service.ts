import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, In } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Student } from './student.entity';
import { CreateStudentInput } from './create-student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly _studentRepository: MongoRepository<Student>,
  ) {}

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const student = this._studentRepository.create({
      id: uuid(),
      ...createStudentInput,
    });
    return await this._studentRepository.save(student);
  }

  async getAllStudents(): Promise<Student[]> {
    return await this._studentRepository.find();
  }

  async getStudentById(id: string): Promise<Student> {
    return await this._studentRepository.findOneBy({ id });
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return await this._studentRepository.findBy({
      where: { id: { $in: [...studentIds] } },
    });
  }
}
