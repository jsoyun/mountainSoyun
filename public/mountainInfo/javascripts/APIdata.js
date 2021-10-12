document.querySelectorAll(".kor-location").forEach(element => {
    element.addEventListener('click', async function () {
        let location = await this.textContent;
        const mountainList = document.querySelector('#mountain-list');
        if (location == "서울/경기") {
            location = "경기";
            const apidata1 = await axios.post("/infomountain/location", { location });
            location = "인천";
            const apidata2 = await axios.post("/infomountain/location", { location });
            arrydata1 = JSON.stringify(apidata1.data);
            arrydata2 = JSON.stringify(apidata2.data);
            sumarrydata = arrydata1.slice(0, -1) + "," + arrydata2 + "]";
            const apidata = JSON.parse(sumarrydata);
            console.log(apidata);
            mountainList.innerHTML = "";
            for (let i = 0; i < apidata.length; i++) {
                let listContainer = document.createElement("div")
                listContainer.setAttribute('class', "mountain-list-container");
                mountainList.appendChild(listContainer);

                let listItem = document.createElement("div");
                listItem.setAttribute('class', "mountain-name")
                listItem.textContent = apidata[i].mntnm
                listContainer.appendChild(listItem);

                listItem = document.createElement("div");
                listItem.setAttribute('class', "mountain-height")
                listItem.textContent = apidata[i].mntheight
                listContainer.appendChild(listItem);

                listItem = document.createElement("div");
                listItem.setAttribute('class', "mountain-address")
                listItem.innerHTML = apidata[i].areanm
                listContainer.appendChild(listItem);

                listItem = document.createElement("div");
                listItem.setAttribute('class', "mountain-overview")
                listItem.innerHTML = apidata[i].overview
                listContainer.appendChild(listItem);

                listItem = document.createElement("div");
                listItem.setAttribute('class', "mountain-transport")
                listItem.innerHTML = apidata[i].transport
                listContainer.appendChild(listItem);

                listItem = document.createElement("div");
                listItem.setAttribute('class', "mountain-tour")
                listItem.innerHTML = apidata[i].tourisminf
                listContainer.appendChild(listItem);

                listItem = document.createElement("div");
                listItem.setAttribute('class', "mountain-etctour")
                listItem.innerHTML = apidata[i].etccourse
                listContainer.appendChild(listItem);
            }

        } else {
            const apidata1 = await axios.post("/infomountain/location", { location });
            const apidata = apidata1.data
            console.log(apidata);
            console.log(apidata.length);
            mountainList.innerHTML = "";
            if (apidata.length == undefined) {
                let listContainer = document.createElement("div")
                listContainer.setAttribute('class', "mountain-list-container");
                mountainList.appendChild(listContainer);

                let listItem = document.createElement("div");
                listItem.setAttribute('class', "mountain-name")
                listItem.textContent = apidata.mntnm
                listContainer.appendChild(listItem);

                listItem = document.createElement("div");
                listItem.setAttribute('class', "mountain-height")
                listItem.textContent = apidata.mntheight
                listContainer.appendChild(listItem);

                listItem = document.createElement("div");
                listItem.setAttribute('class', "mountain-address")
                listItem.innerHTML = apidata.areanm
                listContainer.appendChild(listItem);

                listItem = document.createElement("div");
                listItem.setAttribute('class', "mountain-overview")
                listItem.innerHTML = apidata.overview
                listContainer.appendChild(listItem);

                listItem = document.createElement("div");
                listItem.setAttribute('class', "mountain-transport")
                listItem.innerHTML = apidata.transport
                listContainer.appendChild(listItem);

                listItem = document.createElement("div");
                listItem.setAttribute('class', "mountain-tour")
                listItem.innerHTML = apidata.tourisminf
                listContainer.appendChild(listItem);

                listItem = document.createElement("div");
                listItem.setAttribute('class', "mountain-etctour")
                listItem.innerHTML = apidata.etccourse
                listContainer.appendChild(listItem);
            } else {
                for (let i = 0; i < apidata.length; i++) {
                    let listContainer = document.createElement("div")
                    listContainer.setAttribute('class', "mountain-list-container");
                    mountainList.appendChild(listContainer);

                    let listItem = document.createElement("div");
                    listItem.setAttribute('class', "mountain-name")
                    listItem.textContent = apidata[i].mntnm
                    listContainer.appendChild(listItem);

                    listItem = document.createElement("div");
                    listItem.setAttribute('class', "mountain-height")
                    listItem.textContent = apidata[i].mntheight
                    listContainer.appendChild(listItem);

                    listItem = document.createElement("div");
                    listItem.setAttribute('class', "mountain-address")
                    listItem.innerHTML = apidata[i].areanm
                    listContainer.appendChild(listItem);

                    listItem = document.createElement("div");
                    listItem.setAttribute('class', "mountain-overview")
                    listItem.innerHTML = apidata[i].overview
                    listContainer.appendChild(listItem);

                    listItem = document.createElement("div");
                    listItem.setAttribute('class', "mountain-transport")
                    listItem.innerHTML = apidata[i].transport
                    listContainer.appendChild(listItem);

                    listItem = document.createElement("div");
                    listItem.setAttribute('class', "mountain-tour")
                    listItem.innerHTML = apidata[i].tourisminf
                    listContainer.appendChild(listItem);

                    listItem = document.createElement("div");
                    listItem.setAttribute('class', "mountain-etctour")
                    listItem.innerHTML = apidata[i].etccourse
                    listContainer.appendChild(listItem);
                }
            };
        };
    })
});