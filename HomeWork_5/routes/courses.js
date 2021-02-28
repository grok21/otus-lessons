const {Router} = require('express')
const Course = require('../models/course')

const User = require('../models/user')

const router = Router()

router.get('/', async (req, res) => {
  
  /*
  const user1 = new User({
    email: "zhukov@yandex.ru",
    name: "Vadim",
    password: "qwerty"
  })

  await user1.save()
  */

  /*
  const course1 = new Course({
    title: "Course 1",
    shortDescription: "Amazing course",
    fullDescription: "Very amazing course",
    img: "https://habrastorage.org/webt/xc/4n/a1/xc4na1sca8xlufsjkj3yyo1z9m8.jpeg", 
    lessons: [{title: "Занятие 1", shortDescription: "В этом занятии мы настроим окружение", fullDescription: "fullDescription", video: "video"}, 
              {title: "Занятие 2", shortDescription: "В этом занятии мы установим node и npm", fullDescription: "fullDescription", video: "video"}, 
              {title: "Занятие 3", shortDescription: "В этом занятии мы создадим первую программу", fullDescription: "fullDescription", video: "video"}
            ],
    participants: [{email: "zhukov@yandex.ru"}],
    owner: "zhukov@yandex.ru"
  })

  await course1.save()
  */

  try {
    const courses = await Course.find().lean()
    res.render('courses', {courses})
  } catch (e) {
    console.log(e)
  }
})

router.get('/create', (req, res) => {
  res.render('createCourse')
})

router.post('/create', async (req, res) => {
  console.log(req.body)

  const {title, img, shortDescription, fullDescription} = req.body

  const new_course = new Course({
    title, img, shortDescription, fullDescription,
    lessons: [], participants: [], owner: "zhukov@yandex.ru"
  })

  try {
    await new_course.save()
    res.redirect('/courses')
  } catch (e) {
    console.log(e)
  }
})

router.get('/:courseId', async (req, res) => {
  const {courseId} = req.params

  try {
    const course = await Course.findById({_id: courseId}).lean()
    res.render('course', {course})
  } catch (e) {
    console.log(e)
  }
})

router.get('/:courseId/edit', async (req, res) => {
  const {courseId} = req.params

  try {
    const course = await Course.findById({_id: courseId}).lean()
    res.render('editCourse', {course})
  } catch (e) {
    console.log(e)
  }
})

router.put('/:courseId/edit', async (req, res) => {
  const {courseId} = req.params
  delete req.body["id"]
  
  try {
    const course = await Course.findById({_id: courseId})
    
    Object.assign(course, req.body)
    await course.save()

    res.redirect(`/courses/${courseId}`)
  } catch (e) {
    console.log(e)
  }
})

router.delete('/:courseId/edit', async (req, res) => {
  const {courseId} = req.params

  try {
    await Course.deleteOne({_id: courseId})
    res.redirect('/courses')
  } catch (e) {
    console.log(e)
  }
})

router.get('/:courseId/edit/lessons/create', async (req, res) => {
  const {courseId} = req.params
  console.log(req.body)
  res.render('createLesson', {courseId})
})

router.post('/:courseId/edit/lessons/create', async (req, res) => {
  const {courseId} = req.params
  
  try {
    const course = await Course.findById({_id: courseId})
    course["lessons"].push(req.body)
    await course.save()

    res.redirect(`/courses/${courseId}`)
  } catch (e) {
    console.log(e)
  }
})

router.get('/:courseId/lessons/:lessonId', async (req, res) => {
  const {courseId, lessonId} = req.params
  
  try {
    const course = await Course.findById({_id: courseId}).lean()

    const neededLesson = course["lessons"].filter(lesson => lesson["_id"] == lessonId)
    const lesson = neededLesson[0]
  
    res.render('lesson', {lesson, course})
  } catch (e) {
    console.log(e)
  }
})

router.get('/:courseId/lessons/:lessonId/edit', async (req, res) => {
  const {courseId, lessonId} = req.params
  
  try {
    const course = await Course.findById({_id: courseId}).lean()

    const neededLesson = course["lessons"].filter(lesson => lesson["_id"] == lessonId)
    const lesson = neededLesson[0]
  
    res.render('editLesson', {lesson, courseId})
  } catch (e) {
    console.log(e)
  }
})

router.put('/:courseId/lessons/:lessonId/edit', async (req, res) => {
  console.log("I am in PUT")
  console.log(req.body)
  res.render('lesson')
})

router.delete('/:courseId/lessons/:lessonId/edit', async (req, res) => {
  console.log("I am DELETE")
  res.render('lesson')
})

module.exports = router