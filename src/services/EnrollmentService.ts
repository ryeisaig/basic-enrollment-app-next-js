import { generateStudentNumber } from "./StudentService"
import { Resources } from "@/utils/ApiConstants";
import clientPromise from '../lib/mongodb';
import { ObjectId } from "mongodb";

export const processEnrollmentForNewStudent = async(req: any, res: any) => {
    const client = await clientPromise;
    const db = client.db('enrollment');

    const enrollment =  {...req.body};
    const student = {...req.body.student}

    if(student._id){
        student['courseId'] = req.body.courseId;
        student['type'] = req.body.enrollmentType;
        student['yearLevel'] = req.body.yearLevel;
        student['updateDateTime'] = new Date();
        const studentId = student._id;
        delete student._id;
        await db.collection(Resources.STUDENTS).updateOne({_id : new ObjectId(studentId)}, { $set: student });
    } else {
        const studentNumber = await generateStudentNumber(req.body.academicPeriodId);
        student['studentNumber'] = studentNumber;
        student['courseId'] = req.body.courseId;
        student['type'] = req.body.enrollmentType;
        student['yearLevel'] = req.body.yearLevel;
        student['createDateTime'] = new Date();
        student['updateDateTime'] = new Date();
        const studentData = await db.collection(Resources.STUDENTS).insertOne(student);
        enrollment['studentId'] = studentData.insertedId;
    }
    enrollment['updateDateTime'] = new Date();

    let newData;
    if(enrollment._id){
        let enrollmentId = enrollment._id;
        delete enrollment._id;
        newData = await db.collection(Resources.STUDENTS).updateOne({_id : new ObjectId(enrollmentId)}, { $set: enrollment });
    } else {
        enrollment['createDateTime'] = new Date();
        newData = await db.collection(Resources.ENROLLMENTS).insertOne(enrollment);
    }
    
    res.status(200).json({'result': 'success', 'data': newData});
}

export const processEnrollmentForOldStudent = async(req: any, res: any) => {
    const client = await clientPromise;
    const db = client.db('enrollment');

    const student = {...req.body.student}
    student['courseId'] = req.body.courseId;
    student['type'] = req.body.enrollmentType;
    student['yearLevel'] = req.body.yearLevel;
    student['updateDateTime'] = new Date();

    const studentId = student._id;
    delete student._id;
    await db.collection(Resources.STUDENTS).updateOne({_id : new ObjectId(studentId)}, { $set: student });
    
    req.body['updateDateTime'] = new Date();
    req.body['createDateTime'] = new Date();

    let newData;
    if(req.body._id){
        let enrollmentId = req.body._id;
        delete req.body._id;
        newData = await db.collection(Resources.STUDENTS).updateOne({_id : new ObjectId(enrollmentId)}, { $set: req.body });
    } else {
        req.body['createDateTime'] = new Date();
        newData = await db.collection(Resources.ENROLLMENTS).insertOne(req.body);
    }

    res.status(200).json({'result': 'success', 'data': newData});
}