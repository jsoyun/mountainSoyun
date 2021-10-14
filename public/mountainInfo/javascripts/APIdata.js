firstload()
async function firstload() {
    const mountainList = document.querySelector('#mountain-list');
    let location = "경기";
    const apidata1 = await axios.post("/infomountain/location", { location });
    location = "인천";
    const apidata2 = await axios.post("/infomountain/location", { location });
    arrydata1 = JSON.stringify(apidata1.data);
    arrydata2 = JSON.stringify(apidata2.data);
    sumarrydata = arrydata1.slice(0, -1) + "," + arrydata2 + "]";
    const apidata = JSON.parse(sumarrydata);
    mountainList.innerHTML = "";
    for (let i = 0; i < apidata.length; i++) {
        let mountainAdd = apidata[i].areanm;
        let mountainname = apidata[i].mntnm;
        const apidata3 = await axios.post("/infomountain/img", { mountainAdd });
        const imgdata = apidata3.data;
        console.log(imgdata.length);
        if (imgdata.length == undefined) {
            console.log("위에꺼")

            let listsummury = document.createElement("div");
            listsummury.setAttribute('class', "mountain-list-summury");
            let temp = `<div class="mountain-summury-img"><img src="${imgdata.mntnattchimageseq}"></div>
        <div class="mountain-summury-container">
        <div class="mountain-summury-name">${apidata[i].mntnm}</div>
        <div class="mountain-summury-height">높이: ${apidata[i].mntheight}m</div>
        <div class="mountain-summury-address">주소지: ${apidata[i].areanm}</div>
        <div class="mountain-summury-overview">소개: ${apidata[i].subnm}</div>
        </div>`;
            listsummury.innerHTML = temp;
            mountainList.appendChild(listsummury);
        } else{
            console.log("아래꺼")
            let listsummury = document.createElement("div");
            listsummury.setAttribute('class', "mountain-list-summury");
            let temp = `<div class="mountain-summury-img"><img src="${imgdata[0].mntnattchimageseq}"></div>
        <div class="mountain-summury-container">
        <div class="mountain-summury-name">${apidata[i].mntnm}</div>
        <div class="mountain-summury-height">높이: ${apidata[i].mntheight}m</div>
        <div class="mountain-summury-address">주소지: ${apidata[i].areanm}</div>
        <div class="mountain-summury-overview">소개: ${apidata[i].subnm}</div>
        </div>`;
            listsummury.innerHTML = temp;
            mountainList.appendChild(listsummury);

            //     let listsummury = document.createElement("div");
            //     listsummury.setAttribute('class', "mountain-list-summury");



            //     let temp = `<div class="mountain-summury-img"><img src="${apidata[i].hndfmsmtnmapimageseq}"></div>
            // <div class="mountain-summury-container">
            // <div class="mountain-summury-name">${apidata[i].mntnm}</div>
            // <div class="mountain-summury-height">${apidata[i].mntheight}m</div>
            // <div class="mountain-summury-address">${apidata[i].areanm}</div>
            // <div class="mountain-summury-overview">${apidata[i].subnm}</div>
            // </div>`;
            //     listsummury.innerHTML = temp;
            //     mountainList.appendChild(listsummury);

        }
        // else {
        //     listsummury = document.createElement("div");
        //     listsummury.setAttribute('class', "mountain-list-summury");
        //     for (let j = 0; j < imgdata.length; j++) {
        //         const findinfo = JSON.stringify(imgdata[j].hndfmsmtnslctnrson);
        //         if (findinfo[0] != "&") {
        //             let listsummury = document.createElement("div");
        //             listsummury.setAttribute('class', "mountain-list-summury");
        //             let temp = `<div class="mountain-summury-img"><img src="${imgdata[j].mntnattchimageseq}"></div>
        // <div class="mountain-summury-container">
        // <div class="mountain-summury-name">${apidata[i].mntnm}</div>
        // <div class="mountain-summury-height">${apidata[i].mntheight}m</div>
        // <div class="mountain-summury-address">${apidata[i].areanm}</div>
        // <div class="mountain-summury-overview">${apidata[i].subnm}</div>
        // </div>`;
        //             listsummury.innerHTML = temp;
        //             mountainList.appendChild(listsummury);


        //         }

        //     }
        // }

    }

};

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