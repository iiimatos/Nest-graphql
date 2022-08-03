import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { CreateStudentInput } from './create-student.input';
import { StudentService } from './student.service';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private readonly _studentService: StudentService) {}

  @Mutation((returns) => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return await this._studentService.createStudent(createStudentInput);
  }

  @Query((returns) => [StudentType])
  async students() {
    return await this._studentService.getAllStudents();
  }

  @Query((returns) => StudentType)
  async student(@Args('id') id: string) {
    return this._studentService.getStudentById(id);
  }
}
