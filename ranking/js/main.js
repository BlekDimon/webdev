const firstNames = [
    "Lysanne",
    "Brenda",
    "Bessie",
    "Alisha",
    "D'angelo",
    "Sister",
    "Stevie",
    "Kenyatta",
    "Autumn",
    "Belle",
    "Jeromy",
    "Eldred",
    "Charley",
    "Coleman",
    "Caitlyn",
    "Marjorie",
    "Francesca"
];

const lastNames = [
    "Davis",
    "Kuhlman",
    "Leffler",
    "Littel",
    "Schuppe",
    "Mohr",
    "Beahan",
    "Beatty",
    "Mante",
    "Dickens",
    "Barrows",
    "Pollich",
    "Labadie",
    "Ullrich"
];

const ages = ["0-12", "13-18", "19-28", "29-35", "36-50", "51-65", "65-99"];
let users = [];

const User = class {
    constructor(nr) {
        const iFirstName = Math.floor(Math.random() * lastNames.length);
        const iLastName = Math.floor(Math.random() * lastNames.length);
        const iAge = Math.floor(Math.random() * ages.length);
        const points = Math.floor(Math.random() * 5000);
        this.firstName = firstNames[iFirstName];
        this.lastName = lastNames[iLastName];
        this.age = ages[iAge];
        this.points = points;
        this.nr = nr;
    }
};

const createUsers = amount => {
    for (let i = 1; i <= amount; i++) {
        users.push(new User(i));
    }
    drawRanking();
    checkToSort();
};

const drawRanking = () => {
    users.forEach((user, i) => {
        let divRank = document.createElement("div");
        divRank.classList.add("rank");
        let divNr = document.createElement("div");
        divNr.classList.add("nr");
        let divFirstName = document.createElement("div");
        divFirstName.classList.add("first-name");
        let divLastName = document.createElement("div");
        divLastName.classList.add("last-name");
        let divPoints = document.createElement("div");
        divPoints.classList.add("points");
        let divAge = document.createElement("div");
        divAge.classList.add("age");
        //
        let spanNr = document.createElement("span");
        spanNr.appendChild(document.createTextNode(`${user.nr}.`));
        let spanFirstName = document.createElement("span");
        spanFirstName.appendChild(document.createTextNode(user.firstName));
        let spanLastName = document.createElement("span");
        spanLastName.appendChild(document.createTextNode(user.lastName));
        let spanPoints = document.createElement("span");
        spanPoints.appendChild(document.createTextNode(user.points));
        let spanAge = document.createElement("span");
        spanAge.appendChild(document.createTextNode(user.age));
        //
        document.querySelector(".ranking-box").appendChild(divRank);
        //
        document.querySelectorAll(".rank")[i].appendChild(divNr);
        document.querySelectorAll(".rank")[i].appendChild(divFirstName);
        document.querySelectorAll(".rank")[i].appendChild(divLastName);
        document.querySelectorAll(".rank")[i].appendChild(divPoints);
        document.querySelectorAll(".rank")[i].appendChild(divAge);
        //
        document.querySelectorAll(".nr")[i].appendChild(spanNr);
        document.querySelectorAll(".first-name")[i].appendChild(spanFirstName);
        document.querySelectorAll(".last-name")[i].appendChild(spanLastName);
        document.querySelectorAll(".points")[i].appendChild(spanPoints);
        document.querySelectorAll(".age")[i].appendChild(spanAge);
    });
};

const checkToSort = () => {
    const topButtons = document.querySelectorAll(
        ".top-nr, .top-first-name, .top-last-name, .top-points, .top-age"
    );

    topButtons.forEach(item => {
        item.addEventListener("click", function() {
            if (this.querySelectorAll("i")[0].id != "") {
                this.querySelectorAll("i")[0].removeAttribute("id");
                this.querySelectorAll("i")[1].id = "active";
                sorting(this);
            } else if (this.querySelectorAll("i")[1].id != "") {
                this.querySelectorAll("i")[1].removeAttribute("id");
                this.querySelectorAll("i")[0].id = "active";
                sorting(this);
            } else {
                topButtons.forEach(item => {
                    item.querySelectorAll("i")[0].removeAttribute("id");
                    item.querySelectorAll("i")[1].removeAttribute("id");
                });
                this.querySelectorAll("i")[0].id = "active";
                sorting(this);
            }
        });
    });
};

const sorting = object => {
    const ranks = document.querySelectorAll(".rank");
    ranks.forEach((items, i) => {
        items.remove();
    });
    //id
    if (object.classList.contains("top-nr")) {
        if (object.querySelectorAll("i")[0].id != "") {
            users.sort((a, b) => {
                if (a.nr > b.nr) {
                    return 1;
                } else {
                    return -1;
                }
            });
        } else {
            users.reverse();
        }
    }
    //first name
    if (object.classList.contains("top-first-name")) {
        if (object.querySelectorAll("i")[0].id != "") {
            users.sort((a, b) => {
                if (a.firstName > b.firstName) {
                    return 1;
                } else {
                    return -1;
                }
            });
        } else {
            users.reverse();
        }
    }
    //last name
    if (object.classList.contains("top-last-name")) {
        if (object.querySelectorAll("i")[0].id != "") {
            users.sort((a, b) => {
                if (a.lastName > b.lastName) {
                    return 1;
                } else {
                    return -1;
                }
            });
        } else {
            users.reverse();
        }
    }
    //points
    if (object.classList.contains("top-points")) {
        if (object.querySelectorAll("i")[0].id != "") {
            users.sort((a, b) => {
                if (a.points > b.points) {
                    return -1;
                } else {
                    return 1;
                }
            });
        } else {
            users.reverse();
        }
    }
    //age
    if (object.classList.contains("top-age")) {
        if (object.querySelectorAll("i")[0].id != "") {
            users.sort((a, b) => {
                if (a.age > b.age) {
                    return 1;
                } else {
                    return -1;
                }
            });
        } else {
            users.reverse();
        }
    }
    drawRanking();
};

createUsers(100);
