const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if(err) reject('Could not find such file!');
            resolve(data);
        });
    });
};

const writeFilePro = (file, message) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, message, (err, data) => {
            if(err) reject('Could not write into that file');
            resolve('success');
        });
    });
};

/*
readFilePro(`${__dirname}/dog.txt`)
    .then(data=> {
        console.log(`breed: ${data}`);
        return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    })            
    .then(res => {
        console.log(res.body.message);
        return writeFilePro('dog-image.txt', res.body.message);
    })
    .then(() => {
        console.log('random dog image saved to file');
    })
    .catch(err => {
        return console.log(err.message);
    });
*/

const getDogImage = async () => {

    try {    
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`breed: ${data}`);

        const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const allRes = await Promise.all([res1Pro, res2Pro, res3Pro]);
        const imgs = allRes.map(el => el.body.message);
        console.log(imgs);

        await writeFilePro('dog-image.txt', imgs.join('\n'));
        console.log('random dog image saved to file');
            
    } catch (error) {
        console.log(error);  
        throw error;
    }

    return '2. ready - 3';
};

/*
console.log('1. will get dog pic');
getDogImage().then(x => {
    console.log(x);
    console.log('3. done getting dog pic');
})
.catch(err => {
    console.log('oops');
});
*/

(async () => {
    try {
        console.log('1. will get dog pic');
        const x = await getDogImage();
        console.log(x);
        console.log('3. done getting dog pic');

    } catch (error) {
        console.log('oops');
    }
})();