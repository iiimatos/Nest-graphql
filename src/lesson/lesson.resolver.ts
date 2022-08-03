import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';
import { AssingStudentsToLessonInput } from './assign-students-to-lesson.input';
import { Lesson } from './lesson.entity';
import { StudentService } from 'src/student/student.service';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private readonly _lessonService: LessonService,
    private readonly _studentService: StudentService,
  ) {}
  @Query((returns) => LessonType)
  async lesson(@Args('id') id: string) {
    return await this._lessonService.getLessonById(id);
  }

  @Query((returns) => [LessonType])
  async lessons() {
    return await this._lessonService.getAllLessons();
  }

  @Mutation((returns) => LessonType)
  async createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return await this._lessonService.createLesson(createLessonInput);
  }

  @Mutation((returns) => LessonType)
  async assignStudentsToLesson(
    @Args('assingStudentsToLessonInput')
    { lessonId, studentIds }: AssingStudentsToLessonInput,
  ) {
    return await this._lessonService.assingStudentsToLesson(
      lessonId,
      studentIds,
    );
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this._studentService.getManyStudents(lesson.students);
  }
}
