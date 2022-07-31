// 1. The `index.html` file has a form with a search input. When the form is
//    submitted, it should take the value of the input and search GitHub for user
//    matches using the [User Search Endpoint](#user-search-endpoint).

const init = () => {
    let form = document.querySelector('#github-form')
    let search = document.getElementById('search')
    form.addEventListener('submit', function(e) {
        e.preventDefault()
        let user = search.value
        fetch(`https://api.github.com/search/users?q=${user}`, {
            headers: {
                "Accept": "application/vnd.github.v3+json",
            }
        })
        .then(resp => resp.json())
        .then(data => {
            let users = (Object.entries(data.items))
            handleData(users)
            let myTimeout = setTimeout(linkToUserRepo(users), 3000)

        })
    })
}

document.addEventListener('DOMContentLoaded',init)
// 2. Using the results of the search, display information about the users to the
//    page. (You might include showing their username, avatar and a link to their
//    profile.

function handleData(users) {
    let userData = users
    let userList = document.getElementById('user-list')
    userList.replaceChildren()
    for(let user of userData) {
    let newLi = document.createElement('li')
    let newUl = document.createElement('ul')
    let newImg = document.createElement('img')
    newLi.classList.add('users')
    newLi.innerText = `${user[1].login}`
    userList.appendChild((newLi))
    }

}
// 3. Clicking on one of these users should send a request to the
//    [User Repos Endpoint](#user-repos-endpoint) and return data about all the
//    repositories for that user.

https://api.github.com/users/octocat/repos



function linkToUserRepo() {
    let liUsers = document.getElementsByClassName('users')
    for(let user of liUsers){
        user.addEventListener('click',function(){

            fetch(`https://api.github.com/users/${user.innerText}/repos`,{
                headers: {
                    "Accept": "application/vnd.github.v3+json",
                }
            })
            .then(resp => resp.json())
            .then(data => {
                let reposList = document.getElementById('repos-list')
                reposList.replaceChildren()
                let userRepos = data
                for(let userRepo of userRepos) {
                    let newLi = document.createElement('li')
                    newLi.classList.add('user-repos')
                    newLi.innerText = `${userRepo.name}`
                    reposList.appendChild((newLi))
                }
            })
                
        })
    }
}

