    git add .
    git config user.email "ahmed.elsagher@tedata.net"
    git config user.name "Ahmed Al-Sagher"
    git commit -m "first commit"
  ---
    git fetch >>> git merge origin/master
---
    git pull = git fetch + git merge
---
### Add origin as remote server repository
    git remote add origin https://github.com/anddo88/Angular_Session.git
### Change the remote url
    git remote set-url origin git@github.com:anddo88/Angular_Session
---
    git push -u origin master
***origin:*** alias name for repository url that added from github
***master:*** branch

---
### info
    git remote -v
    git branch
    git status
    git log
    git log --oneline
    git log --oneline origin/master

### see remote branches
    git branch -r

### see all branches
    git branch -a

### Test connection to github
    ssh -T git@github.com

### Generate SSH key
    ssh-keygen -t rsa -b 4096 -C "anddo88@yandex.com"

### Make sure ssh agent is running
    eval $(ssh-agent -s)

### Add current keys to ssh agent
    ssh-add ~/.ssh/id_rsa
