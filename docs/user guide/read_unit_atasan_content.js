const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

const filePath = path.join(__dirname, '[UNIT ATASAN] USER MANUAL RAILFINANCE.docx');

mammoth.convertToHtml({path: filePath})
    .then(function(result){
        const html = result.value;
        const messages = result.messages; 
        console.log(html);
        if (messages.length > 0) {
            console.error("Messages:", messages);
        }
    })
    .catch(function(error) {
        console.error(error);
    });
