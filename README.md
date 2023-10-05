# Transcript Client


After installing the dependencies (`npm install`), `npm start` can be used to launch the application in a local web browser. It retrieves transcripts from our REST example server and renders them in a page.

## Getting started
First, run `npm start` to generate the OpenAPI specification, server boilerplate, and start the development server.
This command will automatically reload the server as you change files in this project.
To stop the server, press control-C in the terminal.

Once you see the message "Listening on 8081", you can access this URL in your browser: 
[http://localhost:8081/docs/#/transcript](http://localhost:8081/docs/#/transcript)

You should now see a "Swagger" transcript-server-openapi documentation page, with a few API endpoints defined. Expand the "GET /transcripts" endpoint, click "Try it out", and then "Execute". Now, the field "Response Body" should have text in it like:
```
[
  {
    "student": {
      "studentID": 1,
      "studentName": "avery"
    },
    "grades": [
      {
        "course": "DemoClass",
        "grade": 100
      },
      {
        "course": "DemoClass2",
        "grade": 100
      }
    ]
  },
```

This demonstrates that this endpoint of your REST API is functional.

### Inspect the starter code, implement remaining routes
The file `src/transcriptsController.ts` defines the API. We are creating the REST API using a library called [TSOA](https://tsoa-community.github.io/docs/), which expects us to provide it with a class that defines each of the API endpoint methods.

The controller class is annotated: `@Route('transcripts')`

This means that all of the `@Route` annotations within the class will be defined off of that base route.

The route `GET /transcripts`, then, is handled by this method:
```
    @Get()
    public getAll() {
        return db.getAll();
    }
```

If you add a `console.log` statement in this method, and save the file, you will note that the server restarts (it will output some text on the console), and if you re-execute the `GET /transcripts` route in your browser, you will see your `console.log` print out.

Your task for this activity is to implmeent the remainder of the routes:
* GET  /transcripts/:ID - Get a student's transcript (`db.getTranscript()`)
* POST /transcripts - Add a student (`db.addStudent()`)

* DELETE /transcripts/:ID - Delete's a student's transcript (`db.deleteStudent()`)
* POST /transcripts/:studentID/:courseNumber - Create a transcript entry for a student's course (`db.addGrade()`)
GET  /transcripts/:studentID/:courseNumber - Return the student's grade for a given course

We have created placeholders for each of these routes in the `transcriptsController.ts` file. We show two examples of accessing parameters from route handlers (`@Path()` and `@Body()` on `getTranscript` and `addStudent`), and an example of the `@Response` annotation to indicate what errors may be thrown.

FYI: Given that REST is intended to be a stateless protocol, the TSOA designers decided that each invocation of an API endpoint should create a new instance of the controller. This is why we have to implement this controller class separately from the `transcriptManager` class.# activity10
