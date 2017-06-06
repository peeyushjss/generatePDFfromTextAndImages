const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');

var doc = new PDFDocument;

router.get('/generatePDF', function (req, res) {


    doc.pipe(fs.createWriteStream('peeyush.pdf'));          // name of the output file
    doc.font('../generatePDFfromTextAndImages/font/HelveticaNeueLt.ttf')
            .fontSize(25)
            .text('It is a demo PDF File!', 100, 100);

//    Add an image, constrain it to a given size, and center it vertically and horizontally
    doc.image('../generatePDFfromTextAndImages/img/my.jpg', {
        fit: [250, 300],
        align: 'center',
        valign: 'center'
    });

//You can also set link in pdf
    doc.addPage()
            .fillColor("blue")
            .text('Here is a link!', 100, 100)
            .underline(100, 100, 160, 27, "color", "#0000FF")
            .link(100, 100, 160, 27, 'http://www.facebook.com/peeyushjss');

    doc.end();

    //above line required, if we don't user this generated pdf file will be damaged.

    res.json({status: 1, message: 'PDF generated'});

});
module.exports = router;