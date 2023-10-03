document.addEventListener("DOMContentLoaded", pageHandler)

// Function that fetches and displays the searched user and their details.
function pageHandler() {

    const form = document.getElementById("github-form")
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let userInput = document.getElementById("search").value;
        fetch(`https://api.github.com/search/users?q=${userInput}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            let infoArray = data.items;
            const userList = document.getElementById("user-list");

             for (let element of infoArray){
                let id = element.id

                if (element.login === userInput) {
                userList.innerHTML = `<button onclick = "repoHandler(${id})"><h4>Username : ${element.login}</h4></button>
                <img src = ${element.avatar_url}/>
                <h4>Profile link : ${element.html_url}</h4>
                `
                }
             }
        })
    })
}

// Function that fetches and displays all the repositories for the searched user.
function repoHandler(id) {

    userInput = document.getElementById("search").value;
    fetch(`https://api.github.com/users/${userInput}/repos`)
    .then(function(response) {
        return response.json();
    })
    .then(function(repo) {
        const repos = document.getElementById("repos-list")
        repos.innerHTML = "";

        for (element of repo) {
            let repoName = element.name
            repos.innerHTML += `<h4><li>${repoName}</li></h4>
            <br/>`
        }
    })
}