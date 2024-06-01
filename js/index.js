document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#github-form');
    const userList = document.querySelector('#user-list');
    const repoList = document.querySelector('#repos-list');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const searchTerm = formData.get('search');

        fetch(`https://api.github.com/search/users?q=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                userList.replaceChildren();
                repoList.replaceChildren();

                data.items.forEach(user => {
                    const li = document.createElement('li');
                    li.textContent = user.login;
                    userList.appendChild(li);
                });

                data.items.forEach(user => {
                    fetch(user.repos_url)
                        .then(response => response.json())
                        .then(repos => {
                            repos.forEach(repo => {
                                const li = document.createElement('li');
                                li.textContent = repo.name;
                                repoList.appendChild(li);
                            });
                        });
                });
            })
            .catch(error => console.error('Error fetching GitHub data:', error));
    });
});