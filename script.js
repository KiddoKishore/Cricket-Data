let apikey = "69c0c2b0-e2fe-4892-a5ba-a3e68293befc"
async function update(event){
    document.getElementById('parent').style.display = 'none';
    document.getElementById('teams').style.display = 'block';
    document.getElementById("title").style.display = 'block';
    document.getElementById('squad').style.display = 'block';
    document.getElementById('nav').style.display = 'block';
let country = event
const fetchOne = await fetch(`./team.json`);
    const dataOne = await fetchOne.json();
        if(dataOne.status === 'success'){
            document.getElementById("team").style.display = "block";
            document.getElementById("score-card").style.display = "none";
            document.getElementById("match").style.display = "none";
            document.getElementById("match-details").style.display = "none";
            document.getElementById("point-table-div").style.display = "none"
            const a = dataOne.data;
            const b = a.find((x)=> x.teamName == country)
            const n = country.replace(" ","-")
            const countryFlags = n.toLowerCase()
            const img = `https://cdn.countryflags.com/thumbs/${countryFlags}/flag-400.png`
            const {teamName,shortname} = b
            let teams = document.getElementById("teams")
            teams.innerHTML = `<img
            src=${img}
            alt="${teamName}"><br><h1>${shortname}</h1><h2>${teamName}</h2>`
            const x = b.players
            x.forEach(i => {
                const {playerImg, name, id} = i
                let players = document.getElementById("players")
                let details = document.createElement("div")
                details.setAttribute("class","details")
                details.innerHTML =`<img src=${playerImg}><br><a href="#" class="view"><h2>${name}</h2></a>`
                let view = details.querySelector(".view")
                view.addEventListener("click",async(x)=>{
                    x.preventDefault();
                    const fetchTwo = await fetch(`./team.json`);
                    const dataTwo = await fetchTwo.json();
                        if(dataTwo.status === "success"){
                            const a = dataTwo.data
                            const b = a.find((x)=> x.teamName === country)
                            const c = b.players
                            const d = c.find((p)=> p.id === id)
                            const f = d.id
                           const fetchThree = await fetch(`https://api.cricapi.com/v1/players_info?apikey=${apikey}&id=${f}`);
                            const dataThree = await fetchThree.json();
                                if(dataThree.status === "success"){
                                    const a = dataThree.data
                                       const date = new Date(a.dateOfBirth)
                                       const DateOfBirth = date.toLocaleDateString()
                            const bowlingStyle = a.bowlingStyle || "---" ;
                            const battingStyle = a.battingStyle || "---";
                            const role = a.role || "---";
                            const country = a.country || "---";
                            const name = a.name || "---";
                            const placeOfBirth = a.placeOfBirth || "---";
                            const overlay = document.getElementById("overlay")
                            let popup = document.getElementById("popup")
                        overlay.style.display = "block";
                        popup.style.display = "block";
                        popup.innerHTML = `<button class="close">X</button>
                        <div id="flex"><img src=${a.playerImg}>
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
                        const close = popup.querySelector(".close")
                        close.addEventListener("click",()=>{
                            document.getElementById("popup").style.display = "none";
                            document.getElementById("overlay").style.display = "none";
                        })
                                       
                                }
                                else{
                                    document.getElementById("resonse").innerHTML = dataThree.reason ;
                                    get();
                                }
                        }
                        else{
                            document.getElementById("resonse").innerHTML = dataTwo.reason ;
                            get()
                        }
                })
                players.appendChild(details)
            });
        }
        else{
            document.getElementById("resonse").innerHTML = dataOne.reason ;
            get()
        }
const fetchFour =  await fetch(`./series.json`);
        const dataFour = await fetchFour.json();
        if(dataFour.status === "success"){
            const a = dataFour.data
            const info = a.info
            const {name} = info
            let end = info.enddate
            let  e = new Date(end)
            e.setFullYear(2023)
            const  endDate = e.toLocaleDateString()
            let start = info.startdate
            let s = new Date(start)
            const startDate = s.toLocaleDateString() 
            let title = document.getElementById("title")
            title.innerHTML =`<h1>${name}</h1><h3>${startDate} - ${endDate}</h3>`
            const matchList = a.matchList
            const m = matchList.filter((match)=> match.teams.includes(country))
            m.forEach(i =>{
                document.getElementById("table").style.display = "block";
                let tr = document.createElement("tr")
                const {name, date, status, venue, id, teams} = i
                let time = i.dateTimeGMT;
                let a = new Date(time)
                a.setTime(a.getTime() + 330 * 60 * 1000)
                const b = a.toLocaleTimeString();
                tr.innerHTML =  `<td>${date}</td>
                <td id="mat"><h3>${name}</h3>
                <h4>${venue}</h4>
                <a href="#" class="matchDetails">${status}</a></td>
                <td>${b}</td>`
                let matchDetail = tr.querySelector(".matchDetails")
                matchDetail.addEventListener("click",async(x)=>{
                    x.preventDefault()
                    const fetchFive = await fetch(`https://api.cricapi.com/v1/match_scorecard?apikey=${apikey}&id=${id}`)
                          const dataFive = await fetchFive.json();
                           if(dataFive.status === "success"){
                            document.getElementById("match").style.display = "none";
                            document.getElementById("nav-bar").style.display = "block";
                            document.getElementById("match-details").style.display = "block";
                            document.getElementById("score-card").style.display = "block";
                                const a = dataFive.data
                                const sc = a.score
                                const sc1 = sc[0]
                                const sc2 = sc[1]
                                const score = a.scorecard
                                const t1 = score[0]
                                const t2 = score[1]
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
                                    const batsman = i.batsman
                                    const dismissal = i["dismissal-text"]
                                    const r = i.r
                                    const b = i.b
                                    const four = i["4s"]
                                    const six = i["6s"]
                                    const sr = i.sr
                                    let teamOne = document.getElementById("team-1")
                                    let tr = document.createElement("tr")
                                    tr.innerHTML = `<td>${batsman.name}</td><td>${dismissal}</td><td>${r}</td><td>${b}</td><td>${four}</td><td>${six}</td><td>${sr}</td>`
                                    teamOne.appendChild(tr)
                                })
                                let teamOne = document.getElementById("team-1")
                                let tr = document.createElement("tr")
                                const extra = t1.extras
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
                                    const batsman = i.batsman
                                    const dismissal = i["dismissal-text"]
                                    const r = i.r
                                    const b = i.b
                                    const four = i["4s"]
                                    const six = i["6s"]
                                    const sr = i.sr
                                    let teamTwo = document.getElementById("team-2")
                                    let tr = document.createElement("tr")
                                    tr.innerHTML = `<td>${batsman.name}</td><td>${dismissal}</td><td>${r}</td><td>${b}</td><td>${four}</td><td>${six}</td><td>${sr}</td>`
                                    teamTwo.appendChild(tr)
                                })
                                let teamTwo = document.getElementById("team-2")
                                let tr2 = document.createElement("tr")
                                const extra2 = t2.extras
                                tr2.innerHTML =  `<td colspan="2">Extra</td><td>${extra2.r}</td><td colspan="4"></td>`
                                teamTwo.appendChild(tr2)
                                let trr2 = document.createElement("tr")
                                trr2.innerHTML = `<td colsapn="2">Total<td><td colspan="5">${sc2.r}/${sc2.w}(${sc2.o})</td>`
                                teamTwo.appendChild(trr2)
                            
                        }
                        else{
                            document.getElementById("resonse").innerHTML = dataFive.reason ;
                            get()
                        }
                    document.getElementById("squad-btn").addEventListener("click",async (x)=>{
                        x.preventDefault()
                        const t = teams
                        let t1 = t[0]
                        let t2 = t[1]
                        document.getElementById("match-details").style.display = "block";
                        document.getElementById("score-card").style.display = "none";
                        document.getElementById("squad").style.display = "flex";
                        const fetchSix = await fetch(`./team.json`);
                              const dataSix = await fetchSix.json();
                              if(dataSix.status === "success"){
                                let a = dataSix.data
                                const s0 = a.find(x => x.teamName === t1)
                                const s1 = a.find(x => x.teamName === t2)
                                let squadOne = document.getElementById("squad-1")
                                squadOne.innerHTML = `<h1>${s0.teamName}</h1>`
                                let squadTwo = document.getElementById("squad-2")
                                squadTwo.innerHTML = `<h1>${s1.teamName}</h1>`
                                const one = s0.players
                                const two = s1.players
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
                                document.getElementById("resonse").innerHTML = dataSix.reason ;
                                get();
                            }
                    })
                })
                table.appendChild(tr)
            })
        }
        else{
            document.getElementById("resonse").innerHTML = dataFour.reason ;
            get();
        }


document.getElementById("nav-3").addEventListener("click", async ()=>{
    // fetch(`./point-table.json`)
const fetchSeven = await fetch(`https://api.cricapi.com/v1/series_points?apikey=${apikey}&id=bd830e89-3420-4df5-854d-82cfab3e1e04`)
       const dataSeven = await fetchSeven.json();
       if(dataSeven.status === "success"){
        let pointTableDiv = document.getElementById("point-table-div")
        pointTableDiv.innerHTML = `<table id="point-table">
        <tr>
          <th>Teams</th>
          <th>Match</th>
          <th>Won</th>
          <th>Loss</th>
          <th>Ties</th>
          <th>NR</th>
        </tr>
      </table>`
        const a = dataSeven.data
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
        document.getElementById("point-table-div").style.display = "flex"
    document.getElementById("point-table").style.display = "block"
    document.getElementById("score-card").style.display = "none"
    document.getElementById("team").style.display = "none"
    document.getElementById("squad").style.display = "none"
    document.getElementById("match").style.display = "none"
    document.getElementById("nav-bar").style.display = "none"
    }
    else{
        document.getElementById("resonse").innerHTML = dataSeven.reason ;
        get();
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
document.getElementById("nav-2").addEventListener("click",async()=>{
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
document.getElementById("nav-0").addEventListener("click",()=>{
    window.location.reload()
})

}


async function home(){
const fetchEight = await fetch(`./team.json`);
       const dataEight = await fetchEight.json();
       if(dataEight.status === "success"){
        const data = dataEight.data
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
    document.getElementById("resonse").innerHTML = dataEight.reason ;
    get();
}
}
home();
function get(){
    document.getElementById("error-overlay").style.display = "block"
    document.getElementById("error-popup").style.display = "block"
    document.getElementById("submit").addEventListener("click",(x)=>{
        x.preventDefault()
        apikey = document.getElementById("error").value ;
        document.getElementById("error-overlay").style.display = "none"
        document.getElementById("error-popup").style.display = "none"
    })
}