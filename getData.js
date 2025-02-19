async function getRegions(param, flag) {
    let request = await fetch("http://localhost:8080/regionState/post", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: {
            "param": param,
            "flag": flag
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
    let {tournament, class, school, region, time, decoration} = options

    let request = await fetch("http://localhost:8080/stateParticipants/get", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: {
            "tournament": tournament || "both",
            "class": class || "all",
            "school": school || "all",
            "region": region || "all",
            "time": time || "all",
            "decoration": decoration || "none"
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
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
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
        let points1 = document.createElement("td")
        let points2 = document.createElement("td")
        let points3 = document.createElement("td")
        let points4 = document.createElement("td")
        let summPoints = document.createElement("td")

        place.innerHTML = el.place
        participant.innerHTML = el.participant

        points1.innerHTML = el.points1
        points2.innerHTML = el.points2
        points3.innerHTML = el.points3
        points4.innerHTML = el.points4
        summPoints.innerHTML = el.summPoints

        [place, participant, points1, points2, points3, points4, summPoints].forEach(k => tr.appendChild(k))

        table.appendChild(tr)
    }

    return table
}
