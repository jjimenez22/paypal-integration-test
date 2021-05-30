const convertapi = require('convertapi')(`${process.env.CONVERTAPI_SECRET}`);

convertapi.convert('watermark', {
    File: '../public/DNIatras.pdf',
    Text: 'aysumadre'
}, 'pdf').then(function(result) {
    result.saveFiles('../public/watermark.pdf');
});
