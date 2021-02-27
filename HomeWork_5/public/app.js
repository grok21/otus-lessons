editCoursePut.onsubmit = async (e) => {
  e.preventDefault();
  const form = new FormData(editCoursePut)
  let send = {}

  for (let input of form.entries())
    send[`${input[0]}`] = input[1]
  
  fetch(`/courses/${send['id']}/edit`, {
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

/*
if ($editCourse) {
  $editCourse.addEventListener('click', event => {

    // Edit course
    if (event.target.classList.contains('js-edit')) {
      const id = event.target.dataset.id
      console.log(event.target.dataset)
      console.log()
      while(1) {}

      fetch(`/courses/${id}/edit`, {
        method: 'put',
        body: ''
      }).then(res => {
        if (res.redirected) {
          document.location = res.url
        }
      })
    }

    // Remove course
    if (event.target.classList.contains('js-remove')) {
      const id = event.target.dataset.id

      fetch(`/courses/${id}/edit`, {
        method: 'delete'
      }).then(res => {
        if (res.redirected) {
          document.location = res.url
        }
      })
    }
  })
}
*/

M.Tabs.init(document.querySelectorAll('.tabs'))