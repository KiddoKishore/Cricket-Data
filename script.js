function update(event){
    document.getElementById('parent').style.display = 'none';
    document.getElementById('teams').style.display = 'block';
    document.getElementById("title").style.display = 'block';
    document.getElementById('squad').style.display = 'block';
    document.getElementById('nav').style.display = 'block';
let country = event
let apikey = "69c0c2b0-e2fe-4892-a5ba-a3e68293befc"
fetch(`./team.json`)
    .then(res => res.json())
    .then(data => {
        if(data.status === 'success'){
            let team = document.getElementById("team")
            team.style.display = "block"
            document.getElementById("score-card").style.display = "none"
            let match = document.getElementById("match")
            match.style.display ="none"
            let matchDetails = document.getElementById("match-details")
            matchDetails.style.display = "none"
            document.getElementById("point-table-div").style.display = "none"
            let a = data.data
            let b = a.find((x)=> x.teamName == country)
            let n = country.replace(" ","-")
            let countryFlags = n.toLowerCase()
            let img = `https://cdn.countryflags.com/thumbs/${countryFlags}/flag-400.png`
            const {teamName,shortname} = b
            let teams = document.getElementById("teams")
            teams.innerHTML = `<a href="#" onclick=country()><img
            src=${img}
            alt="${teamName}"></a><br><h1>${shortname}</h1><h2>${teamName}</h2>`
            let x = b.players
            x.forEach(i => {
                const {playerImg, name, id} = i
                let players = document.getElementById("players")
                let details = document.createElement("div")
                details.setAttribute("class","details")
                details.innerHTML =`<img src=${playerImg}><br><a href="#" class="view"><h2>${name}</h2></a>`
                let view = details.querySelector(".view")
                view.addEventListener("click",(x)=>{
                    x.preventDefault();
                    fetch(`./team.json`)
                    .then(res => res.json())
                    .then((data)=>{
                        if(data.status === "success"){
                            let a = data.data
                            let b = a.find((x)=> x.teamName === country)
                            let c = b.players
                            let d = c.find((p)=> p.id === id)
                            let f = d.id
                            fetch(`https://api.cricapi.com/v1/players_info?apikey=${apikey}&id=${f}`)
                            .then(res => res.json())
                            .then(data => {
                                if(data.status === "success"){
                                    let a = data.data
                                       let date = new Date(a.dateOfBirth)
                                       let DateOfBirth = date.toLocaleDateString()
                            const {playerImg, name, dateOfBirth, country, placeOfBirth, role, battingStyle, bowlingStyle} = a
                            let overlay = document.getElementById("overlay")
                            let popup = document.getElementById("popup")
                        overlay.style.display = "block";
                        popup.style.display = "block";
                        popup.innerHTML = `<button class="close">X</button>
                        <div id="flex"><img src=${playerImg}>
                        <div>
                        <table>
                        <tr>
                        <th>Name</th><td>${name}</td>
                        </tr>
                        <tr>
                        <th>Date of Birth</th><td>${DateOfBirth}</td>
                        </tr>
                        <tr>
                        <th>Place of Birth</th><td>${placeOfBirth}</td>
                        </tr>
                        <tr>
                        <th>Country</th><td>${country}</td>
                        </tr>
                        <tr>
                        <th>Role</th><td>${role}</td>
                        </tr>
                        <tr>
                        <th>Batting Style</th><td>${battingStyle}</td>
                        </tr>
                        <tr>
                        <th>Bowling Style</th><td>${bowlingStyle}</td>
                        </tr>
                        </table></div></div>`
                        let close = popup.querySelector(".close")
                        close.addEventListener("click",()=>{
                            let popup = document.getElementById("popup")
                            let overlay = document.getElementById("overlay")
                            popup.style.display = "none"
                            overlay.style.display = "none"
                        })
                                       
                                }
                                else{
                                    alert("Server Down Please try again later!!!")
                                }
                            })
                            
                            // fetch(`./players.json`)
                            // .then(res => res.json())
                            // .then((data)=>{
                            //     if(data.status === "success"){
                            //         let a = data.data.find((p)=> p.id === f)
                            //         console.log(a);
                            //         const {playerImg, name, dateOfBirth, country, placeOfBirth, role, battingStyle, bowlingStyle} = a
                            //         let date = new Date(a.dateOfBirth)
                            //         let DateOfBirth = date.toLocaleDateString()
                            //         let overlay = document.getElementById("overlay")
                            //         let popup = document.getElementById("popup")
                            //     overlay.style.display = "block";
                            //     popup.style.display = "block";
                            //     popup.innerHTML = `<button class="close">X</button>
                            //     <div id="flex"><img src=${playerImg}>
                            //     <div>
                            //     <table>
                            //     <tr>
                            //     <th>Name</th><td>${name}</td>
                            //     </tr>
                            //     <tr>
                            //     <th>Date of Birth</th><td>${DateOfBirth}</td>
                            //     </tr>
                            //     <tr>
                            //     <th>Place of Birth</th><td>${placeOfBirth}</td>
                            //     </tr>
                            //     <tr>
                            //     <th>Country</th><td>${country}</td>
                            //     </tr>
                            //     <tr>
                            //     <th>Role</th><td>${role}</td>
                            //     </tr>
                            //     <tr>
                            //     <th>Batting Style</th><td>${battingStyle}</td>
                            //     </tr>
                            //     <tr>
                            //     <th>Bowling Style</th><td>${bowlingStyle}</td>
                            //     </tr>
                            //     </table></div></div>`
                            //     let close = popup.querySelector(".close")
                            //     close.addEventListener("click",()=>{
                            //         let popup = document.getElementById("popup")
                            //         let overlay = document.getElementById("overlay")
                            //         popup.style.display = "none"
                            //         overlay.style.display = "none"
                            //     })
                            //     }
                            // })
                            // over
                        }
                        else{
                            alert("Server Down Please try again later!!!")
                        }
                    })
                })
                players.appendChild(details)
            });
        }
        else{
            alert("Server Down Please try again later!!!")
        }
    })
 fetch(`./series.json`)
    .then(res => res.json())
    .then((data)=>{
        if(data.status === "success"){
            let a = data.data
            let info = a.info
            const {name} = info
            let end = info.enddate
            let  e = new Date(end)
            e.setFullYear(2023)
            let  endDate = e.toLocaleDateString()
            let start = info.startdate
            let s = new Date(start)
            let startDate = s.toLocaleDateString() 
            let title = document.getElementById("title")
            title.innerHTML =`<h1>${name}</h1><h3>${startDate} - ${endDate}</h3>`
            let matchList = a.matchList
            let m = matchList.filter((match)=> match.teams.includes(country))
            m.forEach(i =>{
                let table = document.getElementById("table")
                table.style.display = "block"
                let tr = document.createElement("tr")
                const {name, date, status, venue, id} = i
                let time = i.dateTimeGMT
                let a = new Date(time)
                a.setTime(a.getTime() + 330 * 60 * 1000)
                let b = a.toLocaleTimeString();
                tr.innerHTML =  `<td>${date}</td>
                <td id="mat"><h3>${name}</h3>
                <h4>${venue}</h4>
                <a href="#" class="matchDetails">${status}</a></td>
                <td>${b}</td>`
                let matchDetail = tr.querySelector(".matchDetails")
                matchDetail.addEventListener("click",(x)=>{
                    x.preventDefault()
                    let match = document.getElementById("match")
                    let navBar = document.getElementById("nav-bar")
                    match.style.display = "none"
                    navBar.style.display = "block"
                    let matchDetails = document.getElementById("match-details")
                    matchDetails.style.display = "block"
                    fetch(`https://api.cricapi.com/v1/match_scorecard?apikey=${apikey}&id=${id}`)
                    .then(res => res.json())
                    .then((data)=>{
                        if(data.status === "success"){
                            document.getElementById("score-card").style.display = "block";
                                let a = data.data
                                let sc = a.score
                                let sc1 = sc[0]
                                let sc2 = sc[1]
                                let score = a.scorecard
                                let t1 = score[0]
                                let t2 = score[1]
                                let teamTableOne = document.getElementById("team-table-1")
                                teamTableOne.innerHTML = `
                                <h1 id="team-1-inning">${t1.inning}</h1>
                                <table id="team-1">
                                <tr>
                                  <th>Name</th>
                                  <th>Dismissal</th>
                                  <th>Runs</th>
                                  <th>Balls</th>
                                  <th>4s</th>
                                  <th>6s</th>
                                  <th>Strike Rate</th>
                                </tr>
                              </table>`
                                let team1Batting = t1.batting
                                team1Batting.forEach(i =>{
                                    let batsman = i.batsman
                                    let dismissal = i["dismissal-text"]
                                    let r = i.r
                                    let b = i.b
                                    let four = i["4s"]
                                    let six = i["6s"]
                                    let sr = i.sr
                                    let teamOne = document.getElementById("team-1")
                                    let tr = document.createElement("tr")
                                    tr.innerHTML = `<td>${batsman.name}</td><td>${dismissal}</td><td>${r}</td><td>${b}</td><td>${four}</td><td>${six}</td><td>${sr}</td>`
                                    teamOne.appendChild(tr)
                                })
                                let teamOne = document.getElementById("team-1")
                                let tr = document.createElement("tr")
                                let extra = t1.extras
                                tr.innerHTML = `<td colspan="2">Extra</td><td>${extra.r}</td><td colspan="4"></td>`  
                                teamOne.appendChild(tr)
                                let trr = document.createElement("tr")
                                trr.innerHTML = `<td colsapn="2">Total<td><td colspan="5">${sc1.r}/${sc1.w}(${sc1.o})</td>`
                                teamOne.appendChild(trr)

                                let teamTableTwo = document.getElementById("team-table-2")
                                teamTableTwo.innerHTML = `
                                <h1 id="team-2-inning">${t2.inning}</h1>
                                <table id="team-2">
                                <tr>
                                  <th>Name</th>
                                  <th>Dismissal</th>
                                  <th>Runs</th>
                                  <th>Balls</th>
                                  <th>4s</th>
                                  <th>6s</th>
                                  <th>Strike Rate</th>
                                </tr>
                              </table>`
                                let team2Batting = t2.batting
                                team2Batting.forEach(i =>{
                                    let batsman = i.batsman
                                    let dismissal = i["dismissal-text"]
                                    let r = i.r
                                    let b = i.b
                                    let four = i["4s"]
                                    let six = i["6s"]
                                    let sr = i.sr
                                    let teamTwo = document.getElementById("team-2")
                                    let tr = document.createElement("tr")
                                    tr.innerHTML = `<td>${batsman.name}</td><td>${dismissal}</td><td>${r}</td><td>${b}</td><td>${four}</td><td>${six}</td><td>${sr}</td>`
                                    teamTwo.appendChild(tr)
                                })
                                let teamTwo = document.getElementById("team-2")
                                let tr2 = document.createElement("tr")
                                let extra2 = t2.extras
                                tr2.innerHTML =  `<td colspan="2">Extra</td><td>${extra2.r}</td><td colspan="4"></td>`
                                teamTwo.appendChild(tr2)
                                let trr2 = document.createElement("tr")
                                trr2.innerHTML = `<td colsapn="2">Total<td><td colspan="5">${sc2.r}/${sc2.w}(${sc2.o})</td>`
                                teamTwo.appendChild(trr2)
                            
                        }
                        else{
                            alert("Server Down Please try again later!!!")
                        }
                    document.getElementById("squad-btn").addEventListener("click", (x)=>{
                        x.preventDefault()
                        let a = data.data
                        let t = a.teams
                        let t1 = t[0]
                        let t2 = t[1]
                        let matchDetails = document.getElementById("match-details")
                        matchDetails.style.display = "block";
                        let scoreCard = document.getElementById("score-card")
                        scoreCard.style.display = "none"
                        let squad = document.getElementById("squad")
                        squad.style.display = "flex"
                        fetch(`./team.json`)
                        .then(res => res.json())
                        .then((data)=>{
                            if(data.status === "success"){
                                let a = data.data
                                let s0 = a.find(x => x.teamName === t1)
                                let s1 = a.find(x => x.teamName === t2)
                                let squadOne = document.getElementById("squad-1")
                                squadOne.innerHTML = `<h1>${s0.teamName}</h1>`
                                let squadTwo = document.getElementById("squad-2")
                                squadTwo.innerHTML = `<h1>${s1.teamName}</h1>`
                                let one = s0.players
                                let two = s1.players
                                one.forEach((i)=>{
                                    let squadOne = document.getElementById("squad-1")
                                    let player = document.createElement("div")
                                    player.setAttribute("class","pl")
                                    player.innerHTML = `<img src=${i.playerImg}><h3>${i.name}</h3><h4>${i.role}</h4>`
                                    squadOne.appendChild(player)
                                })
                                two.forEach((i)=>{
                                    let squadTwo = document.getElementById("squad-2")
                                    let player = document.createElement("div")
                                    player.setAttribute("class","pl")
                                    player.innerHTML = `<img src=${i.playerImg}><h3>${i.name}</h3><h4>${i.role}</h4>`
                                    squadTwo.appendChild(player)
                                })
                            }
                            else{
                                alert("Server Down Please try again later!!!")
                            }
                        })
                    })
                })
                })
                table.appendChild(tr)
            })
        }
        else{
            alert("Server Down Please try again later!!!")
        }
    })


document.getElementById("nav-3").addEventListener("click", async ()=>{
    document.getElementById("point-table-div").style.display = "block"
    document.getElementById("point-table").style.display = "block"
    document.getElementById("score-card").style.display = "none"
    document.getElementById("team").style.display = "none"
    document.getElementById("squad").style.display = "none"
    document.getElementById("match").style.display = "none"
    document.getElementById("nav-bar").style.display = "none"
})
fetch(`./point-table.json`)
    .then(res => res.json())
    .then((data)=>{
        if(data.status === "success"){
            let a = data.data
            a.sort((b, a) => a.wins - b.wins)
            a.forEach((i)=>{
                let pointTable = document.getElementById("point-table")
                let tr = document.createElement("tr")
                tr.innerHTML = `<td class="td"><img src=${i.img}><h4>${i.teamname}</h4></td>
                <td>${i.matches}</td>
                <td>${i.wins}</td>
                <td>${i.loss}</td>
                <td>${i.ties}</td>
                <td>${i.nr}</td>`
                pointTable.appendChild(tr)
            })
        }
        else{
            alert("Server Down Please try again later!!!")
        }
    })

document.getElementById("nav-1").addEventListener("click",()=>{
    document.getElementById("team").style.display = "block"
    document.getElementById("match").style.display = "none"
    document.getElementById("score-card").style.display = "none"
    document.getElementById("squad").style.display = "none"
    document.getElementById("point-table").style.display = "none"
})
document.getElementById("score-btn").addEventListener("click",()=>{
    document.getElementById("score-card").style.display = "block";
    document.getElementById("squad").style.display = "none"
    document.getElementById("team").style.display = "none";
    document.getElementById("match").style.display = "none";
})
document.getElementById("nav-2").addEventListener("click",async(x)=>{
            let team = document.getElementById("team")
            team.style.display = "none"
            let match = document.getElementById("match")
            match.style.display = "block"
            let navBar = document.getElementById("nav-bar")
            document.getElementById("score-card").style.display = "none"
            navBar.style.display = "none"
            let squad = document.getElementById("squad")
            squad.style.display = "none"
            document.getElementById("point-table-div").style.display = "none"
})
}



fetch(`./team.json`)
.then(res => res.json())
.then((x)=>{
    if(x.status === "success"){
    let data = x.data
    data.forEach((i)=> {
        let child = document.getElementById("child")
        let div = document.createElement("div")
        div.setAttribute('class','flag')
        let img = i.teamName.toLowerCase()
        let image = img.replace(" ","-")
        let a = i.teamName
        div.innerHTML = `<button onclick="update('${a}')"><img src="https://cdn.countryflags.com/thumbs/${image}/flag-400.png" ></button>
        <h2>${i.teamName}</h2>
        <h3>${i.shortname}</h3>`
        child.appendChild(div)
    })
}
else{
    alert("Server Down Please try again later!!!")
}
})
function country(){
    window.location.reload();
}