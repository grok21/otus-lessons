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

  
  const courses = await Course.find().lean()

  res.render('courses', {courses})
})

router.get('/:id', async (req, res) => {
  console.log(req.params)

  const {id} = req.params
  const course = await Course.findById({_id: id}).lean()

  //console.log(course)
  res.render('course', {course})
})

module.exports = router