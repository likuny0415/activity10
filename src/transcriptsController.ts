import { Body, Controller, Delete, Get, Path, Post, Query, Response, Route, Tags } from "tsoa";
import { InvalidParametersError } from "./server";
import * as db from "./transcriptManager";

@Route('transcripts')
export class TranscriptsController extends Controller {

    @Get()
    public getAll() {
        return db.getAll();
    }

    /**
     * Retrieves the transcript for a given Student ID
     * @param studentID 
     * @throws InvalidParametersError if the student ID does not correspond to any known transcript 
     */
    @Get('{studentID}')
    @Response<InvalidParametersError>(400, 'Invalid values specified')
    public getTranscript(
        @Path()
        studentID: db.StudentID) {
        return db.getTranscript(studentID);
    }

    /**
     * Create a new student, optionally initializing their transcript
     * @param requestBody 
     * @returns the ID of the newly created student
     */
    @Post()
    public addStudent(@Body() requestBody: {
        studentName: string,
        grades?: db.CourseGrade[]
    }) {
        return db.addStudent(requestBody.studentName, requestBody.grades);
    }
    /**
     * Deletes a student's transcript 
     * @param studentID The ID of the student to delete
     * 
     */
    @Delete('{studentID}')
    public deleteStudent(
        @Path()
        studentID: db.StudentID) {
        db.deleteStudent(studentID);
    }

    /**
     * Adds a grade to a student's transcript
     * @param studentID 
     * @param courseNumber 
     * @param courseGrade 
     */
    @Post("{studentID}/{courseNumber}")
    public addGrade(@Body() requestBody: {
        studentID: db.StudentID,
        courseNumber: db.Course,
        courseGrade: number
    }): void {
        db.addGrade(requestBody.studentID, requestBody.courseNumber, requestBody.courseGrade);
    }

    /**
     * Retrieve a student's grade in a course
     * @param studentID 
     * @param courseNumber 
     * @returns the course grade
     */
    @Get("{studentID}/{courseNumber}")
    public getGrade(
        @Path()
        studentID: db.StudentID,
        courseNumber: db.Course
    ) {
        return db.getGrade(studentID, courseNumber);
    }
}