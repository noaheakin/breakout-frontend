// fetch users and scores
const userUrl = 'http://localhost:3000/users'
getUsers(userUrl)
function getUsers(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
}

let nameForUser = document.querySelector('h3')

// function usernameClick(name) {
//     let user = prompt('Enter your username');
//     if (user == undefined) {
//         nameForUser.innerText = "We can't track your score without a username"
// } else {

// }
// }
// usernameClick()

// Patch request
