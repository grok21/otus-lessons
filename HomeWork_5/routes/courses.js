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
    description: "Amazing course",
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

router.get('/:id', async (req, res) => {

  const {id} = req.params
  const course = await Course.findById({_id: id}).lean()

  //console.log(course)
  res.render('course', {course})
})

router.get('/:id/edit', async (req, res) => {
  const {id} = req.params

  try {
    const course = await Course.findById({_id: id}).lean()
    res.render('editCourse', {id})
  } catch (e) {
    console.log(e)
  }
})

router.put('/:id/edit', async (req, res) => {
  const {id} = req.params

  console.log("I am in PUT")

  console.log(req.body)
  //console.log(req)
  /*
  try {
    const course = await Course.findById({_id: id})
    
    Object.assign(course, req.body)
    await course.save()

    res.redirect('/courses/:id')
  } catch (e) {
    console.log(e)
  }
  */
})

router.delete('/:id/edit', async (req, res) => {
  const {id} = req.params

  try {
    await Course.deleteOne({_id: id})
    res.redirect('/courses')
  } catch (e) {
    console.log(e)
  }
})

module.exports = router