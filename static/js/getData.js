async function getRegions(param, order) {
    let request = await fetch("http://localhost:8080/standing/region", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: {
            "resFrom": param == "0" ? 464 : param == "1" ? 573 : 0,
            "resTo": param == "0" ? 573 : 801,
            "order": order
        }
    })

    if (!request.ok) {
        console.log("smh wrong")
    }

    let response = await request.json()

    let table = document.createElement("table")

    let topic = `<tr>
        <th>Место</th>
        <th>Регион</th>
        <th>Параметр</th>
    </tr>`

    table.appendChild(topic)

    for (let el of response) {
        let tr = document.createElement("tr")

        let place = document.createElement("td")
        let region = document.createElement("td")
        let count = document.createElement("td")

        place.innerHTML = el.place
        region.innerHTML = el.region
        count.innerHTML = el.count

        tr.appendChild(place)
        tr.appendChild(region)
        tr.appendChild(count)

        table.appendChild(tr)
    }

    return table
}

async function getParticipants(options) {
    let {tour, grade, school, region, time, decoration} = options

    let request = await fetch("http://localhost:8080/standing/participant", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: {
            "tour": tour || "3",
            "grade": grade || "all",
            "school": school || "all",
            "region": region || "all",
            "time": time || "all"
        }
    })

    if (!request.ok) {
        console.log("smh wrong")
    }

    let response = await request.json()

    let table = document.createElement("table")

    let topic = `<tr>
        <th>Место</th>
        <th>Участник</th>
        ${
        if (tour == "1") {
        `<th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>`
        } else if (tour == "2") {
                `<th>5</th>
        <th>6</th>
        <th>7</th>
        <th>8</th>`
        } else {
                    `<th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
        <th>5</th>
        <th>6</th>
        <th>7</th>
        <th>8</th>`
        }
        }
        <th>Баллы</th>
    </tr>`

    table.appendChild(topic)

    let isSmall = response.length <= 5 ? true : false

    for (let i = 0; i < response.length; i++) {
        let el = response[i];

        let tr = document.createElement("tr")

        let number = (i) => isSmall ? 1 : i % 2

        if (decoration) {
            if (el.status == "win") {
                tr.classList.add(`row-win-${number(i)}`)
            } else if (el.status == "prize") {
                tr.classList.add(`row-prize-${number(i)}`)
            }
        } else {
            tr.classList.add(`row0${number(i)}`)
        }

        let place = document.createElement("td")
        let participant = document.createElement("td")
        let points = el.points.map(k => +k)
        let summPoints = points.reduce((a, b) => a + b)

        place.innerHTML = el.place
        participant.innerHTML = el.participant

        [place, participant].forEach(k => tr.appendChild(k))

        for (let j = 0; j < points.length; j++) {
            let point = document.createElement("td")
            point.innerHTML = points[j]
            tr.appendChild(point)
        }

        let summ = document.createElement("td")
        summ.innerHTML = summPoints

        tr.append(summ)

        table.appendChild(tr)
    }

    return table
}

async function getPersonalInformation(firstName, secondName) {
    let request = await fetch("http://localhost:8080/personalInfo", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: {"firstName": firstName, "secondName": secondName}
    })

    if (!request.ok) {
        console.log("!")
        return
    }

    let response = await request.json()

    let name = document.querySelector("p[data-id=item-name]")
    let region = document.querySelector("p[data-id=item-region]")
    let grade = document.querySelector("p[data-id=item-grade]")
    let school = document.querySelector("p[data-id=item-school]")
    let place1 = document.querySelector("p[data-id=item-place1]")
    let place2 = document.querySelector("p[data-id=item-place2]")
    let place_fn = document.querySelector("p[data-id=item-place_fn]")
    let results = document.querySelector("p[data-id=item-results]")

    name.innerHTML += response.name
    region.innerHTML += response.region
    grade.innerHTML += response.grade
    school.innerHTML += response.school
    place1.innerHTML += response.place1
    place2.innerHTML += response.place2
    place_fn.innerHTML += response.place_fn
    results.innerHTML += response.results
}
