const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

const filePath = path.join(__dirname, '[UNIT PENGAJU] USER MANUAL RAILFINANCE.docx');

mammoth.convertToHtml({path: filePath})
    .then(function(result){
        const html = result.value;
        const messages = result.messages; 
        console.log(html);
        if (messages.length > 0) {
            console.error("Messages:", messages);
        }
        fs.writeFileSync(path.join(__dirname, 'unit_pengaju_temp.html'), html);
    })
    .catch(function(error) {
        console.error(error);
    });
