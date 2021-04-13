const $editCoursePut = document.querySelector('#editCoursePut')
const $editCourseDelete = document.querySelector('#editCourseDelete')
const $editLessonPut = document.querySelector('#editLessonPut')
const $editLessonDelete = document.querySelector('#editLessonDelete')


if ($editCoursePut) {
  editCoursePut.onsubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(editCoursePut)
    let send = {}
  
    for (let input of form.entries())
      send[`${input[0]}`] = input[1]
    
    fetch(`/courses/${form.get('id')}/edit`, {
      method: 'PUT',
      body: JSON.stringify(send), 
      headers: {
        'Content-type': 'application/json'
      }
    }).then(res => {
      if (res.redirected) {
        document.location = res.url
      }
    })
      .catch(e => console.log(e))
  }
}

if ($editCourseDelete) {
  editCourseDelete.onsubmit = async (e) => {
    e.preventDefault();
  
    const form = new FormData(editCourseDelete)
  
    fetch(`/courses/${form.get('id')}/edit`, {
      method: 'delete'
    }).then(res => {
      if (res.redirected) {
        document.location = res.url
      }
    })
  }
}

if ($editLessonPut) {
  editLessonPut.onsubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(editLessonPut)
  
    let send = {}
    for (let input of form.entries())
      send[`${input[0]}`] = input[1]
  
    
    fetch(`/courses/${form.get('courseId')}/lessons/${form.get('lessonId')}/edit`, {
      method: 'PUT',
      body: JSON.stringify(send), 
      headers: {
        'Content-type': 'application/json'
      }
    }).then(res => {
      if (res.redirected) {
        document.location = res.url
      }
    })
      .catch(e => console.log(e))
  }
}

if ($editLessonDelete) {
  editLessonDelete.onsubmit = async (e) => {
    e.preventDefault();
  
    const form = new FormData(editLessonDelete)
  
    fetch(`/courses/${form.get('courseId')}/lessons/${form.get('lessonId')}/edit`, {
      method: 'delete'
    }).then(res => {
      if (res.redirected) {
        document.location = res.url
      }
    })
  }
}

M.Tabs.init(document.querySelectorAll('.tabs'))