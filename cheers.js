const fetch = require("cross-fetch");
const u =
    "https://cheers.com.sg/wp-admin/admin-ajax.php?action=get_all_stores&lat=&lng=";

(async () => {
    const res = await fetch(u);
    const d = await res.json();
    /*
    '0': {
    ID: '1882',
    na: 'Cheers - Changi Airport T1 Departure Hall',
    gu: 'https://cheers.com.sg/store/cheers-changi-airport-t1-departure-hall/',
    de: '<p><strong>Operating Hours:</strong> 24 Hours</p>\n',
    lat: '1.3644202',
    lng: '103.9915308',
    st: '80 Airport Boulevard #02-05A Changi Airport Terminal 1 <br> (Departure/Check in Hall West) 819642',
    zp: '',
    te: '6241 4091',
    ic: 'https://cheers.com.sg/wp-content/uploads/2020/01/store-marker-blue.png'
    },
    */
    Object.keys(d).forEach((key) => {
        let data = d[key];
        let {
            ID: id,
            na: name,
            gu: url,
            de: hours,
            lat,
            lng,
            st: address,
            zp: postal,
            te: telephone,
        } = data;
        hours = hours
            ? hours.replace(/operating|hours?|:| |<(\/?p|\/?strong)>|\n/gi, "")
            : "";
        hours = hours === "24" ? "24 Hours" : hours;
        // postal = postal.match(/singapore/i)
        // ? postal.replace(/singapore| /gi, "")
        // : postal;
        console.log({
            id,
            name,
            url,
            hours,
            lat,
            lng,
            address,
            postal,
            address1: "",
            address2: "",
            address3: "",
            location: "",
            about: {
                "Service options": ["In-store shopping"],
                Accessibility: ["Wheelchair-accessible entrance"],
                Payments: [
                    "Debit cards",
                    "NFC mobile payments",
                    "Credit cards",
                ],
            },
            reviews: { total: 0, average: 0 },
            telephone,
        });
    });
})();
