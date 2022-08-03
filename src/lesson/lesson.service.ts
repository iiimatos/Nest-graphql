import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly _lessonRepository: MongoRepository<Lesson>,
  ) {}

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const lesson = this._lessonRepository.create({
      id: uuid(),
      ...createLessonInput,
    });
    return await this._lessonRepository.save(lesson);
  }

  async getLessonById(id: string): Promise<Lesson> {
    return await this._lessonRepository.findOneBy({ id });
  }

  async getAllLessons(): Promise<Lesson[]> {
    return await this._lessonRepository.find();
  }

  async assingStudentsToLesson(
    lessonId: string,
    studentIds: string[],
  ): Promise<Lesson> {
    const lesson = await this.getLessonById(lessonId);
    lesson.students = [...lesson.students, ...studentIds];
    return this._lessonRepository.save(lesson);
  }
}
