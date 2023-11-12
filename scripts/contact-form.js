const scriptURL = 'https://script.google.com/macros/s/AKfycbzP7hDZVsqGUg16oNWk3KUeNWmuqCZ8cMp5Bm5mDwA3dcbIq_iZ61r0OO_nA1rj0N1A/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById('msg')

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        msg.innerHTML = "Message sent successfully!"
        setTimeout(function(){
          msg.innerHTML = ""
        },5000)
        form.reset()
      })
      .catch(error => console.error('Error!', error.message))
  })
