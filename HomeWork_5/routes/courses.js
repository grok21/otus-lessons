const {Router} = require('express')
const Course = require('../models/course')

const User = require('../models/user')

const router = Router()

router.get('/', async (req, res) => {
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
  const {title, img, shortDescription, fullDescription} = req.body

  const new_course = new Course({
    title, img, shortDescription, fullDescription,
    lessons: [], participants: [], owner: "email@email.ru"
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
  delete req.body.id
  
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
  res.render('createLesson', {courseId})
})

router.post('/:courseId/edit/lessons/create', async (req, res) => {
  const {courseId} = req.params
  
  try {
    const course = await Course.findById({_id: courseId})
    course.lessons.push(req.body)
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

    const neededLesson = course.lessons.filter(lesson => lesson["_id"] == lessonId)
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

    const neededLesson = course.lessons.filter(lesson => lesson._id == lessonId)
    const lesson = neededLesson[0]
  
    res.render('editLesson', {lesson, courseId})
  } catch (e) {
    console.log(e)
  }
})

router.put('/:courseId/lessons/:lessonId/edit', async (req, res) => {
  const {courseId, lessonId} = req.params
  delete req.body.courseId
  delete req.body.lessonId

  try {
    const course = await Course.findById({_id: courseId})

    course.lessons.forEach(lesson => {
      if (lesson._id == lessonId) {
        Object.assign(lesson, req.body)
      }
    })

    await course.save()

    res.redirect(`/courses/${courseId}`)
  } catch (e) {
    console.log(e)
  }
})

router.delete('/:courseId/lessons/:lessonId/edit', async (req, res) => {
  const {courseId, lessonId} = req.params

  try {
    const course = await Course.findById({_id: courseId})
    course.lessons = course.lessons.filter(lesson => lesson._id != lessonId)
    await course.save()
    res.redirect(`/courses/${courseId}`)
  } catch (e) {
    console.log(e)
  }
})

module.exports = router