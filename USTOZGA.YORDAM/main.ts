//http://localhost:3000/auth/register-teacher

// {
//   "username": "",
//   "email": ",
//   "password": "123456",
//   "role": "teacher"
// }


//http://localhost:3000/auth/login

// "email": ",
// "password": "123456"



//PATCH
//http://localhost:3000/groups/2/assign/1

//"name": "Group A",

//CRUD
//http://localhost:3000/teachers

// {
// "username": "",
//   "email": "@example.com",
//   "password": "123456"
// }

//CRUD
//http://localhost:3000/students

// {
  
//   "firstName": "",
//   "lastName": "",
//   "email": "@example.com",
//   "phone": "123456789",
//   "age": 15,
//   "groupId": 
// }

//STATISTICS
//http://localhost:3000/stats/monthly?year=2025
//http://localhost:3000/stats/overview

//ATTENDANCE
//http://localhost:3000/attendance/today-attendance
//http://localhost:3000/attendance/mark

// {
//   "firstName": "",
//   "lastName": "",
//   "present": false
// }

//BOSHIDA BOTDA TOLOV KILISH KERAK

// http://localhost:3000/payments


//BU HAM BOTGA MUROJAT KILISH KERAK

// http://localhost:3000/murojat



//PUT
// http://localhost:3000/teachers/1/lesson-times

// {
//   "lessonTimes": [
//     {
//       "day": "Monday",
//       "startTime": "16:00",
//       "endTime": "18:00"
//     },
//     {
//       "day": "Friday",
//       "startTime": "10:00",
//       "endTime": "12:00"
//     }
//   ]
// }

//PUT
// http://localhost:3000/students/1/lesson-times

// {
//   "lessonTimes": [
//     {
//       "day": "Monday",
//       "startTime": "16:00",
//       "endTime": "18:00"
//     },
//     {
//       "day": "Friday",
//       "startTime": "10:00",
//       "endTime": "12:00"
//     }
//   ]
// }