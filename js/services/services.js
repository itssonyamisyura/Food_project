const postData = async (url, data) => { //передаем url, который передается дальше в fetch, data (данные) которые будут поститься в этой функции
    const res = await fetch(url, { // посылает запрос на сервер
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    }); 

    return await res.json() // возвращаем promise
};

async function getResource(url) {
    // data не будет, так как мы не передаем на сервер, а получаем
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json() 
};

export {postData};
export {getResource};